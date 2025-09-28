"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  username: string
  email: string
  avatar?: string
  joinedAt: string
  reputation: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface SignupData {
  name: string
  username: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem("forum-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      console.log("[v0] Login attempt:", { email, password })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        name: "Alex Johnson",
        username: "alexj",
        email: email,
        avatar: "/developer-avatar.png",
        joinedAt: "2024-01-15",
        reputation: 1250,
      }

      setUser(mockUser)
      localStorage.setItem("forum-user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("[v0] Login error:", error)
      throw new Error("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: SignupData) => {
    setIsLoading(true)
    try {
      console.log("[v0] Signup attempt:", data)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        name: data.name,
        username: data.username,
        email: data.email,
        joinedAt: new Date().toISOString().split("T")[0],
        reputation: 0,
      }

      setUser(mockUser)
      localStorage.setItem("forum-user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("[v0] Signup error:", error)
      throw new Error("Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("forum-user")
    console.log("[v0] User logged out")
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("forum-user", JSON.stringify(updatedUser))
    console.log("[v0] Profile updated:", data)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
