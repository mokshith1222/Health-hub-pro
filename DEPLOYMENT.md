# HealthHub Pro - Deployment & Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ and pnpm installed
- GitHub repository created and configured
- Google Search Console account

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm run build
```

## Google Search Console Setup

### HTML File Verification (Recommended)

1. **File Location**: `/public/googlefbfa23743896d7f7.html`
2. **Content**: `google-site-verification: googlefbfa23743896d7f7.html`
3. **Steps**:
   - Upload your domain to Google Search Console
   - Choose "HTML file" verification method
   - Download verification file from Google
   - Replace content in `/public/googlefbfa23743896d7f7.html` with your verification code
   - Deploy to production
   - Verify ownership in Google Search Console

### Meta Tag Verification (Backup)

The meta tag is already configured in `app/layout.tsx`:
```tsx
verification: {
  google: 'googlefbfa23743896d7f7',
}
```

Replace `'googlefbfa23743896d7f7'` with your actual verification code from Google.

## Deployment to Vercel

### Step 1: Connect Repository
1. Go to [Vercel](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository (`https://github.com/mokshith1222/Health-hub-pro`)
4. Configure build settings (Next.js preset)
5. Add environment variables if needed

### Step 2: Environment Variables
Add these to Vercel project settings:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Your Google Analytics ID
```

### Step 3: Deploy
- Vercel automatically deploys on git push
- Production URL: `healthhubpro.vercel.app` (or your custom domain)

## Google Analytics Setup

1. Create Google Analytics 4 property
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Update in `app/layout.tsx`:
   ```tsx
   src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"
   ```
4. Redeploy to production

## SEO Optimization Checklist

- [x] `robots.txt` configured
- [x] Sitemap generation ready
- [x] Google Search Console verification
- [x] JSON-LD structured data
- [x] Meta tags for all pages
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Mobile responsiveness
- [x] Core Web Vitals optimization
- [x] Internal linking structure

## Article Management

### Adding New Articles

1. Create MDX file: `/content/articles/[category]/[slug].mdx`
2. Add frontmatter:
```mdx
---
title: "Your Article Title"
slug: "article-slug"
description: "Short description"
category: "wellness"  # or other category
author: "Author Name"
reviewer: "Reviewer Name (optional)"
date: "2024-01-15"
updated: "2024-01-20"
readTime: "5"
keywords: "keyword1, keyword2, keyword3"
sources:
  - "https://example.com/source1"
featured: false
image: "/images/article.png"
---

## Article content in MDX format
```

3. Articles automatically appear in category pages

### Categories Available
- beauty
- health-food
- bath-body
- cosmetics
- supplements
- pharmaceuticals
- self-help
- vision-care
- wellness

## Calculator Management

All 14 calculators are in `/components/calculators/`:
- bmi-calculator.tsx
- tdee-calculator.tsx
- calorie-burn-calculator.tsx
- body-fat-calculator.tsx
- blood-pressure-calculator.tsx
- blood-glucose-calculator.tsx
- dosage-calculator.tsx
- water-intake-calculator.tsx
- skin-type-quiz.tsx
- makeup-shade-matcher.tsx
- hair-care-assessment.tsx
- vitamin-d-dosage.tsx
- eye-health-assessment.tsx
- macro-calculator.tsx

Add new calculators by:
1. Creating component in `/components/calculators/`
2. Adding to calculator definitions in `/app/calculators/[slug]/page.tsx`
3. Adding to hub page list in `/app/calculators/page.tsx`

## AdSense Setup

1. Apply for Google AdSense
2. Get Publisher ID
3. Add to `app/layout.tsx` (once approved):
```tsx
<Script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  crossOrigin="anonymous" />
```
4. Use `<AdsenseAd />` component for ad placement

## Monitoring & Analytics

### Google Search Console
- Monitor index status
- Check search performance
- Fix crawl errors
- Submit sitemaps

### Google Analytics
- Track user behavior
- Monitor bounce rate
- Analyze article performance
- Track calculator usage

### Performance
- Monitor Core Web Vitals
- Check page speed
- Analyze user interactions

## Troubleshooting

### Google Search Console Verification Failed
**Solution**: 
- Ensure HTML file content matches exactly: `google-site-verification: googlefbfa23743896d7f7.html`
- File must be accessible at: `yourdomain.com/googlefbfa23743896d7f7.html`
- Wait 24-48 hours after deploying
- Try alternate verification method (meta tag)

### Articles Not Appearing
- Check MDX frontmatter formatting
- Ensure category folder exists
- Rebuild project: `pnpm run build`

### Calculators Show 404
- Verify component exists in `/components/calculators/`
- Check calculator definition in `/app/calculators/[slug]/page.tsx`
- Ensure slug matches exactly

## Support

For issues or questions:
1. Check existing GitHub issues
2. Review Next.js documentation
3. Check Vercel deployment docs
4. Review Google products documentation

---

**Last Updated**: January 2024
**Version**: 1.0
**Status**: Production Ready
