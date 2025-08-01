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
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background" />

        <div className="container mx-auto max-w-4xl text-center relative">
          <div className="space-y-8">
            <div className="mx-auto h-20 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <Badge className="w-fit mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 px-6 py-3 text-lg font-medium">
              <Sparkles className="mr-2 h-5 w-5" />
              Smart Calculator
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Shipping Cost Calculator
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Get instant, accurate shipping quotes with our AI-powered transparent pricing system
            </p>
            <Badge
              variant="secondary"
              className="text-lg px-6 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-0"
            >
              Base Rate: ${pricePerKg}/kg
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <Card className="border-2 border-primary/10 shadow-2xl bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                Package Details
              </CardTitle>
              <CardDescription className="text-lg">
                Enter your package information to get an accurate, instant quote
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="weight" className="text-lg font-medium">
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
                  className="text-lg py-3 border-2 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="destination" className="text-lg font-medium">
                  Destination Type
                </Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger className="text-lg py-3 border-2 focus:border-emerald-500">
                    <SelectValue placeholder="Select destination type" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest.value} value={dest.value} className="text-lg py-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-emerald-600" />
                          {dest.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="service" className="text-lg font-medium">
                  Service Type
                </Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="text-lg py-3 border-2 focus:border-emerald-500">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((srv) => (
                      <SelectItem key={srv.value} value={srv.value} className="text-lg py-3">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5 text-emerald-600" />
                            {srv.label}
                          </div>
                          <Badge variant="secondary" className="ml-4">
                            {srv.days}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={calculateCost}
                  className="flex-1 text-lg py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xl"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Cost
                </Button>
                <Button
                  variant="outline"
                  onClick={resetCalculator}
                  className="px-8 py-6 text-lg border-2 bg-transparent"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border-2 border-primary/10 shadow-2xl bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                Cost Breakdown
              </CardTitle>
              <CardDescription className="text-lg">
                {isCalculated
                  ? "Your detailed shipping cost calculation"
                  : "Fill the form to see your personalized quote"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isCalculated ? (
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground text-lg">
                        Base Cost ({weight} kg × ${pricePerKg})
                      </span>
                      <span className="text-lg font-semibold">
                        ${(Number.parseFloat(weight) * pricePerKg).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground text-lg">Destination Multiplier</span>
                      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                        ×{destinations.find((d) => d.value === destination)?.multiplier}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground text-lg">Service Multiplier</span>
                      <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white">
                        ×{services.find((s) => s.value === service)?.multiplier}
                      </Badge>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
                      <span className="text-2xl font-bold">Total Cost</span>
                      <span className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        ${totalCost.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {selectedService && (
                    <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Clock className="h-6 w-6 text-blue-600" />
                          <span className="text-xl font-bold">Estimated Delivery</span>
                        </div>
                        <p className="text-lg text-blue-700 dark:text-blue-300">{selectedService.days}</p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-4">
                    <Button className="w-full text-lg py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xl">
                      <Package className="mr-2 h-5 w-5" />
                      Book Shipment Now
                    </Button>
                    <Button variant="outline" className="w-full text-lg py-6 border-2 bg-transparent">
                      <Star className="mr-2 h-5 w-5" />
                      Save Quote
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 space-y-6">
                  <div className="mx-auto h-20 w-20 bg-gradient-to-r from-muted to-muted-foreground/20 rounded-full flex items-center justify-center">
                    <Calculator className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Ready to Calculate?</h3>
                    <p className="text-muted-foreground text-lg">
                      Enter your package details to get an instant, accurate shipping quote
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Shield,
              title: "Transparent Pricing",
              description: "No hidden fees. Complete transparency in all cost calculations.",
              gradient: "from-emerald-500 to-teal-500",
            },
            {
              icon: Zap,
              title: "Instant Quotes",
              description: "Get accurate shipping costs in seconds with AI-powered calculations.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: Truck,
              title: "Multiple Services",
              description: "Choose from various delivery options to match your timeline and budget.",
              gradient: "from-purple-500 to-violet-500",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="text-center border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-card to-muted/20"
            >
              <CardContent className="pt-8 pb-8">
                <div
                  className={`mx-auto h-16 w-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
