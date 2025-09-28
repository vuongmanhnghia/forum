"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ForumHeader } from "@/components/forum-header"
import {
  Search,
  TrendingUp,
  Clock,
  Users,
  MessageSquare,
  Code,
  Server,
  Cloud,
  Smartphone,
  BarChart,
  Brain,
  Shield,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

const categoryData = [
  {
    name: "Frontend Development",
    description: "React, Vue, Angular, HTML, CSS, JavaScript and modern frontend frameworks",
    icon: Code,
    postCount: 1247,
    todayCount: 23,
    color: "bg-blue-500",
    recentPosts: [
      {
        id: 1,
        title: "Best practices for React Server Components",
        author: "react_dev",
        time: "2h ago",
        score: 15,
        type: "question" as const,
      },
      {
        id: 2,
        title: "CSS Grid vs Flexbox in 2024",
        author: "css_master",
        time: "4h ago",
        score: 8,
        type: "blog" as const,
      },
    ],
  },
  {
    name: "Backend & APIs",
    description: "Node.js, Python, Java, databases, REST APIs, GraphQL and server-side development",
    icon: Server,
    postCount: 892,
    todayCount: 18,
    color: "bg-green-500",
    recentPosts: [
      {
        id: 3,
        title: "Implementing JWT authentication in Express",
        author: "backend_guru",
        time: "1h ago",
        score: 22,
        type: "question" as const,
      },
      {
        id: 4,
        title: "Building scalable APIs with FastAPI",
        author: "python_dev",
        time: "3h ago",
        score: 12,
        type: "blog" as const,
      },
    ],
  },
  {
    name: "DevOps & Cloud",
    description: "Docker, Kubernetes, AWS, Azure, CI/CD, deployment and infrastructure",
    icon: Cloud,
    postCount: 634,
    todayCount: 12,
    color: "bg-purple-500",
    recentPosts: [
      {
        id: 5,
        title: "Docker multi-stage builds optimization",
        author: "devops_pro",
        time: "30m ago",
        score: 19,
        type: "blog" as const,
      },
      {
        id: 6,
        title: "Kubernetes deployment strategies",
        author: "k8s_expert",
        time: "2h ago",
        score: 14,
        type: "question" as const,
      },
    ],
  },
  {
    name: "Mobile Development",
    description: "React Native, Flutter, iOS, Android, cross-platform development",
    icon: Smartphone,
    postCount: 456,
    todayCount: 8,
    color: "bg-orange-500",
    recentPosts: [
      {
        id: 7,
        title: "Flutter vs React Native performance comparison",
        author: "mobile_dev",
        time: "1h ago",
        score: 25,
        type: "blog" as const,
      },
      {
        id: 8,
        title: "iOS app store submission issues",
        author: "ios_dev",
        time: "5h ago",
        score: 6,
        type: "question" as const,
      },
    ],
  },
  {
    name: "Data Science",
    description: "Python, R, pandas, data analysis, visualization and statistical computing",
    icon: BarChart,
    postCount: 378,
    todayCount: 15,
    color: "bg-cyan-500",
    recentPosts: [
      {
        id: 9,
        title: "Data visualization with D3.js and React",
        author: "data_viz",
        time: "3h ago",
        score: 17,
        type: "blog" as const,
      },
      {
        id: 10,
        title: "Pandas performance optimization tips",
        author: "python_analyst",
        time: "4h ago",
        score: 11,
        type: "question" as const,
      },
    ],
  },
  {
    name: "Machine Learning",
    description: "TensorFlow, PyTorch, neural networks, AI models and deep learning",
    icon: Brain,
    postCount: 523,
    todayCount: 21,
    color: "bg-pink-500",
    recentPosts: [
      {
        id: 11,
        title: "Building a recommendation system with PyTorch",
        author: "ml_engineer",
        time: "2h ago",
        score: 31,
        type: "blog" as const,
      },
      {
        id: 12,
        title: "Overfitting in neural networks",
        author: "ai_researcher",
        time: "6h ago",
        score: 18,
        type: "question" as const,
      },
    ],
  },
  {
    name: "Cybersecurity",
    description: "Security best practices, penetration testing, encryption and threat analysis",
    icon: Shield,
    postCount: 289,
    todayCount: 7,
    color: "bg-red-500",
    recentPosts: [
      {
        id: 13,
        title: "Common web application vulnerabilities",
        author: "security_expert",
        time: "1h ago",
        score: 24,
        type: "blog" as const,
      },
      {
        id: 14,
        title: "Implementing OAuth 2.0 securely",
        author: "auth_specialist",
        time: "4h ago",
        score: 13,
        type: "question" as const,
      },
    ],
  },
  {
    name: "General Discussion",
    description: "Career advice, industry trends, tools, productivity and general tech discussions",
    icon: MessageCircle,
    postCount: 756,
    todayCount: 19,
    color: "bg-gray-500",
    recentPosts: [
      {
        id: 15,
        title: "Remote work productivity tips for developers",
        author: "remote_worker",
        time: "2h ago",
        score: 16,
        type: "blog" as const,
      },
      {
        id: 16,
        title: "Career transition from frontend to fullstack",
        author: "career_changer",
        time: "5h ago",
        score: 9,
        type: "question" as const,
      },
    ],
  },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("posts")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCategories = categoryData.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case "posts":
        return b.postCount - a.postCount
      case "activity":
        return b.todayCount - a.todayCount
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const totalPosts = categoryData.reduce((sum, cat) => sum + cat.postCount, 0)
  const totalToday = categoryData.reduce((sum, cat) => sum + cat.todayCount, 0)

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Categories</h1>
            <p className="text-muted-foreground">Explore topics and find discussions that interest you</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalPosts.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalToday}</p>
                    <p className="text-sm text-muted-foreground">Posts Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{categoryData.length}</p>
                    <p className="text-sm text-muted-foreground">Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="posts">Most Posts</SelectItem>
                <SelectItem value="activity">Most Active</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${category.color} rounded-lg`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            <Link
                              href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                              className="hover:text-primary"
                            >
                              {category.name}
                            </Link>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span>{category.postCount.toLocaleString()} posts</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{category.todayCount} today</span>
                      </div>
                    </div>

                    {/* Recent Posts */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Recent Posts</h4>
                      {category.recentPosts.map((post) => (
                        <div key={post.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50">
                          <Badge variant={post.type === "question" ? "default" : "secondary"} className="text-xs">
                            {post.score}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/post/${post.id}`}
                              className="text-sm font-medium hover:text-primary line-clamp-1"
                            >
                              {post.title}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              by {post.author} • {post.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* View All Button */}
                    <div className="mt-4 pt-4 border-t">
                      <Link href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          View All Posts
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Empty State */}
          {sortedCategories.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No categories found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or browse all categories</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
