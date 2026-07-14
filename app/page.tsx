import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArticleCard } from '@/components/article-card'
import { getCategories } from '@/lib/mdx'
import { ArrowRight, Calculator, Award, BookOpen, Zap } from 'lucide-react'

export default function Home() {
  const categories = getCategories()
  const categoryList = [
    { name: 'Beauty', slug: 'beauty', description: 'Skincare, haircare, and beauty tips' },
    { name: 'Health Food', slug: 'health-food', description: 'Nutrition and dietary guidance' },
    { name: 'Bath & Body', slug: 'bath-body', description: 'Personal care and wellness' },
    { name: 'Cosmetics', slug: 'cosmetics', description: 'Makeup and cosmetic products' },
    { name: 'Supplements', slug: 'supplements', description: 'Vitamins and dietary supplements' },
    { name: 'Pharmaceuticals', slug: 'pharmaceuticals', description: 'Medications and treatments' },
    { name: 'Self Help', slug: 'self-help', description: 'Mental health and personal growth' },
    { name: 'Vision Care', slug: 'vision-care', description: 'Eye health and vision' },
    { name: 'Wellness', slug: 'wellness', description: 'Overall health and fitness' },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Evidence-Based Health & <span className="text-primary">Wellness</span> Information
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-balance">
                Trusted health guides, interactive calculators, and expert-reviewed content from medical professionals. Your go-to resource for accurate health information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/categories/wellness">
                    Explore Articles <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/calculators">Health Calculators</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-2">Expert Reviewed</h3>
                <p className="text-sm text-muted-foreground">
                  All content reviewed by qualified medical professionals
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-2">Evidence-Based</h3>
                <p className="text-sm text-muted-foreground">
                  Every article backed by peer-reviewed research
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-2">Interactive Tools</h3>
                <p className="text-sm text-muted-foreground">
                  20+ health calculators for personalized insights
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-2">Always Updated</h3>
                <p className="text-sm text-muted-foreground">
                  Latest health information and guidelines
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 sm:py-24 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore health information across our nine expertly-curated categories
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryList.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group p-6 rounded-lg border border-border bg-card hover:shadow-md transition-all hover:border-primary/50"
                >
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors text-lg">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Calculators CTA */}
        <section className="py-16 sm:py-24 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Try Our Health Calculators
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get personalized health insights with our collection of interactive calculators designed by health professionals.
              </p>
              <Button size="lg" asChild className="gap-2">
                <Link href="/calculators">
                  Explore All Calculators <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Your Health Matters to Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              HealthHub Pro is committed to providing accurate, trustworthy health information backed by science and reviewed by medical experts.
            </p>
            <div className="inline-block p-6 rounded-lg bg-muted border border-border">
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Medical Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice.
              </p>
              <Link href="/privacy" className="text-primary text-sm font-semibold hover:underline">
                Learn more about our guidelines →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
