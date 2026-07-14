import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { z } from 'zod'

// Content directory path
const CONTENT_DIR = join(process.cwd(), 'content')

// Zod schema for article metadata
export const ArticleMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['beauty', 'health-food', 'bath-body', 'cosmetics', 'supplements', 'pharmaceuticals', 'self-help', 'vision-care', 'wellness']),
  author: z.string(),
  reviewer: z.string().optional(),
  publishedDate: z.string(),
  lastUpdatedDate: z.string(),
  readingTime: z.number(),
  keywords: z.array(z.string()),
  sources: z.array(z.string()).optional(),
  featured: z.boolean().optional().default(false),
  image: z.string().optional(),
})

export type ArticleMetadata = z.infer<typeof ArticleMetadataSchema>

export interface Article {
  metadata: ArticleMetadata
  content: string
  slug: string
}

// Get all articles from a directory
export function getArticles(category?: string): Article[] {
  const articlesDir = category ? join(CONTENT_DIR, 'articles', category) : join(CONTENT_DIR, 'articles')
  
  try {
    const files = readFileSync(articlesDir, { recursive: false }) as string[]
    
    return files
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map((file) => {
        const filePath = join(articlesDir, file)
        const fileContent = readFileSync(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        
        const metadata = ArticleMetadataSchema.parse(data)
        const slug = file.replace(/\.(mdx|md)$/, '')
        
        return { metadata, content, slug }
      })
  } catch {
    return []
  }
}

// Get single article by slug
export function getArticleBySlug(category: string, slug: string): Article | null {
  try {
    const filePath = join(CONTENT_DIR, 'articles', category, `${slug}.mdx`)
    const fileContent = readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    const metadata = ArticleMetadataSchema.parse(data)
    
    return { metadata, content, slug }
  } catch {
    return null
  }
}

// Get all categories
export function getCategories(): string[] {
  return ['beauty', 'health-food', 'bath-body', 'cosmetics', 'supplements', 'pharmaceuticals', 'self-help', 'vision-care', 'wellness']
}

// Get featured articles
export function getFeaturedArticles(limit = 6): Article[] {
  const categories = getCategories()
  const allArticles: Article[] = []
  
  categories.forEach((category) => {
    const articles = getArticles(category)
    allArticles.push(...articles)
  })
  
  return allArticles
    .filter((article) => article.metadata.featured)
    .sort((a, b) => new Date(b.metadata.publishedDate).getTime() - new Date(a.metadata.publishedDate).getTime())
    .slice(0, limit)
}

// Get articles by category with sorting
export function getArticlesByCategory(category: string, limit?: number, sort: 'date' | 'title' = 'date'): Article[] {
  let articles = getArticles(category)
  
  if (sort === 'date') {
    articles.sort((a, b) => new Date(b.metadata.publishedDate).getTime() - new Date(a.metadata.publishedDate).getTime())
  } else if (sort === 'title') {
    articles.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title))
  }
  
  return limit ? articles.slice(0, limit) : articles
}

// Get all articles (across all categories)
export function getAllArticles(): Article[] {
  const categories = getCategories()
  const allArticles: Article[] = []
  
  categories.forEach((category) => {
    const articles = getArticles(category)
    allArticles.push(...articles)
  })
  
  return allArticles.sort((a, b) => new Date(b.metadata.publishedDate).getTime() - new Date(a.metadata.publishedDate).getTime())
}
