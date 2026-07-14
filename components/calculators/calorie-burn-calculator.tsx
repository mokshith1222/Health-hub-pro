'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Copy } from 'lucide-react'

export function CalorieBurnCalculator() {
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('light')
  const [duration, setDuration] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const activities: Record<string, number> = {
    walking: 3.5,
    running: 9.8,
    cycling: 7.5,
    swimming: 8.0,
    weight_training: 6.0,
    yoga: 2.5,
    dancing: 5.5,
    hiking: 6.0,
    light: 3.0,
  }

  const calculate = () => {
    if (!weight || !duration) return
    const caloriesBurned = (parseFloat(weight) * activities[activity] * parseFloat(duration)) / 60
    setResult(Math.round(caloriesBurned * 10) / 10)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Calorie Burn Calculator</h2>
        
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
            <label className="block text-sm font-medium mb-2">Activity Type</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="light">Light Activity (3 METs)</option>
              <option value="walking">Walking (3.5 METs)</option>
              <option value="cycling">Cycling (7.5 METs)</option>
              <option value="swimming">Swimming (8 METs)</option>
              <option value="running">Running (9.8 METs)</option>
              <option value="weight_training">Weight Training (6 METs)</option>
              <option value="yoga">Yoga (2.5 METs)</option>
              <option value="dancing">Dancing (5.5 METs)</option>
              <option value="hiking">Hiking (6 METs)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Calories Burned
          </Button>
        </div>

        {result !== null && (
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Estimated Calories Burned</p>
            <p className="text-4xl font-bold text-accent">{result}</p>
            <p className="text-xs text-muted-foreground mt-2">kcal</p>
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
          Copy Result
        </Button>
      </div>
    </div>
  )
}
