// features/dashboard/components/DailyHighlight.tsx

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface DailyHighlightProps {
  content?: string
}

export const DailyHighlight = ({ content = "" }: DailyHighlightProps) => {
  const [value, setValue] = useState(content)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // TODO: Hook this into backend or local storage
    console.log("Saved Highlight:", value)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>📓 Daily Highlight</CardTitle>
        <CardDescription>What did you focus on or achieve today?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="E.g. Solved 3 DSA problems, fixed dashboard state bug..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button onClick={handleSave} variant="default">
            {saved ? "Saved!" : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
