import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'away' | 'busy'
}

const Avatar = ({ src, alt, name, size = 'md', status, className, ...props }: AvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  }
  
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  const avatarId = `avatar-${Math.random().toString(36).substr(2, 9)}`
  const statusId = `avatar-status-${avatarId}`
  
  return (
    <div 
      className={cn('relative inline-block', className)} 
      role="img"
      aria-labelledby={name ? `${avatarId}-name` : undefined}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'User avatar'}
          className={cn('rounded-full object-cover transition-all transition-all', sizes[size])}
          aria-describedby={status ? statusId : undefined}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-primary text-white flex items-center justify-center font-semibold transition-all transition-all',
            sizes[size]
          )}
          aria-label={name || 'User avatar'}
          aria-describedby={status ? statusId : undefined}
        >
          <span className="sr-only">{name || 'User avatar'}</span>
          {name ? getInitials(name) : '?'}
        </div>
      )}
      {name && (
        <span id={`${avatarId}-name`} className="sr-only">
          {name}
        </span>
      )}
      {status && (
        <span
          id={statusId}
          className={cn(
            'absolute bottom-0 right-0 block rounded-full border-2 border-white dark:border-gray-800 transition-all transition-all',
            statusColors[status],
            size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'
          )}
          aria-label={`User status: ${status}`}
          role="status"
        />
      )}
    </div>
  )
}

export default Avatar

