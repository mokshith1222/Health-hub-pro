'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Copy, AlertCircle } from 'lucide-react'

export function DosageCalculator() {
  const [weight, setWeight] = useState('')
  const [medicineConcentration, setMedicineConcentration] = useState('')
  const [concentration, setConcentration] = useState('mg/mL')
  const [dosePerKg, setDosePerKg] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    if (!weight || !medicineConcentration || !dosePerKg) return
    
    const totalDose = parseFloat(weight) * parseFloat(dosePerKg)
    const volume = totalDose / parseFloat(medicineConcentration)
    
    setResult(Math.round(volume * 100) / 100)
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg flex gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          This calculator is for educational purposes only. Always consult a healthcare professional before administering medications.
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Dosage Calculator</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Patient Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 70"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dose per kg</label>
              <input
                type="number"
                value={dosePerKg}
                onChange={(e) => setDosePerKg(e.target.value)}
                placeholder="e.g., 5"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Medicine Concentration</label>
              <input
                type="number"
                value={medicineConcentration}
                onChange={(e) => setMedicineConcentration(e.target.value)}
                placeholder="e.g., 50"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <select
                value={concentration}
                onChange={(e) => setConcentration(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="mg/mL">mg/mL</option>
                <option value="mcg/mL">mcg/mL</option>
                <option value="IU/mL">IU/mL</option>
              </select>
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Dosage
          </Button>
        </div>

        {result !== null && (
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Required Volume</p>
            <p className="text-4xl font-bold text-accent">{result}</p>
            <p className="text-xs text-muted-foreground mt-2">mL</p>
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
