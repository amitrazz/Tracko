// features/dashboard/components/SkillProgress.tsx

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { GraduationCap } from "lucide-react"

interface SkillProgressItem {
  name: string
  percentage: number // 0–100
}

interface SkillProgressProps {
  skills: SkillProgressItem[]
}

export const SkillProgress = ({ skills }: SkillProgressProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>📚 Skill Progress</CardTitle>
        <GraduationCap className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
              <span>{skill.name}</span>
              <Badge
                variant={
                  skill.percentage === 100
                    ? "outline"
                    : skill.percentage >= 75
                    ? "default"
                    : skill.percentage >= 50
                    ? "secondary"
                    : "outline"
                }
              >
                {skill.percentage}%
              </Badge>
            </div>
            <Progress
              value={skill.percentage}
              className={cn(skill.percentage >= 100 && "bg-green-600")}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
