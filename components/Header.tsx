"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Package, Menu, X, User, LogOut } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/hooks/useAuth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const { user, isAuthenticated, logout } = useAuth()

  const navigationItems = [
    { href: "/", label: t("home") },
    { href: "/track", label: t("trackPackage") },
    { href: "/about", label: t("about") },
    { href: "/calculator", label: t("calculator") },
  ]

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm dark:bg-gray-900/95 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">CargoTracker</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium relative group"
              >
                {item.label}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-900 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="hidden lg:inline">{user?.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          {t("adminPanel")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600 ">
                        <LogOut className="mr-2 h-4 w-4"  />
                        {t("logout")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button asChild className="bg-yellow-800 hover:bg-blue-700">
                    <Link href="/track">{t("trackNow")}</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/admin/login">{t("login")}</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/admin/register">{t("register")}</Link>
                  </Button>
                 
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <nav className="flex flex-col space-y-4 p-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{user?.name}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleLogout}
                          className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                        >
                          {t("logout")}
                        </Button>
                      </div>
                      <Button asChild size="sm" className="bg-yellow-800  hover:bg-blue-700">
                        <Link href="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>
                          {t("adminPanel")}
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <div className="flex space-x-2">
                      <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Link href="/admin/login" onClick={() => setIsMenuOpen(false)}>
                          {t("login")}
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Link href="/admin/register" onClick={() => setIsMenuOpen(false)}>
                          {t("register")}
                        </Link>
                      </Button>
                    </div>
                  )}
                 
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
