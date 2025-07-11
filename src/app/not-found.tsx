'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-muted-foreground mb-2">
        Page Not Found
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Button asChild>
        <Link href="/">← Go back home</Link>
      </Button>
    </div>
  )
}
