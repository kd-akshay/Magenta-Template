import { Bars3Icon, EyeIcon } from '@heroicons/react/24/outline'
import { Button } from './ui'

interface SidebarToggleProps {
  onClick: () => void
  isVisible?: boolean
  className?: string
}

const SidebarToggle = ({ onClick, isVisible = true, className }: SidebarToggleProps) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className={className}
      aria-label={isVisible ? 'Hide sidebar' : 'Show sidebar'}
      title={isVisible ? 'Hide sidebar' : 'Show sidebar'}
    >
      {isVisible ? (
        <Bars3Icon className="w-6 h-6" />
      ) : (
        <EyeIcon className="w-6 h-6" />
      )}
    </Button>
  )
}

export default SidebarToggle

