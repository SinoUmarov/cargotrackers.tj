"use client"

import Link from "next/link"
import { Package, Mail, Phone, MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/hooks/useAuth"

export default function Footer() {
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()

  const getQuickLinksData = () => {
    const baseLinks = [
      { href: "/", label: t("home") },
      { href: "/track", label: t("trackPackage") },
      { href: "/about", label: t("about") },
      { href: "/calculator", label: t("calculator") },
    ]

    if (isAuthenticated) {
      return [...baseLinks, { href: "/admin/dashboard", label: t("adminPanel") }]
    } else {
      return [...baseLinks, { href: "/admin/login", label: t("login") }]
    }
  }

  const quickLinksData = getQuickLinksData()

  const servicesData = [
    t("realTimeTrackingService"),
    t("telegramIntegrationService"),
    t("analyticsDashboard"),
    t("multiCarrierSupportService"),
    t("enterpriseSecurityService"),
    t("support247"),
  ]

  const contactData = [
    { icon: Mail, text: "support@cargotrack.com" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: MapPin, text: "New York, NY" },
  ]

  const legalLinksData = [
    { href: "#", label: t("privacyPolicy") },
    { href: "#", label: t("termsOfService") },
    { href: "#", label: t("support") },
  ]

  return (
    <footer className="bg-gray-900 text-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">CargoTrack</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">{t("footerDescription")}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("quickLinks")}</h3>
            <div className="space-y-2">
              {quickLinksData.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("services")}</h3>
            <div className="space-y-2">
              {servicesData.map((service) => (
                <div key={service} className="text-gray-400">
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("contact")}</h3>
            <div className="space-y-3">
              {contactData.map((contact, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-400">
                  <contact.icon className="h-5 w-5" />
                  <span>{contact.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2024 CargoTrack. {t("allRightsReserved")}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinksData.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-400 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
