import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const Loader = ({ className, size = 'md', ...props }: LoaderProps) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
  }
  
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-solid border-current border-r-transparent',
        'text-primary',
        sizes[size],
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={props['aria-label'] || 'Loading'}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loader

