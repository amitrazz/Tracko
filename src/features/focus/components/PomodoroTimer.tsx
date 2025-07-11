'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface PomodoroTimerProps {
  focusMinutes?: number
  breakMinutes?: number
  onSessionComplete?: (session: {
    startedAt: string
    endedAt: string
    duration: number
    focus: boolean
  }) => void
}

export const PomodoroTimer = ({
  focusMinutes = 90,
  breakMinutes = 15,
  onSessionComplete,
}: PomodoroTimerProps) => {
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const sessionStartRef = useRef<Date | null>(null)

  const total = isBreak ? breakMinutes * 60 : focusMinutes * 60
  const percent = (1 - secondsLeft / total) * 100
  const format = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  // Start/pause logic
  useEffect(() => {
    if (!isRunning) return

    if (!sessionStartRef.current) {
      sessionStartRef.current = new Date()
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          const endedAt = new Date()
          const startedAt = sessionStartRef.current ?? endedAt
          const duration = Math.floor(
            (endedAt.getTime() - startedAt.getTime()) / 60000,
          )

          // Fire session complete callback
          if (onSessionComplete) {
            onSessionComplete({
              startedAt: startedAt.toISOString(),
              endedAt: endedAt.toISOString(),
              duration,
              focus: !isBreak,
            })
          }

          // Reset state for next phase
          setIsRunning(false)
          setIsBreak((prevBreak) => !prevBreak)
          setSecondsLeft(isBreak ? focusMinutes * 60 : breakMinutes * 60)
          sessionStartRef.current = null

          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current!)
  }, [isRunning, isBreak])

  // Reset logic
  const handleReset = () => {
    clearInterval(intervalRef.current!)
    setIsRunning(false)
    setSecondsLeft(isBreak ? breakMinutes * 60 : focusMinutes * 60)
    sessionStartRef.current = null
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-48 w-48">
        <CircularProgressbar
          value={percent}
          text={format(secondsLeft)}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: isBreak ? '#10b981' : '#4f46e5',
            textColor: '#111827',
            trailColor: '#e5e7eb',
          })}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  )
}
