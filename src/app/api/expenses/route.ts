import { expenses } from '@/features/expenses/lib/expensesStore';
import { Expense } from '@/features/expenses/types';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';


export async function GET() {
  return NextResponse.json(expenses)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newExpense: Expense = {
      id: uuidv4(),
      date: body.date,
      category: body.category,
      description: body.description || '',
      amount: Number(body.amount),
    }

    expenses.push(newExpense)

    return NextResponse.json(newExpense, { status: 201 })
  } catch (error) {
    console.error('Error adding expense:', error)
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}
