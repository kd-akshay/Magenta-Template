# Custom React Hooks

A collection of reusable React hooks for common functionality. All hooks are fully typed with TypeScript and include comprehensive JSDoc documentation.

## Table of Contents

- [useLocalStorage](#uselocalstorage)
- [useDebounce](#usedebounce)
- [useMediaQuery](#usemediaquery)
- [useClickOutside](#useclickoutside)
- [useCopyToClipboard](#usecopytoclipboard)
- [usePageLoader](#usepageloader)
- [useServerSentEvents](#useserversentevents)

---

## useLocalStorage

Syncs state with localStorage, automatically persisting and restoring values. Supports cross-tab synchronization.

### Usage

```tsx
import { useLocalStorage } from '@/hooks'

const [value, setValue, removeValue] = useLocalStorage(key, initialValue)
```

### Parameters

- `key` (string) - localStorage key
- `initialValue` (T) - Initial value if key doesn't exist

### Returns

- `[storedValue, setValue, removeValue]`
  - `storedValue` - Current stored value
  - `setValue` - Function to update value (same API as useState setter)
  - `removeValue` - Function to remove value from localStorage

### Example

```tsx
const [count, setCount, removeCount] = useLocalStorage('count', 0)

// Update value (automatically saves to localStorage)
setCount(10)

// Update using function (same as useState)
setCount((prev) => prev + 1)

// Remove from localStorage
removeCount()

// Works with objects and arrays
const [user, setUser] = useLocalStorage('user', { name: 'John', age: 30 })
```

### Features

- ✅ Automatic persistence to localStorage
- ✅ Cross-tab synchronization
- ✅ Supports objects, arrays, and primitives
- ✅ SSR-safe (returns initialValue on server)

---

## useDebounce

Returns a debounced value that updates after a specified delay. Perfect for search inputs and API calls.

### Usage

```tsx
import { useDebounce } from '@/hooks'

const debouncedValue = useDebounce(value, delay)
```

### Parameters

- `value` (T) - Value to debounce
- `delay` (number) - Delay in milliseconds (default: 500)

### Returns

- Debounced value (T)

### Example

```tsx
const [searchTerm, setSearchTerm] = useState('')
const debouncedSearchTerm = useDebounce(searchTerm, 300)

useEffect(() => {
  // This will only run when debouncedSearchTerm changes
  // (300ms after user stops typing)
  if (debouncedSearchTerm) {
    fetchSearchResults(debouncedSearchTerm)
  }
}, [debouncedSearchTerm])

return (
  <Input
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search..."
  />
)
```

### Features

- ✅ Configurable delay
- ✅ Automatic cleanup
- ✅ Works with any value type

---

## useMediaQuery

Tracks media query matches for responsive design. Includes helper hooks for common breakpoints and preferences.

### Usage

```tsx
import { 
  useMediaQuery, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion 
} from '@/hooks'

// Custom query
const matches = useMediaQuery('(max-width: 768px)')

// Helper hooks
const isMobile = useIsMobile()
const isTablet = useIsTablet()
const isDesktop = useIsDesktop()
const prefersDark = usePrefersDarkMode()
const prefersReducedMotion = usePrefersReducedMotion()
```

### Parameters

- `query` (string) - Media query string

### Returns

- Boolean indicating if media query matches

### Example

```tsx
// Check if screen is mobile
const isMobile = useIsMobile()

// Conditional rendering
return isMobile ? <MobileView /> : <DesktopView />

// Check system preferences
const prefersDark = usePrefersDarkMode()

useEffect(() => {
  if (prefersDark) {
    setTheme('dark')
  }
}, [prefersDark])

// Custom media query
const isWideScreen = useMediaQuery('(min-width: 1280px)')
```

### Helper Hooks

- **useIsMobile()** - Returns true if screen width ≤ 640px
- **useIsTablet()** - Returns true if screen width is 641px - 1024px
- **useIsDesktop()** - Returns true if screen width ≥ 1025px
- **usePrefersDarkMode()** - Returns true if user prefers dark mode
- **usePrefersReducedMotion()** - Returns true if user prefers reduced motion

### Features

- ✅ Real-time updates on window resize
- ✅ SSR-safe
- ✅ Browser compatibility (includes fallback for older browsers)

---

## useClickOutside

Detects clicks outside an element. Perfect for closing modals, dropdowns, and popovers.

### Usage

```tsx
import { useClickOutside } from '@/hooks'

const ref = useClickOutside(handler)
```

### Parameters

- `handler` ((event: MouseEvent | TouchEvent) => void) - Callback function to execute when click is outside

### Returns

- Ref to attach to the element

### Example

```tsx
const [isOpen, setIsOpen] = useState(false)
const ref = useClickOutside(() => setIsOpen(false))

return (
  <div ref={ref}>
    <Button onClick={() => setIsOpen(true)}>Open Dropdown</Button>
    {isOpen && (
      <div className="dropdown">
        <p>Click outside to close</p>
      </div>
    )}
  </div>
)
```

### Features

- ✅ Works with mouse and touch events
- ✅ Ignores clicks inside the element
- ✅ Automatic cleanup on unmount

---

## useCopyToClipboard

Copy text to clipboard with success feedback. Handles both modern Clipboard API and fallback methods.

### Usage

```tsx
import { useCopyToClipboard } from '@/hooks'

const [copied, copy, error] = useCopyToClipboard(initialText?)
```

### Parameters

- `initialText` (string, optional) - Initial text to copy (can also pass to copy function)

### Returns

- `[copied, copy, error]`
  - `copied` - Boolean indicating if text was recently copied (true for 2 seconds)
  - `copy` - Function to copy text
  - `error` - Error object if copy failed

### Example

```tsx
// Without initial text
const [copied, copy] = useCopyToClipboard()

const handleCopy = () => {
  copy('Text to copy')
}

return (
  <Button onClick={handleCopy}>
    {copied ? 'Copied!' : 'Copy Text'}
  </Button>
)

// With initial text
const [copied, copy] = useCopyToClipboard('pre-filled-text@example.com')

return (
  <Button onClick={() => copy()}>
    {copied ? 'Copied!' : 'Copy Email'}
  </Button>
)
```

### Features

- ✅ Success state (true for 2 seconds)
- ✅ Error handling
- ✅ Fallback for older browsers
- ✅ Works in non-secure contexts (uses execCommand fallback)

---

## usePageLoader

Manages page-level loading state with customizable messages for page-level operations.

### Usage

```tsx
import { usePageLoader } from '@/hooks'
import { PageLoader } from '@/components/ui'

const { isLoading, startLoading, stopLoading, loadingMessage } = usePageLoader(initialMessage?)
```

### Parameters

- `initialMessage` (string, optional) - Initial loading message (default: 'Loading...')

### Returns

- Object containing:
  - `isLoading` - Boolean indicating if loading is active
  - `startLoading` - Function to start loading with optional message
  - `stopLoading` - Function to stop loading
  - `loadingMessage` - Current loading message
  - `setLoadingMessage` - Function to update loading message

### Example

```tsx
const { isLoading, startLoading, stopLoading, loadingMessage } = usePageLoader()

const fetchData = async () => {
  startLoading('Fetching data...')
  try {
    await api.getData()
  } finally {
    stopLoading()
  }
}

return (
  <>
    <PageLoader isLoading={isLoading} message={loadingMessage} />
    <Button onClick={fetchData}>Load Data</Button>
  </>
)
```

### Features

- ✅ Customizable messages
- ✅ Simple start/stop API
- ✅ Works with PageLoader component

---

## useServerSentEvents

Manages SSE connections with automatic reconnection, error handling, and connection state management.

### Usage

```tsx
import { useServerSentEvents } from '@/hooks'

const { 
  isConnected, 
  isConnecting,
  error,
  connect, 
  disconnect, 
  stop,
  reconnect,
  lastMessage 
} = useServerSentEvents({
  url,
  onMessage,
  onError,
  // ... other options
})
```

### Parameters

- `options` - Configuration object:
  - `url` (string) - Server-Sent Events endpoint URL
  - `withCredentials` (boolean, optional) - Whether to send credentials (default: false)
  - `onMessage` ((event: MessageEvent) => void, optional) - Callback for messages
  - `onError` ((error: Event) => void, optional) - Callback for errors
  - `onOpen` ((event: Event) => void, optional) - Callback when connection opens
  - `onClose` ((event: Event) => void, optional) - Callback when connection closes
  - `autoConnect` (boolean, optional) - Auto-connect on mount (default: true)
  - `reconnectInterval` (number, optional) - Delay between reconnect attempts in ms (default: 3000)
  - `maxReconnectAttempts` (number, optional) - Max reconnect attempts (default: 10, -1 for unlimited)

### Returns

- Object containing:
  - `isConnected` - Boolean indicating if connection is active
  - `isConnecting` - Boolean indicating if connection is being established
  - `error` - Error event if connection failed
  - `connect` - Function to manually connect
  - `disconnect` - Function to disconnect (allows reconnection)
  - `stop` - Function to permanently stop connection (prevents reconnection)
  - `reconnect` - Function to manually reconnect
  - `lastMessage` - Last received message event

### Example

```tsx
const { isConnected, lastMessage, connect, disconnect, stop } = useServerSentEvents({
  url: '/api/events',
  onMessage: (event) => {
    console.log('Received:', event.data)
    // Handle message data
  },
  onError: (error) => {
    console.error('SSE Error:', error)
  },
  autoConnect: true,
  maxReconnectAttempts: 5
})

// Manual control
const handleConnect = () => connect()
const handleDisconnect = () => disconnect()
const handleStop = () => stop() // Permanently stops (no reconnection)
```

### Features

- ✅ Automatic connection management
- ✅ Auto-reconnection with configurable attempts
- ✅ Manual connection control
- ✅ Connection state tracking
- ✅ Error handling
- ✅ Message history

---

## TypeScript Support

All hooks are fully typed with TypeScript and include JSDoc comments for better IDE support.

## Testing

All hooks include comprehensive test coverage. See `src/hooks/__tests__/` for test files.

## License

MIT

