import { useState } from 'react'
import Chatbot, { type ChatMessage } from '@/components/Chatbot'
import { Card, Button, Badge, Divider, Alert } from '@/components/ui'

const ChatbotExample = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // Example handler that simulates API responses
  const handleSendMessage = async (message: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Simple response logic (replace with actual API call)
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help. What would you like to know?"
    } else if (lowerMessage.includes('help')) {
      return "I can help you with various topics. Try asking about features, components, or how to use this template."
    } else if (lowerMessage.includes('component')) {
      return "This template includes many reusable components like Button, Input, Card, Table, Modal, and more. Check the Components page to see them all!"
    } else if (lowerMessage.includes('redux')) {
      return "Redux Toolkit is integrated for state management. Visit the Redux Example page to see it in action!"
    } else if (lowerMessage.includes('test')) {
      return "The project includes comprehensive test coverage using Vitest and React Testing Library. Run 'npm test' to see the tests!"
    } else {
      return `You said: "${message}". This is a demo response. Connect the chatbot to your API to enable real functionality.`
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Chatbot Example
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          This page demonstrates the chatbot component. Click the chat button in the bottom-right corner to open the chatbot.
        </p>
      </div>

      {/* Chatbot Component */}
      <Chatbot 
        onSendMessage={handleSendMessage}
        welcomeMessage="Welcome! I'm a demo chatbot. Try asking about components, Redux, or testing!"
        placeholder="Ask me anything..."
      />

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Features
          </h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Toggleable chat interface</li>
            <li>• Message history</li>
            <li>• Loading states</li>
            <li>• Auto-scroll to latest message</li>
            <li>• Keyboard shortcuts (Enter to send)</li>
            <li>• Customizable welcome message</li>
            <li>• Timestamp display</li>
            <li>• Clear chat functionality</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Integration
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Connect the chatbot to your API by providing an <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">onSendMessage</code> handler.
          </p>
          <Badge variant="info">API Ready</Badge>
        </Card>
      </div>

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
{`import Chatbot from '@/components/Chatbot'

function App() {
  return (
    <>
      {/* Your app content */}
      <Chatbot />
    </>
  )
}`}
            </pre>
          </div>

          <Divider />

          {/* With Custom Handler */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              With Custom Message Handler
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const handleSendMessage = async (message: string): Promise<string> => {
  // Call your API
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  const data = await response.json()
  return data.response
}

<Chatbot 
  onSendMessage={handleSendMessage}
  welcomeMessage="Hello! How can I help?"
  placeholder="Type your question..."
/>`}
            </pre>
          </div>

          <Divider />

          {/* With API Client */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              With API Client
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import apiClient from '@/services/apiClient'

const handleSendMessage = async (message: string) => {
  try {
    const response = await apiClient.post('/chat', { message })
    return response.data.message
  } catch (error) {
    throw new Error('Failed to send message')
  }
}

<Chatbot onSendMessage={handleSendMessage} />`}
            </pre>
          </div>
        </div>
      </Card>

      {/* Alert */}
      <Alert variant="info">
        <div>
          <p className="font-semibold mb-2">Note:</p>
          <p className="text-sm">
            The chatbot is positioned in the bottom-right corner. Click the chat icon to open it. 
            The chatbot can be connected to any API endpoint by providing the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">onSendMessage</code> prop.
          </p>
        </div>
      </Alert>
    </div>
  )
}

export default ChatbotExample

