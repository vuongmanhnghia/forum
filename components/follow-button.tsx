"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus, UserMinus, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface FollowButtonProps {
  userId: string
  username: string
  initialFollowState?: boolean
  onFollowChange?: (isFollowing: boolean) => void
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function FollowButton({
  userId,
  username,
  initialFollowState = false,
  onFollowChange,
  variant = "default",
  size = "default",
}: FollowButtonProps) {
  const { user } = useAuth()
  const [isFollowing, setIsFollowing] = useState(initialFollowState)
  const [isLoading, setIsLoading] = useState(false)

  // Don't show follow button for own profile
  if (user?.username === username) {
    return null
  }

  const handleFollowToggle = async () => {
    if (!user) {
      // Redirect to login or show login modal
      console.log("[v0] User not authenticated")
      return
    }

    setIsLoading(true)
    try {
      const endpoint = isFollowing ? "/api/users/unfollow" : "/api/users/follow"
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        const newFollowState = !isFollowing
        setIsFollowing(newFollowState)
        onFollowChange?.(newFollowState)

        const followKey = `follow_${userId}`
        if (newFollowState) {
          localStorage.setItem(followKey, "true")
        } else {
          localStorage.removeItem(followKey)
        }

        console.log(`[v0] ${newFollowState ? "Followed" : "Unfollowed"} user: ${username}`)
      }
    } catch (error) {
      console.error("[v0] Error toggling follow:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleFollowToggle}
      disabled={isLoading}
      variant={isFollowing ? "outline" : variant}
      size={size}
      className="gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isFollowing ? (
        <UserMinus className="h-4 w-4" />
      ) : (
        <UserPlus className="h-4 w-4" />
      )}
      {isLoading ? "Loading..." : isFollowing ? "Following" : "Follow"}
    </Button>
  )
}
