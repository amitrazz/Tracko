'use client'

import DashboardPage from '@/app/dashboard/page'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  return (
    <>
      <DashboardPage />
    </>
  )
}
