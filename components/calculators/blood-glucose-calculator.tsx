'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Copy } from 'lucide-react'

export function BloodGlucoseCalculator() {
  const [glucose, setGlucose] = useState('')
  const [testType, setTestType] = useState('fasting')
  const [result, setResult] = useState<{ category: string; recommendation: string; color: string } | null>(null)

  const calculate = () => {
    if (!glucose) return
    
    const value = parseFloat(glucose)
    let category = ''
    let recommendation = ''
    let color = ''
    
    if (testType === 'fasting') {
      if (value < 100) {
        category = 'Normal'
        color = 'text-green-600'
        recommendation = 'Healthy fasting blood glucose level'
      } else if (value < 126) {
        category = 'Prediabetes'
        color = 'text-yellow-600'
        recommendation = 'Monitor regularly and consult healthcare provider'
      } else {
        category = 'Diabetes'
        color = 'text-red-600'
        recommendation = 'Consult healthcare provider for diagnosis confirmation'
      }
    } else if (testType === 'random') {
      if (value < 140) {
        category = 'Normal'
        color = 'text-green-600'
        recommendation = 'Healthy random blood glucose level'
      } else if (value < 200) {
        category = 'Borderline'
        color = 'text-yellow-600'
        recommendation = 'Monitor and consult healthcare provider'
      } else {
        category = 'High'
        color = 'text-red-600'
        recommendation = 'Consult healthcare provider immediately'
      }
    } else {
      if (value < 140) {
        category = 'Normal'
        color = 'text-green-600'
        recommendation = 'Good glucose control'
      } else if (value < 180) {
        category = 'High'
        color = 'text-yellow-600'
        recommendation = 'Monitor glucose levels'
      } else {
        category = 'Very High'
        color = 'text-red-600'
        recommendation = 'Consult healthcare provider'
      }
    }
    
    setResult({ category, recommendation, color })
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Blood Glucose Calculator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Test Type</label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="fasting">Fasting (8+ hours)</option>
              <option value="random">Random (any time)</option>
              <option value="postmeal">Post-meal (2 hours after)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Blood Glucose (mg/dL)</label>
            <input
              type="number"
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              placeholder="e.g., 100"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button onClick={calculate} className="w-full">
            Check Glucose Level
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className={`text-sm font-medium ${result.color} mb-2`}>{result.category}</p>
            <p className="text-muted-foreground">{result.recommendation}</p>
          </div>
        )}
      </Card>

      <div className="space-y-2 text-xs text-muted-foreground p-4 bg-card border rounded-lg">
        <h3 className="font-semibold text-sm mb-2">Glucose Reference Ranges</h3>
        <p className="flex justify-between"><span className="font-medium">Fasting:</span> <span>&lt;100 mg/dL (Normal)</span></p>
        <p className="flex justify-between"><span></span> <span>100-125 mg/dL (Prediabetes)</span></p>
        <p className="flex justify-between"><span></span> <span>≥126 mg/dL (Diabetes)</span></p>
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
