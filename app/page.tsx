"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Filter, BookOpen, HelpCircle } from "lucide-react"
import Link from "next/link"
import { ForumHeader } from "@/components/forum-header"
import { PostCard } from "@/components/post-card"

// Mock data for demonstration
const allPosts = [
  {
    id: 1,
    title: "The Future of Web Development: What to Expect in 2024",
    excerpt:
      "Exploring the latest trends in web development including Server Components, edge computing, and TypeScript adoption rates. A comprehensive guide for developers looking to stay ahead.",
    author: "tech_visionary",
    avatar: "/developer-avatar.png",
    category: "Frontend Development",
    replies: 12,
    score: 45,
    views: 1200,
    time: "3 hours ago",
    tags: ["webdev", "trends", "2024", "react"],
    hasAcceptedAnswer: false,
    status: "open" as const,
    type: "blog" as const,
    readingTime: "8 min read",
    likes: 45,
  },
  {
    id: 2,
    title: "How to implement Server Components with database queries in Next.js 14?",
    excerpt:
      "Looking for best practices on implementing React Server Components with direct database queries and proper error handling.",
    author: "nextjs_learner",
    avatar: "/developer-avatar-2.png",
    category: "Next.js",
    replies: 3,
    score: 15,
    views: 234,
    time: "2 hours ago",
    tags: ["nextjs", "react", "server-components", "database"],
    hasAcceptedAnswer: true,
    bounty: 50,
    status: "answered" as const,
    type: "question" as const,
  },
  {
    id: 3,
    title: "Building Scalable Microservices: A Complete Architecture Guide",
    excerpt:
      "Learn how to design and implement microservices that can handle millions of requests. This comprehensive guide covers patterns, tools, and real-world examples.",
    author: "backend_expert",
    avatar: "/developer-avatar-3.png",
    category: "Backend & APIs",
    replies: 8,
    score: 32,
    views: 890,
    time: "5 hours ago",
    tags: ["microservices", "architecture", "scalability", "nodejs"],
    hasAcceptedAnswer: false,
    status: "open" as const,
    type: "blog" as const,
    readingTime: "12 min read",
    likes: 32,
  },
  {
    id: 4,
    title: "Docker container keeps crashing in production - memory issues?",
    excerpt:
      "My Docker container works fine locally but crashes in production after a few hours. Memory usage seems to spike. What debugging steps should I take?",
    author: "devops_newbie",
    avatar: "/developer-avatar.png",
    category: "DevOps & Cloud",
    replies: 5,
    score: 8,
    views: 156,
    time: "1 hour ago",
    tags: ["docker", "production", "memory", "debugging"],
    hasAcceptedAnswer: false,
    status: "open" as const,
    type: "question" as const,
  },
  {
    id: 5,
    title: "React Query vs SWR vs Apollo Client - Performance Comparison 2024",
    excerpt:
      "An in-depth analysis of the most popular data fetching libraries for React. Includes performance benchmarks, bundle size comparisons, and use case recommendations.",
    author: "react_expert",
    avatar: "/developer-avatar-2.png",
    category: "Frontend Development",
    replies: 23,
    score: 67,
    views: 1450,
    time: "1 day ago",
    tags: ["react", "data-fetching", "performance", "comparison"],
    hasAcceptedAnswer: false,
    status: "open" as const,
    type: "blog" as const,
    readingTime: "15 min read",
    likes: 67,
  },
  {
    id: 6,
    title: "TypeScript generic constraints not working as expected",
    excerpt:
      "I'm trying to create a generic function with constraints but TypeScript is throwing errors. Here's my code and the error message I'm getting.",
    author: "ts_learner",
    avatar: "/developer-avatar-3.png",
    category: "TypeScript",
    replies: 2,
    score: 12,
    views: 89,
    time: "30 minutes ago",
    tags: ["typescript", "generics", "constraints", "help"],
    hasAcceptedAnswer: true,
    status: "answered" as const,
    type: "question" as const,
  },
]

export default function ForumHomePage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "questions" | "blogs">("all")
  const [sortBy, setSortBy] = useState<"newest" | "active" | "popular">("newest")

  const filteredPosts = allPosts.filter((post) => {
    if (activeFilter === "all") return true
    if (activeFilter === "questions") return post.type === "question"
    if (activeFilter === "blogs") return post.type === "blog"
    return true
  })

  const questionCount = allPosts.filter((p) => p.type === "question").length
  const blogCount = allPosts.filter((p) => p.type === "blog").length
  const totalAnswers = allPosts.reduce((sum, post) => sum + post.replies, 0)

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">Share Knowledge, Build Together</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Join thousands of developers sharing insights through detailed blog posts, solving problems with Q&A, and
            advancing the future of technology together.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/create">
              <Button size="lg" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Ask Question
              </Button>
            </Link>
            <Link href="/create">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <BookOpen className="h-4 w-4" />
                Write Blog Post
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{questionCount * 536}</p>
                <p className="text-sm text-muted-foreground">Questions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{blogCount * 428}</p>
                <p className="text-sm text-muted-foreground">Blog Posts</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">8,600</p>
                <p className="text-sm text-muted-foreground">Developers</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalAnswers * 207}</p>
                <p className="text-sm text-muted-foreground">Answers & Comments</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="mb-6">
              {/* Post Type Filter */}
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-2xl font-semibold">
                  {activeFilter === "all" && "All Posts"}
                  {activeFilter === "questions" && "Questions"}
                  {activeFilter === "blogs" && "Blog Posts"}
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant={activeFilter === "all" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={activeFilter === "questions" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter("questions")}
                    className="gap-1"
                  >
                    <HelpCircle className="h-3 w-3" />
                    Questions
                  </Button>
                  <Button
                    variant={activeFilter === "blogs" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter("blogs")}
                    className="gap-1"
                  >
                    <BookOpen className="h-3 w-3" />
                    Blogs
                  </Button>
                </div>
              </div>

              {/* Sort Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant={sortBy === "newest" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("newest")}
                  >
                    Newest
                  </Button>
                  <Button
                    variant={sortBy === "active" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("active")}
                  >
                    Active
                  </Button>
                  <Button
                    variant={sortBy === "popular" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("popular")}
                  >
                    Popular
                  </Button>
                  {activeFilter === "questions" && (
                    <>
                      <Button variant="ghost" size="sm">
                        Unanswered
                      </Button>
                      <Button variant="ghost" size="sm">
                        Bounties
                      </Button>
                    </>
                  )}
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline">
                Load More {activeFilter === "all" ? "Posts" : activeFilter === "questions" ? "Questions" : "Blog Posts"}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Popular Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      javascript
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      react
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      nextjs
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      typescript
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      nodejs
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      python
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-3 w-full">
                    View all tags
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Trending Content</h3>
                  <div className="space-y-3">
                    <Link href="/post/6" className="block text-sm hover:text-primary">
                      <div className="flex items-start gap-2">
                        <span className="text-orange-600 font-medium text-xs mt-0.5">🔥</span>
                        <span>Why is my React component re-rendering unnecessarily?</span>
                      </div>
                    </Link>
                    <Link href="/post/7" className="block text-sm hover:text-primary">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600 font-medium text-xs mt-0.5">📖</span>
                        <span>Complete Guide to Modern CSS Grid Layouts</span>
                      </div>
                    </Link>
                    <Link href="/post/8" className="block text-sm hover:text-primary">
                      <div className="flex items-start gap-2">
                        <span className="text-orange-600 font-medium text-xs mt-0.5">🔥</span>
                        <span>How to optimize database queries for large datasets?</span>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Today's Activity</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Questions asked</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blog posts published</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Answers & comments</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">New users</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
