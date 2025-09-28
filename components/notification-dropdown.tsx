"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Check, Settings, ArrowUpCircle, MessageCircle, Award, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import type { Notification } from "@/types/notification"

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "answer",
    title: "New answer to your question",
    message: "Sarah Chen answered your question about React hooks",
    read: false,
    createdAt: "2024-01-15T10:30:00Z",
    actionUrl: "/post/1",
    actor: {
      name: "Sarah Chen",
      avatar: "/developer-avatar.png",
      username: "sarahchen",
    },
    metadata: {
      postTitle: "How to optimize React hooks performance?",
    },
  },
  {
    id: "2",
    type: "vote",
    title: "Your answer was upvoted",
    message: "Your answer received 5 upvotes",
    read: false,
    createdAt: "2024-01-15T09:15:00Z",
    actionUrl: "/post/2",
    metadata: {
      postTitle: "Best practices for TypeScript interfaces",
      voteType: "up",
    },
  },
  {
    id: "3",
    type: "comment",
    title: "New comment on your post",
    message: "Alex Rodriguez commented on your blog post",
    read: true,
    createdAt: "2024-01-14T16:45:00Z",
    actionUrl: "/post/3",
    actor: {
      name: "Alex Rodriguez",
      avatar: "/developer-avatar-2.png",
      username: "alexr",
    },
    metadata: {
      postTitle: "Understanding JavaScript Closures",
    },
  },
  {
    id: "4",
    type: "accepted_answer",
    title: "Your answer was accepted",
    message: "Your answer was marked as the accepted solution",
    read: true,
    createdAt: "2024-01-14T14:20:00Z",
    actionUrl: "/post/4",
    metadata: {
      postTitle: "Database optimization techniques",
    },
  },
  {
    id: "5",
    type: "mention",
    title: "You were mentioned",
    message: "Mike Johnson mentioned you in a discussion",
    read: false,
    createdAt: "2024-01-14T11:30:00Z",
    actionUrl: "/post/5",
    actor: {
      name: "Mike Johnson",
      avatar: "/developer-avatar-3.png",
      username: "mikej",
    },
    metadata: {
      postTitle: "Frontend architecture patterns",
    },
  },
]

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "answer":
      return <MessageCircle className="h-4 w-4 text-blue-500" />
    case "comment":
      return <MessageCircle className="h-4 w-4 text-green-500" />
    case "vote":
      return <ArrowUpCircle className="h-4 w-4 text-orange-500" />
    case "mention":
      return <Users className="h-4 w-4 text-purple-500" />
    case "follow":
      return <Users className="h-4 w-4 text-blue-500" />
    case "accepted_answer":
      return <Award className="h-4 w-4 text-green-500" />
    case "bounty":
      return <DollarSign className="h-4 w-4 text-yellow-500" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  return date.toLocaleDateString()
}

interface NotificationDropdownProps {
  className?: string
}

export function NotificationDropdown({ className }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`relative ${className}`}>
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
            <Link href="/notifications">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-0">
                <Link
                  href={notification.actionUrl || "#"}
                  className="w-full p-3 hover:bg-muted/50 transition-colors"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {notification.actor ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={notification.actor.avatar || "/placeholder.svg"}
                            alt={notification.actor.name}
                          />
                          <AvatarFallback>
                            {notification.actor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm font-medium truncate ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                      {notification.metadata?.postTitle && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          in "{notification.metadata.postTitle}"
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(notification.createdAt)}</p>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </div>

        {notifications.length > 5 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Link href="/notifications">
                <Button variant="ghost" className="w-full justify-center">
                  View all notifications
                </Button>
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
