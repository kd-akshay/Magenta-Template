import { useState, useRef, useEffect } from 'react'
import { Card, Button, Input, Badge, Divider, Alert } from '@/components/ui'
import {
  useLocalStorage,
  useDebounce,
  useThrottle,
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
  useClickOutside,
  useCopyToClipboard,
  usePageLoader,
  usePrevious,
  useWindowSize,
  useKeyPress,
  useHover,
  useInterval,
} from '@/hooks'
import { ClipboardDocumentIcon, CheckIcon, EyeIcon, EyeSlashIcon, ArrowUpIcon } from '@heroicons/react/24/outline'

const HooksExamples = () => {
  // useLocalStorage example
  const [storedValue, setStoredValue, removeStoredValue] = useLocalStorage<string>('demo-storage', 'Default value')
  const [storageInput, setStorageInput] = useState('')

  // useDebounce example
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  // useMediaQuery examples
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const prefersDark = usePrefersDarkMode()
  const prefersReducedMotion = usePrefersReducedMotion()
  const isWideScreen = useMediaQuery('(min-width: 1280px)')

  // useClickOutside example
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false)
  })

  // useCopyToClipboard examples
  const [copied1, copy1] = useCopyToClipboard()
  const [copied2, copy2] = useCopyToClipboard('pre-filled-text@example.com')

  // usePageLoader example
  const { isLoading, startLoading, stopLoading, loadingMessage } = usePageLoader()

  // useThrottle example
  const [scrollY, setScrollY] = useState(0)
  const throttledScrollY = useThrottle(scrollY, 200)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // usePrevious example
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  // useWindowSize example
  const { width, height } = useWindowSize()

  // useKeyPress example
  const isEnterPressed = useKeyPress('Enter')
  const isEscapePressed = useKeyPress('Escape')

  // useHover example
  const hoverRef = useRef<HTMLDivElement>(null)
  const isHovered = useHover(hoverRef)

  // useInterval example
  const [intervalCount, setIntervalCount] = useState(0)
  const [intervalDelay, setIntervalDelay] = useState<number | null>(1000)

  useInterval(() => {
    setIntervalCount((prev) => prev + 1)
  }, intervalDelay)

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Custom Hooks Examples</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Interactive examples and documentation for all custom React hooks
        </p>
      </div>

      {/* useLocalStorage */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useLocalStorage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Syncs state with localStorage, automatically persisting and restoring values. Supports cross-tab synchronization.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`const [value, setValue, removeValue] = useLocalStorage(key, initialValue)`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Input
                  label="New Value"
                  value={storageInput}
                  onChange={(e) => setStorageInput(e.target.value)}
                  placeholder="Enter value to store"
                />
              </div>
              <Button
                onClick={() => {
                  setStoredValue(storageInput)
                  setStorageInput('')
                }}
                disabled={!storageInput.trim()}
              >
                Save to Storage
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  removeStoredValue()
                  setStorageInput('')
                }}
              >
                Clear
              </Button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Stored Value:</span>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                    {storedValue}
                  </p>
                </div>
                <Badge variant="info" size="sm">
                  Persisted
                </Badge>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                💡 This value persists across page refreshes. Open DevTools → Application → Local Storage to see it.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* useDebounce */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useDebounce</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Returns a debounced value that updates after a specified delay. Perfect for search inputs and API calls.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`const debouncedValue = useDebounce(value, delay)`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <Input
              label="Search (500ms delay)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to see debounce in action..."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Current Value:</span>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {searchTerm || <span className="text-gray-400">Empty</span>}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Debounced Value (500ms):</span>
                <p className="text-lg font-semibold text-primary mt-1">
                  {debouncedSearchTerm || <span className="text-gray-400">Waiting...</span>}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 Notice how the debounced value updates 500ms after you stop typing. Use this for API calls to reduce requests.
            </p>
          </div>
        </div>
      </Card>

      {/* useMediaQuery */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useMediaQuery</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tracks media query matches for responsive design. Includes helper hooks for common breakpoints and preferences.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-2">
              <code className="text-sm text-gray-700 dark:text-gray-300 block">
                {`const matches = useMediaQuery('(max-width: 768px)')`}
              </code>
              <code className="text-sm text-gray-700 dark:text-gray-300 block">
                {`const isMobile = useIsMobile()`}
              </code>
              <code className="text-sm text-gray-700 dark:text-gray-300 block">
                {`const prefersDark = usePrefersDarkMode()`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Screen Size Breakpoints</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <Badge variant={isMobile ? 'success' : 'secondary'} size="sm" className="mb-2">
                  {isMobile ? 'Active' : 'Inactive'}
                </Badge>
                <p className="font-semibold">isMobile</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">max-width: 640px</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <Badge variant={isTablet ? 'success' : 'secondary'} size="sm" className="mb-2">
                  {isTablet ? 'Active' : 'Inactive'}
                </Badge>
                <p className="font-semibold">isTablet</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">641px - 1024px</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <Badge variant={isDesktop ? 'success' : 'secondary'} size="sm" className="mb-2">
                  {isDesktop ? 'Active' : 'Inactive'}
                </Badge>
                <p className="font-semibold">isDesktop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">min-width: 1025px</p>
              </div>
            </div>

            <Divider />

            <h3 className="text-lg font-semibold">Media Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <Badge variant={prefersDark ? 'success' : 'secondary'} size="sm" className="mb-2">
                  {prefersDark ? 'Dark Mode' : 'Light Mode'}
                </Badge>
                <p className="font-semibold">prefersDarkMode</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">System preference</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <Badge variant={prefersReducedMotion ? 'success' : 'secondary'} size="sm" className="mb-2">
                  {prefersReducedMotion ? 'Enabled' : 'Disabled'}
                </Badge>
                <p className="font-semibold">prefersReducedMotion</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Accessibility preference</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <Badge variant={isWideScreen ? 'success' : 'secondary'} size="sm" className="mb-2">
                  {isWideScreen ? 'Wide' : 'Standard'}
                </Badge>
                <p className="font-semibold">Custom Query</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">min-width: 1280px</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* useClickOutside */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useClickOutside</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Detects clicks outside an element. Perfect for closing modals, dropdowns, and popovers.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`const ref = useClickOutside(() => setIsOpen(false))`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative" ref={dropdownRef}>
                <Button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  variant="primary"
                >
                  {isDropdownOpen ? (
                    <>
                      <EyeSlashIcon className="w-5 h-5 mr-2" />
                      Close Dropdown
                    </>
                  ) : (
                    <>
                      <EyeIcon className="w-5 h-5 mr-2" />
                      Open Dropdown
                    </>
                  )}
                </Button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      This dropdown closes when you click outside of it.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Try clicking anywhere outside this box!
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Alert variant="info">
              Click the button to open the dropdown, then click outside the dropdown to see it close automatically.
            </Alert>
          </div>
        </div>
      </Card>

      {/* useCopyToClipboard */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useCopyToClipboard</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Copy text to clipboard with success feedback. Handles both modern Clipboard API and fallback methods.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-2">
              <code className="text-sm text-gray-700 dark:text-gray-300 block">
                {`const [copied, copy] = useCopyToClipboard()`}
              </code>
              <code className="text-sm text-gray-700 dark:text-gray-300 block">
                {`copy('Text to copy')`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Example 1: Copy with function call</span>
                  <Button
                    size="sm"
                    variant={copied1 ? 'secondary' : 'primary'}
                    onClick={() => copy1('Hello from clipboard!')}
                  >
                    {copied1 ? (
                      <>
                        <CheckIcon className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardDocumentIcon className="w-4 h-4 mr-2" />
                        Copy Text
                      </>
                    )}
                  </Button>
                </div>
                <code className="text-sm text-gray-600 dark:text-gray-400">
                  copy('Hello from clipboard!')
                </code>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Example 2: Copy with initial value</span>
                  <Button
                    size="sm"
                    variant={copied2 ? 'secondary' : 'primary'}
                    onClick={() => copy2()}
                  >
                    {copied2 ? (
                      <>
                        <CheckIcon className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardDocumentIcon className="w-4 h-4 mr-2" />
                        Copy Pre-filled Text
                      </>
                    )}
                  </Button>
                </div>
                <code className="text-sm text-gray-600 dark:text-gray-400">
                  const [copied, copy] = useCopyToClipboard('pre-filled-text@example.com')
                </code>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* usePageLoader */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">usePageLoader</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manages page-level loading state with customizable messages. Perfect for blocking UI during async operations.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`const { isLoading, startLoading, stopLoading, loadingMessage } = usePageLoader()`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  startLoading('Loading data...')
                  setTimeout(() => stopLoading(), 2000)
                }}
              >
                Start Loading (2s)
              </Button>
              <Button
                variant="outline"
                onClick={() => stopLoading()}
                disabled={!isLoading}
              >
                Stop Loading
              </Button>
            </div>
            {isLoading && (
              <Alert variant="info">
                Loading: {loadingMessage}
              </Alert>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 See the PageLoaderExample page for the full PageLoader component demonstration.
            </p>
          </div>
        </div>
      </Card>

      {/* useServerSentEvents */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useServerSentEvents</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Connects to Server-Sent Events (SSE) streams with automatic reconnection, error handling, and connection management.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`const { isConnected, connect, disconnect, lastMessage } = useServerSentEvents({ url, onMessage })`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <Alert variant="info">
              For a complete SSE example with message history and connection controls, see the SSEExample page.
            </Alert>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Automatic connection and reconnection</li>
                <li>Configurable max reconnect attempts</li>
                <li>Manual connect/disconnect/stop methods</li>
                <li>Connection status tracking</li>
                <li>Message and error callbacks</li>
                <li>Last message tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* useThrottle */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useThrottle</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Throttles a value, updating it at most once per specified delay. Unlike debounce, throttle ensures updates at regular intervals.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`const throttledValue = useThrottle(value, delay)`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Scroll this page to see throttled scroll position (updates every 200ms):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Current Scroll:</span>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                    {scrollY}px
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Throttled (200ms):</span>
                  <p className="text-lg font-semibold text-primary mt-1">
                    {throttledScrollY}px
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 Throttle is perfect for scroll/resize events where you want regular updates, not just after the user stops.
            </p>
          </div>
        </div>
      </Card>

      {/* usePrevious */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">usePrevious</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Stores the previous value of a state or prop. Useful for comparing previous and current values.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`const previousValue = usePrevious(value)`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <Button onClick={() => setCount(count + 1)}>Increment</Button>
              <Button variant="outline" onClick={() => setCount(count - 1)}>
                Decrement
              </Button>
              <Button variant="outline" onClick={() => setCount(0)}>
                Reset
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Current Count:</span>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {count}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Previous Count:</span>
                <p className="text-lg font-semibold text-primary mt-1">
                  {prevCount !== undefined ? prevCount : 'N/A'}
                </p>
              </div>
            </div>
            {prevCount !== undefined && count > prevCount && (
              <Alert variant="success">Count increased from {prevCount} to {count}!</Alert>
            )}
            {prevCount !== undefined && count < prevCount && (
              <Alert variant="warning">Count decreased from {prevCount} to {count}!</Alert>
            )}
          </div>
        </div>
      </Card>

      {/* useWindowSize */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useWindowSize</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tracks window dimensions and updates on resize. Perfect for responsive layouts and conditional rendering.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`const { width, height } = useWindowSize()`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Window Width</span>
                <p className="text-2xl font-bold text-primary mt-2">{width}px</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Window Height</span>
                <p className="text-2xl font-bold text-primary mt-2">{height}px</p>
              </div>
            </div>
            <Alert variant="info">
              Resize your browser window to see the values update in real-time!
            </Alert>
          </div>
        </div>
      </Card>

      {/* useKeyPress */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useKeyPress</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Detects when a specific key is pressed. Useful for keyboard shortcuts and accessibility features.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`const isKeyPressed = useKeyPress('Enter')`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <ArrowUpIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <Badge variant={isEnterPressed ? 'success' : 'secondary'} size="sm" className="mb-2">
                  {isEnterPressed ? 'Pressed' : 'Not Pressed'}
                </Badge>
                <p className="font-semibold">Enter Key</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <Badge variant={isEscapePressed ? 'success' : 'secondary'} size="sm" className="mb-2">
                  {isEscapePressed ? 'Pressed' : 'Not Pressed'}
                </Badge>
                <p className="font-semibold">Escape Key</p>
              </div>
            </div>
            <Alert variant="info">
              Press the Enter or Escape key to see the detection in action!
            </Alert>
          </div>
        </div>
      </Card>

      {/* useHover */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useHover</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Detects hover state on an element. Perfect for interactive UI elements and hover effects.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`const isHovered = useHover(ref)`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div
              ref={hoverRef}
              className={`p-8 rounded-lg border-2 transition-all cursor-pointer ${
                isHovered
                  ? 'bg-primary/10 border-primary shadow-lg scale-105'
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">
                  {isHovered ? '👆 Hovering!' : '👋 Hover me'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isHovered
                    ? 'You are currently hovering over this element'
                    : 'Move your mouse over this box to see the hover detection'}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <span className="text-sm text-gray-500 dark:text-gray-400">Hover State:</span>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                {isHovered ? 'true' : 'false'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* useInterval */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">useInterval</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Runs a function at specified intervals. Automatically cleans up on unmount. Can be paused by passing null.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {`useInterval(() => { ... }, delay)`}
              </code>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Counter (updates every 1s):</span>
              <p className="text-4xl font-bold text-primary mt-2">{intervalCount}</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setIntervalDelay(intervalDelay === null ? 1000 : null)}
                variant={intervalDelay === null ? 'primary' : 'secondary'}
              >
                {intervalDelay === null ? 'Resume' : 'Pause'}
              </Button>
              <Button variant="outline" onClick={() => setIntervalCount(0)}>
                Reset
              </Button>
            </div>
            <Alert variant="info">
              The counter increments every second. Click "Pause" to stop it (passes null to useInterval).
            </Alert>
          </div>
        </div>
      </Card>

      {/* All Hooks Summary */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">All Available Hooks</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useLocalStorage</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sync state with localStorage. Supports objects, arrays, and cross-tab synchronization.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useDebounce</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Debounce values with configurable delay. Perfect for search inputs and API calls.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useMediaQuery</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track media query matches. Includes helpers: useIsMobile, useIsTablet, useIsDesktop, usePrefersDarkMode.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useClickOutside</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detect clicks outside elements. Great for closing modals, dropdowns, and popovers.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useCopyToClipboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Copy text to clipboard with success feedback. Supports modern API and fallback methods.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">usePageLoader</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage page-level loading state with customizable messages. Blocks UI during async operations.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useServerSentEvents</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect to SSE streams with auto-reconnection, error handling, and connection management.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useThrottle</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Throttle values with configurable delay. Perfect for scroll/resize events where you want regular updates.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">usePrevious</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track previous values. Useful for comparing previous vs current state and detecting changes.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useWindowSize</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track window dimensions. Updates on resize. Perfect for responsive layouts and conditional rendering.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useKeyPress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detect specific key presses. Useful for keyboard shortcuts and accessibility features.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useHover</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detect hover state on elements. Perfect for interactive UI elements and hover effects.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">useInterval</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Run functions at intervals. Can be paused by passing null. Auto-cleanup on unmount.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default HooksExamples

