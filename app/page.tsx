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
  Truck,
  Play,
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
      color: "blue",
    },
    {
      icon: Clock,
      title: t("realTimeTracking"),
      description: t("realTimeTrackingDesc"),
      color: "emerald",
    },
    {
      icon: Shield,
      title: t("enterpriseSecurity"),
      description: t("enterpriseSecurityDesc"),
      color: "purple",
    },
    {
      icon: BarChart3,
      title: t("advancedAnalytics"),
      description: t("advancedAnalyticsDesc"),
      color: "orange",
    },
    {
      icon: Users,
      title: t("teamManagement"),
      description: t("teamManagementDesc"),
      color: "teal",
    },
    {
      icon: Package,
      title: t("multiCarrierSupport"),
      description: t("multiCarrierSupportDesc"),
      color: "indigo",
    },
  ]

  const benefitsData = [t("benefit1"), t("benefit2"), t("benefit3"), t("benefit4"), t("benefit5"), t("benefit6")]

  const whyChooseUsData = [
    {
      icon: Star,
      title: t("reason1Title"),
      description: t("reason1Desc"),
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Zap,
      title: t("reason2Title"),
      description: t("reason2Desc"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: t("reason3Title"),
      description: t("reason3Desc"),
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      title: t("reason4Title"),
      description: t("reason4Desc"),
      gradient: "from-purple-500 to-violet-500",
    },
    {
      icon: Target,
      title: t("reason5Title"),
      description: t("reason5Desc"),
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Shield,
      title: t("reason6Title"),
      description: t("reason6Desc"),
      gradient: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <SwiperSlide>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 px-8">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <Badge className="bg-white/20 text-white border-0 px-6 py-2 text-lg font-medium">
                    {t("professionalLogistics")}
                  </Badge>
                  <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                    {t("trackYourCargo")}
                    <span className="block text-blue-200">{t("withConfidence")}</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                    {t("heroDescription")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
                    >
                      <Link href="/track">
                        <Package className="mr-2 h-5 w-5" />
                        {t("startTracking")}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Link href="/calculator">
                        <BarChart3 className="mr-2 h-5 w-5" />
                        {t("calculateCost")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Video Slide */}
            <SwiperSlide>
              <div className="bg-gradient-to-r h-[800px] from-orange-600 to-red-700 text-white py-24 px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                  <Badge className="bg-white/20 text-white border-0 px-6 py-2 text-lg font-medium">
                    {t("globalShipping")}
                  </Badge>
                  <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                    {t("fromChinaWorldwide")}
                    <span className="block text-orange-200">{t("reliableDelivery")}</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                    {t("videoDescription")}
                  </p>

                  {/* Video Preview */}
                  <div className="relative max-w-2xl mx-auto h-[500px] mt-[-100px ]">
                    <div className="aspect-video bg-black/30 rounded-xl border-2 border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center space-y-4">
                        <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                          <Play className="h-10 w-10 text-white ml-1" />
                        </div>
                        <p className="text-white/80 text-lg">Cargo Loading from China</p>
                        <p className="text-white/60 text-sm">Professional handling & secure packaging</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="text-lg px-8 py-4 bg-white text-orange-600 hover:bg-gray-100 shadow-lg"
                  >
                    <Link href="/about">
                      <Truck className="mr-2 h-5 w-5" />
                      {t("watchDemo")}
                    </Link>
                  </Button>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-24 px-8">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <Badge className="bg-white/20 text-white border-0 px-6 py-2 text-lg font-medium">
                    {t("realTimeCommunication")}
                  </Badge>
                  <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                    {t("instantNotifications")}
                    <span className="block text-emerald-200">{t("stayInformed")}</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                    {t("telegramDescription")}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="text-lg px-8 py-4 bg-white text-emerald-600 hover:bg-gray-100 shadow-lg"
                  >
                    <Link href="/about">
                      <Globe className="mr-2 h-5 w-5" />
                      {t("learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-gradient-to-r from-slate-600 to-slate-800 text-white py-24 px-8">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <Badge className="bg-white/20 text-white border-0 px-6 py-2 text-lg font-medium">
                    {t("transparentPricing")}
                  </Badge>
                  <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                    {t("smartCalculator")}
                    <span className="block text-slate-200">{t("noHiddenFees")}</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-slate-100 max-w-3xl mx-auto leading-relaxed">
                    {t("pricingDescription")}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="text-lg px-8 py-4 bg-white text-slate-600 hover:bg-gray-100 shadow-lg"
                  >
                    <Link href="/calculator">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      {t("tryCalculator")}
                    </Link>
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-0 px-4 py-2 text-sm font-medium">
              {t("whyChooseUs")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">{t("trustedPartner")}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t("whyChooseUsDescription")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsData.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
                  <CardHeader className="p-8">
                    <div
                      className={`h-14 w-14 bg-gradient-to-r ${reason.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <reason.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {reason.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                      {reason.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-0 px-4 py-2 text-sm font-medium">
              {t("professionalFeatures")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">{t("whyChooseCargoTrack")}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t("featuresDescription")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
                  <CardHeader className="p-8">
                    <div
                      className={`h-14 w-14 bg-${feature.color}-100 dark:bg-${feature.color}-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className={`h-7 w-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                    </div>
                    <CardTitle className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
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
      <AnimatedSection className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border-0 px-4 py-2 text-sm font-medium">
                  {t("businessBenefits")}
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  {t("streamlineOperations")}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{t("benefitsDescription")}</p>
              </div>

              <div className="space-y-6">
                {benefitsData.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="h-8 w-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-lg text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-xl">
                <CardHeader className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t("industryRecognition")}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{t("trustedByCompanies")}</p>
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
                          className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl"
                        >
                          <span className="text-gray-600 dark:text-gray-300 font-medium">{item.label}</span>
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{item.metric}</span>
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

      {/* CTA Section */}
      <AnimatedSection className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="space-y-8 text-white">
            <Badge className="bg-white/20 text-white border-0 px-6 py-3 text-lg font-medium">
              {t("getStartedToday")}
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold">{t("readyToOptimize")}</h2>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">{t("ctaDescription")}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="text-xl px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl"
                >
                  <Link href="/track">
                    {t("startTracking")}
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="text-xl px-12 py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl"
                >
                  <Link href="/calculator">
                    <BarChart3 className="mr-2 h-6 w-6" />
                    {t("calculateCost")}
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-xl px-12 py-6 border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Link href="/admin/register">{t("contactSales")}</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
