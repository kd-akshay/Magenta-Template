import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'away' | 'busy'
  variant?: 'default' | 'header'
}

const Avatar = ({ src, alt, name, size = 'md', status, variant = 'default', className, ...props }: AvatarProps) => {
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
        <>
          {/* Background circle for better visibility */}
          {variant === 'header' && (
            <span
              className={cn(
                'absolute bottom-0 right-0 block rounded-full bg-gray-200 dark:bg-gray-600',
                size === 'sm' ? 'w-4.5 h-4.5 -bottom-0.5 -right-0.5' : 'w-5 h-5 -bottom-0.5 -right-0.5'
              )}
              aria-hidden="true"
            />
          )}
          <span
            id={statusId}
            className={cn(
              'absolute bottom-0 right-0 block rounded-full transition-all z-10',
              variant === 'header' 
                ? 'border-2 border-gray-200 dark:border-gray-600 shadow-lg' 
                : 'border-2 border-white dark:border-gray-800',
              statusColors[status],
              size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'
            )}
            aria-label={`User status: ${status}`}
            role="status"
          />
        </>
      )}
    </div>
  )
}

export default Avatar

