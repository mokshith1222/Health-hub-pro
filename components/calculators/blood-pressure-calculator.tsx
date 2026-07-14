'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Copy } from 'lucide-react'

export function BloodPressureCalculator() {
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [result, setResult] = useState<{ category: string; color: string; recommendation: string } | null>(null)

  const calculate = () => {
    if (!systolic || !diastolic) return
    
    const sys = parseFloat(systolic)
    const dia = parseFloat(diastolic)
    
    let category = ''
    let color = ''
    let recommendation = ''
    
    if (sys < 120 && dia < 80) {
      category = 'Normal'
      color = 'text-green-600'
      recommendation = 'Keep up with healthy lifestyle habits'
    } else if (sys < 130 && dia < 80) {
      category = 'Elevated'
      color = 'text-yellow-600'
      recommendation = 'Monitor regularly and adopt healthy habits'
    } else if (sys < 140 || dia < 90) {
      category = 'Stage 1 Hypertension'
      color = 'text-orange-600'
      recommendation = 'Consult healthcare provider'
    } else if (sys >= 180 || dia >= 120) {
      category = 'Hypertensive Crisis'
      color = 'text-red-600'
      recommendation = 'Seek immediate medical attention'
    } else {
      category = 'Stage 2 Hypertension'
      color = 'text-red-700'
      recommendation = 'Consult healthcare provider immediately'
    }
    
    setResult({ category, color, recommendation })
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Blood Pressure Category</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Systolic (mmHg)</label>
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                placeholder="e.g., 120"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Diastolic (mmHg)</label>
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                placeholder="e.g., 80"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Check Blood Pressure
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className={`text-sm font-medium ${result.color} mb-2`}>{result.category}</p>
            <p className="text-muted-foreground">{result.recommendation}</p>
          </div>
        )}
      </Card>

      <div className="space-y-3 p-4 bg-card border rounded-lg">
        <h3 className="font-semibold text-sm">Blood Pressure Reference Chart</h3>
        <div className="text-xs space-y-2 text-muted-foreground">
          <p className="flex justify-between"><span>Normal:</span> <span>&lt;120/80 mmHg</span></p>
          <p className="flex justify-between"><span>Elevated:</span> <span>120-129/&lt;80 mmHg</span></p>
          <p className="flex justify-between"><span>Stage 1 HTN:</span> <span>130-139/80-89 mmHg</span></p>
          <p className="flex justify-between"><span>Stage 2 HTN:</span> <span>≥140/≥90 mmHg</span></p>
        </div>
      </div>

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
