'use client'

import { useEffect } from 'react'

export const AuthSync = () => {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
      document.cookie = `isLoggedIn=true; path=/`
    } else {
      document.cookie = `isLoggedIn=false; path=/; max-age=0`
    }
  }, [])

  return null
}
