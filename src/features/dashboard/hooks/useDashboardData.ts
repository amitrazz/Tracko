
export const TotalExpenseCard = ({ total }: { total: number }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Total Expenses (This Month)</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-destructive">₹{total.toFixed(2)}</p>
    </CardContent>
  </Card>
)
