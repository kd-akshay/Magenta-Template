import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  HomeIcon, 
  InformationCircleIcon, 
  EnvelopeIcon,
  Squares2X2Icon,
  CubeIcon,
  ArrowPathIcon,
  SignalIcon,
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
  CodeBracketIcon,
  XMarkIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeSlashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

export interface SidebarProps {
  isOpen?: boolean
  onToggle?: () => void
  isCollapsed?: boolean
  onCollapse?: () => void
  onHide?: () => void
}

const Sidebar = ({ isOpen = true, onToggle, isCollapsed = false, onCollapse, onHide }: SidebarProps) => {
  const { t } = useTranslation()
  const location = useLocation()
  const sidebarRef = useRef<HTMLDivElement>(null)

  const mainNavItems = [
    { path: '/', label: t('header.nav.home'), icon: HomeIcon },
    { path: '/about', label: t('header.nav.about'), icon: InformationCircleIcon },
    { path: '/contact', label: t('header.nav.contact'), icon: EnvelopeIcon },
  ]

  const examplesItems = [
    { path: '/components', label: 'Components', icon: Squares2X2Icon },
    { path: '/redux-example', label: 'Redux Example', icon: CubeIcon },
    { path: '/page-loader-example', label: 'Page Loader', icon: ArrowPathIcon },
    { path: '/sse-example', label: 'SSE Example', icon: SignalIcon },
    { path: '/chatbot-example', label: 'Chatbot', icon: ChatBubbleLeftRightIcon },
    { path: '/utility-examples', label: 'Utilities', icon: WrenchScrewdriverIcon },
    { path: '/hooks-examples', label: 'Hooks', icon: CodeBracketIcon },
  ]

  const isActive = (path: string) => location.pathname === path

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isCollapsed &&
        window.innerWidth < 1024 // Only on mobile/tablet
      ) {
        onToggle?.()
      }
    }

    if (isOpen && !isCollapsed) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, isCollapsed, onToggle])

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isCollapsed && window.innerWidth < 1024) {
        onToggle?.()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, isCollapsed, onToggle])

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          'fixed top-0 left-0 h-screen z-50',
          'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
          'transition-all',
          'flex flex-col',
          isCollapsed ? 'w-16' : 'w-64',
          !isOpen && 'transform -translate-x-full lg:translate-x-0 lg:w-0 lg:border-0 lg:overflow-hidden',
          isOpen && 'translate-x-0'
        )}
        role="navigation"
        aria-label="Sidebar navigation"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          {!isCollapsed && (
            <Link
              to="/"
              className="flex items-center space-x-2 flex-1"
              aria-label={`${t('header.title')} - Home`}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center" aria-hidden="true">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {t('header.title')}
              </span>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto" aria-hidden="true">
              <span className="text-white font-bold text-lg">M</span>
            </div>
          )}
          
          {/* Toggle buttons */}
          <div className="flex items-center gap-2">
            {/* Hide/Show button (desktop only) */}
            {onHide && (
              <button
                onClick={onHide}
                className="hidden lg:flex p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Hide sidebar"
                title="Hide sidebar"
              >
                <EyeSlashIcon className="w-5 h-5" />
              </button>
            )}
            
            {/* Collapse/Expand button (desktop only) */}
            {onCollapse && (
              <button
                onClick={onCollapse}
                className="hidden lg:flex p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? (
                  <ChevronRightIcon className="w-5 h-5" />
                ) : (
                  <ChevronLeftIcon className="w-5 h-5" />
                )}
              </button>
            )}
            
            {/* Close button (mobile only) */}
            {onToggle && (
              <button
                onClick={onToggle}
                className="lg:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close sidebar"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1" role="list">
            {/* Main Navigation */}
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              
              return (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    onClick={() => {
                      // Close mobile menu when navigating
                      if (window.innerWidth < 1024) {
                        onToggle?.()
                      }
                    }}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all transition-all',
                      'group',
                      active
                        ? 'bg-primary/10 text-primary dark:bg-primary/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary',
                      isCollapsed && 'justify-center'
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon
                      className={cn(
                        'w-5 h-5 flex-shrink-0',
                        active ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'
                      )}
                      aria-hidden="true"
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                    {isCollapsed && (
                      <span className="sr-only">{item.label}</span>
                    )}
                  </Link>
                </li>
              )
            })}
            
            {/* Examples Section */}
            {!isCollapsed && (
              <li role="none" className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Examples
                </div>
              </li>
            )}
            {examplesItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              
              return (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    onClick={() => {
                      // Close mobile menu when navigating
                      if (window.innerWidth < 1024) {
                        onToggle?.()
                      }
                    }}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all transition-all',
                      'group',
                      active
                        ? 'bg-primary/10 text-primary dark:bg-primary/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary',
                      isCollapsed && 'justify-center'
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon
                      className={cn(
                        'w-5 h-5 flex-shrink-0',
                        active ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'
                      )}
                      aria-hidden="true"
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                    {isCollapsed && (
                      <span className="sr-only">{item.label}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sidebar Footer (optional - can add user info, settings, etc.) */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {t('footer.copyright')}
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar

