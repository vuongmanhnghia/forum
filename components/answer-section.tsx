"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, Award } from "lucide-react"
import { VotingButtons } from "./voting-buttons"
import { MarkdownRenderer } from "./markdown-renderer"
import { useState } from "react"

interface Answer {
  id: number
  author: string
  avatar: string
  reputation: number
  content: string
  time: string
  score: number
  isAccepted: boolean
  userVote?: "up" | "down" | null
}

interface AnswerSectionProps {
  answers: Answer[]
  canAcceptAnswers?: boolean
  questionAuthor?: string
}

export function AnswerSection({ answers, canAcceptAnswers = false, questionAuthor }: AnswerSectionProps) {
  const [showAnswerForm, setShowAnswerForm] = useState(false)
  const [newAnswer, setNewAnswer] = useState("")

  const sortedAnswers = [...answers].sort((a, b) => {
    if (a.isAccepted && !b.isAccepted) return -1
    if (!a.isAccepted && b.isAccepted) return 1
    return b.score - a.score
  })

  const handleAcceptAnswer = (answerId: number) => {
    // In a real app, this would make an API call
    console.log("[v0] Accepting answer:", answerId)
  }

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim()) return

    // In a real app, this would make an API call
    console.log("[v0] Submitting answer:", newAnswer)
    setNewAnswer("")
    setShowAnswerForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {answers.length} Answer{answers.length !== 1 ? "s" : ""}
        </h2>
        <Button onClick={() => setShowAnswerForm(!showAnswerForm)}>{showAnswerForm ? "Cancel" : "Write Answer"}</Button>
      </div>

      {/* Answer Form */}
      {showAnswerForm && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Answer</h3>
              <Textarea
                placeholder="Write your answer here... Markdown is supported"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Please ensure your answer is helpful and follows community guidelines
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowAnswerForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitAnswer}>Post Answer</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Answers List */}
      <div className="space-y-6">
        {sortedAnswers.map((answer) => (
          <Card key={answer.id} className={answer.isAccepted ? "border-green-200 bg-green-50/30" : ""}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Voting Column */}
                <div className="flex flex-col items-center">
                  <VotingButtons initialScore={answer.score} initialVote={answer.userVote} size="md" />

                  {/* Accept Answer Button */}
                  {canAcceptAnswers && !answer.isAccepted && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-8 w-8 p-0 hover:bg-green-100"
                      onClick={() => handleAcceptAnswer(answer.id)}
                      title="Accept this answer"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                  )}

                  {/* Accepted Answer Indicator */}
                  {answer.isAccepted && (
                    <div className="mt-2 flex items-center justify-center h-8 w-8 bg-green-100 rounded-full">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                </div>

                {/* Answer Content */}
                <div className="flex-1">
                  {answer.isAccepted && (
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                        <Award className="h-3 w-3 mr-1" />
                        Accepted Answer
                      </Badge>
                    </div>
                  )}

                  <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                    <MarkdownRenderer content={answer.content} />
                  </div>

                  {/* Answer Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        Share
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        Follow
                      </Button>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>answered {answer.time}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={answer.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{answer.author[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <span className="font-medium text-foreground">{answer.author}</span>
                            <span className="text-muted-foreground ml-1">{answer.reputation.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
