import { useState, useRef, useEffect } from 'react'
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  UserIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { Button } from './ui'
import { cn } from '@/utils/cn'

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface ChatbotProps {
  onSendMessage?: (message: string) => void | Promise<string>
  welcomeMessage?: string
  placeholder?: string
  className?: string
}

const Chatbot = ({ 
  onSendMessage, 
  welcomeMessage = "Hello! How can I help you today?",
  placeholder = "Type your message...",
  className 
}: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      if (onSendMessage) {
        const response = await onSendMessage(userMessage.text)
        
        if (response) {
          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: response,
            sender: 'bot',
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botMessage])
        } else {
          // Default response if no handler provided
          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: "I'm a demo chatbot. To add functionality, provide an `onSendMessage` handler.",
            sender: 'bot',
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botMessage])
        }
      } else {
        // Default demo response
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message! This is a demo chatbot. Connect it to your API to enable real responses.",
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className={cn('fixed bottom-4 right-4 z-50', className)}>
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="w-96 h-[600px] flex flex-col shadow-2xl border-2 border-primary/20 overflow-hidden bg-white dark:bg-gray-800 rounded-lg mb-4"
          role="dialog"
          aria-labelledby="chatbot-title"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between py-4 px-0 border-b border-gray-200 dark:border-gray-700 bg-primary/5 flex-shrink-0 rounded-t-lg">
              <div className="flex items-center gap-2 pl-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center" aria-hidden="true">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100" id="chatbot-title">Chat Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400" role="status" aria-live="polite">Online</p>
                </div>
              </div>
            <div className="flex items-center gap-2 pr-4">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close chatbot"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area - Scrollable */}
          <div 
            className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-0 space-y-4 bg-gray-50 dark:bg-gray-900/50 min-h-0" 
            style={{ maxHeight: 'calc(600px - 140px)' }}
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Chat messages"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-2 px-4',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
                role="article"
                aria-label={`Message from ${message.sender === 'user' ? 'you' : 'chat assistant'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-4 py-2',
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                  <p
                    className={cn(
                      'text-xs mt-1',
                      message.sender === 'user'
                        ? 'text-primary-100'
                        : 'text-gray-500 dark:text-gray-400'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start px-4" role="status" aria-live="polite" aria-busy="true">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center" aria-hidden="true">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-1" aria-hidden="true">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="sr-only">Chat assistant is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed at Bottom */}
          <div className="py-4 px-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
            <div className="flex gap-2 px-4">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                disabled={isLoading}
                aria-label="Type your message"
                aria-describedby="chatbot-input-help"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span id="chatbot-input-help" className="sr-only">
                Press Enter to send message
              </span>
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                variant="primary"
                className="px-4"
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-14 h-14 rounded-full bg-primary text-white shadow-lg',
            'flex items-center justify-center',
            'hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'transition-all',
            'hover:scale-110'
          )}
          aria-label="Open chatbot"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

export default Chatbot

