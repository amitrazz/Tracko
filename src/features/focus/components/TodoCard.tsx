'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  PRIORITY_COLORS,
  PRIORITY_LABELS,
  PRIORITY_VALUES,
  Priority,
  Todo,
} from '@/features/focus/types'
import { FlatSkill } from '@/features/skills/types'

type Props = {
  todo: Todo
  isActive: boolean
  skills: FlatSkill[]
  onSetActive: () => void
  onToggle: () => void
  onPriorityChange: (priority: Priority) => void
  onSkillChange: (skillId: string) => void
}

export const TodoCard = ({
  todo,
  isActive,
  skills,
  onToggle,
  onSetActive,
  onPriorityChange,
  onSkillChange,
}: Props) => {
  return (
    <div
      className={`dark:bg-muted flex flex-col gap-3 rounded-xl border p-4 shadow-sm ${
        isActive ? 'border-primary/70 ring-primary/30 ring-1' : 'bg-white'
      }`}
    >
      {/* Top Row: Task + Set Active */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Checkbox checked={todo.done} onCheckedChange={onToggle} />
          <div className="space-y-1">
            <p
              className={
                todo.done ? 'text-muted-foreground line-through' : 'font-medium'
              }
            >
              {todo.dueDate} {':'}
              {todo.task}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant={isActive ? 'default' : 'outline'}
          onClick={onSetActive}
        >
          {isActive ? 'Active' : 'Set Active'}
        </Button>
      </div>

      {/* Bottom Row: Skill & Priority */}
      <div className="text-muted-foreground flex gap-4 text-xs">
        {/* Skill Dropdown */}
        <div className="w-1/2">
          <Select
            value={todo.skillId ?? ''}
            onValueChange={(value) => onSkillChange(value)}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(skills) &&
                skills.map((skill) => (
                  <SelectItem key={skill.id} value={skill.id}>
                    {skill.name}{' '}
                    <span className="text-muted-foreground text-[10px]">
                      ({skill.group})
                    </span>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Priority Dropdown */}
        <div className="w-1/2">
          <Select
            value={todo.priority}
            onValueChange={(value: Priority) => onPriorityChange(value)}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRIORITY_VALUES.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  <span className={PRIORITY_COLORS[priority]}>
                    {PRIORITY_LABELS[priority]}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
