import { useState, useRef } from 'react'
import { Card, Button, Input, Badge, Divider, Alert } from '@/components/ui'
import {
  useLocalStorage,
  useDebounce,
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
  useClickOutside,
  useCopyToClipboard,
  usePageLoader,
  useServerSentEvents,
} from '@/hooks'
import { ClipboardDocumentIcon, CheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

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
                    variant={copied1 ? 'success' : 'primary'}
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
                    variant={copied2 ? 'success' : 'primary'}
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
          </div>
        </div>
      </Card>
    </div>
  )
}

export default HooksExamples

