import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Clock } from "lucide-react"

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  time: string
  likes: number
  replies: number
}

interface CommentSectionProps {
  comments: Comment[]
}

export function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Discussion ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea placeholder="Share your thoughts on this post..." className="min-h-[100px] resize-none" />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Markdown is supported for formatting</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                  <Button size="sm">Post Comment</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{comment.author[0].toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-foreground">{comment.author}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{comment.time}</span>
                    </div>
                  </div>

                  <p className="text-foreground mb-4">{comment.content}</p>

                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
                      <Heart className="h-3 w-3" />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
                      <MessageSquare className="h-3 w-3" />
                      <span className="text-xs">Reply</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
