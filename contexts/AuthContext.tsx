"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useMemo } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

// Create a default context value
const defaultValue: AuthContextType = {
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
}

const AuthContext = createContext<AuthContextType>(defaultValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if user is logged in on initial load
  useEffect(() => {
    // Skip if not mounted yet (server-side)
    if (!mounted) return

    const checkUserLoggedIn = () => {
      try {
        const storedUser = localStorage.getItem("moodating_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkUserLoggedIn()
  }, [mounted])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would authenticate with your backend or Firebase
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: "user123",
        name: "Demo User",
        email: email,
        role: "farmer",
      }

      // Store user in localStorage for persistence
      localStorage.setItem("moodating_user", JSON.stringify(mockUser))
      setUser(mockUser)
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      // In a real app, this would sign out from your backend or Firebase
      localStorage.removeItem("moodating_user")
      setUser(null)
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

