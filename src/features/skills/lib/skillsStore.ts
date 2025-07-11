import { SkillGroup } from '@/features/skills/types'

export const skillGroups: SkillGroup[] = [
  {
    group: 'Programming Languages',
    skills: [
      { name: 'JavaScript', progress: 80 },
      { name: 'TypeScript', progress: 75 },
      { name: 'Python', progress: 60 },
    ],
  },
  {
    group: 'Frontend & Mobile',
    skills: [
      { name: 'React.js', progress: 90 },
      { name: 'Next.js', progress: 85 },
      { name: 'React Native', progress: 75 },
      { name: 'Flutter', progress: 40 },
      { name: 'HTML5', progress: 95 },
      { name: 'CSS3', progress: 90 },
    ],
  },
  {
    group: 'Backend & APIs',
    skills: [
      { name: 'Node.js', progress: 90 },
      { name: 'NestJS', progress: 85 },
      { name: 'Express.js', progress: 80 },
      { name: 'Hapi.js', progress: 50 },
      { name: 'GraphQL', progress: 70 },
      { name: 'REST APIs', progress: 90 },
      { name: 'OpenAPI', progress: 65 },
    ],
  },
  {
    group: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', progress: 80 },
      { name: 'Serverless', progress: 70 },
      { name: 'CI/CD', progress: 75 },
      { name: 'Docker', progress: 80 },
      { name: 'Lambda', progress: 85 },
      { name: 'CloudFormation', progress: 60 },
    ],
  },
  {
    group: 'Databases & Storage',
    skills: [
      { name: 'MongoDB', progress: 85 },
      { name: 'PostgreSQL', progress: 75 },
      { name: 'MySQL', progress: 70 },
      { name: 'DynamoDB', progress: 65 },
      { name: 'S3', progress: 80 },
    ],
  },
]
