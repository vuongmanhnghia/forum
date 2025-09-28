import { ForumHeader } from "@/components/forum-header"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FollowButton } from "@/components/follow-button"
import { Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock following data
const mockFollowing = [
  {
    id: "1",
    name: "David Kim",
    username: "davidk",
    avatar: "/developer-avatar.png",
    bio: "Senior software engineer at tech startup, React enthusiast",
    followers: 445,
    isFollowing: true,
    badges: ["React Expert", "Startup"],
  },
  {
    id: "2",
    name: "Lisa Zhang",
    username: "lisaz",
    avatar: "/developer-avatar-2.png",
    bio: "UX designer and frontend developer, accessibility advocate",
    followers: 678,
    isFollowing: true,
    badges: ["UX Design", "Accessibility"],
  },
  {
    id: "3",
    name: "Tom Rodriguez",
    username: "tomr",
    avatar: "/developer-avatar-3.png",
    bio: "DevOps engineer, cloud architecture specialist",
    followers: 234,
    isFollowing: true,
    badges: ["DevOps", "Cloud"],
  },
]

export default function FollowingPage({ params }: { params: { username: string } }) {
  const { username } = params

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href={`/profile/${username}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">@{username} is Following</h1>
              <p className="text-muted-foreground">{mockFollowing.length} following</p>
            </div>
          </div>

          {mockFollowing.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Not following anyone</h3>
                <p className="text-muted-foreground">This user isn't following anyone yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {mockFollowing.map((following) => (
                <Card key={following.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Link href={`/profile/${following.username}`}>
                          <Avatar className="h-12 w-12 cursor-pointer">
                            <AvatarImage src={following.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{following.name[0]}</AvatarFallback>
                          </Avatar>
                        </Link>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Link href={`/profile/${following.username}`}>
                              <h3 className="font-semibold hover:text-primary cursor-pointer">{following.name}</h3>
                            </Link>
                            <span className="text-muted-foreground">@{following.username}</span>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">{following.bio}</p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{following.followers} followers</span>
                            <div className="flex gap-1">
                              {following.badges.map((badge) => (
                                <Badge key={badge} variant="secondary" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <FollowButton
                        userId={following.id}
                        username={following.username}
                        initialFollowState={following.isFollowing}
                        size="sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
