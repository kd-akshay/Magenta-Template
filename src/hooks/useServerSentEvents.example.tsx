/**
 * Example usage of useServerSentEvents hook
 * 
 * This file demonstrates various ways to use the SSE hook
 */

import { useServerSentEvents } from './useServerSentEvents'
import { useState } from 'react'
import { Card, Button, Badge, Alert } from '@/components/ui'

// Example 1: Basic usage with auto-connect
export const BasicSSEExample = () => {
  const { isConnected, lastMessage, error } = useServerSentEvents({
    url: '/api/events',
    onMessage: (event) => {
      console.log('Received message:', event.data)
    },
  })

  return (
    <div>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      {lastMessage && <p>Last message: {lastMessage.data}</p>}
      {error && <p>Error occurred</p>}
    </div>
  )
}

// Example 2: Manual connection control
export const ManualSSEExample = () => {
  const [messages, setMessages] = useState<string[]>([])
  
  const { isConnected, isConnecting, connect, disconnect, reconnect } = useServerSentEvents({
    url: '/api/events',
    autoConnect: false,
    onMessage: (event) => {
      setMessages((prev) => [...prev, event.data])
    },
  })

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button onClick={connect} disabled={isConnected || isConnecting}>
          Connect
        </Button>
        <Button onClick={disconnect} disabled={!isConnected}>
          Disconnect
        </Button>
        <Button onClick={reconnect} disabled={isConnecting}>
          Reconnect
        </Button>
      </div>
      <p>Status: {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'}</p>
      <div>
        <h3>Messages:</h3>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
    </div>
  )
}

// Example 3: With error handling and reconnection
export const AdvancedSSEExample = () => {
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; timestamp: Date }>>([])
  
  const { isConnected, error, reconnect } = useServerSentEvents({
    url: '/api/notifications',
    maxReconnectAttempts: 10,
    reconnectInterval: 5000,
    onMessage: (event) => {
      try {
        const data = JSON.parse(event.data)
        setNotifications((prev) => [
          { id: Date.now().toString(), message: data.message, timestamp: new Date() },
          ...prev,
        ])
      } catch (err) {
        console.error('Failed to parse message:', err)
      }
    },
    onError: (error) => {
      console.error('SSE Error:', error)
    },
  })

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2>Notifications</h2>
        <Badge variant={isConnected ? 'success' : 'danger'}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </Badge>
      </div>

      {error && (
        <Alert variant="error" className="mb-4">
          Connection error. <Button onClick={reconnect} size="sm">Retry</Button>
        </Alert>
      )}

      <div className="space-y-2">
        {notifications.map((notif) => (
          <div key={notif.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <p>{notif.message}</p>
            <p className="text-xs text-gray-500">{notif.timestamp.toLocaleTimeString()}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

// Example 4: Real-time data updates
export const RealTimeDataExample = () => {
  const [data, setData] = useState<any>(null)
  
  const { isConnected } = useServerSentEvents({
    url: '/api/realtime-data',
    onMessage: (event) => {
      try {
        const parsed = JSON.parse(event.data)
        setData(parsed)
      } catch (err) {
        console.error('Parse error:', err)
      }
    },
  })

  return (
    <Card>
      <h2>Real-time Data</h2>
      <p>Status: {isConnected ? 'Live' : 'Offline'}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Card>
  )
}

