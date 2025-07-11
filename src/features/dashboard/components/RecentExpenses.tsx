import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const RecentExpenses = ({ items }: { items: Array<{ category: string; amount: number; date: string }> }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Expenses</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex justify-between text-sm">
            <span>{item.category}</span>
            <span className="text-muted-foreground">₹{item.amount} • {new Date(item.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)
