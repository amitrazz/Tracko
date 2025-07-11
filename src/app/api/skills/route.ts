import { skillGroups } from '@/features/skills/lib/skillsStore'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(skillGroups)
}
