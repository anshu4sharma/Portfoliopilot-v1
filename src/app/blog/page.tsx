import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { Badge } from "@/components/ui/badge"

 interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  readingTime: number
  excerpt: string
}

async function getPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts')
  const fileNames = fs.readdirSync(postsDirectory)
  
  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      slug: fileName.replace(/\.mdx$/, ''),
      title: data.title,
      date: data.date,
      category: data.category,
      readingTime: data.readingTime,
      excerpt: data.excerpt,
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function BlogIndex() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 ">Insights for Portfolio Creators</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="group border  rounded-lg p-6 transition-shadow hover:shadow-md">
            <Link href={`/blog/${post.slug}`}>
              <div className="mb-4">
                {/* <span className="text-sm font-medium text-blue-600  px-2 py-1 rounded-full">
                  {post.category}
                </span> */}
                <Badge variant="secondary">{post.category}</Badge>

                <h2 className="text-2xl font-semibold mt-2 text-blue-600 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <time>{format(new Date(post.date), "MMMM do, yyyy")}</time>
                <span className="mx-2">·</span>
                <span>{post.readingTime} min read</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

