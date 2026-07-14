'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function HairCareAssessment() {
  const [hairType, setHairType] = useState('straight')
  const [condition, setCondition] = useState('normal')
  const [result, setResult] = useState<string | null>(null)

  const assessments: Record<string, Record<string, string>> = {
    straight: {
      normal: 'Use lightweight, hydrating shampoos and conditioners. Trim every 6-8 weeks.',
      dry: 'Apply deep conditioning treatments weekly. Use nourishing oils on ends.',
      oily: 'Use volumizing shampoos and lightweight conditioners. Cleanse more frequently.',
      damaged: 'Cut off damaged ends. Use protein-rich treatments and minimize heat styling.',
    },
    wavy: {
      normal: 'Use curl-enhancing products and plop method for drying.',
      dry: 'Apply leave-in conditioner and curl cream. Deep condition weekly.',
      oily: 'Use clarifying shampoo monthly. Apply products from mid-length to ends.',
      damaged: 'Cut off damage. Use low-poo or co-wash methods.',
    },
    curly: {
      normal: 'Use hydrating, creamy products. Try the Curly Girl Method.',
      dry: 'Apply rich conditioners and oils. Deep condition weekly.',
      oily: 'Use lightweight products. Reduce conditioner frequency.',
      damaged: 'Cut regularly. Minimize heat and chemical treatments.',
    },
    coily: {
      normal: 'Use thick creams and oils. Moisturize regularly.',
      dry: 'Use heavy conditioners and oils. Deep condition frequently.',
      oily: 'Use lightweight, water-based products. Regular cleansing.',
      damaged: 'Protective styling and regular trims recommended.',
    },
  }

  const handleAssess = () => {
    const assessment = assessments[hairType]?.[condition]
    setResult(assessment || null)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Hair Care Assessment</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Hair Type</label>
            <select
              value={hairType}
              onChange={(e) => setHairType(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="straight">Straight</option>
              <option value="wavy">Wavy</option>
              <option value="curly">Curly</option>
              <option value="coily">Coily</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hair Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="normal">Normal</option>
              <option value="dry">Dry</option>
              <option value="oily">Oily</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>

          <Button onClick={handleAssess} className="w-full">
            Get Hair Care Tips
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Personalized Hair Care Routine</p>
            <p className="font-semibold text-accent">{result}</p>
          </div>
        )}
      </Card>
    </div>
  )
}
