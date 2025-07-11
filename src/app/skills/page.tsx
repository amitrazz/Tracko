'use client'

import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { Progress } from '@/components/ui/progress'
import { SkillGroup } from '@/features/skills/types'
import { useQuery } from '@tanstack/react-query'

export default function SkillsPage() {
  const {
    data: skillGroups = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await fetch('/api/skills', { cache: 'no-store' })
      return res.json()
    },
  })

  if (isLoading) return <Loader message="Loading skills…" />
  if (isError)
    return <div className="p-6 text-red-500">Error loading skills.</div>

  return (
    <Layout>
      <div className="space-y-8 px-6 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Skill Progress</h1>

        <div className="space-y-10">
          {skillGroups.map((group: SkillGroup) => (
            <div key={group.group} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary h-6 w-1 rounded-full" />
                <h2 className="text-xl font-semibold">{group.group}</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.skills.map((skill, j) => (
                  <Card
                    key={j}
                    className="rounded-xl border shadow-sm transition hover:shadow-md"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {skill.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Progress value={skill.progress} />
                      <div className="text-muted-foreground text-right text-sm">
                        {skill.progress}%
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
