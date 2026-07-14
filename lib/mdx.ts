import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { z } from 'zod'

// Content directory path
const CONTENT_DIR = join(process.cwd(), 'content')

// Zod schema for article metadata - relaxed validation
export const ArticleMetadataSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  category: z.enum(['beauty', 'health-food', 'bath-body', 'cosmetics', 'supplements', 'pharmaceuticals', 'self-help', 'vision-care', 'wellness']).optional(),
  author: z.string().optional(),
  reviewer: z.string().optional(),
  date: z.string().optional(),
  updated: z.string().optional(),
  readTime: z.string().optional(),
  keywords: z.union([z.string(), z.array(z.string())]).optional(),
  sources: z.array(z.string()).optional(),
  featured: z.boolean().optional().default(false),
  image: z.string().optional(),
}).passthrough().default({})

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
    const categories = readdirSync(articlesDir)
    const articles: Article[] = []
    
    if (category) {
      // If specific category, read files from that directory
      const files = readdirSync(articlesDir)
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
    } else {
      // If no category, read from all category subdirectories
      categories.forEach((cat) => {
        const catDir = join(articlesDir, cat)
        try {
          const files = readdirSync(catDir)
          files
            .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
            .forEach((file) => {
              const filePath = join(catDir, file)
              const fileContent = readFileSync(filePath, 'utf-8')
              const { data, content } = matter(fileContent)
              
              const metadata = ArticleMetadataSchema.parse(data)
              const slug = file.replace(/\.(mdx|md)$/, '')
              
              articles.push({ metadata, content, slug })
            })
        } catch (e) {
          // Directory doesn't exist or not readable
        }
      })
      return articles
    }
  } catch (e) {
    console.error('[MDX] Error loading articles:', e)
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
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
    .slice(0, limit)
}

// Get articles by category with sorting
export function getArticlesByCategory(category: string, limit?: number, sort: 'date' | 'title' = 'date'): Article[] {
  let articles = getArticles(category)
  
  if (sort === 'date') {
    articles.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
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
  
  return allArticles.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
}
