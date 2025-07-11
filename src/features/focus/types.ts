export type Priority = 'low' | 'medium' | 'high'

export const PRIORITY_VALUES: Priority[] = ['low', 'medium', 'high']

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
}

export type PomodoroSession = {
  id: string
  startedAt: string
  endedAt: string
  duration: number
  focus: boolean
}

export type Todo = {
  id: string
  task: string
  done: boolean
  createdAt: string
  completedAt?: string
  priority: Priority
  skillId?: string
  dueDate?: string
  sessions: PomodoroSession[]
}
