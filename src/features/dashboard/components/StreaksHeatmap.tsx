// features/dashboard/components/StreaksHeatmap.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FlameIcon } from "lucide-react"

type StreakDay = {
  date: string // ISO format
  level: number // 0 = no activity, 1-4 = increasing activity
}

interface StreaksHeatmapProps {
  data: StreakDay[]
}

export const StreaksHeatmap = ({ data }: StreaksHeatmapProps) => {
  const grid = Array.from({ length: 35 }) // 5 weeks
  const paddedData = [...data].slice(-35).reverse()

  const getColor = (level: number) => {
    return cn(
      "w-4 h-4 rounded-sm",
      level === 0 && "bg-muted",
      level === 1 && "bg-green-100",
      level === 2 && "bg-green-300",
      level === 3 && "bg-green-500",
      level >= 4 && "bg-green-700"
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>🔥 Activity Streak</CardTitle>
        <FlameIcon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {grid.map((_, idx) => {
            const day = paddedData[idx]
            return (
              <div
                key={idx}
                className={getColor(day?.level || 0)}
                title={day?.date}
              />
            )
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Past 5 weeks of tracked activity
        </p>
      </CardContent>
    </Card>
  )
}
