import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Bookmark, Share2, Clock, Eye, ArrowLeft, Award, Check } from "lucide-react"
import Link from "next/link"
import { ForumHeader } from "@/components/forum-header"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { VotingButtons } from "@/components/voting-buttons"
import { AnswerSection } from "@/components/answer-section"

const mockPost = {
  id: 1,
  title: "How to implement Server Components with database queries in Next.js 14?",
  content: `I'm trying to understand the best practices for implementing React Server Components with direct database queries in Next.js 14. 

## My Current Setup

I have a Next.js 14 app with the app router and I want to fetch data directly in server components:

\`\`\`jsx
// app/posts/page.tsx
import { db } from '@/lib/db'

export default async function PostsPage() {
  const posts = await db.post.findMany()
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
\`\`\`

## Questions

1. **Performance**: Is it better to fetch data in the page component or create separate server components for each data requirement?

2. **Error Handling**: What's the recommended way to handle database errors in server components?

3. **Caching**: How does Next.js handle caching for server component database queries?

## What I've Tried

I've experimented with both approaches:

### Approach 1: Page-level fetching
\`\`\`jsx
export default async function Page() {
  const [posts, users, categories] = await Promise.all([
    db.post.findMany(),
    db.user.findMany(),
    db.category.findMany()
  ])
  
  return <Layout posts={posts} users={users} categories={categories} />
}
\`\`\`

### Approach 2: Component-level fetching
\`\`\`jsx
async function PostsList() {
  const posts = await db.post.findMany()
  return <div>{/* render posts */}</div>
}

async function UsersList() {
  const users = await db.user.findMany()
  return <div>{/* render users */}</div>
}
\`\`\`

Both seem to work, but I'm not sure which is more performant or follows Next.js best practices.

Any insights would be greatly appreciated!`,
  author: "nextjs_learner",
  avatar: "/developer-avatar.png",
  category: "Next.js",
  replies: 3,
  score: 15,
  views: 234,
  time: "2 hours ago",
  tags: ["nextjs", "react", "server-components", "database", "performance"],
  isBookmarked: false,
  bounty: 50,
  hasAcceptedAnswer: true,
  status: "answered" as const,
}

const mockAnswers = [
  {
    id: 1,
    author: "nextjs_expert",
    avatar: "/developer-avatar-2.png",
    reputation: 15420,
    content: `Great question! Here's the recommended approach for Server Components with database queries:

## Component-level fetching is preferred

The second approach (component-level fetching) is generally better because:

### 1. **Parallel Loading**
Each component can start fetching its data immediately when it renders:

\`\`\`jsx
// This allows parallel data fetching
function Dashboard() {
  return (
    <div>
      <Suspense fallback={<PostsSkeleton />}>
        <PostsList />
      </Suspense>
      <Suspense fallback={<UsersSkeleton />}>
        <UsersList />
      </Suspense>
    </div>
  )
}
\`\`\`

### 2. **Better Error Boundaries**
You can isolate errors to specific components:

\`\`\`jsx
async function PostsList() {
  try {
    const posts = await db.post.findMany()
    return <PostsGrid posts={posts} />
  } catch (error) {
    return <PostsError error={error} />
  }
}
\`\`\`

### 3. **Automatic Request Deduplication**
Next.js automatically deduplicates identical requests across components.

## Caching Strategy

Next.js provides several caching options:

\`\`\`jsx
// Cache for 1 hour
const posts = await db.post.findMany()
// This is automatically cached by Next.js

// For dynamic data, use revalidation
export const revalidate = 3600 // 1 hour
\`\`\`

The key is to structure your components around data requirements rather than UI layout.`,
    time: "1 hour ago",
    score: 25,
    isAccepted: true,
    userVote: null,
  },
  {
    id: 2,
    author: "react_dev",
    avatar: "/developer-avatar-3.png",
    reputation: 8750,
    content: `I'd add to the excellent answer above that you should also consider **streaming** for better user experience:

\`\`\`jsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsList />
      </Suspense>
      <Suspense fallback={<div>Loading users...</div>}>
        <UsersList />
      </Suspense>
    </div>
  )
}
\`\`\`

This way, fast-loading components render immediately while slower ones stream in progressively.

Also, for error handling, consider using error boundaries at the component level:

\`\`\`jsx
// app/posts/error.tsx
'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong with posts!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
\`\`\``,
    time: "45 minutes ago",
    score: 12,
    isAccepted: false,
    userVote: null,
  },
  {
    id: 3,
    author: "performance_guru",
    avatar: "/developer-avatar.png",
    reputation: 12300,
    content: `One more consideration: **database connection pooling** becomes crucial when you have multiple server components making database calls.

Make sure you're using a proper connection pool:

\`\`\`javascript
// lib/db.js
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export { pool }
\`\`\`

Without proper pooling, you might exhaust your database connections quickly with multiple server components.`,
    time: "30 minutes ago",
    score: 8,
    isAccepted: false,
    userVote: null,
  },
]

export default function PostPage({ params }: { params: { id: string } }) {
  const isQuestionAuthor = true // In real app, check if current user is the question author

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Questions
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div className="flex gap-6">
                  {/* Voting Column */}
                  <div className="flex flex-col items-center">
                    <VotingButtons initialScore={mockPost.score} size="lg" />
                    <Button variant="ghost" size="sm" className="mt-4 h-8 w-8 p-0">
                      <Bookmark className={`h-4 w-4 ${mockPost.isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    {/* Question Header */}
                    <div className="mb-6">
                      {/* Status Badges */}
                      <div className="flex items-center gap-2 mb-4">
                        {mockPost.hasAcceptedAnswer && (
                          <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                            <Check className="h-3 w-3 mr-1" />
                            Answered
                          </Badge>
                        )}
                        {mockPost.bounty && (
                          <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
                            <Award className="h-3 w-3 mr-1" />
                            Bounty +{mockPost.bounty}
                          </Badge>
                        )}
                      </div>

                      <h1 className="text-3xl font-bold text-foreground mb-4">{mockPost.title}</h1>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Asked {mockPost.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>Viewed {mockPost.views} times</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {mockPost.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator className="mb-6" />

                    {/* Question Content */}
                    <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                      <MarkdownRenderer content={mockPost.content} />
                    </div>

                    {/* Question Footer */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm">
                          Follow
                        </Button>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">asked {mockPost.time}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={mockPost.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{mockPost.author[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <span className="font-medium text-foreground">{mockPost.author}</span>
                              <div className="text-muted-foreground">1,234 reputation</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answers Section */}
            <div className="mt-8">
              <AnswerSection
                answers={mockAnswers}
                canAcceptAnswers={isQuestionAuthor}
                questionAuthor={mockPost.author}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Question Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Question Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Asked</span>
                      <span>{mockPost.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Viewed</span>
                      <span>{mockPost.views} times</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active</span>
                      <span>30 minutes ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Questions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Related Questions</h3>
                  <div className="space-y-3">
                    <Link href="/post/2" className="block text-sm hover:text-primary">
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-medium">15</span>
                        <span>Best practices for Next.js 14 data fetching</span>
                      </div>
                    </Link>
                    <Link href="/post/3" className="block text-sm hover:text-primary">
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground font-medium">8</span>
                        <span>Server Components vs Client Components performance</span>
                      </div>
                    </Link>
                    <Link href="/post/4" className="block text-sm hover:text-primary">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 font-medium">23</span>
                        <span>Database connection pooling in Next.js</span>
                      </div>
                    </Link>
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
