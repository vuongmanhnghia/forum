"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ForumHeader } from "@/components/forum-header"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Eye, FileText, X, HelpCircle, BookOpen, AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

const categories = [
  "Frontend Development",
  "Backend & APIs",
  "DevOps & Cloud",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "General Discussion",
]

const postTypes = {
  blog: {
    title: "Blog Post",
    icon: BookOpen,
    description: "Share tutorials, insights, and long-form content",
    template: `# Your Blog Post Title

Write your blog post content here using **Markdown** formatting.

## Introduction

Start with an engaging introduction that hooks your readers.

## Main Content

### Section 1
Your main content goes here. Use headings to organize your thoughts.

### Code Examples

\`\`\`javascript
function example() {
  console.log("Include relevant code examples");
}
\`\`\`

## Conclusion

Wrap up with key takeaways and next steps.

---

*Happy coding! 🚀*`,
  },
  question: {
    title: "Question",
    icon: HelpCircle,
    description: "Ask for help with specific technical problems",
    template: `# What I'm trying to achieve

Clearly describe what you want to accomplish.

## The Problem

Describe the specific issue you're facing.

## What I've tried

\`\`\`javascript
// Include the code you've tried
function myAttempt() {
  // Your code here
}
\`\`\`

## Expected vs Actual Results

**Expected:** What should happen
**Actual:** What actually happens

## Environment

- Language/Framework: 
- Version: 
- OS: 

## Additional Context

Any other relevant information that might help solve the problem.`,
  },
}

export default function CreatePostPage() {
  const router = useRouter()
  const [postType, setPostType] = useState<"blog" | "question">("blog")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState(postTypes.blog.template)
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [bounty, setBounty] = useState("")
  const [urgency, setUrgency] = useState("")

  const [isPublishing, setIsPublishing] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePostTypeChange = (type: "blog" | "question") => {
    setPostType(type)
    setContent(postTypes[type].template)
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!content.trim() || content === postTypes[postType].template) {
      newErrors.content = "Content is required"
    }

    if (!category) {
      newErrors.category = "Category is required"
    }

    if (tags.length === 0) {
      newErrors.tags = "At least one tag is required"
    }

    if (postType === "question" && !urgency) {
      newErrors.urgency = "Urgency level is required for questions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePublishPost = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsPublishing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const postData = {
        id: Date.now().toString(),
        title,
        content,
        category,
        tags,
        postType,
        ...(postType === "question" && { bounty, urgency }),
        status: "published",
        createdAt: new Date().toISOString(),
        author: "current-user",
      }

      const existingPosts = JSON.parse(localStorage.getItem("forum-posts") || "[]")
      localStorage.setItem("forum-posts", JSON.stringify([postData, ...existingPosts]))

      toast({
        title: "Success!",
        description: `${postType === "question" ? "Question" : "Blog post"} published successfully`,
      })

      router.push(`/post/${postData.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      toast({
        title: "Draft Error",
        description: "Title is required to save draft",
        variant: "destructive",
      })
      return
    }

    setIsSavingDraft(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const draftData = {
        id: Date.now().toString(),
        title,
        content,
        category,
        tags,
        postType,
        ...(postType === "question" && { bounty, urgency }),
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: "current-user",
      }

      const existingDrafts = JSON.parse(localStorage.getItem("forum-drafts") || "[]")
      localStorage.setItem("forum-drafts", JSON.stringify([draftData, ...existingDrafts]))

      toast({
        title: "Draft Saved",
        description: "Your draft has been saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSavingDraft(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create New Post</h1>
            <p className="text-muted-foreground">Share your knowledge or ask for help from the community</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Post Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Post Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(postTypes).map(([key, type]) => {
                        const Icon = type.icon
                        return (
                          <button
                            key={key}
                            onClick={() => handlePostTypeChange(key as "blog" | "question")}
                            className={`p-4 border rounded-lg text-left transition-colors ${
                              postType === key ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="h-5 w-5" />
                              <span className="font-medium">{type.title}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">{postType === "question" ? "Question Title" : "Blog Post Title"}</Label>
                    <Input
                      id="title"
                      placeholder={
                        postType === "question"
                          ? "What specific problem are you trying to solve?"
                          : "Enter a descriptive title for your blog post..."
                      }
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`text-lg ${errors.title ? "border-destructive" : ""}`}
                    />
                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                  </div>

                  {postType === "question" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="urgency">Urgency</Label>
                        <Select value={urgency} onValueChange={setUrgency}>
                          <SelectTrigger className={errors.urgency ? "border-destructive" : ""}>
                            <SelectValue placeholder="How urgent?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - Can wait</SelectItem>
                            <SelectItem value="medium">Medium - This week</SelectItem>
                            <SelectItem value="high">High - Need help today</SelectItem>
                            <SelectItem value="critical">Critical - Blocking work</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.urgency && <p className="text-sm text-destructive">{errors.urgency}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bounty">Bounty (optional)</Label>
                        <Input
                          id="bounty"
                          placeholder="e.g., 50 points"
                          value={bounty}
                          onChange={(e) => setBounty(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (max 5)</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          #{tag}
                          <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={tags.length >= 5}
                        className={errors.tags ? "border-destructive" : ""}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTag}
                        disabled={!tagInput.trim() || tags.length >= 5}
                      >
                        Add
                      </Button>
                    </div>
                    {errors.tags && <p className="text-sm text-destructive">{errors.tags}</p>}
                  </div>

                  {/* Content Editor */}
                  <div className="space-y-2">
                    <Label htmlFor="content">{postType === "question" ? "Question Details" : "Blog Content"}</Label>
                    <Tabs defaultValue="write" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="write" className="gap-2">
                          <FileText className="h-4 w-4" />
                          Write
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="gap-2">
                          <Eye className="h-4 w-4" />
                          Preview
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="write" className="mt-4">
                        <Textarea
                          id="content"
                          placeholder={
                            postType === "question"
                              ? "Describe your problem in detail. Include code examples, error messages, and what you've tried..."
                              : "Write your blog post content using Markdown..."
                          }
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className={`min-h-[400px] font-mono text-sm ${errors.content ? "border-destructive" : ""}`}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Supports Markdown formatting: **bold**, *italic*, `code`, \`\`\`code blocks\`\`\`, &gt;
                          quotes, and more
                        </p>
                        {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                      </TabsContent>

                      <TabsContent value="preview" className="mt-4">
                        <div className="min-h-[400px] border rounded-md p-4 bg-card">
                          {content ? (
                            <MarkdownRenderer content={content} />
                          ) : (
                            <p className="text-muted-foreground italic">Nothing to preview yet...</p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={handlePublishPost}
                      disabled={isPublishing || isSavingDraft}
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {postType === "question" ? "Ask Question" : "Publish Post"}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleSaveDraft}
                      disabled={isPublishing || isSavingDraft}
                    >
                      {isSavingDraft ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Draft"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {postType === "question" ? (
                      <>
                        <AlertCircle className="h-5 w-5" />
                        Question Guidelines
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-5 w-5" />
                        Blog Guidelines
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {postType === "question" ? (
                    <>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p>Be specific about your problem</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p>Include relevant code and error messages</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p>Explain what you've already tried</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p>Provide your environment details</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p>Use clear, searchable tags</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p>Choose a clear, descriptive title</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p>Structure content with headings</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p>Include practical examples</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p>Add relevant tags for discoverability</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p>End with key takeaways</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Markdown Help */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Markdown Quick Reference</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm font-mono">
                  <div>
                    <code># Heading 1</code>
                  </div>
                  <div>
                    <code>## Heading 2</code>
                  </div>
                  <div>
                    <code>**bold text**</code>
                  </div>
                  <div>
                    <code>*italic text*</code>
                  </div>
                  <div>
                    <code>`inline code`</code>
                  </div>
                  <div>
                    <code>\`\`\`language</code>
                  </div>
                  <div>
                    <code>code block</code>
                  </div>
                  <div>
                    <code>\`\`\`</code>
                  </div>
                  <div>
                    <code>&gt; blockquote</code>
                  </div>
                  <div>
                    <code>- list item</code>
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
