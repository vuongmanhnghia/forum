"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ForumHeader } from "@/components/forum-header"
import { PostCard } from "@/components/post-card"
import { MessageSquare, Heart, Calendar, Settings, BookmarkIcon, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"

// Mock user data
const userData = {
  name: "Alex Johnson",
  username: "alex_dev",
  avatar: "/developer-avatar.png",
  bio: "Full-stack developer passionate about React, Node.js, and modern web technologies. Always learning and sharing knowledge with the community.",
  joinDate: "March 2023",
  location: "San Francisco, CA",
  website: "https://alexdev.com",
  stats: {
    posts: 42,
    replies: 156,
    likes: 1247,
    views: 8934,
    followers: 234,
    following: 89,
  },
  badges: [
    { name: "Early Adopter", color: "bg-blue-500" },
    { name: "Helpful", color: "bg-green-500" },
    { name: "Popular Author", color: "bg-purple-500" },
  ],
}

const userPosts = [
  {
    id: 1,
    type: "blog",
    title: "Building Scalable React Applications with Server Components",
    excerpt: "Learn how to leverage React Server Components to build performant and scalable applications...",
    author: "alex_dev",
    avatar: "/developer-avatar.png",
    category: "Frontend Development",
    replies: 23,
    likes: 89,
    views: 456,
    time: "2 days ago",
    tags: ["react", "server-components", "performance"],
    isBookmarked: false,
    isLiked: true,
    readingTime: "8 min read",
  },
  {
    id: 2,
    type: "blog",
    title: "TypeScript Best Practices for Large Codebases",
    excerpt: "Essential patterns and practices for maintaining type safety in enterprise applications...",
    author: "alex_dev",
    avatar: "/developer-avatar.png",
    category: "Frontend Development",
    replies: 15,
    likes: 67,
    views: 234,
    time: "5 days ago",
    tags: ["typescript", "best-practices", "enterprise"],
    isBookmarked: true,
    isLiked: false,
    readingTime: "12 min read",
  },
  {
    id: 3,
    type: "question",
    title: "How to optimize React re-renders in large component trees?",
    excerpt: "I'm experiencing performance issues with my React app when dealing with large component trees...",
    author: "alex_dev",
    avatar: "/developer-avatar.png",
    category: "Frontend Development",
    replies: 8,
    likes: 34,
    views: 156,
    time: "1 week ago",
    tags: ["react", "performance", "optimization"],
    isBookmarked: false,
    isLiked: true,
    score: 15,
    answers: 3,
    hasAcceptedAnswer: true,
    status: "solved",
  },
  {
    id: 4,
    type: "question",
    title: "Best practices for handling async operations in Redux?",
    excerpt: "What's the recommended approach for managing asynchronous operations in Redux applications?",
    author: "alex_dev",
    avatar: "/developer-avatar.png",
    category: "Frontend Development",
    replies: 12,
    likes: 28,
    views: 89,
    time: "2 weeks ago",
    tags: ["redux", "async", "javascript"],
    isBookmarked: true,
    isLiked: false,
    score: 8,
    answers: 5,
    hasAcceptedAnswer: false,
    status: "open",
  },
]

const recentActivity = [
  {
    type: "post",
    action: "published",
    title: "Building Scalable React Applications",
    time: "2 days ago",
  },
  {
    type: "comment",
    action: "replied to",
    title: "The Future of Web Development",
    time: "3 days ago",
  },
  {
    type: "like",
    action: "liked",
    title: "Docker Best Practices",
    time: "4 days ago",
  },
  {
    type: "follow",
    action: "started following",
    title: "sarah_dev",
    time: "1 week ago",
  },
]

export default function DashboardPage() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: userData.name,
    username: userData.username,
    bio: userData.bio,
    location: userData.location || "",
    website: userData.website || "",
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const profileData = {
        ...formData,
        ...(avatarFile && { avatar: avatarFile }),
      }
      await updateProfile(profileData)
      setIsEditing(false)
      setAvatarPreview(null)
      setAvatarFile(null)
      console.log("[v0] Profile updated successfully")
    } catch (error) {
      console.error("[v0] Error updating profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setFormData({
      name: userData.name,
      username: userData.username,
      bio: userData.bio,
      location: userData.location || "",
      website: userData.website || "",
    })
    setAvatarPreview(null)
    setAvatarFile(null)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Profile Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">{userData.name[0]}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold text-foreground">{userData.name}</h2>
                    <p className="text-muted-foreground">@{userData.username}</p>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{userData.bio}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {userData.joinDate}</span>
                    </div>
                    {userData.location && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>📍</span>
                        <span>{userData.location}</span>
                      </div>
                    )}
                    {userData.website && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>🔗</span>
                        <a
                          href={userData.website}
                          className="hover:text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {userData.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => setIsEditing(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{userData.stats.posts}</p>
                      <p className="text-xs text-muted-foreground">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{userData.stats.replies}</p>
                      <p className="text-xs text-muted-foreground">Replies</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{userData.stats.likes}</p>
                      <p className="text-xs text-muted-foreground">Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{userData.stats.views}</p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Link
                      href={`/followers/${userData.username}`}
                      className="flex justify-between text-sm hover:text-primary"
                    >
                      <span className="text-muted-foreground">Followers</span>
                      <span className="font-medium">{userData.stats.followers}</span>
                    </Link>
                    <Link
                      href={`/following/${userData.username}`}
                      className="flex justify-between text-sm mt-1 hover:text-primary"
                    >
                      <span className="text-muted-foreground">Following</span>
                      <span className="font-medium">{userData.stats.following}</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.badges.map((badge) => (
                      <Badge key={badge.name} className={`${badge.color} text-white`}>
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="blog-posts" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="blog-posts" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Blog Posts
                </TabsTrigger>
                <TabsTrigger value="questions" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Questions
                </TabsTrigger>
                <TabsTrigger value="activity" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="bookmarks" className="gap-2">
                  <BookmarkIcon className="h-4 w-4" />
                  Bookmarks
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="blog-posts" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">My Blog Posts</h3>
                    <Link href="/create">
                      <Button>Create New Blog Post</Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {userPosts
                      .filter((post) => post.type === "blog")
                      .map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                  </div>

                  {userPosts.filter((post) => post.type === "blog").length === 0 && (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-foreground mb-2">No blog posts yet</h4>
                      <p className="text-muted-foreground mb-4">Share your knowledge and insights with the community</p>
                      <Link href="/create">
                        <Button>Write Your First Blog Post</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="questions" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">My Questions</h3>
                    <Link href="/create">
                      <Button>Ask New Question</Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {userPosts
                      .filter((post) => post.type === "question")
                      .map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                  </div>

                  {userPosts.filter((post) => post.type === "question").length === 0 && (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-foreground mb-2">No questions yet</h4>
                      <p className="text-muted-foreground mb-4">
                        Get help from the community by asking your first question
                      </p>
                      <Link href="/create">
                        <Button>Ask Your First Question</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Recent Activity</h3>

                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              {activity.type === "post" && <MessageSquare className="h-4 w-4 text-primary" />}
                              {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-blue-500" />}
                              {activity.type === "like" && <Heart className="h-4 w-4 text-red-500" />}
                              {activity.type === "follow" && <span className="text-green-500">👤</span>}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">You</span> {activity.action}{" "}
                                <span className="font-medium">{activity.title}</span>
                              </p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Bookmarks Tab */}
              <TabsContent value="bookmarks" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Bookmarked Posts</h3>

                  <div className="text-center py-12">
                    <BookmarkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-foreground mb-2">No bookmarks yet</h4>
                    <p className="text-muted-foreground mb-4">
                      Save interesting posts to read later by clicking the bookmark icon
                    </p>
                    <Link href="/">
                      <Button variant="outline">Browse Posts</Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Account Settings</h3>

                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {isEditing ? (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Profile Picture</Label>
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={avatarPreview || userData.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-lg">{userData.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <Input type="file" accept="image/*" onChange={handleAvatarChange} className="mb-2" />
                                  <p className="text-xs text-muted-foreground">
                                    Upload a new profile picture. Recommended size: 400x400px
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input
                                  id="name"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="Enter your display name"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                  id="username"
                                  value={formData.username}
                                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                  placeholder="Enter your username"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="bio">Bio</Label>
                              <Textarea
                                id="bio"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Tell us about yourself"
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                  id="location"
                                  value={formData.location}
                                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                  placeholder="Your location"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                  id="website"
                                  value={formData.website}
                                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                  placeholder="https://yourwebsite.com"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={handleSaveProfile} disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save Changes"}
                              </Button>
                              <Button variant="outline" onClick={handleCancelEdit}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Profile Picture</label>
                              <div className="flex items-center gap-3 mt-2">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{userData.name[0]}</AvatarFallback>
                                </Avatar>
                                <p className="text-sm text-muted-foreground">Current profile picture</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Display Name</label>
                                <p className="text-sm text-muted-foreground mt-1">{userData.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Username</label>
                                <p className="text-sm text-muted-foreground mt-1">@{userData.username}</p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Bio</label>
                              <p className="text-sm text-muted-foreground mt-1">{userData.bio}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Location</label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {userData.location || "Not specified"}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Website</label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {userData.website ? (
                                    <a
                                      href={userData.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:text-primary"
                                    >
                                      {userData.website}
                                    </a>
                                  ) : (
                                    "Not specified"
                                  )}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                              Edit Profile
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications about replies and mentions
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Privacy Settings</p>
                            <p className="text-sm text-muted-foreground">Control who can see your profile and posts</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600">Danger Zone</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Delete Account</p>
                            <p className="text-sm text-muted-foreground">
                              Permanently delete your account and all data
                            </p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Delete Account
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
