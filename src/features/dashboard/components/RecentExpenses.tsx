import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Expense } from '@/features/expenses/types'

export const RecentExpenses = ({ items }: { items: Expense[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Expenses</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex justify-between text-sm">
            <span className="font-bold">{item.category}</span>
            <span>{item.description}</span>
            <span className="text-muted-foreground">
              ₹{item.amount} • {new Date(item.date).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)
