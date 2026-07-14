import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { generateOrganizationSchema } from '@/lib/schema'
import { Award, Users, Heart, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About HealthHub Pro - Our Mission & Team',
  description: 'Learn about HealthHub Pro, our mission to provide evidence-based health information, and our team of medical professionals.',
}

export default function AboutPage() {
  const schema = generateOrganizationSchema()

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              About HealthHub Pro
            </h1>
            <p className="text-lg text-muted-foreground">
              Your trusted source for evidence-based health information reviewed by medical experts
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              HealthHub Pro is dedicated to making high-quality, evidence-based health information accessible to everyone. In an age of health misinformation, we believe in the power of accurate, scientifically-backed content reviewed by qualified medical professionals.
            </p>
            <p className="text-lg text-muted-foreground">
              We combine practical health information with interactive tools and calculators to help you make informed decisions about your health and wellness.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-b border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="flex gap-4">
                <Award className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Evidence-Based</h3>
                  <p className="text-muted-foreground">
                    All our content is based on peer-reviewed research and scientific evidence from reputable sources like WHO, NIH, and CDC.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Expert Reviewed</h3>
                  <p className="text-muted-foreground">
                    Every article is reviewed by qualified medical professionals to ensure accuracy and reliability.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Heart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Patient-Focused</h3>
                  <p className="text-muted-foreground">
                    We prioritize user safety and medical accuracy, never promoting unverified health claims or dangerous misinformation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Zap className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Continuously Updated</h3>
                  <p className="text-muted-foreground">
                    We keep our content current with the latest medical guidelines and health research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Advisory Board Template */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Medical Advisory Board</h2>
            <p className="text-muted-foreground mb-8">
              Our content is reviewed by a team of qualified medical professionals including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'Dr. Michael Chen', credential: 'MD, Internal Medicine', bio: 'Coming Soon - Medical Reviewer Profile' },
                { name: 'Dr. Robert Martinez', credential: 'MD, Family Medicine', bio: 'Coming Soon - Medical Reviewer Profile' },
                { name: 'Sarah Johnson', credential: 'MS, Registered Dietitian', bio: 'Coming Soon - Medical Reviewer Profile' },
                { name: 'Dr. Lisa Wong', credential: 'PhD, Nutrition Science', bio: 'Coming Soon - Medical Reviewer Profile' },
              ].map((member, i) => (
                <div key={i} className="p-6 rounded-lg border border-border">
                  <h3 className="font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-2">{member.credential}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t border-border bg-gradient-to-r from-primary/5 to-accent/5 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
            <a
              href="mailto:support@healthhubpro.com"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-md transition-all"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}
