'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function EyeHealthAssessment() {
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)

  const symptomList = [
    'Blurred vision',
    'Eye strain',
    'Dry eyes',
    'Floaters',
    'Light sensitivity',
    'Reading difficulty',
    'Screen fatigue',
  ]

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom])
  }

  const assess = () => {
    if (symptoms.length === 0) {
      setResult('No symptoms reported - maintain regular eye care routine')
      return
    }

    let assessment = 'Recommendations: '
    
    if (symptoms.includes('Eye strain') || symptoms.includes('Screen fatigue')) {
      assessment += 'Follow 20-20-20 rule (every 20 min, look at 20 ft for 20 sec). '
    }
    if (symptoms.includes('Dry eyes')) {
      assessment += 'Use artificial tears and take screen breaks. '
    }
    if (symptoms.includes('Blurred vision')) {
      assessment += 'Schedule eye exam with optometrist. '
    }
    if (symptoms.includes('Light sensitivity')) {
      assessment += 'Use blue light glasses and reduce screen brightness. '
    }
    
    assessment += 'Consider regular eye checkups.'
    setResult(assessment)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Eye Health Assessment</h2>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Select any symptoms you&apos;re experiencing:</p>
          
          <div className="space-y-2">
            {symptomList.map(symptom => (
              <label key={symptom} className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-muted">
                <input
                  type="checkbox"
                  checked={symptoms.includes(symptom)}
                  onChange={() => toggleSymptom(symptom)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">{symptom}</span>
              </label>
            ))}
          </div>

          <Button onClick={assess} className="w-full">
            Get Assessment
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm font-medium text-accent">{result}</p>
          </div>
        )}
      </Card>
    </div>
  )
}
