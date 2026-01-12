import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DarkModeToggle } from '@/components/dark-mode-toggle'
import clsx from 'clsx'
import { PoppinsFont } from '../(home)/_components/home-page-navbar'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4  flex items-center justify-between">
        <Link
          href="/"
          className={clsx("text-2xl font-semibold", PoppinsFont.className)}
        >
          Portfolio<span className=" bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            pilot
          </span>
        </Link>
          <nav className="flex items-center gap-8">

            <DarkModeToggle />
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Button variant="default" asChild>
              <Link href="/create-portfolio">Create Your Portfolio</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

