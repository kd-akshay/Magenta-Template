import { Bars3Icon, EyeIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

interface SidebarToggleProps {
  onClick: () => void
  isVisible?: boolean
  className?: string
  variant?: 'default' | 'header'
}

const SidebarToggle = ({ onClick, isVisible = true, className, variant = 'default' }: SidebarToggleProps) => {
  const isHeaderVariant = variant === 'header'
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        isHeaderVariant
          ? 'text-white hover:bg-primary/20 focus:ring-white focus:ring-offset-primary'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-primary',
        className
      )}
      aria-label={isVisible ? 'Hide sidebar' : 'Show sidebar'}
      title={isVisible ? 'Hide sidebar' : 'Show sidebar'}
    >
      {isVisible ? (
        <Bars3Icon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <EyeIcon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default SidebarToggle

