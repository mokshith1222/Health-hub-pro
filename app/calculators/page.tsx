import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calculator, Heart, Zap, Pill, Eye } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Health Calculators | HealthHub Pro',
  description: 'Use our collection of interactive health calculators to get personalized health insights. BMI calculator, calorie counter, and 18+ more medical tools.',
  openGraph: {
    title: 'Health Calculators',
    description: 'Interactive health calculators from HealthHub Pro',
    url: 'https://healthhubpro.com/calculators',
  },
}

const calculatorCategories = [
  {
    name: 'Health & Fitness',
    icon: Heart,
    calculators: [
      {
        name: 'BMI Calculator',
        description: 'Calculate your Body Mass Index and get health recommendations',
        slug: 'bmi',
        tags: ['Health', 'Fitness'],
      },
      {
        name: 'TDEE Calculator',
        description: 'Calculate your daily energy expenditure for fitness planning',
        slug: 'tdee',
        tags: ['Fitness', 'Nutrition'],
      },
      {
        name: 'Calorie Burn Calculator',
        description: 'Estimate calories burned during different activities',
        slug: 'calorie-burn',
        tags: ['Fitness', 'Exercise'],
      },
      {
        name: 'Body Fat Percentage',
        description: 'Estimate your body fat percentage based on measurements',
        slug: 'body-fat',
        tags: ['Health', 'Fitness'],
      },
    ],
  },
  {
    name: 'Medical & Wellness',
    icon: Pill,
    calculators: [
      {
        name: 'Blood Pressure Category',
        description: 'Check your blood pressure classification',
        slug: 'blood-pressure',
        tags: ['Medical', 'Health'],
      },
      {
        name: 'Blood Glucose',
        description: 'Monitor blood sugar levels and get health insights',
        slug: 'blood-glucose',
        tags: ['Medical', 'Diabetes'],
      },
      {
        name: 'Dosage Calculator',
        description: 'Calculate medication dosages safely',
        slug: 'dosage',
        tags: ['Medical', 'Pharmaceutical'],
      },
      {
        name: 'Water Intake',
        description: 'Calculate your daily water intake needs',
        slug: 'water-intake',
        tags: ['Wellness', 'Hydration'],
      },
    ],
  },
  {
    name: 'Beauty & Cosmetics',
    icon: Zap,
    calculators: [
      {
        name: 'Skin Type Quiz',
        description: 'Determine your skin type for personalized care',
        slug: 'skin-type',
        tags: ['Beauty', 'Skincare'],
      },
      {
        name: 'Makeup Shade Matcher',
        description: 'Find your perfect makeup shade',
        slug: 'makeup-shade',
        tags: ['Cosmetics', 'Beauty'],
      },
      {
        name: 'Hair Care Assessment',
        description: 'Get personalized hair care recommendations',
        slug: 'hair-care',
        tags: ['Beauty', 'Hair'],
      },
    ],
  },
  {
    name: 'Supplements & Nutrition',
    icon: Pill,
    calculators: [
      {
        name: 'Vitamin D Dosage',
        description: 'Calculate recommended vitamin D supplementation',
        slug: 'vitamin-d',
        tags: ['Supplements', 'Nutrition'],
      },
      {
        name: 'Macro Calculator',
        description: 'Calculate your macronutrient needs',
        slug: 'macro',
        tags: ['Nutrition', 'Fitness'],
      },
      {
        name: 'Supplement Interaction',
        description: 'Check for potential supplement interactions',
        slug: 'supplement-interaction',
        tags: ['Supplements', 'Medical'],
      },
    ],
  },
  {
    name: 'Vision & Eyes',
    icon: Eye,
    calculators: [
      {
        name: 'Eye Health Assessment',
        description: 'Quick assessment of your eye health',
        slug: 'eye-health',
        tags: ['Vision', 'Eye Care'],
      },
      {
        name: 'Prescription Strength',
        description: 'Understand your vision prescription',
        slug: 'prescription',
        tags: ['Vision', 'Glasses'],
      },
    ],
  },
]

export default function CalculatorsPage() {
  const totalCalculators = calculatorCategories.reduce((sum, cat) => sum + cat.calculators.length, 0)

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 via-background to-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Health Calculators
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Access {totalCalculators}+ interactive calculators designed by health professionals to help you get personalized health insights and track your wellness journey.
            </p>
            <div className="inline-block p-4 rounded-lg bg-muted border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> These calculators are for informational purposes only and should not replace professional medical advice.
              </p>
            </div>
          </div>
        </section>

        {/* Calculators */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">
            {calculatorCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.name}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {category.name}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.calculators.map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/calculators/${calc.slug}`}
                        className="group p-6 rounded-lg border border-border bg-card hover:shadow-md transition-all hover:border-primary/50"
                      >
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                          {calc.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {calc.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {calc.tags.map((tag) => (
                            <span key={tag} className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                          Use Calculator <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Use Our Calculators?
              </h2>
              <p className="text-lg text-muted-foreground">
                Get personalized health insights with our expert-designed tools
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-2">Accurate</h3>
                <p className="text-sm text-muted-foreground">
                  Designed by medical professionals using evidence-based formulas
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get immediate calculations with personalized interpretations
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-2">Personalized</h3>
                <p className="text-sm text-muted-foreground">
                  Get tailored recommendations based on your individual results
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Learn More About Health Topics
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Combine calculator insights with our expert-reviewed articles
            </p>
            <Button size="lg" asChild className="gap-2">
              <Link href="/">
                Browse Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
