"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Package, MapPin, DollarSign, Truck, Clock, Shield, Sparkles, Zap, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const destinations = [
  { value: "domestic", label: "Domestic (Same Country)", multiplier: 1 },
  { value: "international", label: "International", multiplier: 1.5 },
  { value: "express", label: "Express Delivery", multiplier: 2 },
  { value: "overnight", label: "Overnight", multiplier: 3 },
]

const services = [
  { value: "standard", label: "Standard Delivery", multiplier: 1, days: "5-7 days" },
  { value: "fast", label: "Fast Delivery", multiplier: 1.3, days: "3-5 days" },
  { value: "express", label: "Express Delivery", multiplier: 1.8, days: "1-2 days" },
  { value: "overnight", label: "Overnight", multiplier: 2.5, days: "Next day" },
]

export default function CalculatorPage() {
  const [weight, setWeight] = useState("")
  const [destination, setDestination] = useState("")
  const [service, setService] = useState("")
  const [pricePerKg, setPricePerKg] = useState(10)
  const [totalCost, setTotalCost] = useState(0)
  const [isCalculated, setIsCalculated] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const adminSettings = localStorage.getItem("cargotrack_admin_settings")
    if (adminSettings) {
      try {
        const settings = JSON.parse(adminSettings)
        if (settings.pricePerKg) {
          setPricePerKg(settings.pricePerKg)
        }
      } catch (error) {
        console.error("Error loading admin settings:", error)
      }
    }
  }, [])

  const calculateCost = () => {
    if (!weight || !destination || !service) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate the cost",
        variant: "destructive",
      })
      return
    }

    const weightNum = Number.parseFloat(weight)
    if (weightNum <= 0) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a valid weight greater than 0",
        variant: "destructive",
      })
      return
    }

    const destinationData = destinations.find((d) => d.value === destination)
    const serviceData = services.find((s) => s.value === service)

    if (!destinationData || !serviceData) return

    const baseCost = weightNum * pricePerKg
    const destinationCost = baseCost * destinationData.multiplier
    const finalCost = destinationCost * serviceData.multiplier

    setTotalCost(finalCost)
    setIsCalculated(true)

    toast({
      title: "Cost Calculated!",
      description: `Total shipping cost: $${finalCost.toFixed(2)}`,
    })
  }

  const resetCalculator = () => {
    setWeight("")
    setDestination("")
    setService("")
    setTotalCost(0)
    setIsCalculated(false)
  }

  const selectedService = services.find((s) => s.value === service)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6">
            <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <Badge className="w-fit mx-auto bg-blue-100 text-blue-800 border-blue-200 px-4 py-1 hover:bg-blue-200 transition-colors">
              <Sparkles className="mr-2 h-4 w-4" />
              Smart Calculator
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900">
              Shipping Cost Calculator
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Get instant, accurate shipping quotes with our transparent pricing system
            </p>
            <Badge
              variant="secondary"
              className="text-base px-4 py-1 bg-white text-blue-600 border border-blue-200"
            >
              Base Rate: ${pricePerKg}/kg
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                Package Details
              </CardTitle>
              <CardDescription>
                Enter your package information to get an accurate, instant quote
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weight" className="font-medium">
                  Package Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight in kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0.1"
                  step="0.1"
                  className="py-3 border-gray-300 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="font-medium">
                  Destination Type
                </Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger className="py-3 border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select destination type" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest.value} value={dest.value} className="py-2">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          {dest.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="font-medium">
                  Service Type
                </Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="py-3 border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((srv) => (
                      <SelectItem key={srv.value} value={srv.value} className="py-2">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <Truck className="h-4 w-4 text-blue-500" />
                            {srv.label}
                          </div>
                          <Badge variant="outline" className="ml-4 text-xs">
                            {srv.days}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={calculateCost}
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-700"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Cost
                </Button>
                <Button
                  variant="outline"
                  onClick={resetCalculator}
                  className="py-4 border-gray-300 bg-white hover:bg-gray-50"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                Cost Breakdown
              </CardTitle>
              <CardDescription>
                {isCalculated
                  ? "Your detailed shipping cost calculation"
                  : "Fill the form to see your personalized quote"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isCalculated ? (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">
                        Base Cost ({weight} kg × ${pricePerKg})
                      </span>
                      <span className="font-medium">
                        ${(Number.parseFloat(weight) * pricePerKg).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Destination Multiplier</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        ×{destinations.find((d) => d.value === destination)?.multiplier}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Service Multiplier</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        ×{services.find((s) => s.value === service)?.multiplier}
                      </Badge>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <span className="text-xl font-semibold">Total Cost</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${totalCost.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {selectedService && (
                    <Card className="bg-blue-50 border border-blue-100">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Estimated Delivery</span>
                        </div>
                        <p className="text-blue-700">{selectedService.days}</p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-3">
                    <Button className="w-full py-4 bg-blue-600 hover:bg-blue-700">
                      <Package className="mr-2 h-4 w-4" />
                      Book Shipment Now
                    </Button>
                    <Button variant="outline" className="w-full py-4 border-gray-300 bg-white hover:bg-gray-50">
                      <Star className="mr-2 h-4 w-4" />
                      Save Quote
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calculator className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Ready to Calculate?</h3>
                    <p className="text-gray-500">
                      Enter your package details to get an instant shipping quote
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: Shield,
              title: "Transparent Pricing",
              description: "No hidden fees. Complete transparency in all cost calculations.",
              color: "text-blue-600",
              bgColor: "bg-blue-50",
            },
            {
              icon: Zap,
              title: "Instant Quotes",
              description: "Get accurate shipping costs in seconds with our calculations.",
              color: "text-green-600",
              bgColor: "bg-green-50",
            },
            {
              icon: Truck,
              title: "Multiple Services",
              description: "Choose from various delivery options to match your needs.",
              color: "text-purple-600",
              bgColor: "bg-purple-50",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="text-center border border-gray-200 bg-white hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div
                  className={`mx-auto h-12 w-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}
                >
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}