import { ForumHeader } from "@/components/forum-header"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FollowButton } from "@/components/follow-button"
import { Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock followers data
const mockFollowers = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarah_dev",
    avatar: "/developer-avatar-2.png",
    bio: "Frontend architect passionate about React and TypeScript",
    followers: 156,
    isFollowing: false,
    badges: ["React Expert", "Top Contributor"],
  },
  {
    id: "2",
    name: "Mike Johnson",
    username: "mikej",
    avatar: "/developer-avatar-3.png",
    bio: "Full-stack developer and open source contributor",
    followers: 89,
    isFollowing: true,
    badges: ["Open Source", "Helpful"],
  },
  {
    id: "3",
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "/developer-avatar.png",
    bio: "Backend engineer specializing in Node.js and databases",
    followers: 234,
    isFollowing: false,
    badges: ["Backend Expert"],
  },
]

export default function FollowersPage({ params }: { params: { username: string } }) {
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
              <h1 className="text-3xl font-bold">@{username}'s Followers</h1>
              <p className="text-muted-foreground">{mockFollowers.length} followers</p>
            </div>
          </div>

          {mockFollowers.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No followers yet</h3>
                <p className="text-muted-foreground">This user doesn't have any followers yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {mockFollowers.map((follower) => (
                <Card key={follower.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Link href={`/profile/${follower.username}`}>
                          <Avatar className="h-12 w-12 cursor-pointer">
                            <AvatarImage src={follower.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{follower.name[0]}</AvatarFallback>
                          </Avatar>
                        </Link>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Link href={`/profile/${follower.username}`}>
                              <h3 className="font-semibold hover:text-primary cursor-pointer">{follower.name}</h3>
                            </Link>
                            <span className="text-muted-foreground">@{follower.username}</span>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">{follower.bio}</p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{follower.followers} followers</span>
                            <div className="flex gap-1">
                              {follower.badges.map((badge) => (
                                <Badge key={badge} variant="secondary" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <FollowButton
                        userId={follower.id}
                        username={follower.username}
                        initialFollowState={follower.isFollowing}
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
