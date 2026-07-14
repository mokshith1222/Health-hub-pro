'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Copy } from 'lucide-react'

export function BodyFatCalculator() {
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    if (!age || !weight || !bmi) return
    
    let bodyFat = 0
    const ageNum = parseFloat(age)
    const bmiNum = parseFloat(bmi)
    
    if (gender === 'male') {
      bodyFat = 1.20 * bmiNum + 0.23 * ageNum - 16.2
    } else {
      bodyFat = 1.20 * bmiNum + 0.23 * ageNum - 5.4
    }
    
    setResult(Math.max(0, Math.round(bodyFat * 10) / 10))
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Body Fat Percentage Calculator</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Age (years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">BMI</label>
            <input
              type="number"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
              placeholder="Enter BMI"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Body Fat
          </Button>
        </div>

        {result !== null && (
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Estimated Body Fat</p>
            <p className="text-4xl font-bold text-accent">{result}%</p>
            <p className="text-xs text-muted-foreground mt-2">
              {gender === 'male'
                ? result < 10 ? 'Essential fat' : result < 20 ? 'Athletic' : 'Average'
                : result < 15 ? 'Essential fat' : result < 25 ? 'Athletic' : 'Average'}
            </p>
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
