'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTodoStore } from '@/features/focus/hooks/useTodoStore'
import {
  PRIORITY_LABELS,
  PRIORITY_VALUES,
  Priority,
} from '@/features/focus/types'
import { FlatSkill } from '@/features/skills/types'
import { useState } from 'react'
import { TodoCard } from './TodoCard'

type Props = {
  skills: FlatSkill[]
}

export const TodoList = ({ skills }: Props) => {
  const [task, setTask] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [skillId, setSkillId] = useState<string>('')

  const add = useTodoStore((s) => s.add)
  const todos = useTodoStore((s) => s.todos)
  const toggle = useTodoStore((s) => s.toggle)
  const activeTodoId = useTodoStore((s) => s.activeTodoId)
  const setActiveTodo = useTodoStore((s) => s.setActiveTodo)
  const updatePriority = useTodoStore((s) => s.updatePriority)
  const updateSkill = useTodoStore((s) => s.updateSkill)

  return (
    <div className="w-full max-w-lg space-y-4">
      {/* Add New Task Form */}
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div className="flex gap-2">
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="h-9 w-full text-xs"
          />
          {/* Skill dropdown */}
          <Select value={skillId} onValueChange={setSkillId}>
            <SelectTrigger className="h-9 w-1/2 text-xs">
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent>
              {skills.map((skill) => (
                <SelectItem key={skill.id} value={skill.id}>
                  {skill.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Priority dropdown */}
          <Select
            value={priority}
            onValueChange={(value) => setPriority(value as Priority)}
          >
            <SelectTrigger className="h-9 w-1/2 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRIORITY_VALUES.map((p) => (
                <SelectItem key={p} value={p}>
                  {PRIORITY_LABELS[p]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => {
            if (task.trim()) {
              add(task, priority, skillId || undefined, dueDate || undefined)
              setTask('')
              setSkillId('')
              setPriority('medium')
            }
          }}
        >
          Add
        </Button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            isActive={todo.id === activeTodoId}
            skills={skills}
            onSetActive={() => setActiveTodo(todo.id)}
            onToggle={() => toggle(todo.id)}
            onPriorityChange={(p) => updatePriority(todo.id, p)}
            onSkillChange={(sid) => updateSkill(todo.id, sid)}
          />
        ))}
      </div>
    </div>
  )
}
