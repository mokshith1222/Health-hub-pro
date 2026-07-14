'use client'

import { useEffect } from 'react'

interface AdSenseAdProps {
  slot: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
}

/**
 * AdSense Component for displaying Google AdSense ads
 * NOTE: Replace ca-pub-xxxxxxxxxxxxxxxx with your AdSense Publisher ID
 * 
 * Common slot formats:
 * - Header banner: 728x90 or 970x90
 * - In-article: 300x250 or 336x280
 * - Sidebar: 300x600
 * - Mobile: 320x50 or 300x250
 */
export function AdSenseAd({ slot, format = 'auto', responsive = true }: AdSenseAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: 'ca-pub-xxxxxxxxxxxxxxxx',
        enable_page_level_ads: true,
      })
    } catch (err) {
      console.error('AdSense script error:', err)
    }
  }, [])

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className="bg-muted border-2 border-dashed border-muted-foreground rounded-lg p-4 text-center text-sm text-muted-foreground">
        {`AdSense Ad (Slot: ${slot})`}
        <br />
        <span className="text-xs">Ads are disabled in development</span>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden">
      <ins
        className={`adsbygoogle ${responsive ? 'w-full' : ''}`}
        style={{
          display: 'block',
          minHeight: '100px',
        }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Ad slot configurations
export const AD_SLOTS = {
  // Header ad (728x90 desktop, 320x50 mobile)
  HEADER: {
    slot: 'XXXXXXXXXX',
    format: 'horizontal',
  },
  // In-article ad (300x250 or 336x280)
  IN_ARTICLE: {
    slot: 'XXXXXXXXXX',
    format: 'rectangle',
  },
  // Sidebar ad (300x600)
  SIDEBAR: {
    slot: 'XXXXXXXXXX',
    format: 'vertical',
  },
  // Mobile overlay (320x50)
  MOBILE_BANNER: {
    slot: 'XXXXXXXXXX',
    format: 'horizontal',
  },
  // Calculator result ad
  CALCULATOR: {
    slot: 'XXXXXXXXXX',
    format: 'rectangle',
  },
}

/**
 * Setup Instructions:
 * 1. Create a Google AdSense account at https://adsense.google.com
 * 2. Request approval for your domain
 * 3. Once approved, find your Publisher ID (ca-pub-xxx)
 * 4. Create ad units and get the slot numbers
 * 5. Replace 'ca-pub-xxxxxxxxxxxxxxxx' with your Publisher ID
 * 6. Replace 'XXXXXXXXXX' slot values with your actual slot numbers
 * 7. Add this script to your layout: <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx" crossOrigin="anonymous"></script>
 * 
 * Ad Placement Strategy for Medical Sites:
 * - Header: 728x90 leaderboard for desktop visibility
 * - In-article: 300x250 medium rectangles every 300 words
 * - Calculator results: Native ads below results
 * - Sidebar: 300x600 half-page ads (desktop only)
 * 
 * IMPORTANT - YMYL Compliance:
 * - Never place ads that promote unverified medical claims
 * - Avoid aggressive ad placement that interferes with medical content
 * - Ensure ads don't mislead users about medical information
 * - Monitor ad quality to maintain site credibility
 */
