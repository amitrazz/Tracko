// app/api/dashboard-data/route.ts

import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    total: 10456.35,
    budgets: [
      { category: "Food", used: 4000, limit: 5000 },
      { category: "Rent", used: 6000, limit: 6000 },
    ],
    recentExpenses: [
      { category: "Groceries", amount: 600, date: new Date().toISOString() },
      { category: "Cafe", amount: 200, date: new Date().toISOString() },
    ],
    tasks: [
      { id: 1, title: "Fix bug #239", done: true },
      { id: 2, title: "Review PRs", done: false },
    ],
    skills: [
      { name: "DSA", percentage: 40 },
      { name: "JavaScript", percentage: 70 },
    ],
    streaks: [
      { date: "2025-07-11", level: 4 },
      { date: "2025-07-10", level: 3 },
      { date: "2025-07-09", level: 2 },
    ],
    highlight: "Finished 3 DSA problems and refactored dashboard.",
  }

  return NextResponse.json(data)
}
