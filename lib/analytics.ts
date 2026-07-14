// Analytics utilities for tracking user interactions
// NOTE: Replace G-XXXXXXXXXX with your actual Google Analytics ID

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Track page views
export function trackPageView(path: string, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('pageview', {
      page_path: path,
      page_title: title,
    })
  }
}

// Track calculator usage
export function trackCalculatorUsage(calculatorName: string, result?: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculator_used', {
      calculator_name: calculatorName,
      value: result ? 1 : 0,
    })
  }
}

// Track article views
export function trackArticleView(category: string, title: string, author: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'article_viewed', {
      article_category: category,
      article_title: title,
      article_author: author,
    })
  }
}

// Track category visits
export function trackCategoryView(category: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'category_viewed', {
      category_name: category,
    })
  }
}

// Track conversions (e.g., sharing, newsletter signup)
export function trackConversion(conversionName: string, value: number = 1) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', conversionName, {
      value: value,
    })
  }
}

// Track scroll depth
export function trackScrollDepth() {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100)
      
      if (scrollDepth >= 25 && scrollDepth < 50) {
        trackConversion('scroll_25_percent')
      } else if (scrollDepth >= 50 && scrollDepth < 75) {
        trackConversion('scroll_50_percent')
      } else if (scrollDepth >= 75 && scrollDepth < 100) {
        trackConversion('scroll_75_percent')
      } else if (scrollDepth >= 100) {
        trackConversion('scroll_100_percent')
      }
    }, { once: true })
  }
}

// Track time on page
export function trackTimeOnPage(pageName: string) {
  if (typeof window !== 'undefined') {
    let startTime = Date.now()
    
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'time_on_page', {
          page_name: pageName,
          time_spent: timeSpent,
        })
      }
    })
  }
}

// Declare gtag globally for TypeScript
declare global {
  interface Window {
    gtag: any
    dataLayer: any
  }
}
