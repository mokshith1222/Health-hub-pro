import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArticleCard } from '@/components/article-card'
import { getArticlesByCategory, getCategories } from '@/lib/mdx'
import { generateBreadcrumbSchema } from '@/lib/schema'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((category) => ({
    category,
  }))
}

// Generate metadata for each category
export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await props.params
  const category = params.category
  const categories = getCategories()

  if (!categories.includes(category)) {
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

  const categoryDescriptions: Record<string, string> = {
    'beauty': 'Expert skincare, haircare, and beauty tips for radiant skin and healthy hair.',
    'health-food': 'Nutritious food guides and dietary information for optimal health.',
    'bath-body': 'Personal care and wellness products and practices.',
    'cosmetics': 'Information on cosmetic products, ingredients, and makeup application.',
    'supplements': 'Evidence-based guide to vitamins, minerals, and dietary supplements.',
    'pharmaceuticals': 'Information about medications, treatments, and pharmaceutical guidance.',
    'self-help': 'Mental health, personal growth, and wellness resources.',
    'vision-care': 'Eye health, vision correction, and ocular care information.',
    'wellness': 'General wellness, fitness, and holistic health information.',
  }

  const categoryName = categoryNames[category] || category
  const description = categoryDescriptions[category] || `Articles about ${categoryName}`

  return {
    title: `${categoryName} | HealthHub Pro - Medical Information`,
    description: description,
    openGraph: {
      title: `${categoryName} Articles`,
      description: description,
      type: 'website',
      url: `https://healthhubpro.com/categories/${category}`,
    },
  }
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params
  const category = params.category
  const categories = getCategories()

  if (!categories.includes(category)) {
    notFound()
  }

  const articles = getArticlesByCategory(category)
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

  const categoryName = categoryNames[category] || category
  const categoryDescriptions: Record<string, string> = {
    'beauty': 'Discover expert skincare routines, haircare tips, and beauty advice from dermatologists and beauty professionals. Learn about ingredients, products, and practices for healthy, radiant skin.',
    'health-food': 'Explore nutritious foods, dietary patterns, and eating guidelines for optimal health. Get evidence-based nutrition information from registered dietitians.',
    'bath-body': 'Learn about personal care products, bath routines, and body wellness practices. Find tips for skincare, body care, and relaxation.',
    'cosmetics': 'Understand cosmetic ingredients, makeup application techniques, and product selection. Expert reviews and ingredient breakdowns for informed choices.',
    'supplements': 'Evidence-based information about vitamins, minerals, and supplements. Learn about dosage, benefits, and potential interactions with medications.',
    'pharmaceuticals': 'Information about common medications, treatments, and pharmaceutical guidance. Always consult your healthcare provider.',
    'self-help': 'Resources for mental health, stress management, personal growth, and emotional wellness. Evidence-based strategies for better mental health.',
    'vision-care': 'Comprehensive eye health information, vision correction options, and ocular care tips. Learn about common eye conditions and prevention strategies.',
    'wellness': 'General health information, fitness guidance, lifestyle tips, and holistic wellness practices for overall wellbeing.',
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://healthhubpro.com' },
    { name: categoryName, url: `https://healthhubpro.com/categories/${category}` },
  ])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <nav className="border-b border-border bg-muted/30 px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 text-sm">
              <a href="/" className="text-primary hover:underline">Home</a>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{categoryName}</span>
            </div>
          </div>
        </nav>

        {/* Category Header */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
              {categoryName}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {categoryDescriptions[category]}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{articles.length} Articles</span>
              <span>•</span>
              <span>Expert Reviewed</span>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    category={category}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No articles found in this category yet.
                </p>
                <p className="text-sm text-muted-foreground">
                  Check back soon for expert-reviewed content about {categoryName.toLowerCase()}.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-gradient-to-r from-primary/5 to-accent/5 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Explore Related Categories
            </h2>
            <p className="text-muted-foreground mb-8">
              Discover more health and wellness information
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories
                .filter(c => c !== category)
                .slice(0, 4)
                .map(cat => {
                  const catName = categoryNames[cat] || cat
                  return (
                    <a
                      key={cat}
                      href={`/categories/${cat}`}
                      className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                    >
                      {catName}
                    </a>
                  )
                })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
