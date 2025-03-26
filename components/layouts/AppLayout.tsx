"use client"

import { type ReactNode, useEffect } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import MobileNavBar from "@/components/MobileNavBar"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function AppLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're not loading and the user is not authenticated
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">{children}</main>
        <MobileNavBar />
      </div>
    </div>
  )
}

