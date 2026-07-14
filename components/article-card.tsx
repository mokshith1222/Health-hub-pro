import Link from 'next/link'
import { ArrowRight, Clock, User } from 'lucide-react'
import type { Article } from '@/lib/mdx'

interface ArticleCardProps {
  article: Article
  category: string
}

export function ArticleCard({ article, category }: ArticleCardProps) {
  const publishDate = new Date(article.metadata.date || new Date())
  const formattedDate = publishDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })

  return (
    <article className="group flex flex-col rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
      {/* Image placeholder */}
      {article.metadata.image && (
        <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-muted">
          <img
            src={article.metadata.image}
            alt={article.metadata.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category badge */}
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
            {category.replace('-', ' ')}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          <Link href={`/articles/${category}/${article.slug}`}>
            {article.metadata.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {article.metadata.description}
        </p>

        {/* Meta information */}
        <div className="mb-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{article.metadata.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{article.metadata.readTime || '5'} min read</span>
          </div>
          <time dateTime={article.metadata.date} className="ml-auto">
            {formattedDate}
          </time>
        </div>

        {/* Medical reviewer badge */}
        {article.metadata.reviewer && (
          <div className="mb-4 flex items-center gap-2 bg-accent/5 rounded-md px-3 py-2 text-xs text-accent-foreground">
            <div className="w-4 h-4 rounded-full bg-accent" />
            Reviewed by {article.metadata.reviewer}
          </div>
        )}

        {/* Keywords */}
        {article.metadata.keywords && (
          <div className="mb-4 flex flex-wrap gap-2">
            {(typeof article.metadata.keywords === 'string' 
              ? article.metadata.keywords.split(', ').slice(0, 3)
              : Array.isArray(article.metadata.keywords) 
              ? article.metadata.keywords.slice(0, 3)
              : []
            ).map((keyword) => (
              <span key={keyword} className="inline-block rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Read more link */}
        <Link
          href={`/articles/${category}/${article.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
        >
          Read Article
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}
