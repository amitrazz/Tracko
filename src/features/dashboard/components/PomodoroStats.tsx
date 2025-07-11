// features/dashboard/components/PomodoroStats.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClockIcon } from "lucide-react"

interface PomodoroStatsProps {
  completed: number        // Number of Pomodoro sessions completed
  totalTime: number        // Total focus time in minutes
  avgSession: number       // Average session duration in minutes
}

export const PomodoroStats = ({ completed, totalTime, avgSession }: PomodoroStatsProps) => {
  const hours = Math.floor(totalTime / 60)
  const minutes = totalTime % 60

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">🧠 Pomodoro Stats</CardTitle>
        <ClockIcon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Sessions Completed</span>
          <span className="font-medium">{completed}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Focus Time</span>
          <span className="font-medium">
            {hours > 0 ? `${hours}h ` : ""}
            {minutes}m
          </span>
        </div>
        <div className="flex justify-between">
          <span>Avg. Session</span>
          <span className="font-medium">{avgSession} mins</span>
        </div>
      </CardContent>
    </Card>
  )
}
