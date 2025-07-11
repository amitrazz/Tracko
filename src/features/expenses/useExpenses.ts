import { Expense } from '@/features/expenses/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const API_URL = '/api/expenses'

export function useExpenses() {
  const queryClient = useQueryClient()

  const {
    data: expenses = [],
    isLoading,
    isError,
    error,
  } = useQuery<Expense[]>({
    queryKey: ['expenses'],
    queryFn: async () => {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Failed to fetch expenses')
      return res.json()
    },
  })

  const addExpense = useMutation({
    mutationFn: async (newExpense: Omit<Expense, 'id'>) => {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      })
      if (!res.ok) throw new Error('Failed to add expense')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })

  const updateExpense = useMutation({
    mutationFn: async (updated: Expense) => {
      const res = await fetch(`${API_URL}/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (!res.ok) throw new Error('Failed to update expense')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })

  const deleteExpense = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete expense')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })

  return {
    expenses,
    isLoading,
    isError,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
  }
}
