'use client'

import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ExpenseForm from '@/features/expenses/components/ExpenseForm'
import { Expense } from '@/features/expenses/types'
import { useExpenses } from '@/features/expenses/useExpenses'
import { format } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function ExpensesPage() {
  const { expenses, isLoading, deleteExpense, addExpense, updateExpense } =
    useExpenses()

  const [open, setOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const budget = 250000 // Example budget, replace with actual budget logic
  const remaining = budget - totalSpent

  const handleSave = (data: Omit<Expense, 'id'>) => {
    if (selectedExpense) {
      console.log('Updating expense:', selectedExpense.id, data)
      updateExpense.mutate({ ...selectedExpense, ...data })
    } else {
      addExpense.mutate(data)
    }
    setSelectedExpense(null)
  }

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Expense Tracker</h2>
        <Dialog
          open={open}
          onOpenChange={(val) => {
            setOpen(val)
            if (!val) setSelectedExpense(null)
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setSelectedExpense(null)
                setOpen(true)
              }}
            >
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ExpenseForm
              defaultValues={selectedExpense || undefined}
              onSubmit={handleSave}
              onClose={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Total Spent</p>
            <p className="text-xl font-bold text-red-600">
              ₹{totalSpent.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Budget</p>
            <p className="text-xl font-bold text-green-600">
              ₹{budget.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Remaining</p>
            <p
              className={`text-xl font-bold ${remaining < 0 ? 'text-red-600' : ''}`}
            >
              {remaining >= 0
                ? `₹${remaining.toLocaleString()}`
                : `-₹${Math.abs(remaining).toLocaleString()}`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Expense Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading…
                </TableCell>
              </TableRow>
            ) : expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No expenses found.
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{format(e.date, 'dd MMM')}</TableCell>
                  <TableCell>{e.category}</TableCell>
                  <TableCell>{e.description}</TableCell>
                  <TableCell className="text-right">
                    ₹{e.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedExpense(e)
                        setOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        console.log('Deleting expense:', expenses)
                        console.log('Deleting expense:', e.id)
                        deleteExpense.mutate(e.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}
