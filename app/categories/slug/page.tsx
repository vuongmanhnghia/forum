"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { ForumHeader } from "@/components/forum-header"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, TrendingUp, MessageSquare, Users, BookOpen } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Frontend Development",
    slug: "frontend-development",
    description: "React, Vue, Angular, HTML, CSS, JavaScript and modern frontend frameworks",
    color: "bg-blue-500",
    icon: "💻",
    postCount: 1247,
    followerCount: 3421,
    todayPosts: 23,
  },
  {
    name: "Backend & APIs",
    slug: "backend-apis",
    description: "Node.js, Python, Java, databases, REST APIs, GraphQL and server-side development",
    color: "bg-green-500",
    icon: "🔧",
    postCount: 892,
    followerCount: 2156,
    todayPosts: 18,
  },
  {
    name: "DevOps & Cloud",
    slug: "devops-cloud",
    description: "Docker, Kubernetes, AWS, Azure, CI/CD, deployment and infrastructure",
    color: "bg-purple-500",
    icon: "☁️",
    postCount: 634,
    followerCount: 1789,
    todayPosts: 12,
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description: "React Native, Flutter, iOS, Android, cross-platform development",
    color: "bg-orange-500",
    icon: "📱",
    postCount: 456,
    followerCount: 1234,
    todayPosts: 8,
  },
  {
    name: "Data Science",
    slug: "data-science",
    description: "Python, R, pandas, data analysis, visualization and statistical computing",
    color: "bg-cyan-500",
    icon: "📊",
    postCount: 378,
    followerCount: 987,
    todayPosts: 15,
  },
  {
    name: "Machine Learning",
    slug: "machine-learning",
    description: "TensorFlow, PyTorch, neural networks, AI models and deep learning",
    color: "bg-pink-500",
    icon: "🤖",
    postCount: 523,
    followerCount: 1567,
    todayPosts: 21,
  },
  {
    name: "Cybersecurity",
    slug: "cybersecurity",
    description: "Security best practices, penetration testing, encryption and threat analysis",
    color: "bg-red-500",
    icon: "🔒",
    postCount: 289,
    followerCount: 756,
    todayPosts: 7,
  },
  {
    name: "General Discussion",
    slug: "general-discussion",
    description: "Career advice, industry trends, tools, productivity and general tech discussions",
    color: "bg-gray-500",
    icon: "💬",
    postCount: 756,
    followerCount: 2134,
    todayPosts: 19,
  },
]

const mockPosts = [
  {
    id: "1",
    type: "question" as const,
    title: "How to handle async/await in React useEffect?",
    content: "I'm having trouble with async operations in useEffect...",
    author: {
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "/developer-avatar.png",
      reputation: 2847,
    },
    category: "frontend-development",
    tags: ["react", "async", "useeffect"],
    score: 23,
    answerCount: 5,
    viewCount: 342,
    createdAt: "2024-01-15T10:30:00Z",
    hasAcceptedAnswer: true,
    status: "answered" as const,
  },
  {
    id: "2",
    type: "blog" as const,
    title: "Building Scalable React Applications: Best Practices",
    content: "In this comprehensive guide, I'll share the best practices...",
    author: {
      name: "Mike Johnson",
      username: "mikej",
      avatar: "/developer-avatar-2.png",
      reputation: 4521,
    },
    category: "frontend-development",
    tags: ["react", "architecture", "best-practices"],
    score: 45,
    commentCount: 12,
    viewCount: 1247,
    readingTime: 8,
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    type: "question" as const,
    title: "React Context vs Redux: When to use what?",
    content: "I'm confused about when to use React Context vs Redux...",
    author: {
      name: "Alex Rodriguez",
      username: "alexr",
      avatar: "/developer-avatar-3.png",
      reputation: 1923,
    },
    category: "frontend-development",
    tags: ["react", "context", "redux", "state-management"],
    score: 18,
    answerCount: 8,
    viewCount: 567,
    createdAt: "2024-01-13T09:15:00Z",
    hasAcceptedAnswer: false,
    status: "open" as const,
  },
  {
    id: "4",
    type: "question" as const,
    title: "Building REST APIs with Express.js",
    content: "I need help structuring my Express.js API endpoints...",
    author: {
      name: "John Doe",
      username: "johnd",
      avatar: "/developer-avatar.png",
      reputation: 1234,
    },
    category: "backend-apis",
    tags: ["nodejs", "express", "api", "rest"],
    score: 15,
    answerCount: 3,
    viewCount: 234,
    createdAt: "2024-01-12T16:45:00Z",
    hasAcceptedAnswer: true,
    status: "answered" as const,
  },
  {
    id: "5",
    type: "blog" as const,
    title: "Docker Container Optimization Tips",
    content: "Learn how to optimize your Docker containers for production...",
    author: {
      name: "Jane Smith",
      username: "janes",
      avatar: "/developer-avatar-2.png",
      reputation: 3456,
    },
    category: "devops-cloud",
    tags: ["docker", "containers", "optimization", "devops"],
    score: 32,
    commentCount: 8,
    viewCount: 567,
    readingTime: 6,
    createdAt: "2024-01-11T11:30:00Z",
  },
  {
    id: "6",
    type: "question" as const,
    title: "Flutter vs React Native: Performance Comparison",
    content: "Which framework performs better for mobile development?",
    author: {
      name: "Bob Wilson",
      username: "bobw",
      avatar: "/developer-avatar-3.png",
      reputation: 2789,
    },
    category: "mobile-development",
    tags: ["flutter", "react-native", "mobile", "performance"],
    score: 28,
    answerCount: 6,
    viewCount: 445,
    createdAt: "2024-01-10T14:20:00Z",
    hasAcceptedAnswer: false,
    status: "open" as const,
  },
  {
    id: "7",
    type: "blog" as const,
    title: "Data Visualization with Python and Matplotlib",
    content: "A comprehensive guide to creating beautiful charts...",
    author: {
      name: "Alice Cooper",
      username: "alicec",
      avatar: "/developer-avatar.png",
      reputation: 3789,
    },
    category: "data-science",
    tags: ["python", "matplotlib", "data-visualization", "charts"],
    score: 41,
    commentCount: 15,
    viewCount: 892,
    readingTime: 12,
    createdAt: "2024-01-09T13:15:00Z",
  },
  {
    id: "8",
    type: "question" as const,
    title: "Neural Network Architecture for Image Classification",
    content: "What's the best architecture for classifying images?",
    author: {
      name: "David Lee",
      username: "davidl",
      avatar: "/developer-avatar-2.png",
      reputation: 4123,
    },
    category: "machine-learning",
    tags: ["neural-networks", "image-classification", "tensorflow", "cnn"],
    score: 35,
    answerCount: 4,
    viewCount: 678,
    createdAt: "2024-01-08T10:45:00Z",
    hasAcceptedAnswer: true,
    status: "answered" as const,
  },
  {
    id: "9",
    type: "blog" as const,
    title: "Web Application Security Best Practices",
    content: "Essential security measures every developer should know...",
    author: {
      name: "Emma Davis",
      username: "emmad",
      avatar: "/developer-avatar-3.png",
      reputation: 2956,
    },
    category: "cybersecurity",
    tags: ["security", "web-security", "best-practices", "owasp"],
    score: 52,
    commentCount: 18,
    viewCount: 1234,
    readingTime: 10,
    createdAt: "2024-01-07T15:30:00Z",
  },
  {
    id: "10",
    type: "question" as const,
    title: "Career Transition from Frontend to Full Stack",
    content: "How do I transition from frontend to full stack development?",
    author: {
      name: "Chris Brown",
      username: "chrisb",
      avatar: "/developer-avatar.png",
      reputation: 1567,
    },
    category: "general-discussion",
    tags: ["career", "fullstack", "transition", "advice"],
    score: 24,
    answerCount: 12,
    viewCount: 456,
    createdAt: "2024-01-06T12:00:00Z",
    hasAcceptedAnswer: false,
    status: "open" as const,
  },
]

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterType, setFilterType] = useState("all")

  const category = slug ? categories.find((cat) => cat.slug.toLowerCase() === slug.toLowerCase()) : null

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
    if (!slug) return []
    let posts = mockPosts.filter((post) => post.category.toLowerCase() === slug.toLowerCase())

    // Apply search filter
    if (searchQuery) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply type filter
    if (filterType !== "all") {
      posts = posts.filter((post) => post.type === filterType)
    }

    // Apply sorting
    posts.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "score":
          return b.score - a.score
        case "views":
          return b.viewCount - a.viewCount
        default:
          return 0
      }
    })

    return posts
  }, [slug, searchQuery, sortBy, filterType])

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <ForumHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
            <Link href="/categories">
              <Button>Browse All Categories</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center text-2xl`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>

          {/* Category Stats */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>{category.postCount.toLocaleString()} posts</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{category.followerCount.toLocaleString()} followers</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>{category.todayPosts} posts today</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={`Search in ${category.name}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Link href="/create">
                  <Button className="whitespace-nowrap">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="score">Highest Score</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                  </SelectContent>
                </Select>

                <Tabs value={filterType} onValueChange={setFilterType} className="w-full sm:w-auto">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="question">Questions</TabsTrigger>
                    <TabsTrigger value="blog">Blogs</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No posts found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery
                      ? `No posts match your search "${searchQuery}" in ${category.name}`
                      : `No posts in ${category.name} yet`}
                  </p>
                  <Link href="/create">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Post
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Actions */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-foreground mb-4">Category Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Follow Category
                </Button>
                <Link href="/create" className="block">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Ask Question
                  </Button>
                </Link>
                <Link href="/create" className="block">
                  <Button className="w-full bg-transparent" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Write Blog Post
                  </Button>
                </Link>
              </div>
            </div>

            {/* Related Categories */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-foreground mb-4">Related Categories</h3>
              <div className="space-y-2">
                {categories
                  .filter((cat) => cat.slug !== slug)
                  .slice(0, 5)
                  .map((relatedCategory) => (
                    <Link
                      key={relatedCategory.slug}
                      href={`/categories/${relatedCategory.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div
                        className={`w-8 h-8 ${relatedCategory.color} rounded flex items-center justify-center text-sm`}
                      >
                        {relatedCategory.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground truncate">{relatedCategory.name}</div>
                        <div className="text-xs text-muted-foreground">{relatedCategory.postCount} posts</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-foreground mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["react", "javascript", "hooks", "components", "state", "props", "jsx", "typescript"].map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
