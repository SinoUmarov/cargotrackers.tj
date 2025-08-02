"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Package, MapPin, Clock, Truck, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'

// Mock tracking data
const mockTrackingData = {
  TRK001234567: {
    status: "In Transit",
    statusColor: "default" as const,
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    estimatedDelivery: "February 15, 2024",
    currentLocation: "Chicago, IL",
    weight: "2.5 kg",
    dimensions: "30×20×15 cm",
    carrier: "Express Logistics",
    trackingHistory: [
      { date: "Feb 10, 2024 • 09:00 AM", location: "New York, NY", status: "Package picked up", icon: Package },
      { date: "Feb 11, 2024 • 02:30 PM", location: "Philadelphia, PA", status: "In transit", icon: Truck },
      { date: "Feb 12, 2024 • 08:15 AM", location: "Chicago, IL", status: "Arrived at sorting facility", icon: MapPin },
      { date: "Feb 12, 2024 • 04:45 PM", location: "Chicago, IL", status: "Out for delivery", icon: Truck },
    ],
  },
  TRK001234568: {
    status: "Delivered",
    statusColor: "secondary" as const,
    origin: "Miami, FL",
    destination: "Atlanta, GA",
    estimatedDelivery: "February 10, 2024",
    currentLocation: "Atlanta, GA",
    weight: "1.2 kg",
    dimensions: "25×15×10 cm",
    carrier: "Fast Delivery Co",
    trackingHistory: [
      { date: "Feb 8, 2024 • 10:00 AM", location: "Miami, FL", status: "Package picked up", icon: Package },
      { date: "Feb 9, 2024 • 12:30 PM", location: "Jacksonville, FL", status: "In transit", icon: Truck },
      { date: "Feb 10, 2024 • 09:15 AM", location: "Atlanta, GA", status: "Out for delivery", icon: Truck },
      { date: "Feb 10, 2024 • 03:30 PM", location: "Atlanta, GA", status: "Delivered", icon: CheckCircle },
    ],
  },
  TRK001234569: {
    status: "Processing",
    statusColor: "outline" as const,
    origin: "Seattle, WA",
    destination: "Portland, OR",
    estimatedDelivery: "February 16, 2024",
    currentLocation: "Seattle, WA",
    weight: "5.0 kg",
    dimensions: "40×30×25 cm",
    carrier: "Regional Express",
    trackingHistory: [
      { date: "Feb 12, 2024 • 02:00 PM", location: "Seattle, WA", status: "Order received", icon: Package },
      { date: "Feb 12, 2024 • 04:30 PM", location: "Seattle, WA", status: "Processing at warehouse", icon: Clock },
    ],
  },
}

export default function TrackPage() {
  const [trackingCode, setTrackingCode] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTrack = async () => {
    if (!trackingCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking code",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const result = mockTrackingData[trackingCode as keyof typeof mockTrackingData]

      if (result) {
        setTrackingResult({ code: trackingCode, ...result })
        toast({
          title: "Success",
          description: "Tracking information found!",
        })
      } else {
        setTrackingResult(null)
        toast({
          title: "Not Found",
          description: "No tracking information found for this code",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-[50px]">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Track Your <span className="text-gray-600">Shipment</span> in Real Time
            </h1>
            <p className="text-xl text-gray-600">
              Get instant updates on your package's journey from pickup to delivery
            </p>
            
            <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Enter tracking number (e.g., TRK001234567)"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                  className="text-lg py-6 px-4 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/50"
                />
                <Button 
                  onClick={handleTrack} 
                  disabled={isLoading} 
                  size="lg"
                  className="py-6 text-lg font-semibold"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Tracking...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Track Package
                    </span>
                  )}
                </Button>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Try: TRK001234567, TRK001234568, or TRK001234569
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 rounded-lg overflow-hidden shadow-xl">
  <video
    src="/make.mp4"   
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-auto object-cover"
  />
</div>

        </section>

        {/* Tracking Results */}
        {trackingResult && (
          <section className="mb-16">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Status Header */}
              <div className="bg-gray-500 to-blue-300 p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Package className="h-8 w-8" />
                      {trackingResult.code}
                    </h2>
                    <p className="text-blue-100 mt-1">{trackingResult.carrier}</p>
                  </div>
                  <Badge 
                    variant={trackingResult.statusColor} 
                    className="text-lg py-2 px-4 bg-white/10 hover:bg-white/20 border-white/20"
                  >
                    {trackingResult.status}
                  </Badge>
                </div>
              </div>

              {/* Package Details */}
              <div className="grid md:grid-cols-3 gap-6 p-6 border-b">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Origin</h3>
                  <p className="text-lg font-medium">{trackingResult.origin}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Destination</h3>
                  <p className="text-lg font-medium">{trackingResult.destination}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Estimated Delivery</h3>
                  <p className="text-lg font-medium">{trackingResult.estimatedDelivery}</p>
                </div>
              </div>

              {/* Current Status */}
              <div className="p-6 border-b">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Current Location</h3>
                    <p className="text-xl font-medium">{trackingResult.currentLocation}</p>
                  </div>
                </div>
              </div>

              {/* Package Info */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Weight</h3>
                  <p className="text-lg">{trackingResult.weight}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Dimensions</h3>
                  <p className="text-lg">{trackingResult.dimensions}</p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  Tracking History
                </h2>
              </div>
              
              <div className="p-6">
                <div className="relative">
                  {/* Timeline */}
                  <div className="space-y-8">
                    {trackingResult.trackingHistory.map((event: any, index: number) => (
                      <div key={index} className="flex gap-4 relative">
                        {/* Icon and line */}
                        <div className="flex flex-col items-center">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center 
                            ${index === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                            <event.icon className="h-5 w-5" />
                          </div>
                          {index < trackingResult.trackingHistory.length - 1 && (
                            <div className="w-px h-full bg-gray-200 absolute top-10 left-5" />
                          )}
                        </div>
                        
                        {/* Event details */}
                        <div className="flex-1 pb-8">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h4 className="font-semibold text-lg">{event.status}</h4>
                              <span className="text-sm text-gray-500">{event.date}</span>
                            </div>
                            <p className="text-gray-600 mt-1 flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        {!trackingResult && (
          <section className="py-12">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Enter Tracking Number</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Input your unique tracking code found in your shipping confirmation email or receipt.</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>View Package Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>See your package's current status, location, and estimated delivery date.</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Track Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Follow your package's journey from pickup to delivery with real-time updates.</p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
} 