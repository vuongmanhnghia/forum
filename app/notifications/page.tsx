"use client"

import { useState } from "react"
import { ForumHeader } from "@/components/forum-header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, CheckCheck, Settings, ArrowUpCircle, MessageCircle, Award, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import type { Notification } from "@/types/notification"

// Extended mock notifications for the full page
const allNotifications: Notification[] = [
  {
    id: "1",
    type: "answer",
    title: "New answer to your question",
    message: "Sarah Chen provided a detailed answer to your React hooks question",
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
    message: "Your answer received 5 upvotes from the community",
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
    message: "Alex Rodriguez left a thoughtful comment on your blog post",
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
    message: "Congratulations! Your answer was marked as the accepted solution",
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
    message: "Mike Johnson mentioned you in a discussion about frontend patterns",
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
  {
    id: "6",
    type: "follow",
    title: "New follower",
    message: "Emma Wilson started following you",
    read: true,
    createdAt: "2024-01-13T15:20:00Z",
    actor: {
      name: "Emma Wilson",
      avatar: "/developer-avatar.png",
      username: "emmaw",
    },
  },
  {
    id: "7",
    type: "bounty",
    title: "Bounty awarded",
    message: "You received a 50 point bounty for your excellent answer",
    read: true,
    createdAt: "2024-01-12T12:00:00Z",
    actionUrl: "/post/7",
    metadata: {
      postTitle: "Advanced React patterns",
      bountyAmount: 50,
    },
  },
]

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "answer":
      return <MessageCircle className="h-5 w-5 text-blue-500" />
    case "comment":
      return <MessageCircle className="h-5 w-5 text-green-500" />
    case "vote":
      return <ArrowUpCircle className="h-5 w-5 text-orange-500" />
    case "mention":
      return <Users className="h-5 w-5 text-purple-500" />
    case "follow":
      return <Users className="h-5 w-5 text-blue-500" />
    case "accepted_answer":
      return <Award className="h-5 w-5 text-green-500" />
    case "bounty":
      return <DollarSign className="h-5 w-5 text-yellow-500" />
    default:
      return <Bell className="h-5 w-5" />
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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground mt-1">Stay updated with your account activity</p>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} variant="outline" size="sm">
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark all read ({unreadCount})
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="answer">Answers</TabsTrigger>
              <TabsTrigger value="comment">Comments</TabsTrigger>
              <TabsTrigger value="vote">Votes</TabsTrigger>
              <TabsTrigger value="mention">Mentions</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                    <p className="text-muted-foreground">
                      {activeTab === "unread"
                        ? "You're all caught up! No unread notifications."
                        : "No notifications in this category yet."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`transition-colors hover:bg-muted/50 ${!notification.read ? "border-blue-200 bg-blue-50/50" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {notification.actor ? (
                              <Avatar className="h-10 w-10">
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
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                {getNotificationIcon(notification.type)}
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                              >
                                {notification.title}
                              </h3>
                              {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />}
                            </div>

                            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

                            {notification.metadata?.postTitle && (
                              <p className="text-sm text-muted-foreground mb-2">
                                in "<span className="font-medium">{notification.metadata.postTitle}</span>"
                              </p>
                            )}

                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground">{formatTimeAgo(notification.createdAt)}</p>

                              <div className="flex items-center gap-2">
                                {notification.actionUrl && (
                                  <Link href={notification.actionUrl}>
                                    <Button variant="outline" size="sm">
                                      View
                                    </Button>
                                  </Link>
                                )}
                                {!notification.read && (
                                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
