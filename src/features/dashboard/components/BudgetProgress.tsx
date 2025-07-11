import { Progress } from "@/components/ui/progress";

export const BudgetProgress = ({ category, used, limit }: { category: string; used: number; limit: number }) => {
  const percentage = Math.min((used / limit) * 100, 100)

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm font-medium">
        <span>{category}</span>
        <span>
          ₹{used} / ₹{limit}
        </span>
      </div>
      <Progress value={percentage} className={percentage >= 100 ? "bg-destructive" : ""} />
    </div>
  )
}
