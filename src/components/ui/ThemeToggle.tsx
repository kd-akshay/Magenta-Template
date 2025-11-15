import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/contexts/ThemeContext'

const ThemeToggle = () => {
  const { config, isDark, setMode } = useTheme()
  
  const handleToggle = () => {
    if (config.mode === 'system') {
      setMode(isDark ? 'light' : 'dark')
    } else {
      setMode(config.mode === 'light' ? 'dark' : 'light')
    }
  }
  
  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
    >
      {isDark ? (
        <SunIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default ThemeToggle

