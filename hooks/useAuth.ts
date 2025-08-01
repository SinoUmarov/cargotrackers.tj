"use client"

import { useState, useEffect } from "react"

interface User {
  id: number
  name: string
  email: string
  registeredAt: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      // Check localStorage for user data
      const userData = localStorage.getItem("cargotrack_user")
      const token = localStorage.getItem("cargotrack_token")

      if (userData && token) {
        const parsedUser = JSON.parse(userData)
        const tokenData = JSON.parse(atob(token))

        // Check if token is still valid
        if (new Date(tokenData.expires) > new Date()) {
          setUser(parsedUser)
        } else {
          // Token expired, clear data
          localStorage.removeItem("cargotrack_user")
          localStorage.removeItem("cargotrack_token")
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
      // Clear invalid data
      localStorage.removeItem("cargotrack_user")
      localStorage.removeItem("cargotrack_token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user exists in localStorage or use demo credentials
        const userData = localStorage.getItem("cargotrack_user")

        if (userData || (email === "admin@demo.com" && password === "admin123")) {
          const user = userData
            ? JSON.parse(userData)
            : {
                id: 1,
                name: "Demo Admin",
                email: "admin@demo.com",
                registeredAt: new Date().toISOString(),
              }

          // Create session token
          const token = btoa(
            JSON.stringify({
              email: user.email,
              loginTime: new Date().toISOString(),
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
            }),
          )

          // Save to localStorage
          localStorage.setItem("cargotrack_user", JSON.stringify(user))
          localStorage.setItem("cargotrack_token", token)

          setUser(user)
          resolve(true)
        } else {
          resolve(false)
        }
      }, 1000)
    })
  }

  const register = (name: string, email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: Date.now(),
          name,
          email,
          registeredAt: new Date().toISOString(),
        }

        // Save user data
        localStorage.setItem("cargotrack_user", JSON.stringify(userData))

        // Create session token
        const token = btoa(
          JSON.stringify({
            email: userData.email,
            loginTime: new Date().toISOString(),
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          }),
        )

        localStorage.setItem("cargotrack_token", token)

        setUser(userData)
        resolve(true)
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem("cargotrack_user")
    localStorage.removeItem("cargotrack_token")
    setUser(null)
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }
}
