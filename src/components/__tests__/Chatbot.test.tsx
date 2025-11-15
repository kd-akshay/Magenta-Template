import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chatbot from '../Chatbot'

describe('Chatbot', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders closed initially', () => {
    render(<Chatbot />)
    expect(screen.getByLabelText('Open chatbot')).toBeInTheDocument()
    expect(screen.queryByText('Chat Assistant')).not.toBeInTheDocument()
  })

  it('opens when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Chatbot />)
    
    const button = screen.getByLabelText('Open chatbot')
    await user.click(button)
    
    expect(screen.getByText('Chat Assistant')).toBeInTheDocument()
  })

  it('displays welcome message', async () => {
    const user = userEvent.setup()
    render(<Chatbot welcomeMessage="Welcome to chat!" />)
    
    const button = screen.getByLabelText('Open chatbot')
    await user.click(button)
    
    expect(screen.getByText('Welcome to chat!')).toBeInTheDocument()
  })

  it('displays custom placeholder', async () => {
    const user = userEvent.setup()
    render(<Chatbot placeholder="Type here..." />)
    
    const button = screen.getByLabelText('Open chatbot')
    await user.click(button)
    
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument()
  })

  it('allows typing in input', async () => {
    const user = userEvent.setup()
    render(<Chatbot />)
    
    const button = screen.getByLabelText('Open chatbot')
    await user.click(button)
    
    const input = screen.getByPlaceholderText('Type your message...')
    await user.type(input, 'Hello')
    
    expect(input).toHaveValue('Hello')
  })

  it('sends message when send button is clicked', async () => {
    const user = userEvent.setup()
    const onSendMessage = vi.fn().mockResolvedValue('Bot response')
    render(<Chatbot onSendMessage={onSendMessage} />)
    
    const button = screen.getByLabelText('Open chatbot')
    await user.click(button)
    
    const input = screen.getByPlaceholderText('Type your message...')
    await user.type(input, 'Hello')
    
    const sendButton = screen.getByRole('button', { name: /send/i })
    await user.click(sendButton)
    
    await waitFor(() => {
      expect(onSendMessage).toHaveBeenCalledWith('Hello')
    })
  })

  it('sends message when Enter key is pressed', async () => {
    const user = userEvent.setup()
    const onSendMessage = vi.fn().mockResolvedValue('Bot response')
    render(<Chatbot onSendMessage={onSendMessage} />)
    
    const button = screen.getByLabelText('Open chatbot')
    await user.click(button)
    
    const input = screen.getByPlaceholderText('Type your message...')
    await user.type(input, 'Hello{Enter}')
    
    await waitFor(() => {
      expect(onSendMessage).toHaveBeenCalledWith('Hello')
    })
  })

  it('does not send empty message', async () => {
    const user = userEvent.setup()
    const onSendMessage = vi.fn()
    render(<Chatbot onSendMessage={onSendMessage} />)
    
    const button = screen.getByLabelText('Open chatbot')
    await user.click(button)
    
    const sendButton = screen.getByRole('button', { name: /send/i })
    expect(sendButton).toBeDisabled()
    
    await user.click(sendButton)
    
    expect(onSendMessage).not.toHaveBeenCalled()
  })

  it('displays loading state when sending message', async () => {
    const user = userEvent.setup()
    const onSendMessage = vi.fn(() => new Promise(resolve => setTimeout(() => resolve('Response'), 100)))
    render(<Chatbot onSendMessage={onSendMessage} />)
    
    const button = screen.getByLabelText('Open chatbot')
    await user.click(button)
    
    const input = screen.getByPlaceholderText('Type your message...')
    await user.type(input, 'Hello')
    
    const sendButton = screen.getByRole('button', { name: /send/i })
    await user.click(sendButton)
    
    expect(sendButton).toBeDisabled()
  })

  it('closes when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<Chatbot />)
    
    const openButton = screen.getByLabelText('Open chatbot')
    await user.click(openButton)
    
    expect(screen.getByText('Chat Assistant')).toBeInTheDocument()
    
    const closeButton = screen.getByLabelText('Close chatbot')
    await user.click(closeButton)
    
    expect(screen.queryByText('Chat Assistant')).not.toBeInTheDocument()
  })

  it('clears chat when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<Chatbot />)
    
    const openButton = screen.getByLabelText('Open chatbot')
    await user.click(openButton)
    
    const input = screen.getByPlaceholderText('Type your message...')
    await user.type(input, 'Hello')
    
    const sendButton = screen.getByRole('button', { name: /send/i })
    await user.click(sendButton)
    
    await waitFor(() => {
      expect(screen.getAllByText(/Hello/i).length).toBeGreaterThan(0)
    })
    
    const clearButton = screen.getByLabelText('Clear chat')
    await user.click(clearButton)
    
    await waitFor(() => {
      const messages = screen.queryAllByText(/Hello/i)
      expect(messages.length).toBe(0)
    })
  })
})

