/**
 * Authentication Context for managing user authentication state.
 *
 * @remarks
 * This context provides a centralized authentication system that:
 * - Manages user session state via Redux store
 * - Persists authentication data in localStorage
 * - Provides login, register, logout, and user update functions
 * - Handles automatic session restoration on app load
 * - Integrates with React Router for navigation
 *
 * @example
 * Wrap your app with AuthProvider (placed in MainLayout):
 * ```tsx
 * <AuthProvider>
 *   <YourApp />
 * </AuthProvider>
 * ```
 *
 * Use authentication in components:
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth()
 * ```
 *
 * @packageDocumentation
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setUser, clearUser } from '@/store/slices/userSlice'
import { useToast } from '@/components/ui'
import { useTheme } from '@/contexts/ThemeContext'

/**
 * Represents an authenticated user's data.
 *
 * @public
 */
interface User {
  /** Unique identifier for the user */
  id: string
  /** User's display name */
  name: string
  /** User's email address */
  email: string
  /** Optional URL to user's avatar image */
  avatar?: string
}

/**
 * Authentication context type providing auth state and methods.
 *
 * @public
 */
interface AuthContextType {
  /** Current authenticated user object, or null if not logged in */
  user: User | null
  /** Boolean indicating if user is currently authenticated */
  isAuthenticated: boolean
  /** Boolean indicating if authentication state is being checked or operation is in progress */
  isLoading: boolean
  /** Function to authenticate user with email and password */
  login: (email: string, password: string) => Promise<void>
  /** Function to create a new user account and automatically log in */
  register: (name: string, email: string, password: string) => Promise<void>
  /** Function to sign out the current user */
  logout: () => void
  /** Function to update current user's profile information */
  updateUser: (userData: Partial<User>) => void
}

/**
 * React Context for authentication state.
 *
 * @internal
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Hook to access authentication context.
 *
 * @returns The authentication context with user state and auth methods
 * @throws {@link Error} If used outside of AuthProvider
 *
 * @public
 *
 * @example
 * Basic usage:
 * ```tsx
 * const MyComponent = () => {
 *   const { user, isAuthenticated, login, logout } = useAuth()
 *
 *   if (!isAuthenticated) {
 *     return <LoginForm onSubmit={login} />
 *   }
 *
 *   return (
 *     <div>
 *       <p>Welcome, {user?.name}</p>
 *       <button onClick={logout}>Logout</button>
 *     </div>
 *   )
 * }
 * ```
 *
 * @example
 * Using loading state:
 * ```tsx
 * const { isLoading, login } = useAuth()
 *
 * if (isLoading) {
 *   return <Loader />
 * }
 * ```
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

/**
 * Props for the AuthProvider component.
 *
 * @public
 */
interface AuthProviderProps {
  /** Child components that need access to authentication context */
  children: ReactNode
}

/**
 * AuthProvider Component - Provides authentication context to all child components.
 *
 * @remarks
 * This component handles:
 *
 * 1. **State Management**:
 *    - Syncs authentication state with Redux store
 *    - Maintains loading state during auth checks
 *
 * 2. **Session Persistence**:
 *    - On mount, checks localStorage for existing token and user data
 *    - Automatically restores user session if valid data exists
 *    - Clears invalid/corrupted data
 *
 * 3. **Integration**:
 *    - Uses Redux for state management (setUser, clearUser actions)
 *    - Uses React Router's useNavigate for client-side navigation
 *    - Uses Toast system for user feedback
 *
 * **Important**: This provider must be placed INSIDE the Router context
 * (within MainLayout) to use React Router hooks like `useNavigate()`.
 *
 * @param props - Component props
 * @param props.children - Child components that need access to auth context
 *
 * @public
 *
 * @example
 * In MainLayout.tsx (inside Router context):
 * ```tsx
 * <AuthProvider>
 *   <Header />
 *   <MainContent />
 *   <Footer />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { isDark } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  
  // Get user from Redux store - single source of truth for auth state
  const user = useAppSelector((state) => state.user.user)
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)

  /**
   * Generates avatar URL based on current theme.
   * Light theme: white background, black text
   * Dark theme: black background, white text
   */
  const getAvatarUrl = (name: string): string => {
    const background = isDark ? '000' : 'fff'
    const color = isDark ? 'fff' : '000'
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=${color}`
  }

  /**
   * Effect: Check for existing session on component mount.
   *
   * @remarks
   * This effect runs once when AuthProvider mounts and:
   * 1. Checks localStorage for 'token' and 'user' keys
   * 2. If both exist, parses and restores user data to Redux store
   * 3. Sets loading state to false after check completes
   * 4. Handles errors gracefully by clearing corrupted data
   *
   * This allows users to remain logged in after page refresh.
   *
   * @internal
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        const savedUser = localStorage.getItem('user')

        // If both token and user data exist, restore the session
        if (token && savedUser) {
          const userData = JSON.parse(savedUser)
          // Dispatch to Redux store to update global auth state
          dispatch(setUser(userData))
        }
      } catch (error) {
        // Handle corrupted localStorage data
        console.error('Auth check failed:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } finally {
        // Always set loading to false, even on error
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [dispatch])

  /**
   * Effect: Update avatar URL when theme changes.
   *
   * @remarks
   * This effect updates the user's avatar URL when the theme changes
   * to ensure the avatar matches the current theme.
   *
   * @internal
   */
  useEffect(() => {
    if (user && user.name) {
      const newAvatarUrl = getAvatarUrl(user.name)
      if (user.avatar !== newAvatarUrl) {
        const updatedUser = { ...user, avatar: newAvatarUrl }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        dispatch(setUser(updatedUser))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark])

  /**
   * Authenticates a user with email and password.
   *
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise that resolves on successful login, rejects on error
   * @throws {@link Error} If validation fails or API call fails
   *
   * @remarks
   * **Flow**:
   * 1. Validates input (email and password required)
   * 2. Makes API call to authenticate (currently mocked)
   * 3. On success:
   *    - Saves token and user data to localStorage
   *    - Updates Redux store with user data
   *    - Shows success toast notification
   * 4. On error:
   *    - Shows error toast notification
   *    - Throws error for component to handle
   *
   * **To connect to real API**:
   * Replace the mock implementation with actual API call:
   * ```tsx
   * const response = await apiClient.post('/auth/login', { email, password })
   * const { user, token } = response.data
   * ```
   *
   * @public
   *
   * @example
   * ```tsx
   * const { login, isLoading } = useAuth()
   *
   * const handleLogin = async (e: React.FormEvent) => {
   *   e.preventDefault()
   *   try {
   *     await login(email, password)
   *     navigate('/dashboard') // Navigate after successful login
   *   } catch (error) {
   *     // Error is already shown via toast, handle if needed
   *   }
   * }
   * ```
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true)

      // TODO: Replace with actual API call
      // Simulate API call - Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Client-side validation - Replace with actual validation
      if (!email || !password) {
        throw new Error('Email and password are required')
      }

      // TODO: Replace with actual API response
      // Mock user data - Replace with actual API response
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0], // Extract username from email
        email,
        avatar: getAvatarUrl(email.split('@')[0]),
      }

      // TODO: Replace with actual token from API
      // Mock token - Replace with actual token from API
      const mockToken = `mock-token-${Date.now()}`

      // Persist to localStorage for session restoration
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))

      // Update Redux store - triggers re-render of components using auth state
      dispatch(setUser(mockUser))

      showToast('Login successful!', 'success')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      showToast(message, 'error')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Creates a new user account and automatically logs in.
   *
   * @param name - User's full name
   * @param email - User's email address
   * @param password - User's password (minimum 6 characters)
   * @returns Promise that resolves on successful registration, rejects on error
   * @throws {@link Error} If validation fails or API call fails
   *
   * @remarks
   * **Flow**:
   * 1. Validates input (all fields required, password min length)
   * 2. Makes API call to create account (currently mocked)
   * 3. On success:
   *    - Automatically logs in the new user
   *    - Saves token and user data to localStorage
   *    - Updates Redux store with user data
   *    - Shows success toast notification
   * 4. On error:
   *    - Shows error toast notification
   *    - Throws error for component to handle
   *
   * **To connect to real API**:
   * Replace the mock implementation with actual API call:
   * ```tsx
   * const response = await apiClient.post('/auth/register', { name, email, password })
   * const { user, token } = response.data
   * ```
   *
   * @public
   *
   * @example
   * ```tsx
   * const { register, isLoading } = useAuth()
   *
   * const handleRegister = async (e: React.FormEvent) => {
   *   e.preventDefault()
   *   try {
   *     await register(name, email, password)
   *     navigate('/dashboard') // User is automatically logged in
   *   } catch (error) {
   *     // Error is already shown via toast
   *   }
   * }
   * ```
   */
  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true)

      // TODO: Replace with actual API call
      // Simulate API call - Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Client-side validation - Replace with actual validation
      if (!name || !email || !password) {
        throw new Error('All fields are required')
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      // TODO: Replace with actual API response
      // Mock user data - Replace with actual API response
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: getAvatarUrl(name),
      }

      // TODO: Replace with actual token from API
      // Mock token - Replace with actual token from API
      const mockToken = `mock-token-${Date.now()}`

      // Persist to localStorage for session restoration
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))

      // Update Redux store - triggers re-render of components using auth state
      dispatch(setUser(mockUser))

      showToast('Registration successful!', 'success')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed'
      showToast(message, 'error')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Signs out the current user and clears session data.
   *
   * @remarks
   * **Flow**:
   * 1. Clears authentication token from localStorage
   * 2. Clears user data from localStorage
   * 3. Updates Redux store to clear user state
   * 4. Navigates to home page using React Router
   * 5. Shows success toast notification
   *
   * **Note**: Uses React Router's `navigate()` which requires AuthProvider
   * to be placed inside Router context (e.g., in MainLayout).
   *
   * @public
   *
   * @example
   * ```tsx
   * const { logout } = useAuth()
   *
   * const handleLogout = () => {
   *   logout() // Clears session and redirects to home
   * }
   * ```
   */
  const logout = (): void => {
    // Clear localStorage - removes persisted session data
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Clear Redux store - triggers re-render with logged out state
    dispatch(clearUser())

    // Navigate to home - uses React Router for client-side navigation
    // replace: true prevents user from going back to protected pages
    navigate('/', { replace: true })
    showToast('Logged out successfully', 'success')
  }

  /**
   * Updates the current authenticated user's profile information.
   *
   * @param userData - Partial user object with fields to update
   *
   * @remarks
   * **Flow**:
   * 1. Validates that user is logged in
   * 2. Merges new data with existing user data
   * 3. Updates localStorage with new user data
   * 4. Updates Redux store to trigger re-render
   * 5. Shows success toast notification
   *
   * **Note**: This is a local update. For production apps, you should:
   * - Call API to update on server
   * - Handle errors if update fails
   * - Refresh user data from server
   *
   * Returns early if no user is logged in.
   *
   * @public
   *
   * @example
   * ```tsx
   * const { updateUser, user } = useAuth()
   *
   * const handleUpdateProfile = () => {
   *   updateUser({
   *     name: 'New Name',
   *     avatar: 'https://example.com/avatar.jpg'
   *   })
   * }
   * ```
   */
  const updateUser = (userData: Partial<User>): void => {
    // Early return if no user is logged in
    if (!user) return

    // Merge new data with existing user data
    const updatedUser = { ...user, ...userData }
    
    // Update localStorage to persist changes
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    // Update Redux store to trigger re-render
    dispatch(setUser(updatedUser))
    
    showToast('Profile updated successfully', 'success')
  }

  /**
   * Provide authentication context to children
   * 
   * Makes all auth state and methods available to child components
   * via the useAuth() hook.
   */
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

