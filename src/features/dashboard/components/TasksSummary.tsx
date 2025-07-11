// features/dashboard/components/TasksSummary.tsx

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Todo } from '@/features/focus/types'
import { format } from 'date-fns/format'
import { ListChecks } from 'lucide-react'

interface TasksSummaryProps {
  tasks: Todo[]
}

export const TasksSummary = ({ tasks }: TasksSummaryProps) => {
  const completed = tasks.filter((t) => t.done).length
  const total = tasks.length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">✅ Tasks Summary</CardTitle>
        <ListChecks className="text-muted-foreground h-5 w-5" />
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="text-muted-foreground text-sm">
          {completed} of {total} tasks completed
        </div>

        <ul className="space-y-1 text-sm">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-muted/50 flex items-center justify-between rounded-md border px-3 py-1"
            >
              <span
                className={
                  task.done ? 'text-muted-foreground line-through' : ''
                }
              >
                {task.completedAt && format(task.completedAt, 'dd MMM')}{' '}
                {task.task}
              </span>
              <Badge variant={task.done ? 'outline' : 'secondary'}>
                {task.done ? 'Done' : 'Pending'}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
