import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Configuration options for useServerSentEvents hook.
 *
 * @public
 */
export interface UseServerSentEventsOptions {
  /** Server-Sent Events endpoint URL */
  url: string
  /** Whether to send credentials with the request */
  withCredentials?: boolean
  /** Callback function called when a message is received */
  onMessage?: (event: MessageEvent) => void
  /** Callback function called when an error occurs */
  onError?: (error: Event) => void
  /** Callback function called when connection opens */
  onOpen?: (event: Event) => void
  /** Callback function called when connection closes */
  onClose?: (event: Event) => void
  /** Whether to automatically connect on mount */
  autoConnect?: boolean
  /** Delay in milliseconds between reconnect attempts */
  reconnectInterval?: number
  /** Maximum number of reconnect attempts (-1 for unlimited) */
  maxReconnectAttempts?: number
}

/**
 * Return type for useServerSentEvents hook.
 *
 * @public
 */
export interface UseServerSentEventsReturn {
  /** Boolean indicating if connection is currently active */
  isConnected: boolean
  /** Boolean indicating if connection is being established */
  isConnecting: boolean
  /** Error event if connection failed */
  error: Event | null
  /** Function to manually connect */
  connect: () => void
  /** Function to disconnect (allows automatic reconnection) */
  disconnect: () => void
  /** Function to permanently stop connection (prevents reconnection) */
  stop: () => void
  /** Function to manually reconnect */
  reconnect: () => void
  /** Last received message event */
  lastMessage: MessageEvent | null
}

/**
 * React hook for connecting to Server-Sent Events (SSE).
 *
 * @param options - Configuration options for SSE connection
 * @returns Object containing connection state and control functions
 *
 * @remarks
 * Manages SSE connections with:
 * - Automatic reconnection on connection loss
 * - Configurable reconnection attempts and intervals
 * - Error handling with callback support
 * - Connection state management
 * - Manual connect/disconnect/stop controls
 *
 * @public
 *
 * @example
 * Basic usage with auto-connect:
 * ```tsx
 * const { isConnected, lastMessage, stop } = useServerSentEvents({
 *   url: '/api/events',
 *   onMessage: (event) => {
 *     console.log('Received:', event.data)
 *   },
 *   onError: (error) => {
 *     console.error('SSE Error:', error)
 *   },
 *   autoConnect: true,
 *   maxReconnectAttempts: 5
 * })
 * ```
 *
 * @example
 * Manual control:
 * ```tsx
 * const { connect, disconnect, stop } = useServerSentEvents({
 *   url: '/api/events',
 *   autoConnect: false
 * })
 *
 * // Connect when ready
 * useEffect(() => {
 *   connect()
 *   return () => stop() // Permanently stop on unmount
 * }, [])
 * ```
 */
export function useServerSentEvents({
  url,
  withCredentials = false,
  onMessage,
  onError,
  onOpen,
  onClose: _onClose,
  autoConnect = true,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5,
}: UseServerSentEventsOptions): UseServerSentEventsReturn {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<Event | null>(null)
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null)
  
  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isManualDisconnectRef = useRef(false)

  const disconnect = useCallback(() => {
    isManualDisconnectRef.current = true
    
    // Clear any pending reconnection attempts
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    // Close and clean up the EventSource
    if (eventSourceRef.current) {
      // Remove all event listeners before closing
      eventSourceRef.current.onopen = null
      eventSourceRef.current.onmessage = null
      eventSourceRef.current.onerror = null
      
      // Close the connection
      if (eventSourceRef.current.readyState !== EventSource.CLOSED) {
        eventSourceRef.current.close()
      }
      
      eventSourceRef.current = null
    }

    setIsConnected(false)
    setIsConnecting(false)
    reconnectAttemptsRef.current = 0
  }, [])

  const stop = useCallback(() => {
    // Alias for disconnect - more intuitive name
    disconnect()
  }, [disconnect])

  const connect = useCallback(() => {
    // Don't connect if already connected or connecting
    if (eventSourceRef.current?.readyState === EventSource.OPEN || isConnecting) {
      return
    }

    // Disconnect existing connection if any
    if (eventSourceRef.current) {
      disconnect()
    }

    isManualDisconnectRef.current = false
    setIsConnecting(true)
    setError(null)

    try {
      const eventSource = new EventSource(url, { withCredentials })
      eventSourceRef.current = eventSource

      eventSource.onopen = (event) => {
        setIsConnected(true)
        setIsConnecting(false)
        setError(null)
        reconnectAttemptsRef.current = 0
        
        if (onOpen) {
          onOpen(event)
        }
      }

      eventSource.onmessage = (event) => {
        setLastMessage(event)
        
        if (onMessage) {
          onMessage(event)
        }
      }

      eventSource.onerror = (event) => {
        setError(event)
        setIsConnecting(false)

        // Only try to reconnect if it wasn't a manual disconnect
        if (!isManualDisconnectRef.current) {
          // Check if connection was closed
          if (eventSource.readyState === EventSource.CLOSED) {
            setIsConnected(false)

            // Attempt to reconnect if we haven't exceeded max attempts
            if (reconnectAttemptsRef.current < maxReconnectAttempts) {
              reconnectAttemptsRef.current += 1
              
              reconnectTimeoutRef.current = setTimeout(() => {
                connect()
              }, reconnectInterval)
            } else {
              // Max reconnect attempts reached
              if (onError) {
                onError(event)
              }
            }
          } else {
            // Connection is still open but there was an error
            if (onError) {
              onError(event)
            }
          }
        } else {
          // Manual disconnect, don't reconnect
          setIsConnected(false)
        }
      }

      // Handle custom event types if needed
      // You can extend this to listen to specific event types
      // eventSource.addEventListener('custom-event', (event) => { ... })
    } catch (err) {
      setIsConnecting(false)
      setIsConnected(false)
      const errorEvent = err instanceof Event ? err : new Event('error')
      setError(errorEvent)
      
      if (onError) {
        onError(errorEvent)
      }
    }
  }, [url, withCredentials, onMessage, onError, onOpen, isConnecting, disconnect, reconnectInterval, maxReconnectAttempts])

  const reconnect = useCallback(() => {
    disconnect()
    reconnectAttemptsRef.current = 0
    setTimeout(() => {
      connect()
    }, 100)
  }, [connect, disconnect])

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect) {
      connect()
    }

    // Cleanup on unmount
    return () => {
      disconnect()
    }
  }, []) // Only run on mount/unmount

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    stop, // Alias for disconnect - more intuitive
    reconnect,
    lastMessage,
  }
}

export default useServerSentEvents

