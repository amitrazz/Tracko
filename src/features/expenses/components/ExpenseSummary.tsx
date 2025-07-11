import { Card, CardContent } from '@/components/ui/card'

export default function ExpenseSummary() {
  return (
    <div>
      <Card>
        <CardContent>
          <p className="text-muted-foreground text-sm">Total Spent</p>
          <p className="text-xl font-bold text-red-600">₹12,450</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-muted-foreground text-sm">Budget</p>
          <p className="text-xl font-bold text-green-600">₹20,000</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-muted-foreground text-sm">Remaining</p>
          <p className="text-xl font-bold">₹7,550</p>
        </CardContent>
      </Card>
    </div>
  )
}
