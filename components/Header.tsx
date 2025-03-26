"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, Search, User, Moon, Sun, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/AuthContext"

export default function Header() {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/register"
  const { setIsOpen } = useSidebar()
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Don't render theme toggle until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!isAuthPage && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 focus:ring-2 focus:ring-white"
                aria-label="Open sidebar"
              >
                <Menu className="h-6 w-6" />
              </Button>
            )}
            <Link href="/" className="text-2xl font-bold">
              Moo<span className="text-teal-200">Dating</span>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {!isAuthPage && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 focus:ring-2 focus:ring-white"
              onClick={() => setIsOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <Link href="/" className="text-2xl font-bold">
            Moo<span className="text-teal-200">Dating</span>
          </Link>
        </div>
        {!isAuthPage && (
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 focus:bg-white/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            </div>
          </div>
        )}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:bg-white/20"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {!isAuthPage && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

