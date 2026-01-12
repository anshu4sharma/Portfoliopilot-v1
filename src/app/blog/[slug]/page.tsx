import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import { Metadata } from 'next'


interface BlogPost {
  slug: string
  content: string
  title: string
  date: string
  category: string
  readingTime: number
  excerpt: string
}


export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  try {
    const post = await getPost(params.slug)



    if (!post) {
      console.log(`No post found for slug: ${params.slug}`);
      return {
        title: "Post Not Found",
        description: "The requested post could not be found.",
        icons: [
          {
            rel: "icon",
            type: "image/png",
            sizes: "48x48",
            url: "/favicon.ico",
          },
        ],
      };
    }


    const metadata = {
      title: `${post.title}`,
      description: post.excerpt
    };

    // console.log("Generated metadata:", metadata);

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return {
      title: "Error",
      description: "An error occurred while generating metadata.",
    };
  }
}

const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts')
export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx$/, ''),
  }))
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      excerpt: data.excerpt,
      slug,
      content,
      title: data.title,
      date: data.date,
      category: data.category,
      readingTime: data.readingTime,
    }
  } catch (error) {
    return null
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to all posts
      </Link>
      <header className="mb-8">
        <span className="text-sm text-primary">{post.category}</span>
        <h1 className="text-4xl font-bold mt-2 mb-4 text-foreground">{post.title}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <time>{post.date}</time>
          <span className="mx-2">·</span>
          <span>{post.readingTime} min read</span>
        </div>
      </header>
      <Separator className='mb-8' />
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}

