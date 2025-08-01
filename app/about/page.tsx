'use client'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Clock,
  Globe,
  Users,
  BarChart3,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
export default function AboutPage() {
   const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background" />

        <div className="container mx-auto max-w-6xl text-center relative">
          <div className="space-y-8">
            <Badge className="w-fit mx-auto bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 px-6 py-3 text-lg font-medium">
              <Sparkles className="mr-2 h-5 w-5" />
             {t("AboutCargoTracker")}
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Revolutionizing
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Global Logistics
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We're building the future of logistics with cutting-edge AI technology, real-time tracking, and seamless
              integration with modern communication platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="w-fit bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 px-4 py-2">
                  <Rocket className="mr-2 h-4 w-4" />
                  Our Mission
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
                  Connecting the World Through Smart Logistics
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  To provide the most reliable, transparent, and intelligent cargo tracking system that empowers
                  businesses and customers through innovative technology and seamless real-time communication.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Why We're Different</h3>
                <div className="space-y-4">
                  {[
                    "AI-powered tracking with 99.9% accuracy",
                    "Seamless Telegram integration for instant updates",
                    "Transparent pricing with smart calculators",
                    "24/7 global support in multiple languages",
                    "Enterprise-grade security and reliability",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-8 w-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-3xl opacity-20 animate-pulse" />
              <Card className="relative bg-gradient-to-br from-card to-muted/50 border-2 border-primary/20 shadow-2xl">
                <CardHeader className="p-8">
                  <div className="space-y-6">
                    <div className="h-16 w-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-bold">Global Impact</h3>
                      <p className="text-muted-foreground">
                        Serving customers across 150+ countries with localized support and real-time tracking
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
      <section className="py-32 px-4 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 mb-20">
            <Badge className="w-fit mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-4 py-2">
              <BarChart3 className="mr-2 h-4 w-4" />
              Our Impact
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Trusted by Industry Leaders</h2>
            <p className="text-xl text-muted-foreground">
              Our platform handles millions of packages worldwide with unmatched reliability
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "2.5M+", label: "Packages Tracked", gradient: "from-blue-500 to-cyan-500" },
              { number: "15K+", label: "Happy Customers", gradient: "from-emerald-500 to-teal-500" },
              { number: "99.99%", label: "Uptime", gradient: "from-purple-500 to-violet-500" },
              { number: "150+", label: "Countries", gradient: "from-rose-500 to-pink-500" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center p-8 bg-gradient-to-br from-card to-muted/20 border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                >
                  {stat.number}
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 mb-20">
            <Badge className="w-fit mx-auto bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2">
              <Zap className="mr-2 h-4 w-4" />
              Advanced Technology
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Cutting-Edge Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the technology that makes CargoTrack the preferred choice for modern logistics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "AI-Powered Telegram Bot",
                description: "Smart notifications with natural language processing and automated customer support",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-500/10 to-cyan-500/10",
              },
              {
                icon: BarChart3,
                title: "Dynamic Cost Calculator",
                description: "Real-time pricing with machine learning algorithms for accurate cost predictions",
                gradient: "from-emerald-500 to-teal-500",
                bgGradient: "from-emerald-500/10 to-teal-500/10",
              },
              {
                icon: Shield,
                title: "Blockchain Security",
                description: "Immutable tracking records with enterprise-grade encryption and data protection",
                gradient: "from-purple-500 to-violet-500",
                bgGradient: "from-purple-500/10 to-violet-500/10",
              },
              {
                icon: Clock,
                title: "Predictive Analytics",
                description: "AI-driven delivery predictions with 95% accuracy using historical data patterns",
                gradient: "from-rose-500 to-pink-500",
                bgGradient: "from-rose-500/10 to-pink-500/10",
              },
              {
                icon: Users,
                title: "Collaborative Workspace",
                description: "Team management with real-time collaboration tools and role-based permissions",
                gradient: "from-orange-500 to-yellow-500",
                bgGradient: "from-orange-500/10 to-yellow-500/10",
              },
              {
                icon: Globe,
                title: "Global API Network",
                description: "Unified API connecting 500+ carriers worldwide with standardized data formats",
                gradient: "from-indigo-500 to-blue-500",
                bgGradient: "from-indigo-500/10 to-blue-500/10",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group border-2 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-gradient-to-br from-card to-muted/20 overflow-hidden relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <CardHeader className="relative p-8">
                  <div
                    className={`h-16 w-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-4 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 mb-20">
            <Badge className="w-fit mx-auto bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 px-4 py-2">
              <Star className="mr-2 h-4 w-4" />
              Simple Process
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">How CargoTrack Works</h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes with our streamlined onboarding process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Setup & Integration",
                description:
                  "Create your admin account, configure API tokens, and connect your existing systems seamlessly",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "Smart Configuration",
                description:
                  "Set up pricing, Telegram notifications, and customize tracking parameters for your business needs",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                step: "03",
                title: "Track & Optimize",
                description:
                  "Monitor shipments in real-time, receive instant updates, and optimize your logistics with AI insights",
                gradient: "from-purple-500 to-violet-500",
              },
            ].map((step, index) => (
              <div key={index} className="text-center space-y-6">
                <div
                  className={`mx-auto h-20 w-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center shadow-2xl`}
                >
                  <span className="text-2xl font-black text-white">{step.step}</span>
                </div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        <div className="container mx-auto max-w-5xl text-center relative">
          <div className="space-y-8">
            <Badge className="w-fit mx-auto bg-gradient-to-r from-primary to-secondary text-white border-0 px-6 py-3 text-lg font-medium">
              <Rocket className="mr-2 h-5 w-5" />
              Join the Revolution
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of forward-thinking businesses using CargoTrack for next-generation logistics
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button
                asChild
                size="lg"
                className="text-xl px-12 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl shadow-primary/25"
              >
                <Link href="/admin/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-xl px-12 py-6 bg-background/50 backdrop-blur-sm border-2 hover:bg-background/80"
              >
                <Link href="/track">Try with track</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
