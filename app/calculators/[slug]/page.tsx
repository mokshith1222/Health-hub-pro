import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BMICalculator } from '@/components/calculators/bmi-calculator'
import { TDEECalculator } from '@/components/calculators/tdee-calculator'
import { CalorieBurnCalculator } from '@/components/calculators/calorie-burn-calculator'
import { BodyFatCalculator } from '@/components/calculators/body-fat-calculator'
import { BloodPressureCalculator } from '@/components/calculators/blood-pressure-calculator'
import { BloodGlucoseCalculator } from '@/components/calculators/blood-glucose-calculator'
import { DosageCalculator } from '@/components/calculators/dosage-calculator'
import { WaterIntakeCalculator } from '@/components/calculators/water-intake-calculator'
import { SkinTypeQuiz } from '@/components/calculators/skin-type-quiz'
import { MakupShadeMatcher } from '@/components/calculators/makeup-shade-matcher'
import { HairCareAssessment } from '@/components/calculators/hair-care-assessment'
import { VitaminDDosage } from '@/components/calculators/vitamin-d-dosage'
import { EyeHealthAssessment } from '@/components/calculators/eye-health-assessment'
import { MacroCalculator } from '@/components/calculators/macro-calculator'
import { ArrowLeft, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CalculatorPageProps {
  params: Promise<{ slug: string }>
}

const calculators: Record<string, {
  name: string
  description: string
  component: React.ComponentType
  relatedArticles: Array<{ title: string; href: string }>
  faqs: Array<{ q: string; a: string }>
}> = {
  'bmi': {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index to assess your weight category and associated health risks.',
    component: BMICalculator,
    relatedArticles: [
      { title: 'Understanding BMI and Health', href: '/categories/wellness' },
      { title: 'Healthy Weight Management Guide', href: '/categories/wellness' },
    ],
    faqs: [
      {
        q: 'What does BMI stand for?',
        a: 'BMI stands for Body Mass Index. It is a measure of body fat based on height and weight that applies to adult men and women.',
      },
      {
        q: 'Is BMI accurate?',
        a: 'BMI is a screening tool and does not directly measure body fat. It does not account for muscle mass or bone density.',
      },
      {
        q: 'What are the BMI categories?',
        a: 'Underweight (below 18.5), Normal weight (18.5-24.9), Overweight (25-29.9), Obese (30+).',
      },
    ],
  },
  'tdee': {
    name: 'TDEE Calculator',
    description: 'Calculate your Total Daily Energy Expenditure to determine calorie needs for fitness goals.',
    component: TDEECalculator,
    relatedArticles: [
      { title: 'Nutrition and Calorie Balance', href: '/categories/health-food' },
      { title: 'Fitness and Exercise Guide', href: '/categories/wellness' },
    ],
    faqs: [
      {
        q: 'What is TDEE?',
        a: 'TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including all daily activities.',
      },
      {
        q: 'How accurate is this calculator?',
        a: 'The calculator uses the Mifflin-St Jeor equation, which is one of the most accurate formulas. However, individual metabolism varies.',
      },
      {
        q: 'How do I use TDEE for weight loss?',
        a: 'To lose weight, consume 300-500 calories less than your TDEE (10-15% deficit). To gain muscle, consume 300-500 calories more.',
      },
    ],
  },
  'calorie-burn': {
    name: 'Calorie Burn Calculator',
    description: 'Estimate calories burned during different activities based on your weight and activity type.',
    component: CalorieBurnCalculator,
    relatedArticles: [
      { title: 'Exercise Benefits Guide', href: '/categories/wellness' },
    ],
    faqs: [
      {
        q: 'What is a MET?',
        a: 'MET (Metabolic Equivalent) is a unit that measures the intensity of physical activity. 1 MET equals the energy spent at rest.',
      },
    ],
  },
  'body-fat': {
    name: 'Body Fat Percentage Calculator',
    description: 'Estimate your body fat percentage based on age, BMI, and gender.',
    component: BodyFatCalculator,
    relatedArticles: [
      { title: 'Health and Fitness', href: '/categories/wellness' },
    ],
    faqs: [
      {
        q: 'Is body fat percentage important?',
        a: 'Yes, body fat percentage is a better indicator of health than weight alone. It accounts for muscle mass.',
      },
    ],
  },
  'blood-pressure': {
    name: 'Blood Pressure Category',
    description: 'Check your blood pressure reading and get health classification.',
    component: BloodPressureCalculator,
    relatedArticles: [
      { title: 'Hypertension Management', href: '/categories/wellness' },
    ],
    faqs: [
      {
        q: 'What is normal blood pressure?',
        a: 'Normal blood pressure is less than 120/80 mmHg.',
      },
    ],
  },
  'blood-glucose': {
    name: 'Blood Glucose Calculator',
    description: 'Monitor blood sugar levels and understand glucose readings.',
    component: BloodGlucoseCalculator,
    relatedArticles: [
      { title: 'Diabetes Management', href: '/categories/wellness' },
    ],
    faqs: [
      {
        q: 'What are normal glucose levels?',
        a: 'Fasting: less than 100 mg/dL (normal), Random: less than 140 mg/dL (normal).',
      },
    ],
  },
  'dosage': {
    name: 'Dosage Calculator',
    description: 'Calculate medication dosages safely based on patient weight.',
    component: DosageCalculator,
    relatedArticles: [
      { title: 'Medication Information', href: '/categories/pharmaceuticals' },
    ],
    faqs: [
      {
        q: 'Should I use this for prescribing?',
        a: 'No, always follow your healthcare provider&apos;s prescriptions. This is for educational purposes only.',
      },
    ],
  },
  'water-intake': {
    name: 'Water Intake Calculator',
    description: 'Calculate your daily water intake needs based on weight, activity, and climate.',
    component: WaterIntakeCalculator,
    relatedArticles: [
      { title: 'Hydration and Wellness', href: '/categories/wellness' },
    ],
    faqs: [
      {
        q: 'Why is hydration important?',
        a: 'Water supports all bodily functions, from temperature regulation to nutrient transport.',
      },
    ],
  },
  'skin-type': {
    name: 'Skin Type Quiz',
    description: 'Discover your skin type and get personalized skincare recommendations.',
    component: SkinTypeQuiz,
    relatedArticles: [
      { title: 'Skincare Guide', href: '/categories/beauty' },
    ],
    faqs: [
      {
        q: 'Can skin type change?',
        a: 'Yes, skin type can change due to age, hormones, and environmental factors.',
      },
    ],
  },
  'makeup-shade': {
    name: 'Makeup Shade Matcher',
    description: 'Find your perfect makeup shades based on undertone and skin depth.',
    component: MakupShadeMatcher,
    relatedArticles: [
      { title: 'Makeup Basics', href: '/categories/cosmetics' },
    ],
    faqs: [
      {
        q: 'What is undertone?',
        a: 'Undertone is the subtle color beneath your skin. Common undertones are warm, cool, and neutral.',
      },
    ],
  },
  'hair-care': {
    name: 'Hair Care Assessment',
    description: 'Get personalized hair care recommendations based on your hair type and condition.',
    component: HairCareAssessment,
    relatedArticles: [
      { title: 'Hair Care Guide', href: '/categories/beauty' },
    ],
    faqs: [
      {
        q: 'How often should I wash my hair?',
        a: 'It depends on hair type. Oily hair: 2-3x weekly, Dry hair: 1-2x weekly, Curly: 1x weekly.',
      },
    ],
  },
  'vitamin-d': {
    name: 'Vitamin D Dosage',
    description: 'Get personalized vitamin D supplementation recommendations.',
    component: VitaminDDosage,
    relatedArticles: [
      { title: 'Vitamin D Guide', href: '/categories/supplements' },
    ],
    faqs: [
      {
        q: 'Why is vitamin D important?',
        a: 'Vitamin D supports bone health, immune function, and mood regulation.',
      },
    ],
  },
  'eye-health': {
    name: 'Eye Health Assessment',
    description: 'Assess eye symptoms and get recommendations for eye care.',
    component: EyeHealthAssessment,
    relatedArticles: [
      { title: 'Vision Care', href: '/categories/vision-care' },
    ],
    faqs: [
      {
        q: 'What is the 20-20-20 rule?',
        a: 'Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain.',
      },
    ],
  },
  'macro': {
    name: 'Macro Calculator',
    description: 'Calculate optimal macronutrient ratios for your diet goals.',
    component: MacroCalculator,
    relatedArticles: [
      { title: 'Nutrition Guide', href: '/categories/health-food' },
    ],
    faqs: [
      {
        q: 'What are macronutrients?',
        a: 'Macronutrients are protein, carbohydrates, and fat - the main nutrients your body needs.',
      },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(calculators).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata(props: CalculatorPageProps): Promise<Metadata> {
  const params = await props.params
  const calc = calculators[params.slug]

  if (!calc) {
    notFound()
  }

  return {
    title: `${calc.name} | HealthHub Pro`,
    description: calc.description,
    openGraph: {
      title: calc.name,
      description: calc.description,
      url: `https://healthhubpro.com/calculators/${params.slug}`,
    },
  }
}

export default async function CalculatorPage(props: CalculatorPageProps) {
  const params = await props.params
  const calc = calculators[params.slug]

  if (!calc) {
    notFound()
  }

  const Component = calc.component

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <nav className="border-b border-border bg-muted/30 px-4 py-3 sm:px-6 lg:px-8 sticky top-16 z-40">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 text-sm">
              <a href="/" className="text-primary hover:underline">Home</a>
              <span className="text-muted-foreground">/</span>
              <a href="/calculators" className="text-primary hover:underline">Calculators</a>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{calc.name}</span>
            </div>
          </div>
        </nav>

        {/* Calculator Header */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Button
              variant="ghost"
              asChild
              className="mb-6 gap-2"
            >
              <Link href="/calculators">
                <ArrowLeft className="w-4 h-4" />
                Back to Calculators
              </Link>
            </Button>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {calc.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {calc.description}
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Component />
          </div>
        </section>

        {/* Related Articles */}
        {calc.relatedArticles.length > 0 && (
          <section className="border-t border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {calc.relatedArticles.map((article) => (
                  <a
                    key={article.href}
                    href={article.href}
                    className="p-4 rounded-lg border border-border hover:shadow-md transition-all group"
                  >
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {calc.faqs.length > 0 && (
          <section className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {calc.faqs.map((faq, index) => (
                  <div key={index} className="border border-border rounded-lg p-6">
                    <h3 className="font-bold text-foreground mb-3 flex items-start gap-3">
                      <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-muted-foreground ml-8">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Medical Disclaimer */}
        <section className="border-t border-border bg-orange-50 dark:bg-orange-950/20 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex gap-4 items-start">
              <Info className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-orange-900 dark:text-orange-200 mb-2">Medical Disclaimer</h3>
                <p className="text-sm text-orange-800 dark:text-orange-300">
                  These calculators are for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with your healthcare provider before making any health decisions based on calculator results. Individual results may vary based on factors not accounted for in the calculations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
