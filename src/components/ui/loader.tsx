// components/ui/loader.tsx

import { Loader2 } from 'lucide-react'

export function Loader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 p-6">
      <Loader2 className="h-6 w-6 animate-spin" />
      <p className="text-sm">{message}</p>
    </div>
  )
}

export function BlockPulseLoader({
  message = 'Loading data…',
}: {
  message?: string
}) {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-3 p-6">
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-primary h-4 w-4 animate-pulse rounded" />
        <div className="bg-primary h-4 w-4 animate-pulse rounded [animation-delay:100ms]" />
        <div className="bg-primary h-4 w-4 animate-pulse rounded [animation-delay:200ms]" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  )
}
export function FullPageLoader({
  message = 'Loading...',
}: {
  message?: string
}) {
  return (
    <div className="bg-background fixed inset-0 flex items-center justify-center">
      <Loader message={message} />
    </div>
  )
}

export function DotsLoader({ message = 'Please wait…' }: { message?: string }) {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 p-6">
      <div className="flex gap-1">
        <span className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
        <span className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
        <span className="bg-primary h-2 w-2 animate-bounce rounded-full" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  )
}
