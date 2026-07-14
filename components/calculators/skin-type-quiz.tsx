'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Copy } from 'lucide-react'

export function SkinTypeQuiz() {
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [result, setResult] = useState('')

  const questions = [
    { q: 'How does your skin feel 2 hours after cleansing?', options: [{ text: 'Tight and dry', score: 0 }, { text: 'Balanced', score: 2 }, { text: 'Oily', score: 4 }] },
    { q: 'Do you experience breakouts often?', options: [{ text: 'Rarely', score: 0 }, { text: 'Sometimes', score: 2 }, { text: 'Frequently', score: 4 }] },
    { q: 'How does your skin look in natural light?', options: [{ text: 'Matte and rough', score: 0 }, { text: 'Smooth and clear', score: 2 }, { text: 'Shiny and oily', score: 4 }] },
  ]

  const handleAnswer = (questionScore: number) => {
    const newScore = score + questionScore
    setScore(newScore)
    
    if (newScore >= questions.length * 3) {
      if (newScore <= 3) setResult('Dry Skin')
      else if (newScore <= 6) setResult('Normal Skin')
      else setResult('Oily Skin')
      setCompleted(true)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Skin Type Assessment</h2>
        
        <div className="space-y-6">
          {!completed ? (
            <>
              <p className="text-muted-foreground">Answer a few questions to determine your skin type</p>
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <p className="font-medium mb-3">{q.q}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <Button
                          key={optIdx}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleAnswer(opt.score)}
                        >
                          {opt.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Your Skin Type</p>
              <p className="text-3xl font-bold text-accent mb-3">{result}</p>
              <p className="text-sm text-muted-foreground">
                {result === 'Dry Skin' && 'Focus on hydrating products and moisturizers'}
                {result === 'Normal Skin' && 'Maintain a balanced skincare routine with gentle products'}
                {result === 'Oily Skin' && 'Use oil-control products and keep skin clean'}
              </p>
            </div>
          )}
        </div>
      </Card>

      {completed && (
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => { setCompleted(false); setScore(0) }}>
            Retake Quiz
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      )}
    </div>
  )
}
