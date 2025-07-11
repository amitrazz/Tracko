'use client'

import { Loader } from '@/components/ui/loader'
import { BudgetProgress } from '@/features/dashboard/components/BudgetProgress'
import { DailyHighlight } from '@/features/dashboard/components/DailyHighlight'
import { PomodoroStats } from '@/features/dashboard/components/PomodoroStats'
import { RecentExpenses } from '@/features/dashboard/components/RecentExpenses'
import { SkillProgress } from '@/features/dashboard/components/SkillProgress'
import { StreaksHeatmap } from '@/features/dashboard/components/StreaksHeatmap'
import { TasksSummary } from '@/features/dashboard/components/TasksSummary'
import { TotalExpenseCard } from '@/features/dashboard/components/TotalExpenseCard'
import { useQuery } from '@tanstack/react-query'

type Budget = {
  category: string
  used: number
  limit: number
}

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard-data', {
        cache: 'no-store',
      })
      if (!res.ok) {
        throw new Error('Failed to fetch dashboard data')
      }
      return res.json()
    },
  })

  if (isLoading || !data) return <Loader message="Loading dashboard…" />

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
      <div className="col-span-1 md:col-span-2">
        <DailyHighlight content={data.highlight} />
      </div>

      <div className="col-span-1 grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
        <TasksSummary tasks={data.tasks} />
        <PomodoroStats completed={4} totalTime={180} avgSession={45} />
      </div>

      <div className="col-span-1 grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
        <SkillProgress skills={data.skills} />
        <StreaksHeatmap data={data.streaks} />
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
  )
}
