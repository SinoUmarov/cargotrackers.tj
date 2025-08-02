"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Clock,
  Globe,
  ArrowRight,
  Package,
  Users,
  BarChart3,
  CheckCircle,
  TrendingUp,
  Award,
  Star,
  Zap,
  Target,
 
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const { t } = useLanguage()

  const statsData = [
    { number: "50K+", label: t("packagesTracked"), icon: Package },
    { number: "500+", label: t("happyClients"), icon: Users },
    { number: "99.9%", label: t("uptime"), icon: TrendingUp },
    { number: "24/7", label: t("support"), icon: Shield },
  ]

  const featuresData = [
    {
      icon: Globe,
      title: t("telegramIntegration"),
      description: t("telegramIntegrationDesc"),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Clock,
      title: t("realTimeTracking"),
      description: t("realTimeTrackingDesc"),
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Shield,
      title: t("enterpriseSecurity"),
      description: t("enterpriseSecurityDesc"),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: BarChart3,
      title: t("advancedAnalytics"),
      description: t("advancedAnalyticsDesc"),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Users,
      title: t("teamManagement"),
      description: t("teamManagementDesc"),
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      icon: Package,
      title: t("multiCarrierSupport"),
      description: t("multiCarrierSupportDesc"),
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ]

  const benefitsData = [t("benefit1"), t("benefit2"), t("benefit3"), t("benefit4"), t("benefit5"), t("benefit6")]

  const whyChooseUsData = [
    {
      icon: Star,
      title: t("reason1Title"),
      description: t("reason1Desc"),
      color: "bg-gradient-to-br from-yellow-100 to-orange-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Zap,
      title: t("reason2Title"),
      description: t("reason2Desc"),
      color: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Globe,
      title: t("reason3Title"),
      description: t("reason3Desc"),
      color: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconColor: "text-green-600",
    },
    {
      icon: Clock,
      title: t("reason4Title"),
      description: t("reason4Desc"),
      color: "bg-gradient-to-br from-purple-50 to-violet-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Target,
      title: t("reason5Title"),
      description: t("reason5Desc"),
      color: "bg-gradient-to-br from-pink-50 to-rose-50",
      iconColor: "text-pink-600",
    },
    {
      icon: Shield,
      title: t("reason6Title"),
      description: t("reason6Desc"),
      color: "bg-gradient-to-br from-indigo-50 to-blue-50",
      iconColor: "text-indigo-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
  <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
   
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="/tracker.mp4" type="video/mp4" />
     
    </video>

    <div className="absolute inset-0 bg-black/50" />

 
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("Trackyourshipment")}</h1>
      <p className="text-lg md:text-xl max-w-2xl">
        Вся информация о перемещении твоего груза в реальном времени — быстро, точно, удобно.
      </p>
      <button className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white text-sm font-medium transition">
        Начать отслеживание
      </button>
    </div>
  </div>
</div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      {/* Features Section */}
      <AnimatedSection className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-blue-50 text-blue-600 border-0 px-4 py-1 text-sm font-medium">
              {t("professionalFeatures")}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t("whyChooseCargoTrack")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("featuresDescription")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                  <CardHeader className="p-6">
                    <div
                      className={`h-12 w-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold mb-2 text-gray-900">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-emerald-50 text-emerald-600 border-0 px-4 py-1 text-sm font-medium">
                  {t("businessBenefits")}
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {t("streamlineOperations")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">{t("benefitsDescription")}</p>
              </div>

              <div className="space-y-4">
                {benefitsData.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="h-8 w-8 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 shadow-sm">
                <CardHeader className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{t("industryRecognition")}</h3>
                        <p className="text-gray-600">{t("trustedByCompanies")}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { metric: "99.9%", label: t("uptimeGuarantee") },
                        { metric: "< 2s", label: t("averageResponseTime") },
                        { metric: "24/7", label: t("customerSupport") },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200"
                        >
                          <span className="text-gray-600 font-medium">{item.label}</span>
                          <span className="text-xl font-bold text-blue-600">{item.metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      <Footer />
    </div>
  )
  
}