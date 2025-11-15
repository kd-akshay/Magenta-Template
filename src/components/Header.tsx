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
      className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
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
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
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
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li role="none">
                <NavDropdown label="Examples" items={examplesItems} />
              </li>
            </ul>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeToggle />
              {/* Sidebar toggle on desktop */}
              {sidebarToggle && (
                <div className="hidden lg:block">
                  {sidebarToggle}
                </div>
              )}
              {/* Auth Section */}
              {isAuthenticated && user ? (
                <PopupMenu
                  trigger={
                    <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      <Avatar src={user.avatar} name={user.name} size="sm" />
                      <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                  <Button variant="primary" size="sm" className="gap-2">
                    <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {sidebarToggle && (
              <div>
                {sidebarToggle}
              </div>
            )}
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            ref={mobileMenuRef}
            className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800"
            role="menu"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col space-y-2" role="list">
              {mainNavItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      isActive(item.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
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
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Examples
                </div>
              </li>
              {examplesItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      isActive(item.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
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
              <li role="none" className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated && user ? (
                  <div className="px-3 py-2 space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <Avatar src={user.avatar} name={user.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <UserCircleIcon className="w-5 h-5" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10 transition-colors"
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

