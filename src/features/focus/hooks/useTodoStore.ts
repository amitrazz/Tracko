import { PomodoroSession, Priority, Todo } from '@/features/focus/types'
import { nanoid } from 'nanoid'
import { create } from 'zustand'

type Store = {
  todos: Todo[]
  activeTodoId: string | null
  add: (
    task: string,
    priority?: Priority,
    skillId?: string,
    dueDate?: string,
  ) => void
  toggle: (id: string) => void
  setActiveTodo: (id: string | null) => void
  logSession: (id: string, session: PomodoroSession) => void
  updatePriority: (id: string, priority: Priority) => void
  updateSkill: (id: string, skillId: string) => void
}

export const useTodoStore = create<Store>((set) => ({
  todos: [],
  activeTodoId: null,

  add: (task, priority = 'medium', skillId, dueDate) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: nanoid(),
          task,
          done: false,
          createdAt: new Date().toISOString(),
          priority,
          skillId,
          dueDate,
          sessions: [],
        },
      ],
    })),

  toggle: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              done: !todo.done,
              completedAt: !todo.done ? new Date().toISOString() : undefined,
            }
          : todo,
      ),
    })),

  setActiveTodo: (id) => set(() => ({ activeTodoId: id })),

  logSession: (id, session) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, sessions: [...todo.sessions, session] }
          : todo,
      ),
    })),

  updatePriority: (id, priority) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, priority } : todo,
      ),
    })),

  updateSkill: (id, skillId) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, skillId } : todo,
      ),
    })),
}))
