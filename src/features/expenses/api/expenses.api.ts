import { Expense } from "@/features/expenses/types"

export const fetchExpenses = async (): Promise<Expense[]> => {
  const res = await fetch('/api/expenses')
  if (!res.ok) throw new Error('Failed to fetch expenses')
  return res.json()
}

export const createExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
  const res = await fetch('/api/expenses', {
    method: 'POST',
    body: JSON.stringify(expense),
    headers: { 'Content-Type': 'application/json' },
  })
  return res.json()
}

export const updateExpense = async (expense: Expense): Promise<Expense> => {
  const res = await fetch(`/api/expenses/${expense.id}`, {
    method: 'PUT',
    body: JSON.stringify(expense),
    headers: { 'Content-Type': 'application/json' },
  })
  return res.json()
}

export const deleteExpense = async (id: string): Promise<void> => {
  await fetch(`/api/expenses/${id}`, { method: 'DELETE' })
}
