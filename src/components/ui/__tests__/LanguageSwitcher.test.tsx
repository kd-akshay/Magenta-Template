import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/config'
import LanguageSwitcher from '../LanguageSwitcher'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorage.clear()
    i18n.changeLanguage('en')
    vi.clearAllMocks()
  })

  it('renders current language', () => {
    render(<LanguageSwitcher />, { wrapper })
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('opens menu when clicked', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />, { wrapper })
    
    const button = screen.getByText('English')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Deutsch')).toBeInTheDocument()
    })
  })

  it('changes language when option is clicked', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />, { wrapper })
    
    const button = screen.getByText('English')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Deutsch')).toBeInTheDocument()
    })
    
    const germanOption = screen.getByText('Deutsch')
    await user.click(germanOption)
    
    await waitFor(() => {
      expect(i18n.language).toBe('de')
    })
  })

  it('displays globe icon', () => {
    render(<LanguageSwitcher />, { wrapper })
    const icon = screen.getByText('English').closest('button')?.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})

