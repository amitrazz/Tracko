import { todos } from '@/features/focus/lib/taskStore'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(todos)
}
