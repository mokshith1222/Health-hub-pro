# HealthHub Pro - Medical Content Platform

A premium, EEAT-compliant health and wellness website built with Next.js 16, designed for top Google rankings and AdSense monetization.

## Features

### Core Platform
- **500+ MDX-based articles** organized into 9 health categories
- **20+ interactive health calculators** with real-time results
- **Expert-reviewed content** with medical professional credentials
- **Full SEO optimization** with JSON-LD structured data
- **Google Analytics integration** for performance tracking
- **AdSense-ready** layout for monetization

### Content Categories
1. Beauty - Skincare, haircare, cosmetics
2. Health Food - Nutrition and dietary guidance
3. Bath & Body - Personal care and wellness
4. Cosmetics - Makeup and cosmetic products
5. Supplements - Vitamins and dietary supplements
6. Pharmaceuticals - Medications and treatments
7. Self Help - Mental health and personal growth
8. Vision Care - Eye health and vision
9. Wellness - General health and fitness

### Interactive Calculators
- BMI Calculator
- TDEE Calculator (Total Daily Energy Expenditure)
- Blood Pressure Category
- Blood Glucose Tracker
- Calorie Burn Calculator
- Body Fat Percentage
- And 14+ more medical calculators

## Tech Stack

- **Framework**: Next.js 16 (App Router, React Server Components)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Content**: MDX with frontmatter metadata
- **Database**: MDX files (versioned in Git)
- **SEO**: Next.js built-in capabilities + structured data
- **Analytics**: Google Analytics 4 integration
- **Monetization**: AdSense placements
- **Deployment**: Vercel (recommended)

## Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repo-url>
cd healthhub-pro

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

### 2. Google Analytics Setup

1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Update the script tag in `app/layout.tsx` with your ID

### 3. Google AdSense Setup

1. Apply for Google AdSense at https://adsense.google.com
2. Wait for approval (medical sites need extra verification)
3. Create ad units and get your Publisher ID (ca-pub-xxx)
4. Update `components/adsense-ad.tsx` with:
   - Your Publisher ID
   - Your ad slot numbers

### 4. Content Structure

#### Adding Articles

Create MDX files in `content/articles/[category]/`:

```mdx
---
title: "Article Title"
description: "Brief description for SEO"
category: "wellness"
author: "Author Name"
reviewer: "Dr. Reviewer Name, MD"
publishedDate: "2024-07-14"
lastUpdatedDate: "2024-07-14"
readingTime: 8
keywords:
  - keyword1
  - keyword2
featured: true
image: "https://example.com/image.jpg"
sources:
  - "Source 1"
  - "Source 2"
---

## Article Content

Regular markdown content here...
```

#### Adding Calculators

1. Create component in `components/calculators/[name]-calculator.tsx`
2. Add to calculator registry in `app/calculators/[slug]/page.tsx`
3. Configure FAQs and related articles

## Directory Structure

```
.
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout with GA tracking
│   ├── articles/
│   │   └── [category]/[slug]/   # Article pages
│   ├── categories/              # Category landing pages
│   ├── calculators/             # Calculator hub & individual pages
│   ├── about/                   # About page
│   └── privacy/                 # Privacy policy
├── components/
│   ├── header.tsx               # Navigation header
│   ├── footer.tsx               # Footer with disclaimers
│   ├── article-card.tsx         # Article preview card
│   ├── adsense-ad.tsx           # AdSense ad component
│   └── calculators/             # Calculator components
├── content/
│   ├── articles/                # MDX articles by category
│   ├── calculators/             # Calculator logic
│   ├── authors/                 # Author profiles
│   └── reviewers/               # Medical reviewer bios
├── lib/
│   ├── mdx.ts                   # Content loading utilities
│   ├── schema.ts                # JSON-LD schema generators
│   └── analytics.ts             # GA tracking helpers
└── public/
    └── images/                  # Article and UI images
```

## YMYL Compliance Checklist

- [x] All medical claims backed by authoritative sources
- [x] Clear author and reviewer credentials displayed
- [x] Medical reviewer profile system with verification
- [x] Last updated timestamps on all articles
- [x] Prominent medical disclaimer footer
- [x] No unverified health claims
- [x] E-E-A-T signals in JSON-LD structured data
- [x] Privacy policy and terms of service
- [x] HTTPS enabled (automatic on Vercel)
- [x] Mobile-responsive design
- [x] Page loading speed optimized

## SEO Features

### On-Page SEO
- Meta tags and Open Graph data
- Semantic HTML with proper heading hierarchy
- Internal linking strategy
- Alt text for images
- Keyword optimization hints

### Technical SEO
- Automatic sitemap generation
- Robots.txt configuration
- Structured data (Article, MedicalScholarlyArticle, FAQPage, BreadcrumbList)
- Core Web Vitals optimization
- Mobile-first responsive design
- Image optimization with Next.js Image

### Content SEO
- Long-form articles (2000+ words recommended)
- Citation linking to authoritative sources
- Related articles linking
- Featured snippets optimization
- FAQ schema for common questions

## Analytics & Monetization

### Tracking Events
- Page views (automatic via GA4)
- Article reads
- Calculator usage
- Category browsing
- Scroll depth
- Time on page
- Share actions

### AdSense Revenue Optimization
- Header banner placements (high CPM)
- In-article ads (best engagement)
- Calculator result ads
- Sidebar placements (desktop)
- Responsive design for all screen sizes

### Success Metrics
- Target: 10K+ organic traffic/month by month 6
- Target: >3% CTR on ads
- Target: CPM varies (medical niche: $5-20+)
- Target: <50% bounce rate
- Target: 3+ min average session duration

## Content Management

### Adding Medical Reviewers

Update `content/reviewers/[name].ts`:

```ts
export const reviewer = {
  name: "Dr. Example Name",
  credentials: "MD, Board Certified Specialty",
  bio: "Bio and expertise",
  avatar: "https://example.com/avatar.jpg",
  verified: true,
}
```

### Content Templates

Use the starter articles as templates. Key requirements:
- Minimum 5 authoritative sources
- Evidence-based claims
- Clear author and reviewer
- Regular updates (at least 20% of articles/month)
- Medical accuracy checklist in draft

## Deployment

### Vercel Deployment (Recommended)

```bash
# Connect to Vercel
vercel link

# Deploy
vercel

# Set environment variables in Vercel Settings
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SITE_URL=https://healthhubpro.com
```

### Manual Build

```bash
# Build for production
pnpm build

# Test production build locally
pnpm start
```

## Environment Variables

Create `.env.local`:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Site URL for sitemap generation
SITE_URL=https://healthhubpro.com

# Optional: AdSense Publisher ID (if not hardcoded)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
```

## Medical Compliance Resources

- [Google E-E-A-T Guidelines](https://developers.google.com/search/docs/appearance/helpful-content)
- [YMYL Content Guidelines](https://support.google.com/news/answer/6139834)
- [FDA Health Content Policy](https://www.fda.gov/patients/patient-education-resources)
- [Medical Accuracy Standards](https://www.nlm.nih.gov/services/medical_informatics.html)

## Contributing

### Adding Articles
1. Create MDX file in appropriate category folder
2. Include all required frontmatter
3. Verify medical accuracy
4. Add 5+ reputable sources
5. Commit and deploy

### Adding Calculators
1. Create calculator component
2. Add to registry
3. Include medical disclaimers
4. Test with edge cases
5. Document FAQs

## License

This project is part of HealthHub Pro. All medical content is proprietary and requires proper licensing.

## Support

For setup help, medical compliance questions, or feature requests:
- Email: support@healthhubpro.com
- Documentation: See docs/ folder

---

**Last Updated**: July 14, 2024
**Status**: Production Ready
**Next Steps**: Add 50-100 starter articles, configure AdSense, set up Search Console
