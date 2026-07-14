import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | HealthHub Pro',
  description: 'HealthHub Pro privacy policy and data protection practices.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl prose prose-sm sm:prose max-w-none text-foreground">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <p className="text-muted-foreground mb-6">
            Last Updated: July 14, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              HealthHub Pro ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">We may collect information about you in a variety of ways:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Information automatically collected when you use our calculators</li>
              <li>Analytics data through Google Analytics</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Information you voluntarily provide through contact forms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Improve and maintain our website and services</li>
              <li>Analyze usage patterns and user preferences</li>
              <li>Display personalized content and advertisements</li>
              <li>Respond to your inquiries and provide customer support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Medical Disclaimer</h2>
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/50 rounded-lg p-6 my-4">
              <p className="text-orange-900 dark:text-orange-200 font-semibold mb-2">
                Important: The information provided on HealthHub Pro is for educational purposes only.
              </p>
              <p className="text-orange-800 dark:text-orange-300">
                Our content should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before making any health decisions. In case of medical emergencies, call emergency services immediately.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              Our website uses third-party services including Google Analytics for traffic analysis. These services may collect information about your use of our website. Please review their privacy policies for more information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, please contact us at privacy@healthhubpro.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at:<br />
              <strong>Email:</strong> privacy@healthhubpro.com<br />
              <strong>Address:</strong> HealthHub Pro, Privacy Department
            </p>
          </section>

          <p className="text-xs text-muted-foreground mt-12 pt-8 border-t border-border">
            This Privacy Policy was last updated on July 14, 2024. We may update this policy from time to time. The updated version will be effective immediately upon posting to the website.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
