import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface AnimatedCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  hover?: boolean
  animation?: 'lift' | 'glow' | 'scale' | 'none'
}

const AnimatedCard = ({ className, children, header, footer, hover = true, animation = 'lift', ...props }: AnimatedCardProps) => {
  const animations = {
    lift: hover ? 'hover:-translate-y-1 hover:shadow-xl transition-all' : '',
    glow: hover ? 'hover:shadow-lg hover:shadow-primary/20 transition-all' : '',
    scale: hover ? 'hover:scale-105 transition-transform' : '',
    none: '',
  }
  
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700',
        'transition-all',
        animations[animation],
        className
      )}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
          {header}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  )
}

export default AnimatedCard

