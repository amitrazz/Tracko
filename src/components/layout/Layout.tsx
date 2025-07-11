// src/components/Layout.tsx
import { Header } from '@/components/layout/Header'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Page Content */}
      <main className="container mx-auto flex-1 px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-gray-100 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TrackNest. All rights reserved.
      </footer>
    </div>
  )
}
