'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Copy } from 'lucide-react'

export function MacroCalculator() {
  const [calories, setCalories] = useState('')
  const [diet, setDiet] = useState('balanced')
  const [result, setResult] = useState<{ protein: number; carbs: number; fat: number } | null>(null)

  const macroRatios: Record<string, { protein: number; carbs: number; fat: number }> = {
    balanced: { protein: 0.30, carbs: 0.40, fat: 0.30 },
    lowcarb: { protein: 0.35, carbs: 0.20, fat: 0.45 },
    highprotein: { protein: 0.40, carbs: 0.35, fat: 0.25 },
    lowfat: { protein: 0.30, carbs: 0.60, fat: 0.10 },
  }

  const calculate = () => {
    if (!calories) return
    
    const cal = parseFloat(calories)
    const ratio = macroRatios[diet]
    
    const protein = Math.round((cal * ratio.protein) / 4)
    const carbs = Math.round((cal * ratio.carbs) / 4)
    const fat = Math.round((cal * ratio.fat) / 9)
    
    setResult({ protein, carbs, fat })
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Macro Calculator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Daily Calories</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Enter daily calorie goal"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Diet Type</label>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="balanced">Balanced (40C, 30P, 30F)</option>
              <option value="lowcarb">Low Carb (20C, 35P, 45F)</option>
              <option value="highprotein">High Protein (35C, 40P, 25F)</option>
              <option value="lowfat">Low Fat (60C, 30P, 10F)</option>
            </select>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Macros
          </Button>
        </div>

        {result && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="p-3 bg-accent/10 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Protein</p>
              <p className="text-xl font-bold text-accent">{result.protein}g</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Carbs</p>
              <p className="text-xl font-bold text-secondary">{result.carbs}g</p>
            </div>
            <div className="p-3 bg-chart-1/10 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Fat</p>
              <p className="text-xl font-bold text-chart-1">{result.fat}g</p>
            </div>
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
