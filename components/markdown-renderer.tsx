"use client"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown parser for demonstration
  const parseMarkdown = (text: string) => {
    let html = text

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>')

    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<div class="my-6">
        <div class="bg-muted rounded-t-lg px-4 py-2 text-sm text-muted-foreground border-b">
          ${lang || "code"}
        </div>
        <pre class="bg-muted/50 rounded-b-lg p-4 overflow-x-auto"><code class="text-sm">${code.trim()}</code></pre>
      </div>`
    })

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')

    // Lists
    html = html.replace(/^\d+\.\s+(.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
    html = html.replace(/^-\s+(.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside space-y-1 my-4">$1</ul>')

    // Blockquotes
    html = html.replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/30 italic">$1</blockquote>',
    )

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr class="my-8 border-border" />')

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4">')
    html = `<p class="mb-4">${html}</p>`

    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-4"><\/p>/g, "")

    return html
  }

  return (
    <div
      className="prose prose-gray dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  )
}
