'use client'

import Layout from '@/components/layout/Layout'
import { Loader } from '@/components/ui/loader'
import { BudgetProgress } from '@/features/dashboard/components/BudgetProgress'
import { DailyHighlight } from '@/features/dashboard/components/DailyHighlight'
import { PomodoroStats } from '@/features/dashboard/components/PomodoroStats'
import { RecentExpenses } from '@/features/dashboard/components/RecentExpenses'
import { SkillProgress } from '@/features/dashboard/components/SkillProgress'
import { StreaksHeatmap } from '@/features/dashboard/components/StreaksHeatmap'
import { TasksSummary } from '@/features/dashboard/components/TasksSummary'
import { TotalExpenseCard } from '@/features/dashboard/components/TotalExpenseCard'
import { useTodoStore } from '@/features/focus/hooks/useTodoStore'
import { useQuery } from '@tanstack/react-query'

type Budget = {
  category: string
  used: number
  limit: number
}

export default function DashboardPage() {
  const todos = useTodoStore((s) => s.todos)

  const allSessions = todos.flatMap((todo) => todo.sessions)

  const completed = allSessions.filter((s) => s.focus).length

  const totalTime = allSessions.reduce((sum, s) => sum + s.duration, 0)

  const avgSession =
    allSessions.length > 0 ? Math.round(totalTime / allSessions.length) : 0

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard', {
        cache: 'no-store',
      })
      return res.json()
    },
  })

  if (isLoading || !data) return <Loader message="Loading dashboard…" />

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <div className="col-span-1 grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
          <TasksSummary tasks={todos} />
          <PomodoroStats
            completed={completed}
            totalTime={totalTime}
            avgSession={avgSession}
          />
        </div>

        <div className="col-span-1 grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
          <SkillProgress skills={data.skills} />
          <StreaksHeatmap data={data.streaks} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <DailyHighlight content={data.highlight} />
        </div>
        <TotalExpenseCard total={data.total} />

        <div className="space-y-4">
          {data.budgets.map((budget: Budget) => (
            <BudgetProgress key={budget.category} {...budget} />
          ))}
        </div>
        <div className="col-span-1 md:col-span-2">
          <RecentExpenses items={data.recentExpenses} />
        </div>
      </div>
    </Layout>
  )
}
