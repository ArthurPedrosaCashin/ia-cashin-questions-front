import { useMemo } from 'react'

type Size = 'sm' | 'md' | 'lg'

interface AvatarProps {
  src?: string
  name: string
  size?: Size
}

const sizeClasses: Record<Size, string> = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  const initials = useMemo(() => getInitials(name), [name])
  const isAI = name === 'AI'

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-gray-100`}
      />
    )
  }

  if (isAI) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-900 ring-2 ring-primary-100 flex-shrink-0`}
      >
        {/* Simple bot icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={1.8}
          className="w-1/2 h-1/2"
        >
          <rect x="3" y="8" width="18" height="13" rx="3" />
          <path d="M12 8V4" />
          <circle cx="12" cy="3" r="1" fill="white" stroke="none" />
          <circle cx="8.5" cy="13" r="1.5" fill="white" stroke="none" />
          <circle cx="15.5" cy="13" r="1.5" fill="white" stroke="none" />
          <path d="M8 18h8" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-primary-800 text-white font-semibold flex-shrink-0`}
    >
      {initials}
    </div>
  )
}
