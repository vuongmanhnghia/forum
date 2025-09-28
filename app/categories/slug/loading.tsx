import { ForumHeader } from "@/components/forum-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Category Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="w-16 h-16 rounded-lg" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
          </div>

          <div className="flex gap-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-3">
            {/* Search and Filters Skeleton */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-64" />
              </div>
            </div>

            {/* Posts List Skeleton */}
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg border p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <Skeleton className="h-6 w-8" />
                      <Skeleton className="h-6 w-8" />
                      <Skeleton className="h-6 w-8" />
                    </div>
                    <div className="flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <div className="flex gap-2 mb-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-14" />
                      </div>
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <Skeleton className="h-5 w-32 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <Skeleton className="h-5 w-36 mb-4" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2">
                    <Skeleton className="w-8 h-8 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
