import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setUser, clearUser } from '@/store/slices/userSlice'
import { setTheme, toggleTheme } from '@/store/slices/themeSlice'
import { increment, decrement, incrementByAmount, reset, clearHistory } from '@/store/slices/counterSlice'
import { Card, Button, Input, Badge, Divider, Alert } from '@/components/ui'
import { 
  UserIcon, 
  SunIcon, 
  MoonIcon, 
  PlusIcon, 
  MinusIcon, 
  ArrowPathIcon,
  ClockIcon 
} from '@heroicons/react/24/outline'

const ReduxExample = () => {
  const dispatch = useAppDispatch()
  
  // Selectors - Reading state from Redux store
  const theme = useAppSelector((state) => state.theme.theme)
  const user = useAppSelector((state) => state.user.user)
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  const counter = useAppSelector((state) => state.counter.value)
  const history = useAppSelector((state) => state.counter.history)
  
  // Local state for form inputs
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [incrementAmount, setIncrementAmount] = useState('5')

  // User actions
  const handleLogin = () => {
    if (userName && userEmail) {
      dispatch(setUser({
        id: Date.now().toString(),
        name: userName,
        email: userEmail,
      }))
      setUserName('')
      setUserEmail('')
    }
  }

  const handleLogout = () => {
    dispatch(clearUser())
  }

  // Counter actions
  const handleIncrementByAmount = () => {
    const amount = parseInt(incrementAmount) || 0
    dispatch(incrementByAmount(amount))
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Redux Example
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          This page demonstrates Redux Toolkit usage with typed hooks, actions, and selectors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Slice Example */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Theme Slice
            </h2>
            <Badge variant={theme === 'dark' ? 'secondary' : 'warning'}>
              {theme === 'dark' ? <MoonIcon className="w-4 h-4 mr-1" /> : <SunIcon className="w-4 h-4 mr-1" />}
              {theme}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            The theme is persisted in localStorage and synced with the app's theme.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => dispatch(toggleTheme())}
              className="w-full"
              variant="outline"
            >
              Toggle Theme
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => dispatch(setTheme('light'))}
                variant={theme === 'light' ? 'primary' : 'secondary'}
                size="sm"
              >
                Light
              </Button>
              <Button
                onClick={() => dispatch(setTheme('dark'))}
                variant={theme === 'dark' ? 'primary' : 'secondary'}
                size="sm"
              >
                Dark
              </Button>
            </div>
          </div>

          <Divider />

          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p><strong>State:</strong> theme.theme = "{theme}"</p>
            <p><strong>Actions:</strong> setTheme, toggleTheme</p>
            <p><strong>Persistence:</strong> Yes (localStorage)</p>
          </div>
        </Card>

        {/* User Slice Example */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              User Slice
            </h2>
            <Badge variant={isAuthenticated ? 'success' : 'danger'}>
              {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </Badge>
          </div>

          {isAuthenticated && user ? (
            <div className="space-y-4">
              <Alert variant="success" title="User Logged In">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
                    Logout
                  </Button>
                </div>
              </Alert>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                label="Name"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
            </div>
          )}

          <Divider />

          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p><strong>State:</strong> user.user = {user ? `{id: "${user.id}", name: "${user.name}", email: "${user.email}"}` : 'null'}</p>
            <p><strong>State:</strong> user.isAuthenticated = {isAuthenticated.toString()}</p>
            <p><strong>Actions:</strong> setUser, clearUser</p>
            <p><strong>Persistence:</strong> No</p>
          </div>
        </Card>
      </div>

      {/* Counter Slice Example */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Counter Slice
          </h2>
          <Badge variant="primary" className="text-2xl px-4 py-2">
            {counter}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          A counter with history tracking. Each action is recorded in the history array.
        </p>

        <div className="space-y-4">
          {/* Counter Controls */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={() => dispatch(decrement())}
              variant="outline"
              className="w-full"
            >
              <MinusIcon className="w-5 h-5 mr-2" />
              Decrement
            </Button>
            <Button
              onClick={() => dispatch(increment())}
              variant="outline"
              className="w-full"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Increment
            </Button>
            <Button
              onClick={() => dispatch(reset())}
              variant="outline"
              className="w-full"
            >
              <ArrowPathIcon className="w-5 h-5 mr-2" />
              Reset
            </Button>
            <Button
              onClick={() => dispatch(clearHistory())}
              variant="outline"
              className="w-full"
            >
              <ClockIcon className="w-5 h-5 mr-2" />
              Clear History
            </Button>
          </div>

          {/* Increment by Amount */}
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleIncrementByAmount}
              variant="primary"
            >
              Add {incrementAmount || 0}
            </Button>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                History ({history.length} entries)
              </h3>
              <div className="max-h-40 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {history.slice(-20).reverse().map((value, index) => (
                    <Badge
                      key={`${value}-${history.length - index}`}
                      variant={value === counter ? 'primary' : 'secondary'}
                      size="sm"
                    >
                      {value}
                    </Badge>
                  ))}
                </div>
                {history.length > 20 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Showing last 20 of {history.length} entries
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <Divider />

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p><strong>State:</strong> counter.value = {counter}</p>
          <p><strong>State:</strong> counter.history = [{history.slice(-5).join(', ')}{history.length > 5 ? '...' : ''}]</p>
          <p><strong>Actions:</strong> increment, decrement, incrementByAmount, reset, clearHistory</p>
          <p><strong>Persistence:</strong> No</p>
        </div>
      </Card>

      {/* Code Examples */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Code Examples
        </h2>

        <div className="space-y-6">
          {/* Typed Hooks */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Using Typed Hooks
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useAppDispatch, useAppSelector } from '@/store/hooks'

const MyComponent = () => {
  const dispatch = useAppDispatch()
  const counter = useAppSelector((state) => state.counter.value)
  
  return (
    <button onClick={() => dispatch(increment())}>
      Count: {counter}
    </button>
  )
}`}
            </pre>
          </div>

          {/* Dispatching Actions */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Dispatching Actions
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Simple actions
dispatch(increment())
dispatch(decrement())
dispatch(reset())

// Actions with payload
dispatch(incrementByAmount(10))
dispatch(setUser({ id: '1', name: 'John', email: 'john@example.com' }))
dispatch(setTheme('dark'))`}
            </pre>
          </div>

          {/* Selectors */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Reading State with Selectors
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Simple selector
const counter = useAppSelector((state) => state.counter.value)

// Multiple selectors
const theme = useAppSelector((state) => state.theme.theme)
const user = useAppSelector((state) => state.user.user)
const isAuth = useAppSelector((state) => state.user.isAuthenticated)

// Computed selector
const historyLength = useAppSelector((state) => state.counter.history.length)`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ReduxExample

