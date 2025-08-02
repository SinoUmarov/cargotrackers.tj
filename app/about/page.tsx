'use client'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Rocket, Globe, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="space-y-8">
            <Badge className="mx-auto bg-blue-100 text-blue-800 border-blue-200 px-6 py-2 text-lg">
              <Rocket className="mr-2 h-5 w-5" />
              About CargoTracker
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
              Revolutionizing <span className="text-blue-600 block mt-2">Global Logistics</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
              We're building the future of logistics with cutting-edge technology and real-time tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="w-fit bg-green-100 text-green-800 border-green-200 px-4 py-1">
                  <Rocket className="mr-2 h-4 w-4" />
                  Our Mission
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Connecting the World Through Smart Logistics
                </h2>
                <p className="text-lg text-gray-600">
                  To provide the most reliable and transparent cargo tracking system that empowers businesses through innovative technology.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Why We're Different</h3>
                <div className="space-y-4">
                  {[
                    "AI-powered tracking with 99.9% accuracy",
                    "Real-time updates and notifications",
                    "Transparent pricing",
                    "24/7 global support",
                    "Enterprise-grade security",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Card className="bg-white border border-gray-200 rounded-xl">
                <CardHeader className="p-8">
                  <div className="space-y-6">
                    <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                      <Globe className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-semibold text-gray-900">Global Impact</h3>
                      <p className="text-gray-600">
                        Serving customers worldwide with real-time tracking
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Trusted by Industry Leaders</h2>
            <p className="text-lg text-gray-600">
              Our platform handles millions of packages worldwide with reliability
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "2.5M+", label: "Packages Tracked" },
              { number: "15K+", label: "Happy Customers" },
              { number: "99.99%", label: "Uptime" },
              { number: "150+", label: "Countries" },
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-blue-50">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join businesses using CargoTrack for next-generation logistics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild size="lg" className="text-lg px-8 py-5 bg-blue-600 hover:bg-blue-700">
                <Link href="/admin/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-5">
                <Link href="/track">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}