// features/dashboard/components/TasksSummary.tsx

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListChecks } from "lucide-react"

interface Task {
  id: number | string
  title: string
  done: boolean
}

interface TasksSummaryProps {
  tasks: Task[]
}

export const TasksSummary = ({ tasks }: TasksSummaryProps) => {
  const completed = tasks.filter((t) => t.done).length
  const total = tasks.length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">✅ Tasks Summary</CardTitle>
        <ListChecks className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="text-sm text-muted-foreground">
          {completed} of {total} tasks completed
        </div>

        <ul className="text-sm space-y-1">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border rounded-md px-3 py-1 bg-muted/50"
            >
              <span className={task.done ? "line-through text-muted-foreground" : ""}>
                {task.title}
              </span>
              <Badge variant={task.done ? "outline" : "secondary"}>
                {task.done ? "Done" : "Pending"}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
