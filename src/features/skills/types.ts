export type Skill = {
  name: string
  progress: number
}

export type SkillGroup = {
  group: string
  skills: Skill[]
}

export type FlatSkill = {
  id: string
  name: string
  progress: number
  group: string
}
