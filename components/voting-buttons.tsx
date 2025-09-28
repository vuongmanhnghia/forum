"use client"

import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"

interface VotingButtonsProps {
  initialScore: number
  initialVote?: "up" | "down" | null
  onVote?: (vote: "up" | "down" | null) => void
  size?: "sm" | "md" | "lg"
}

export function VotingButtons({ initialScore, initialVote = null, onVote, size = "md" }: VotingButtonsProps) {
  const [vote, setVote] = useState<"up" | "down" | null>(initialVote)
  const [score, setScore] = useState(initialScore)

  const handleVote = (newVote: "up" | "down") => {
    let newScore = score

    // Remove previous vote effect
    if (vote === "up") newScore -= 1
    if (vote === "down") newScore += 1

    // Apply new vote or toggle off
    if (vote === newVote) {
      setVote(null)
    } else {
      setVote(newVote)
      if (newVote === "up") newScore += 1
      if (newVote === "down") newScore -= 1
    }

    setScore(newScore)
    onVote?.(vote === newVote ? null : newVote)
  }

  const buttonSize = size === "sm" ? "h-6 w-6" : size === "lg" ? "h-10 w-10" : "h-8 w-8"
  const iconSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
  const textSize = size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"

  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className={`${buttonSize} p-0 ${vote === "up" ? "text-orange-500 bg-orange-50 hover:bg-orange-100" : "hover:bg-muted"}`}
        onClick={() => handleVote("up")}
      >
        <ChevronUp className={iconSize} />
      </Button>

      <span
        className={`font-semibold ${textSize} ${score > 0 ? "text-green-600" : score < 0 ? "text-red-600" : "text-muted-foreground"}`}
      >
        {score}
      </span>

      <Button
        variant="ghost"
        size="sm"
        className={`${buttonSize} p-0 ${vote === "down" ? "text-orange-500 bg-orange-50 hover:bg-orange-100" : "hover:bg-muted"}`}
        onClick={() => handleVote("down")}
      >
        <ChevronDown className={iconSize} />
      </Button>
    </div>
  )
}
