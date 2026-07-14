'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, Share2 } from 'lucide-react'

interface BMIResult {
  bmi: number
  category: string
  categoryColor: string
  healthRisks: string[]
  recommendations: string[]
}

export function BMICalculator() {
  const [weight, setWeight] = useState<number | ''>('')
  const [height, setHeight] = useState<number | ''>('')
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg')
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm')
  const [result, setResult] = useState<BMIResult | null>(null)

  const calculateBMI = () => {
    if (!weight || !height) {
      alert('Please enter both weight and height')
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

    const heightM = heightCm / 100
    const bmi = weightKg / (heightM * heightM)

    let category = ''
    let categoryColor = ''
    let healthRisks: string[] = []
    let recommendations: string[] = []

    if (bmi < 18.5) {
      category = 'Underweight'
      categoryColor = 'text-blue-600'
      healthRisks = ['Weak immune system', 'Nutritional deficiencies', 'Osteoporosis risk']
      recommendations = ['Consult a healthcare provider', 'Increase caloric intake with healthy foods', 'Consider nutritional supplements if needed']
    } else if (bmi < 25) {
      category = 'Normal Weight'
      categoryColor = 'text-green-600'
      healthRisks = []
      recommendations = ['Maintain current lifestyle', 'Continue regular exercise', 'Eat a balanced diet']
    } else if (bmi < 30) {
      category = 'Overweight'
      categoryColor = 'text-orange-600'
      healthRisks = ['Increased heart disease risk', 'Type 2 diabetes risk', 'High blood pressure']
      recommendations = ['Increase physical activity', 'Reduce caloric intake moderately', 'Consult a healthcare provider']
    } else if (bmi < 35) {
      category = 'Class I Obesity'
      categoryColor = 'text-red-600'
      healthRisks = ['Significantly elevated health risks', 'Sleep apnea risk', 'Joint problems']
      recommendations = ['Medical consultation recommended', 'Structured weight loss program', 'Increase daily physical activity']
    } else if (bmi < 40) {
      category = 'Class II Obesity'
      categoryColor = 'text-red-700'
      healthRisks = ['Severe health complications', 'Metabolic syndrome risk', 'High mortality risk']
      recommendations = ['Urgent medical consultation', 'Professional weight management program', 'Consider medical interventions']
    } else {
      category = 'Class III Obesity'
      categoryColor = 'text-red-800'
      healthRisks = ['Extreme health risks', 'Multiple comorbidities', 'Significantly reduced life expectancy']
      recommendations = ['Immediate medical consultation required', 'Comprehensive weight loss program', 'Consider bariatric options']
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      categoryColor,
      healthRisks,
      recommendations,
    })
  }

  const shareResult = () => {
    if (result) {
      const text = `My BMI is ${result.bmi} (${result.category}). Check yours with the HealthHub Pro BMI Calculator!`
      const url = `https://healthhubpro.com/calculators/bmi?weight=${weight}&height=${height}&weightUnit=${weightUnit}&heightUnit=${heightUnit}`
      
      if (navigator.share) {
        navigator.share({
          title: 'BMI Calculator Result',
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
        <h2 className="text-2xl font-bold mb-6">BMI Calculator</h2>
        
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
        </div>

        <Button onClick={calculateBMI} size="lg" className="w-full">
          Calculate BMI
        </Button>
      </Card>

      {/* Results */}
      {result && (
        <Card className="p-6 space-y-4">
          <div className="text-center py-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
            <p className={`text-5xl font-bold ${result.categoryColor}`}>{result.bmi}</p>
            <p className={`text-lg font-semibold mt-2 ${result.categoryColor}`}>{result.category}</p>
          </div>

          {result.healthRisks.length > 0 && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Associated Health Considerations:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                    {result.healthRisks.map((risk, i) => (
                      <li key={i}>{risk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <p className="font-semibold text-sm">Recommendations:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {result.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          <Button onClick={shareResult} variant="outline" className="w-full gap-2">
            <Share2 className="w-4 h-4" />
            Share Result
          </Button>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Medical Disclaimer:</strong> BMI is a screening tool and does not directly measure body fat. This calculator is for informational purposes only. Consult with a healthcare provider for personalized health advice.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
