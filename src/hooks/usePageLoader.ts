import { useState, useCallback } from 'react'

/**
 * Return type for usePageLoader hook.
 *
 * @public
 */
interface UsePageLoaderReturn {
  /** Boolean indicating if loading is currently active */
  isLoading: boolean
  /** Function to start loading with an optional message */
  startLoading: (message?: string) => void
  /** Function to stop loading */
  stopLoading: () => void
  /** Current loading message */
  loadingMessage: string
  /** Function to update the loading message */
  setLoadingMessage: (message: string) => void
}

/**
 * Hook to manage page-level loading state.
 *
 * @param initialMessage - Initial loading message displayed when loading starts
 * @returns Object containing loading state and control functions
 *
 * @remarks
 * Provides loading state management with customizable messages for page-level operations.
 * Typically used with the `PageLoader` component to show a full-screen loading overlay.
 *
 * @public
 *
 * @example
 * Basic usage:
 * ```tsx
 * const { isLoading, startLoading, stopLoading, loadingMessage } = usePageLoader()
 *
 * const fetchData = async () => {
 *   startLoading('Fetching data...')
 *   try {
 *     await api.getData()
 *   } finally {
 *     stopLoading()
 *   }
 * }
 *
 * return (
 *   <>
 *     <PageLoader isLoading={isLoading} message={loadingMessage} />
 *     <Button onClick={fetchData}>Load Data</Button>
 *   </>
 * )
 * ```
 */
export function usePageLoader(initialMessage = 'Loading...'): UsePageLoaderReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(initialMessage)

  const startLoading = useCallback((message?: string) => {
    if (message) {
      setLoadingMessage(message)
    }
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    startLoading,
    stopLoading,
    loadingMessage,
    setLoadingMessage,
  }
}

export default usePageLoader

