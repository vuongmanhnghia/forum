import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ForumHeader } from "@/components/forum-header"
import { PostCard } from "@/components/post-card"
import { MessageSquare, Heart, Eye, Calendar, MapPin, LinkIcon } from "lucide-react"
import { FollowButton } from "@/components/follow-button"
import Link from "next/link"

// Mock user profile data
const profileData = {
  name: "Sarah Chen",
  username: "sarah_dev",
  avatar: "/developer-avatar-2.png",
  bio: "Frontend architect passionate about React, TypeScript, and building accessible web experiences. Open source contributor and tech speaker.",
  joinDate: "January 2023",
  location: "Seattle, WA",
  website: "https://sarahchen.dev",
  stats: {
    posts: 28,
    replies: 89,
    likes: 567,
    views: 4521,
    followers: 156,
    following: 43,
  },
  badges: [
    { name: "Top Contributor", color: "bg-yellow-500" },
    { name: "React Expert", color: "bg-blue-500" },
    { name: "Helpful", color: "bg-green-500" },
  ],
  isFollowing: false,
}

const userPosts = [
  {
    id: 3,
    title: "Mastering React Server Components: A Complete Guide",
    excerpt:
      "Deep dive into React Server Components, their benefits, and how to implement them effectively in your Next.js applications...",
    author: "sarah_dev",
    avatar: "/developer-avatar-2.png",
    category: "Frontend Development",
    replies: 34,
    likes: 128,
    views: 892,
    time: "1 day ago",
    tags: ["react", "server-components", "nextjs"],
    isBookmarked: false,
    isLiked: false,
    score: 128,
    type: "blog" as const,
  },
  {
    id: 4,
    title: "Building Accessible Forms with React Hook Form",
    excerpt:
      "Learn how to create forms that work for everyone using React Hook Form and proper accessibility patterns...",
    author: "sarah_dev",
    avatar: "/developer-avatar-2.png",
    category: "Frontend Development",
    replies: 19,
    likes: 76,
    views: 445,
    time: "3 days ago",
    tags: ["react", "accessibility", "forms"],
    isBookmarked: true,
    isLiked: true,
    score: 76,
    type: "blog" as const,
  },
]

export default function ProfilePage({ params }: { params: { username: string } }) {
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
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xl">{profileData.name[0]}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold text-foreground">{profileData.name}</h1>
                    <p className="text-muted-foreground">@{profileData.username}</p>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{profileData.bio}</p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {profileData.joinDate}</span>
                    </div>
                    {profileData.location && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{profileData.location}</span>
                      </div>
                    )}
                    {profileData.website && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <LinkIcon className="h-4 w-4" />
                        <a
                          href={profileData.website}
                          className="hover:text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {profileData.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mb-4">
                    <FollowButton
                      userId="profile-user-id"
                      username={profileData.username}
                      initialFollowState={profileData.isFollowing}
                      variant="default"
                      size="default"
                    />
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Message
                    </Button>
                  </div>

                  <div className="flex justify-center gap-6 text-sm">
                    <Link href={`/followers/${profileData.username}`} className="text-center hover:text-primary">
                      <p className="font-bold text-foreground">{profileData.stats.followers}</p>
                      <p className="text-muted-foreground">Followers</p>
                    </Link>
                    <Link href={`/following/${profileData.username}`} className="text-center hover:text-primary">
                      <p className="font-bold text-foreground">{profileData.stats.following}</p>
                      <p className="text-muted-foreground">Following</p>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{profileData.stats.posts}</p>
                      <p className="text-xs text-muted-foreground">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{profileData.stats.replies}</p>
                      <p className="text-xs text-muted-foreground">Replies</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{profileData.stats.likes}</p>
                      <p className="text-xs text-muted-foreground">Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{profileData.stats.views}</p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
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
                    {profileData.badges.map((badge) => (
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
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="posts" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Posts ({profileData.stats.posts})
                </TabsTrigger>
                <TabsTrigger value="replies" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Replies ({profileData.stats.replies})
                </TabsTrigger>
                <TabsTrigger value="likes" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Liked Posts
                </TabsTrigger>
              </TabsList>

              {/* Posts Tab */}
              <TabsContent value="posts" className="mt-6">
                <div className="space-y-4">
                  {userPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>

              {/* Replies Tab */}
              <TabsContent value="replies" className="mt-6">
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No replies yet</h3>
                  <p className="text-muted-foreground">
                    {profileData.name.split(" ")[0]} hasn't replied to any posts yet.
                  </p>
                </div>
              </TabsContent>

              {/* Likes Tab */}
              <TabsContent value="likes" className="mt-6">
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No liked posts</h3>
                  <p className="text-muted-foreground">
                    Posts that {profileData.name.split(" ")[0]} likes will appear here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
