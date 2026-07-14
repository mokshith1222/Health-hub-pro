import type { ArticleMetadata } from './mdx'

// Generate JSON-LD schema for articles
export function generateArticleSchema(article: {
  metadata: ArticleMetadata
  slug: string
  category: string
}) {
  const url = `https://healthhubpro.com/articles/${article.category}/${article.slug}`
  const imageUrl = article.metadata.image || 'https://healthhubpro.com/og-image.png'

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalScholarlyArticle',
    headline: article.metadata.title,
    description: article.metadata.description,
    image: imageUrl,
    datePublished: article.metadata.publishedDate,
    dateModified: article.metadata.lastUpdatedDate,
    author: {
      '@type': 'Person',
      name: article.metadata.author,
    },
    ...(article.metadata.reviewer && {
      reviewer: {
        '@type': 'Person',
        name: article.metadata.reviewer,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: 'HealthHub Pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://healthhubpro.com/logo.png',
      },
    },
    mainEntity: {
      '@type': 'WebPage',
      name: article.metadata.title,
    },
    keywords: article.metadata.keywords.join(', '),
    articleBody: article.metadata.description,
    isAccessibleForFree: true,
  }
}

// Generate FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Generate organization schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'HealthHub Pro',
    description: 'Premium evidence-based health and wellness information',
    url: 'https://healthhubpro.com',
    logo: 'https://healthhubpro.com/logo.png',
    image: 'https://healthhubpro.com/og-image.png',
    sameAs: [
      'https://www.facebook.com/healthhubpro',
      'https://www.twitter.com/healthhubpro',
      'https://www.linkedin.com/company/healthhubpro',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@healthhubpro.com',
    },
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'General Public',
    },
  }
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Generate calculator schema (for structured data on calculator pages)
export function generateCalculatorSchema(calculator: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calculator.name,
    description: calculator.description,
    url: calculator.url,
    applicationCategory: 'MedicalApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}
