import { memo, useRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

const Card = ({ className, children, header, footer, ...props }: CardProps) => {
  const idRef = useRef<string | undefined>(undefined)
  
  if (!idRef.current && !props.id) {
    idRef.current = `card-${Math.random().toString(36).substr(2, 9)}`
  }
  
  const cardId = props.id || idRef.current!
  const headerId = header ? `${cardId}-header` : undefined
  const footerId = footer ? `${cardId}-footer` : undefined
  
  return (
    <article
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700',
        className
      )}
      aria-labelledby={headerId}
      aria-describedby={footerId}
      {...props}
      id={cardId}
    >
      {header && (
        <header id={headerId} className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
          {header}
        </header>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <footer id={footerId} className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
          {footer}
        </footer>
      )}
    </article>
  )
}

export default memo(Card)

