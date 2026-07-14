'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Copy } from 'lucide-react'

export function VitaminDDosage() {
  const [age, setAge] = useState('')
  const [currentLevel, setCurrentLevel] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const calculate = () => {
    if (!age || !currentLevel) return
    
    const ageNum = parseFloat(age)
    const levelNum = parseFloat(currentLevel)
    
    let recommendation = ''
    const iuPerDay = 1000 // base IU
    
    if (ageNum < 1) {
      recommendation = 'Consult pediatrician for appropriate dosage'
    } else if (ageNum < 70) {
      if (levelNum < 20) {
        recommendation = '2,000-4,000 IU daily to reach optimal levels (30-50 ng/mL)'
      } else if (levelNum < 30) {
        recommendation = '1,000-2,000 IU daily for maintenance'
      } else {
        recommendation = '400-1,000 IU daily for maintenance'
      }
    } else {
      if (levelNum < 20) {
        recommendation = '3,000-4,000 IU daily to reach optimal levels'
      } else if (levelNum < 30) {
        recommendation = '1,500-2,000 IU daily for maintenance'
      } else {
        recommendation = '600-1,000 IU daily for maintenance'
      }
    }
    
    setResult(recommendation)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Vitamin D Dosage Calculator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Vitamin D Level (ng/mL)</label>
            <input
              type="number"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
              placeholder="From blood test result"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button onClick={calculate} className="w-full">
            Get Recommendation
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Recommended Daily Intake</p>
            <p className="font-semibold text-accent">{result}</p>
            <p className="text-xs text-muted-foreground mt-3">Note: Consult healthcare provider before supplementing</p>
          </div>
        )}
      </Card>

      <div className="p-4 bg-card border rounded-lg text-sm space-y-2 text-muted-foreground">
        <p className="font-semibold text-foreground mb-2">Vitamin D Levels</p>
        <p className="flex justify-between"><span>Deficient:</span> <span>&lt;20 ng/mL</span></p>
        <p className="flex justify-between"><span>Insufficient:</span> <span>20-29 ng/mL</span></p>
        <p className="flex justify-between"><span>Optimal:</span> <span>30-50 ng/mL</span></p>
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
