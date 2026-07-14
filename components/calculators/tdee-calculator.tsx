'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, Share2 } from 'lucide-react'

interface TDEEResult {
  bmr: number
  tdee: number
  caloriesByActivity: Record<string, number>
}

const activityLevels = [
  { value: 1.2, label: 'Sedentary (little or no exercise)' },
  { value: 1.375, label: 'Lightly active (exercise 1-3 days/week)' },
  { value: 1.55, label: 'Moderately active (exercise 3-5 days/week)' },
  { value: 1.725, label: 'Very active (exercise 6-7 days/week)' },
  { value: 1.9, label: 'Extremely active (physical job or training)' },
]

export function TDEECalculator() {
  const [weight, setWeight] = useState<number | ''>('')
  const [height, setHeight] = useState<number | ''>('')
  const [age, setAge] = useState<number | ''>('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [activityLevel, setActivityLevel] = useState('1.55')
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg')
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm')
  const [result, setResult] = useState<TDEEResult | null>(null)

  const calculateTDEE = () => {
    if (!weight || !height || !age) {
      alert('Please fill in all fields')
      return
    }

    // Convert to metric
    let weightKg = weight as number
    let heightCm = height as number

    if (weightUnit === 'lb') {
      weightKg = (weight as number) * 0.453592
    }
    if (heightUnit === 'in') {
      heightCm = (height as number) * 2.54
    }

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr: number
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * (age as number) + 5
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * (age as number) - 161
    }

    const activity = parseFloat(activityLevel)
    const tdee = Math.round(bmr * activity)

    // Calculate for all activity levels
    const caloriesByActivity: Record<string, number> = {}
    activityLevels.forEach((level) => {
      caloriesByActivity[level.label] = Math.round(bmr * level.value)
    })

    setResult({
      bmr: Math.round(bmr),
      tdee,
      caloriesByActivity,
    })
  }

  const shareResult = () => {
    if (result) {
      const text = `My TDEE is ${result.tdee} calories/day. Check yours with the HealthHub Pro TDEE Calculator!`
      const url = `https://healthhubpro.com/calculators/tdee?weight=${weight}&height=${height}&age=${age}&gender=${gender}`

      if (navigator.share) {
        navigator.share({
          title: 'TDEE Calculator Result',
          text: text,
          url: url,
        })
      } else {
        navigator.clipboard.writeText(`${text} ${url}`)
        alert('Result copied to clipboard!')
      }
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">TDEE Calculator</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Weight Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Weight</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : '')}
                placeholder="Enter weight"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lb')}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>

          {/* Height Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Height</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value ? parseFloat(e.target.value) : '')}
                placeholder="Enter height"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'in')}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="cm">cm</option>
                <option value="in">in</option>
              </select>
            </div>
          </div>

          {/* Age Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : '')}
              placeholder="Enter age"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Gender Select */}
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Activity Level */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Activity Level</label>
          <div className="space-y-2">
            {activityLevels.map((level) => (
              <label key={level.value} className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted">
                <input
                  type="radio"
                  value={level.value}
                  checked={activityLevel === level.value.toString()}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        <Button onClick={calculateTDEE} size="lg" className="w-full">
          Calculate TDEE
        </Button>
      </Card>

      {/* Results */}
      {result && (
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Basal Metabolic Rate (BMR)</p>
              <p className="text-3xl font-bold text-primary">{result.bmr}</p>
              <p className="text-xs text-muted-foreground mt-2">calories/day</p>
            </div>

            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Daily Energy Expenditure (TDEE)</p>
              <p className="text-3xl font-bold text-primary">{result.tdee}</p>
              <p className="text-xs text-muted-foreground mt-2">calories/day</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <p className="font-semibold text-sm">Calorie Intake for Different Goals:</p>
            <div className="space-y-2 text-sm">
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <p className="font-semibold text-green-900 dark:text-green-200">Weight Loss</p>
                <p className="text-green-800 dark:text-green-300">{Math.round(result.tdee * 0.85)} calories/day (15% deficit)</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <p className="font-semibold text-blue-900 dark:text-blue-200">Maintenance</p>
                <p className="text-blue-800 dark:text-blue-300">{result.tdee} calories/day</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                <p className="font-semibold text-orange-900 dark:text-orange-200">Muscle Gain</p>
                <p className="text-orange-800 dark:text-orange-300">{Math.round(result.tdee * 1.1)} calories/day (10% surplus)</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="font-semibold text-sm mb-3">TDEE by Activity Level:</p>
            <div className="space-y-2 text-sm">
              {Object.entries(result.caloriesByActivity).map(([activity, calories]) => (
                <div key={activity} className="flex justify-between items-center p-2 rounded bg-muted/50">
                  <span className="text-muted-foreground">{activity}</span>
                  <span className="font-semibold">{calories} cal/day</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={shareResult} variant="outline" className="flex-1 gap-2">
              <Share2 className="w-4 h-4" />
              Share Result
            </Button>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This calculator uses the Mifflin-St Jeor equation. Results are estimates and may vary based on individual factors like metabolism, muscle mass, and fitness level. Consult a nutritionist for personalized advice.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
