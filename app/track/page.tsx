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

// Mock tracking data
const mockTrackingData = {
  TRK001234567: {
    status: "In Transit",
    statusColor: "default" as const,
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    estimatedDelivery: "2024-02-15",
    currentLocation: "Chicago, IL",
    weight: "2.5 kg",
    dimensions: "30x20x15 cm",
    carrier: "Express Logistics",
    trackingHistory: [
      { date: "2024-02-10 09:00", location: "New York, NY", status: "Package picked up", icon: Package },
      { date: "2024-02-11 14:30", location: "Philadelphia, PA", status: "In transit", icon: Truck },
      { date: "2024-02-12 08:15", location: "Chicago, IL", status: "Arrived at sorting facility", icon: MapPin },
      { date: "2024-02-12 16:45", location: "Chicago, IL", status: "Out for delivery", icon: Truck },
    ],
  },
  TRK001234568: {
    status: "Delivered",
    statusColor: "secondary" as const,
    origin: "Miami, FL",
    destination: "Atlanta, GA",
    estimatedDelivery: "2024-02-10",
    currentLocation: "Atlanta, GA",
    weight: "1.2 kg",
    dimensions: "25x15x10 cm",
    carrier: "Fast Delivery Co",
    trackingHistory: [
      { date: "2024-02-08 10:00", location: "Miami, FL", status: "Package picked up", icon: Package },
      { date: "2024-02-09 12:30", location: "Jacksonville, FL", status: "In transit", icon: Truck },
      { date: "2024-02-10 09:15", location: "Atlanta, GA", status: "Out for delivery", icon: Truck },
      { date: "2024-02-10 15:30", location: "Atlanta, GA", status: "Delivered", icon: CheckCircle },
    ],
  },
  TRK001234569: {
    status: "Processing",
    statusColor: "outline" as const,
    origin: "Seattle, WA",
    destination: "Portland, OR",
    estimatedDelivery: "2024-02-16",
    currentLocation: "Seattle, WA",
    weight: "5.0 kg",
    dimensions: "40x30x25 cm",
    carrier: "Regional Express",
    trackingHistory: [
      { date: "2024-02-12 14:00", location: "Seattle, WA", status: "Order received", icon: Package },
      { date: "2024-02-12 16:30", location: "Seattle, WA", status: "Processing at warehouse", icon: Clock },
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
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto max-w-4xl px-4 py-12 mt-[60px]">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold">Track Your Package</h1>
            <p className="text-xl text-muted-foreground">
              Enter your tracking code to get real-time updates on your shipment
            </p>
          </div>

          {/* Tracking Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Enter Tracking Code
              </CardTitle>
              <CardDescription>Try: TRK001234567, TRK001234568, or TRK001234569</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter tracking code (e.g., TRK001234567)"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                  className="text-lg"
                />
                <Button onClick={handleTrack} disabled={isLoading} size="lg">
                  {isLoading ? "Tracking..." : "Track"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingResult && (
            <div className="space-y-6">
              {/* Status Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {trackingResult.code}
                    </CardTitle>
                    <Badge variant={trackingResult.statusColor}>{trackingResult.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground">FROM</h4>
                        <p className="text-lg">{trackingResult.origin}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground">TO</h4>
                        <p className="text-lg">{trackingResult.destination}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground">CURRENT LOCATION</h4>
                        <p className="text-lg flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          {trackingResult.currentLocation}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground">ESTIMATED DELIVERY</h4>
                        <p className="text-lg">{trackingResult.estimatedDelivery}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground">CARRIER</h4>
                        <p className="text-lg">{trackingResult.carrier}</p>
                      </div>
                      <div className="flex gap-6">
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground">WEIGHT</h4>
                          <p>{trackingResult.weight}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground">DIMENSIONS</h4>
                          <p>{trackingResult.dimensions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Tracking History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingResult.trackingHistory.map((event: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <event.icon className="h-5 w-5 text-primary" />
                          </div>
                          {index < trackingResult.trackingHistory.length - 1 && (
                            <div className="w-px h-8 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{event.status}</h4>
                            <span className="text-sm text-muted-foreground">{event.date}</span>
                          </div>
                          <p className="text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
