export interface Notification {
  id: string
  type: "answer" | "comment" | "vote" | "mention" | "follow" | "accepted_answer" | "bounty"
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
  actor?: {
    name: string
    avatar?: string
    username: string
  }
  metadata?: {
    postTitle?: string
    voteType?: "up" | "down"
    bountyAmount?: number
  }
}
