'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Copy } from 'lucide-react'

export function MakupShadeMatcher() {
  const [undertone, setUndertone] = useState('warm')
  const [depth, setDepth] = useState('medium')
  const [result, setResult] = useState<string | null>(null)

  const shades: Record<string, Record<string, string>> = {
    warm: {
      light: 'Light Warm - Try golden, peach, and warm brown tones',
      medium: 'Medium Warm - Try terracotta, bronze, and warm beige',
      deep: 'Deep Warm - Try burnt sienna, copper, and rich gold',
    },
    cool: {
      light: 'Light Cool - Try rose, silver, and cool pink tones',
      medium: 'Medium Cool - Try cool brown, mauve, and cool taupe',
      deep: 'Deep Cool - Try deep plum, cool red, and charcoal',
    },
    neutral: {
      light: 'Light Neutral - Try soft browns, taupes, and soft pinks',
      medium: 'Medium Neutral - Try warm brown, soft mauve, and neutral beige',
      deep: 'Deep Neutral - Try chocolate brown, burgundy, and deep taupe',
    },
  }

  const calculate = () => {
    const shade = shades[undertone]?.[depth]
    setResult(shade || null)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Makeup Shade Matcher</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Undertone</label>
            <select
              value={undertone}
              onChange={(e) => setUndertone(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="warm">Warm (Gold looks good)</option>
              <option value="cool">Cool (Silver looks good)</option>
              <option value="neutral">Neutral (Both work)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Skin Depth</label>
            <select
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="deep">Deep</option>
            </select>
          </div>

          <Button onClick={calculate} className="w-full">
            Find Your Shades
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Recommended Shades</p>
            <p className="font-semibold text-accent">{result}</p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      </div>
    </div>
  )
}
