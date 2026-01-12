import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PricingContentSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-6 w-32" />
        </nav>
      </header>

      <main className="container mx-auto px-4 py-4">
        <div className="mb-16 text-center">
          <Skeleton className="mx-auto mb-4 h-12 w-64" />
          <Skeleton className="mx-auto h-6 w-96" />
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {[0, 1].map((index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <Skeleton className="mb-2 h-8 w-24" />
                <Skeleton className="h-12 w-32" />
                <Skeleton className="mt-2 h-4 w-48" />
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="mb-8 space-y-4">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}