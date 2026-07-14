'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Copy } from 'lucide-react'

export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('light')
  const [climate, setClimate] = useState('moderate')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    if (!weight) return
    
    let baseWater = parseFloat(weight) * 0.033 // Liters
    
    // Activity multiplier
    if (activity === 'moderate') baseWater *= 1.2
    else if (activity === 'intense') baseWater *= 1.5
    
    // Climate adjustment
    if (climate === 'hot') baseWater *= 1.25
    else if (climate === 'cold') baseWater *= 0.9
    
    setResult(Math.round(baseWater * 10) / 10)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Daily Water Intake Calculator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Body Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="light">Light (Sedentary)</option>
              <option value="moderate">Moderate (Regular Exercise)</option>
              <option value="intense">Intense (Heavy Exercise)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Climate</label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="cold">Cold</option>
              <option value="moderate">Moderate</option>
              <option value="hot">Hot/Humid</option>
            </select>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Water Intake
          </Button>
        </div>

        {result !== null && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Daily Water Recommendation</p>
              <p className="text-4xl font-bold text-accent">{result}</p>
              <p className="text-xs text-muted-foreground mt-2">Liters per day</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p className="text-muted-foreground">
                That&apos;s approximately <span className="font-semibold text-foreground">{Math.round(result * 4.22)}</span> glasses per day (8 oz glasses)
              </p>
            </div>
          </div>
        )}
      </Card>

      <div className="space-y-3 p-4 bg-card border rounded-lg">
        <h3 className="font-semibold text-sm">Hydration Tips</h3>
        <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside">
          <li>Drink water consistently throughout the day</li>
          <li>Adjust intake based on thirst and urine color</li>
          <li>Increase intake during exercise or hot weather</li>
          <li>Some water comes from food (fruits, vegetables)</li>
        </ul>
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
