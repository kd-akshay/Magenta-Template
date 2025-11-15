import { useState } from 'react'
import { useServerSentEvents } from '@/hooks/useServerSentEvents'
import { Card, Button, Badge, Alert, Divider } from '@/components/ui'
import { 
  SignalIcon, 
  SignalSlashIcon, 
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline'

const SSEExample = () => {
  const [messages, setMessages] = useState<Array<{ id: string; data: string; timestamp: Date }>>([])
  const [errorCount, setErrorCount] = useState(0)

  // Example SSE endpoint - replace with your actual endpoint
  const sseUrl = '/api/events'

  const {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    stop,
    reconnect,
    lastMessage,
  } = useServerSentEvents({
    url: sseUrl,
    autoConnect: false, // Manual connection for demo
    maxReconnectAttempts: 5,
    reconnectInterval: 3000,
    onMessage: (event) => {
      setMessages((prev) => [
        {
          id: Date.now().toString(),
          data: event.data,
          timestamp: new Date(),
        },
        ...prev.slice(0, 49), // Keep last 50 messages
      ])
    },
    onError: (err) => {
      setErrorCount((prev) => prev + 1)
      console.error('SSE Error:', err)
    },
    onOpen: () => {
      console.log('SSE Connection opened')
    },
    onClose: () => {
      console.log('SSE Connection closed')
    },
  })

  const clearMessages = () => {
    setMessages([])
    setErrorCount(0)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Server-Sent Events (SSE) Example
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          This page demonstrates the useServerSentEvents hook for real-time communication with the server.
        </p>
      </div>

      {/* Connection Status Card */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Connection Status
          </h2>
          <Badge 
            variant={isConnected ? 'success' : isConnecting ? 'warning' : 'danger'}
            className="flex items-center gap-2"
          >
            {isConnected ? (
              <>
                <SignalIcon className="w-4 h-4" />
                Connected
              </>
            ) : isConnecting ? (
              <>
                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <SignalSlashIcon className="w-4 h-4" />
                Disconnected
              </>
            )}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Connection State</p>
              <p className="text-lg font-semibold">
                {isConnected ? 'Open' : isConnecting ? 'Connecting' : 'Closed'}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Messages Received</p>
              <p className="text-lg font-semibold">{messages.length}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Errors</p>
              <p className="text-lg font-semibold text-red-600">{errorCount}</p>
            </div>
          </div>

          {error && (
            <Alert variant="error">
              <div className="flex items-center justify-between">
                <span>Connection error occurred</span>
                <Button onClick={reconnect} size="sm" variant="outline">
                  Retry Connection
                </Button>
              </div>
            </Alert>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              onClick={connect}
              disabled={isConnected || isConnecting}
              variant="primary"
              className="w-full"
            >
              <SignalIcon className="w-5 h-5 mr-2" />
              Connect
            </Button>
            <Button
              onClick={disconnect}
              disabled={!isConnected && !isConnecting}
              variant="outline"
              className="w-full"
            >
              <SignalSlashIcon className="w-5 h-5 mr-2" />
              Disconnect
            </Button>
            <Button
              onClick={stop}
              disabled={!isConnected && !isConnecting}
              variant="outline"
              className="w-full"
            >
              <XCircleIcon className="w-5 h-5 mr-2" />
              Stop
            </Button>
            <Button
              onClick={reconnect}
              disabled={isConnecting}
              variant="outline"
              className="w-full"
            >
              <ArrowPathIcon className="w-5 h-5 mr-2" />
              Reconnect
            </Button>
          </div>
        </div>
      </Card>

      {/* Messages Card */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Received Messages
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{messages.length} messages</Badge>
            {messages.length > 0 && (
              <Button onClick={clearMessages} size="sm" variant="outline">
                Clear
              </Button>
            )}
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>No messages received yet.</p>
            <p className="text-sm mt-2">Connect to start receiving messages.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-mono text-gray-900 dark:text-gray-100 break-words">
                      {msg.data}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Last Message Card */}
      {lastMessage && (
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Last Message
          </h2>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
              {lastMessage.data}
            </pre>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Event ID: {lastMessage.lastEventId || 'N/A'} | Type: {lastMessage.type}
            </p>
          </div>
        </Card>
      )}

      {/* Code Examples */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Usage Examples
        </h2>

        <div className="space-y-6">
          {/* Basic Usage */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Basic Usage
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useServerSentEvents } from '@/hooks/useServerSentEvents'

const MyComponent = () => {
  const { isConnected, lastMessage } = useServerSentEvents({
    url: '/api/events',
    onMessage: (event) => {
      console.log('Received:', event.data)
    },
  })

  return (
    <div>
      Status: {isConnected ? 'Connected' : 'Disconnected'}
      {lastMessage && <p>{lastMessage.data}</p>}
    </div>
  )
}`}
            </pre>
          </div>

          <Divider />

          {/* Manual Control */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Manual Connection Control
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const { isConnected, connect, disconnect, stop, reconnect } = useServerSentEvents({
  url: '/api/events',
  autoConnect: false, // Don't auto-connect
  onMessage: (event) => {
    // Handle message
  },
})

// Connect manually
<Button onClick={connect}>Connect</Button>
<Button onClick={disconnect}>Disconnect</Button>
<Button onClick={stop}>Stop</Button> {/* Alias for disconnect */}
<Button onClick={reconnect}>Reconnect</Button>`}
            </pre>
          </div>

          <Divider />

          {/* Error Handling */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Error Handling & Reconnection
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const { error, reconnect } = useServerSentEvents({
  url: '/api/events',
  maxReconnectAttempts: 10,
  reconnectInterval: 5000, // 5 seconds
  onError: (error) => {
    console.error('SSE Error:', error)
  },
  onMessage: (event) => {
    // Handle message
  },
})

{error && (
  <Alert variant="error">
    Connection error. <Button onClick={reconnect}>Retry</Button>
  </Alert>
)}`}
            </pre>
          </div>

          <Divider />

          {/* JSON Parsing */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Parsing JSON Messages
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const [data, setData] = useState(null)

const { lastMessage } = useServerSentEvents({
  url: '/api/events',
  onMessage: (event) => {
    try {
      const parsed = JSON.parse(event.data)
      setData(parsed)
    } catch (err) {
      console.error('Parse error:', err)
    }
  },
})`}
            </pre>
          </div>
        </div>
      </Card>

      {/* Note */}
      <Alert variant="info">
        <div>
          <p className="font-semibold mb-2">Note:</p>
          <p className="text-sm">
            This example uses a placeholder endpoint (<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{sseUrl}</code>). 
            Replace it with your actual SSE endpoint. The server should send events with the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">text/event-stream</code> content type.
          </p>
        </div>
      </Alert>
    </div>
  )
}

export default SSEExample

