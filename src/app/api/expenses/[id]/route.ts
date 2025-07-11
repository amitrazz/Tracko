/* eslint-disable @typescript-eslint/no-explicit-any */
import { expenses } from '@/features/expenses/lib/expensesStore'
import { NextResponse } from 'next/server'

export async function GET(req: Request, context: { params: any }) {
  const id = context.params.id
  const expense = expenses.find((e) => e.id === id)
  return expense
    ? NextResponse.json(expense)
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(req: Request, context: { params: any }) {
  const index = expenses.findIndex((e) => e.id === context.params.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  expenses.splice(index, 1)
  return NextResponse.json({ success: true })
}

export async function PUT(req: Request, context: { params: any }) {
  const index = expenses.findIndex((e) => e.id === context.params.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const update = await req.json()
  expenses[index] = { ...expenses[index], ...update }
  return NextResponse.json(expenses[index])
}
