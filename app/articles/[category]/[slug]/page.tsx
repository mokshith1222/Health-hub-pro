import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getArticleBySlug, getCategories, getArticlesByCategory } from '@/lib/mdx'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { Clock, User, Calendar, Share2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>
}

// Generate static params for articles
export async function generateStaticParams() {
  const categories = getCategories()
  const params = []

  for (const category of categories) {
    const articles = getArticlesByCategory(category)
    for (const article of articles) {
      params.push({
        category,
        slug: article.slug,
      })
    }
  }

  return params
}

// Generate metadata
export async function generateMetadata(props: ArticlePageProps): Promise<Metadata> {
  const params = await props.params
  const article = getArticleBySlug(params.category, params.slug)

  if (!article) {
    notFound()
  }

  const url = `https://healthhubpro.com/articles/${params.category}/${params.slug}`

  return {
    title: `${article.metadata.title} | HealthHub Pro`,
    description: article.metadata.description,
    keywords: article.metadata.keywords,
    authors: [{ name: article.metadata.author }],
    ...(article.metadata.reviewer && {
      robots: 'index, follow',
    }),
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.description,
      type: 'article',
      url: url,
      authors: [article.metadata.author],
      images: article.metadata.image ? [{ url: article.metadata.image }] : [],
      publishedTime: article.metadata.publishedDate,
      modifiedTime: article.metadata.lastUpdatedDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metadata.title,
      description: article.metadata.description,
      images: article.metadata.image ? [article.metadata.image] : [],
    },
  }
}

export default async function ArticlePage(props: ArticlePageProps) {
  const params = await props.params
  const article = getArticleBySlug(params.category, params.slug)

  if (!article) {
    notFound()
  }

  const categoryNames: Record<string, string> = {
    'beauty': 'Beauty',
    'health-food': 'Health Food',
    'bath-body': 'Bath & Body',
    'cosmetics': 'Cosmetics',
    'supplements': 'Supplements',
    'pharmaceuticals': 'Pharmaceuticals',
    'self-help': 'Self Help',
    'vision-care': 'Vision Care',
    'wellness': 'Wellness',
  }

  const categoryName = categoryNames[params.category] || params.category
  const publishDate = new Date(article.metadata.publishedDate)
  const lastUpdatedDate = new Date(article.metadata.lastUpdatedDate)
  const articleSchema = generateArticleSchema({ ...article, category: params.category })
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://healthhubpro.com' },
    { name: categoryName, url: `https://healthhubpro.com/categories/${params.category}` },
    { name: article.metadata.title, url: `https://healthhubpro.com/articles/${params.category}/${params.slug}` },
  ])

  const relatedArticles = getArticlesByCategory(params.category).slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <nav className="border-b border-border bg-muted/30 px-4 py-3 sm:px-6 lg:px-8 sticky top-16 z-40">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-2 text-sm">
              <a href="/" className="text-primary hover:underline">Home</a>
              <span className="text-muted-foreground">/</span>
              <a href={`/categories/${params.category}`} className="text-primary hover:underline">{categoryName}</a>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium line-clamp-1">{article.metadata.title}</span>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <article className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Back button */}
            <Button
              variant="ghost"
              asChild
              className="mb-6 gap-2"
            >
              <Link href={`/categories/${params.category}`}>
                <ArrowLeft className="w-4 h-4" />
                Back to {categoryName}
              </Link>
            </Button>

            {/* Title and Meta */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
                  {categoryName}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
                {article.metadata.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {article.metadata.description}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.metadata.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{publishDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.metadata.readingTime} min read</span>
                </div>
              </div>

              {/* Medical Reviewer */}
              {article.metadata.reviewer && (
                <div className="mt-6 flex items-center gap-3 bg-accent/5 rounded-lg p-4">
                  <div className="w-4 h-4 rounded-full bg-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-accent-foreground">Reviewed by</p>
                    <p className="text-sm text-muted-foreground">{article.metadata.reviewer}</p>
                  </div>
                </div>
              )}

              {/* Last Updated */}
              <div className="mt-4 text-xs text-muted-foreground">
                Last updated: {lastUpdatedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {/* Featured Image */}
            {article.metadata.image && (
              <div className="mb-8 rounded-lg overflow-hidden bg-muted h-96">
                <img
                  src={article.metadata.image}
                  alt={article.metadata.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-sm sm:prose max-w-none mb-12 text-foreground">
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(/<h2/g, '<h2 class="text-2xl font-bold mt-8 mb-4"')
                    .replace(/<h3/g, '<h3 class="text-xl font-bold mt-6 mb-3"')
                    .replace(/<p/g, '<p class="mb-4 leading-relaxed"')
                    .replace(/<ul/g, '<ul class="list-disc list-inside mb-4 space-y-2"')
                    .replace(/<ol/g, '<ol class="list-decimal list-inside mb-4 space-y-2"')
                    .replace(/<li/g, '<li class="text-muted-foreground"')
                    .replace(/<table/g, '<table class="w-full border-collapse mb-4"')
                    .replace(/<th/g, '<th class="border border-border bg-muted/50 px-4 py-2 text-left"')
                    .replace(/<td/g, '<td class="border border-border px-4 py-2"')
                    .replace(/<blockquote/g, '<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4"')
                }}
              />
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/50 rounded-lg p-6 mb-12">
              <p className="text-sm text-orange-900 dark:text-orange-200">
                <strong>Medical Disclaimer:</strong> This article is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with your healthcare provider before making any health decisions.
              </p>
            </div>

            {/* Sources */}
            {article.metadata.sources && article.metadata.sources.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4">Sources</h3>
                <ul className="space-y-2">
                  {article.metadata.sources.map((source, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary flex-shrink-0">•</span>
                      <span>{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Share */}
            <div className="py-6 border-t border-b border-border mb-12">
              <p className="text-sm font-semibold mb-4">Share this article</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.slug}
                      href={`/articles/${params.category}/${relatedArticle.slug}`}
                      className="group p-4 rounded-lg border border-border hover:shadow-md transition-all"
                    >
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {relatedArticle.metadata.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedArticle.metadata.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
