// app/api/dashboard-data/route.ts

import { expenses } from '@/features/expenses/lib/expensesStore'
import { NextResponse } from 'next/server'

export async function GET() {
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2)

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const total = expenses
    .filter((e) => {
      const date = new Date(e.date)
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      )
    })
    .reduce((sum, e) => sum + e.amount, 0)
  const data = {
    total,
    budgets: [
      { category: 'Food', used: 4000, limit: 5000 },
      { category: 'Rent', used: 6000, limit: 6000 },
    ],
    recentExpenses,
    tasks: [
      { id: 1, title: 'Fix bug #239', done: true },
      { id: 2, title: 'Review PRs', done: false },
    ],
    skills: [
      { name: 'DSA', percentage: 40 },
      { name: 'JavaScript', percentage: 70 },
    ],
    streaks: [
      { date: '2025-07-11', level: 4 },
      { date: '2025-07-10', level: 3 },
      { date: '2025-07-09', level: 2 },
    ],
    highlight: 'Finished 3 DSA problems and refactored dashboard.',
  }

  return NextResponse.json(data)
}
