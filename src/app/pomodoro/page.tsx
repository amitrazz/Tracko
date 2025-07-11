'use client'

import Layout from '@/components/layout/Layout'
import { Loader } from '@/components/ui/loader'
import { PomodoroTimer } from '@/features/focus/components/PomodoroTimer'
import { TodoList } from '@/features/focus/components/TodoList'
import { Skill, SkillGroup } from '@/features/skills/types'
import { useQuery } from '@tanstack/react-query'

export default function PomodoroPage() {
  const { data: skillGroups, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const response = await fetch('/api/skills')
      if (!response.ok) {
        throw new Error('Failed to fetch skills')
      }
      return response.json()
    },
  })

  if (isLoading || !skillGroups) return <Loader message="Loading ..." />

  const flatSkills = skillGroups.flatMap((group: SkillGroup) =>
    group.skills.map((skill: Skill) => ({
      id: `skill_${skill.name.toLowerCase().replace(/\s+/g, '_')}`, // e.g., skill_javascript
      name: skill.name,
      progress: skill.progress,
      group: group.group,
    })),
  )

  return (
    <Layout>
      <div className="grid min-h-[80vh] grid-cols-1 gap-8 p-6 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <PomodoroTimer focusMinutes={90} breakMinutes={15} />
        </div>
        <div className="flex flex-col justify-start">
          <h2 className="mb-4 text-xl font-bold">Focus Tasks</h2>
          <TodoList skills={flatSkills} />
        </div>
      </div>
    </Layout>
  )
}
