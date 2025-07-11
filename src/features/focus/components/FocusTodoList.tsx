'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export const FocusTodoList = () => {
  const [todos, setTodos] = useState<{ task: string; done: boolean }[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (!input.trim()) return
    setTodos((prev) => [...prev, { task: input, done: false }])
    setInput('')
  }

  const toggleTodo = (index: number) => {
    setTodos((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t)),
    )
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add a focus task…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-muted-foreground text-sm">No focus tasks yet.</p>
        ) : (
          todos.map((todo, i) => (
            <div key={i} className="flex items-center gap-2">
              <Checkbox
                checked={todo.done}
                onCheckedChange={() => toggleTodo(i)}
              />
              <span
                className={
                  todo.done ? 'text-muted-foreground line-through' : ''
                }
              >
                {todo.task}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
