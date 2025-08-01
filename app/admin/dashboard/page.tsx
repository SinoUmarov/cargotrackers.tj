"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Package, Users, TrendingUp, LogOut, Settings, Bell, Search, Filter, Download } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock dashboard data
const dashboardData = {
  stats: {
    totalPackages: 1247,
    activeShipments: 89,
    deliveredToday: 23,
    totalUsers: 156,
  },
  recentTrackingCodes: [
    { code: "TRK001234567", status: "In Transit", destination: "Los Angeles, CA", date: "2024-02-12" },
    { code: "TRK001234568", status: "Delivered", destination: "Atlanta, GA", date: "2024-02-12" },
    { code: "TRK001234569", status: "Processing", destination: "Portland, OR", date: "2024-02-12" },
    { code: "TRK001234570", status: "In Transit", destination: "Miami, FL", date: "2024-02-11" },
    { code: "TRK001234571", status: "Delivered", destination: "Boston, MA", date: "2024-02-11" },
    { code: "TRK001234572", status: "Processing", destination: "Denver, CO", date: "2024-02-11" },
  ],
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  // Add new state for admin settings
  const [adminSettings, setAdminSettings] = useState({
    apiToken: "",
    pricePerKg: 10,
    telegramBotToken: "",
  })
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("cargotrack_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    try {
      const tokenData = JSON.parse(atob(token))
      if (new Date(tokenData.expires) < new Date()) {
        localStorage.removeItem("cargotrack_token")
        router.push("/admin/login")
        return
      }

      setUserEmail(tokenData.email)
      setIsAuthenticated(true)
    } catch {
      router.push("/admin/login")
    }
  }, [router])

  // Add useEffect to load admin settings
  useEffect(() => {
    const settings = localStorage.getItem("cargotrack_admin_settings")
    if (settings) {
      try {
        setAdminSettings(JSON.parse(settings))
      } catch (error) {
        console.error("Error loading admin settings:", error)
      }
    }
  }, [])

  // Add function to save settings
  const saveAdminSettings = () => {
    localStorage.setItem("cargotrack_admin_settings", JSON.stringify(adminSettings))
    toast({
      title: "Settings Saved",
      description: "Your admin settings have been updated successfully.",
    })
    setShowSettings(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("cargotrack_token")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/admin/login")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "secondary"
      case "In Transit":
        return "default"
      case "Processing":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {userEmail}</p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
                <Settings className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.totalPackages.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.activeShipments}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">+5%</span> from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.deliveredToday}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3%</span> from last week
                </p>
              </CardContent>
            </Card>
          </div>

          {showSettings && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Admin Settings
                </CardTitle>
                <CardDescription>Configure your API token and pricing settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="apiToken">API Token</Label>
                      <Input
                        id="apiToken"
                        type="password"
                        placeholder="Enter your API token"
                        value={adminSettings.apiToken}
                        onChange={(e) => setAdminSettings((prev) => ({ ...prev, apiToken: e.target.value }))}
                      />
                      <p className="text-xs text-muted-foreground">Connect your external tracking system API</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telegramToken">Telegram Bot Token</Label>
                      <Input
                        id="telegramToken"
                        type="password"
                        placeholder="Enter Telegram bot token"
                        value={adminSettings.telegramBotToken}
                        onChange={(e) => setAdminSettings((prev) => ({ ...prev, telegramBotToken: e.target.value }))}
                      />
                      <p className="text-xs text-muted-foreground">Enable Telegram notifications for customers</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pricePerKg">Price per KG ($)</Label>
                      <Input
                        id="pricePerKg"
                        type="number"
                        placeholder="10.00"
                        value={adminSettings.pricePerKg}
                        onChange={(e) =>
                          setAdminSettings((prev) => ({ ...prev, pricePerKg: Number.parseFloat(e.target.value) || 0 }))
                        }
                        min="0"
                        step="0.01"
                      />
                      <p className="text-xs text-muted-foreground">Base shipping rate for calculator</p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Current Settings</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>API Token: {adminSettings.apiToken ? "••••••••" : "Not set"}</p>
                        <p>Telegram Bot: {adminSettings.telegramBotToken ? "••••••••" : "Not set"}</p>
                        <p>Price per KG: ${adminSettings.pricePerKg}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={saveAdminSettings}>Save Settings</Button>
                  <Button variant="outline" onClick={() => setShowSettings(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Tracking Codes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Tracking Codes</CardTitle>
                  <CardDescription>Latest package tracking activities</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search tracking codes..." className="pl-10" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  {dashboardData.recentTrackingCodes.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{item.code}</p>
                          <p className="text-sm text-muted-foreground">{item.destination}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge variant={getStatusColor(item.status) as any}>{item.status}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
