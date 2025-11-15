import { useEffect, useState } from 'react'
import Loader from './ui/Loader'
import { cn } from '@/utils/cn'

export interface PageLoaderProps {
  isLoading: boolean
  message?: string
  fullScreen?: boolean
  className?: string
}

const PageLoader = ({ 
  isLoading, 
  message = 'Loading...', 
  fullScreen = true,
  className 
}: PageLoaderProps) => {
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    if (isLoading) {
      // Small delay to prevent flash for fast loads
      const timer = setTimeout(() => setShowLoader(true), 100)
      return () => clearTimeout(timer)
    } else {
      setShowLoader(false)
    }
  }, [isLoading])

  if (!showLoader) return null

  if (fullScreen) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
          'transition-opacity',
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none',
          className
        )}
        role="status"
        aria-live="polite"
        aria-label={message}
      >
        <div className="flex flex-col items-center gap-4">
          <Loader size="lg" />
          {message && (
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {message}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center py-12',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader size="lg" />
        {message && (
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default PageLoader

