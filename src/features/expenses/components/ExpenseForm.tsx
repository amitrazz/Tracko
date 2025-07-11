'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Expense } from '@/features/expenses/types'
import { useState } from 'react'

type Props = {
  defaultValues?: Partial<Expense>
  onSubmit: (data: Omit<Expense, 'id'>) => void
  onClose: () => void
}

export default function ExpenseForm({
  defaultValues,
  onSubmit,
  onClose,
}: Props) {
  const [form, setForm] = useState<Omit<Expense, 'id'>>({
    date: '',
    category: '',
    amount: 0,
    description: '',
    ...defaultValues,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }))
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
        onClose()
      }}
    >
      <Input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <Input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <Input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <Input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <div className="flex justify-end gap-2">
        <Button variant="ghost" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
