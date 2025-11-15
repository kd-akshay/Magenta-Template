import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  Bars3Icon, 
  XMarkIcon,
  Squares2X2Icon,
  CubeIcon,
  ArrowPathIcon,
  SignalIcon,
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
  CodeBracketIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { ThemeToggle, LanguageSwitcher, Avatar, PopupMenu, Button } from './ui'
import { useAuth } from '@/contexts/AuthContext'
import NavDropdown from './NavDropdown'

interface HeaderProps {
  sidebarToggle?: ReactNode
}

const Header = ({ sidebarToggle }: HeaderProps = {}) => {
  const { t } = useTranslation()
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  
  const mainNavItems = [
    { path: '/', label: t('header.nav.home') },
    { path: '/contact', label: t('header.nav.contact') },
  ]

  const examplesItems = [
    { path: '/components', label: 'Components', icon: <Squares2X2Icon className="w-5 h-5" /> },
    { path: '/redux-example', label: 'Redux Example', icon: <CubeIcon className="w-5 h-5" /> },
    { path: '/page-loader-example', label: 'Page Loader', icon: <ArrowPathIcon className="w-5 h-5" /> },
    { path: '/sse-example', label: 'SSE Example', icon: <SignalIcon className="w-5 h-5" /> },
    { path: '/chatbot-example', label: 'Chatbot', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />, divider: true },
    { path: '/utility-examples', label: 'Utilities', icon: <WrenchScrewdriverIcon className="w-5 h-5" /> },
    { path: '/hooks-examples', label: 'Hooks', icon: <CodeBracketIcon className="w-5 h-5" /> },
    { path: '/nested-routing', label: 'Nested Routing', icon: <Squares2X2Icon className="w-5 h-5" /> },
    { path: '/file-upload-example', label: 'File Upload', icon: <CubeIcon className="w-5 h-5" /> },
  ]
  
  const isActive = (path: string) => location.pathname === path
  
  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])
  
  // Trap focus in mobile menu when open
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
      
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
      
      firstElement?.focus()
      document.addEventListener('keydown', handleTab)
      return () => document.removeEventListener('keydown', handleTab)
    }
  }, [isMobileMenuOpen])
  
  return (
    <header 
      className="sticky top-0 z-40 w-full bg-primary border-b border-primary/20 dark:border-primary/30"
      role="banner"
    >
      <nav 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              aria-label={`${t('header.title')} - Home`}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center" aria-hidden="true">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-white">
                {t('header.title')}
              </span>
            </Link>
          </div>

          {/* Middle - Empty Space */}
          <div className="flex-1" />

          {/* Right side - Navigation and Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-4" role="list">
              {mainNavItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-bold ${
                      isActive(item.path)
                        ? 'text-white bg-primary/20'
                        : 'text-white'
                    }`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li role="none">
                <NavDropdown label="Examples" items={examplesItems} variant="header" />
              </li>
            </ul>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                <LanguageSwitcher variant="header" />
                <ThemeToggle />
                {/* Sidebar toggle on desktop */}
                {sidebarToggle && (
                  <div>
                    {sidebarToggle}
                  </div>
                )}
                {/* Auth Section */}
                {isAuthenticated && user ? (
                  <PopupMenu
                    trigger={
                      <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                        <Avatar src={user.avatar} name={user.name} size="sm" variant="header" status="online" />
                        <span className="hidden sm:block text-sm font-medium text-white">
                          {user.name}
                        </span>
                      </button>
                    }
                    items={[
                      {
                        label: 'Profile',
                        onClick: () => window.location.href = '/profile',
                        icon: <UserCircleIcon className="w-5 h-5" />,
                      },
                      {
                        label: 'Logout',
                        onClick: logout,
                        icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
                        danger: true,
                      },
                    ]}
                  />
                ) : (
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/30">
                      <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                      <span className="hidden sm:inline">Login</span>
                    </Button>
                  </Link>
                )}
              </div>
              
              {/* Mobile Actions */}
              <div className="lg:hidden flex items-center space-x-2">
                {sidebarToggle && (
                  <div>
                    {sidebarToggle}
                  </div>
                )}
                <LanguageSwitcher variant="header" />
                <ThemeToggle />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-white hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            ref={mobileMenuRef}
            className="lg:hidden py-4 border-t border-primary/20 dark:border-primary/30 bg-primary"
            role="menu"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col space-y-2" role="list">
              {mainNavItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary ${
                      isActive(item.path)
                        ? 'text-white bg-primary/20'
                        : 'text-white'
                    }`}
                    role="menuitem"
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              
              {/* Examples Section in Mobile Menu */}
              <li role="none" className="pt-2">
                <div className="px-3 py-2 text-xs font-semibold text-white/70 uppercase tracking-wider">
                  Examples
                </div>
              </li>
              {examplesItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary ${
                      isActive(item.path)
                        ? 'text-white bg-primary/20'
                        : 'text-white'
                    }`}
                    role="menuitem"
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.icon && (
                      <span className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              {/* Auth Section in Mobile Menu */}
              <li role="none" className="pt-4 border-t border-primary/20 dark:border-primary/30">
                {isAuthenticated && user ? (
                  <div className="px-3 py-2 space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <Avatar src={user.avatar} name={user.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-white/70 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-white"
                    >
                      <UserCircleIcon className="w-5 h-5" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-base font-medium text-white"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-white"
                  >
                    <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

