"use client"

import { useState } from "react"
import { ForumHeader } from "@/components/forum-header"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Clock, Flame, Star, Calendar } from "lucide-react"

// Mock trending posts data
const trendingPosts = [
  {
    id: "1",
    title: "Building a Real-time Chat App with Next.js and Socket.io",
    content: "Complete guide to building a scalable real-time chat application...",
    author: { name: "Sarah Chen", username: "sarahdev", avatar: "/developer-avatar.png", reputation: 2840 },
    category: "frontend-development",
    type: "blog" as const,
    tags: ["nextjs", "socketio", "realtime"],
    createdAt: "2024-01-15T10:30:00Z",
    score: 156,
    views: 12400,
    comments: 34,
    readingTime: 8,
    trending: { rank: 1, growth: "+245%", timeframe: "24h" },
  },
  {
    id: "2",
    title: "How to optimize React performance with useMemo and useCallback?",
    content: "I have a React component that re-renders frequently...",
    author: { name: "Mike Johnson", username: "mikejs", avatar: "/developer-avatar-2.png", reputation: 1920 },
    category: "frontend-development",
    type: "question" as const,
    tags: ["react", "performance", "hooks"],
    createdAt: "2024-01-14T15:45:00Z",
    score: 89,
    views: 8900,
    answers: 12,
    hasAcceptedAnswer: true,
    trending: { rank: 2, growth: "+180%", timeframe: "24h" },
  },
  {
    id: "3",
    title: "Complete Guide to TypeScript Generics",
    content: "Master TypeScript generics with practical examples and use cases...",
    author: { name: "Alex Rodriguez", username: "alexts", avatar: "/developer-avatar-3.png", reputation: 3150 },
    category: "backend-apis",
    type: "blog" as const,
    tags: ["typescript", "generics", "advanced"],
    createdAt: "2024-01-13T09:20:00Z",
    score: 134,
    views: 15600,
    comments: 28,
    readingTime: 12,
    trending: { rank: 3, growth: "+156%", timeframe: "24h" },
  },
  {
    id: "4",
    title: "Best practices for API error handling in Node.js?",
    content: "What are the recommended patterns for handling errors in Express.js APIs?",
    author: { name: "Emma Wilson", username: "emmaw", avatar: "/developer-avatar.png", reputation: 1680 },
    category: "backend-apis",
    type: "question" as const,
    tags: ["nodejs", "express", "error-handling"],
    createdAt: "2024-01-12T14:10:00Z",
    score: 67,
    views: 5400,
    answers: 8,
    hasAcceptedAnswer: false,
    trending: { rank: 4, growth: "+134%", timeframe: "24h" },
  },
  {
    id: "5",
    title: "Docker Multi-stage Builds for Production",
    content: "Learn how to optimize your Docker images using multi-stage builds...",
    author: { name: "David Kim", username: "davidk", avatar: "/developer-avatar-2.png", reputation: 2240 },
    category: "devops-cloud",
    type: "blog" as const,
    tags: ["docker", "devops", "optimization"],
    createdAt: "2024-01-11T11:30:00Z",
    score: 98,
    views: 7800,
    comments: 19,
    readingTime: 6,
    trending: { rank: 5, growth: "+112%", timeframe: "24h" },
  },
]

const trendingStats = {
  totalTrendingPosts: 156,
  totalViews: 89400,
  avgGrowth: "+167%",
  topCategory: "Frontend Development",
}

export default function TrendingPage() {
  const [timeframe, setTimeframe] = useState("24h")
  const [contentType, setContentType] = useState("all")

  const filteredPosts = trendingPosts.filter((post) => {
    if (contentType === "all") return true
    return post.type === contentType
  })

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Trending</h1>
                <p className="text-muted-foreground">Discover what's hot in the developer community</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-muted-foreground">Trending Posts</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{trendingStats.totalTrendingPosts}</p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Views</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{trendingStats.totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">Avg Growth</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{trendingStats.avgGrowth}</p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-muted-foreground">Top Category</span>
                </div>
                <p className="text-sm font-bold text-foreground">{trendingStats.topCategory}</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-4">
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="24h">Last 24h</SelectItem>
                    <SelectItem value="7d">Last Week</SelectItem>
                    <SelectItem value="30d">Last Month</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Content</SelectItem>
                    <SelectItem value="question">Questions</SelectItem>
                    <SelectItem value="blog">Blog Posts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Updated 5 minutes ago</span>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="trending" className="gap-2">
                <Flame className="h-4 w-4" />
                Hot Now
              </TabsTrigger>
              <TabsTrigger value="rising" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Rising Fast
              </TabsTrigger>
              <TabsTrigger value="viral" className="gap-2">
                <Star className="h-4 w-4" />
                Going Viral
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-4">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="relative">
                  {/* Trending Rank Badge */}
                  <div className="absolute -left-4 top-4 z-10">
                    <div className="bg-orange-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                      #{post.trending.rank}
                    </div>
                  </div>

                  {/* Trending Growth Badge */}
                  <div className="absolute -right-2 -top-2 z-10">
                    <div className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {post.trending.growth}
                    </div>
                  </div>

                  <div className="ml-8">
                    <PostCard post={post} />
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="rising" className="space-y-4">
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Rising Content</h3>
                <p className="text-muted-foreground mb-4">Posts that are gaining momentum quickly</p>
                <Button variant="outline">Coming Soon</Button>
              </div>
            </TabsContent>

            <TabsContent value="viral" className="space-y-4">
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Viral Content</h3>
                <p className="text-muted-foreground mb-4">Posts that have exploded in popularity</p>
                <Button variant="outline">Coming Soon</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
