import { BudgetProgress } from "@/features/dashboard/components/BudgetProgress"
import { DailyHighlight } from "@/features/dashboard/components/DailyHighlight"
import { PomodoroStats } from "@/features/dashboard/components/PomodoroStats"
import { RecentExpenses } from "@/features/dashboard/components/RecentExpenses"
import { SkillProgress } from "@/features/dashboard/components/SkillProgress"
import { StreaksHeatmap } from "@/features/dashboard/components/StreaksHeatmap"
import { TasksSummary } from "@/features/dashboard/components/TasksSummary"
import { TotalExpenseCard } from "@/features/dashboard/components/TotalExpenseCard"

export default async function DashboardPage() {
  // Replace with TanStack `useQuery` or SSR later
  const total = 10456.35
  const budgets = [
    { category: "Food", used: 4000, limit: 5000 },
    { category: "Rent", used: 6000, limit: 6000 },
  ]
  const recentExpenses = [
    { category: "Groceries", amount: 600, date: new Date().toISOString() },
    { category: "Cafe", amount: 200, date: new Date().toISOString() },
  ]
  const tasks = [
    { id: 1, title: "Fix bug #239", done: true },
    { id: 2, title: "Review PRs", done: false },
  ]
  const skills = [
    { name: "DSA", percentage: 40 },
    { name: "JavaScript", percentage: 70 },
  ]
  const streaks = [/* heatmap data */]
  const highlight = "Finished 3 DSA problems and refactored dashboard."

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="col-span-1 md:col-span-2">
        <DailyHighlight content={highlight} />
      </div>

      <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <TasksSummary tasks={tasks} />
        <PomodoroStats completed={4} totalTime={180} avgSession={45} />
      </div>

      <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkillProgress skills={skills} />
        <StreaksHeatmap data={streaks} />
      </div>
      <TotalExpenseCard total={total} />

      <div className="space-y-4">
        {budgets.map((b) => (
          <BudgetProgress key={b.category} {...b} />
        ))}
      </div>
      <div className="col-span-1 md:col-span-2">
        <RecentExpenses items={recentExpenses} />
      </div>
    </div>
  )
}
