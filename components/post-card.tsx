import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Check, Award, BookOpen, MessageCircle } from "lucide-react"
import Link from "next/link"

interface PostCardProps {
  post: {
    id: number | string
    title: string
    excerpt?: string
    content?: string
    author:
      | string
      | {
          name: string
          username: string
          avatar: string
          reputation: number
        }
    avatar?: string
    category: string
    replies?: number
    answerCount?: number
    commentCount?: number
    score: number
    views?: number
    viewCount?: number
    time?: string
    createdAt?: string
    tags: string[]
    isBookmarked?: boolean
    hasAcceptedAnswer?: boolean
    bounty?: number
    status?: "open" | "answered" | "closed"
    type: "blog" | "question"
    readingTime?: string | number
    likes?: number
  }
}

export function PostCard({ post }: PostCardProps) {
  const getAuthorName = () => {
    if (typeof post.author === "string") {
      return post.author
    }
    return post.author?.name || "Unknown User"
  }

  const getAuthorAvatar = () => {
    if (typeof post.author === "string") {
      return post.avatar || "/placeholder.svg"
    }
    return post.author?.avatar || "/placeholder.svg"
  }

  const getAuthorInitial = () => {
    const name = getAuthorName()
    return name && name.length > 0 ? name[0].toUpperCase() : "U"
  }

  const getReplyCount = () => {
    if (post.type === "question") {
      return post.answerCount || post.replies || 0
    }
    return post.commentCount || post.replies || 0
  }

  const getViewCount = () => {
    return post.viewCount || post.views || 0
  }

  const getFormattedTime = () => {
    if (post.createdAt) {
      const date = new Date(post.createdAt)
      const now = new Date()
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

      if (diffInHours < 1) return "just now"
      if (diffInHours < 24) return `${diffInHours}h ago`
      if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
      return date.toLocaleDateString()
    }
    return post.time || "recently"
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {post.type === "question" ? (
            /* Question Stats Column */
            <div className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="text-center">
                <div
                  className={`text-lg font-semibold ${post.score > 0 ? "text-green-600" : post.score < 0 ? "text-red-600" : "text-muted-foreground"}`}
                >
                  {post.score}
                </div>
                <div className="text-xs text-muted-foreground">votes</div>
              </div>

              <div className="text-center">
                <div
                  className={`text-lg font-semibold ${post.hasAcceptedAnswer ? "text-green-600" : getReplyCount() > 0 ? "text-blue-600" : "text-muted-foreground"}`}
                >
                  {getReplyCount()}
                </div>
                <div className="text-xs text-muted-foreground">answers</div>
              </div>

              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">{getViewCount()}</div>
                <div className="text-xs text-muted-foreground">views</div>
              </div>
            </div>
          ) : (
            /* Blog Stats Column */
            <div className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="text-center">
                <div className="text-lg font-semibold text-red-500">{post.likes || 0}</div>
                <div className="text-xs text-muted-foreground">likes</div>
              </div>

              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">{getReplyCount()}</div>
                <div className="text-xs text-muted-foreground">comments</div>
              </div>

              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">{getViewCount()}</div>
                <div className="text-xs text-muted-foreground">views</div>
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {/* Post Type Indicator */}
                  <Badge variant="outline" className="text-xs">
                    {post.type === "blog" ? (
                      <>
                        <BookOpen className="h-3 w-3 mr-1" />
                        Blog
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Question
                      </>
                    )}
                  </Badge>

                  {/* Question-specific indicators */}
                  {post.type === "question" && (
                    <>
                      {post.hasAcceptedAnswer && (
                        <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Solved
                        </Badge>
                      )}
                      {post.bounty && (
                        <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 text-xs">
                          <Award className="h-3 w-3 mr-1" />+{post.bounty}
                        </Badge>
                      )}
                      {post.status === "closed" && (
                        <Badge variant="destructive" className="text-xs">
                          Closed
                        </Badge>
                      )}
                    </>
                  )}

                  {/* Blog-specific indicators */}
                  {post.type === "blog" && post.readingTime && (
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readingTime} min read
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold leading-tight">
                  <Link href={`/post/${post.id}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt || post.content || "No description available"}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs hover:bg-primary hover:text-primary-foreground cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={getAuthorAvatar() || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{getAuthorInitial()}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-foreground">{getAuthorName()}</span>
                  <Clock className="h-3 w-3 ml-1" />
                  <span>{getFormattedTime()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
