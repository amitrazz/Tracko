import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { format as formatDate } from 'date-fns'
import { Trash2 } from 'lucide-react'

type Expense = {
  id: string
  date: string
  amount: number
  category: string
  description: string
}

export default function ExpensesList() {
  const { data: expenses, isLoading } = useQuery<Expense[]>({
    queryKey: ['expenses-data'],
    queryFn: async () => {
      const res = await fetch('/src/features/expenses/api', {
        cache: 'no-store',
      })
      return res.json()
    },
  })
  if (isLoading) return <p>Loading...</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(expenses) &&
          expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{formatDate(expense.date, 'dd MMM')}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>₹{expense.amount}</TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
