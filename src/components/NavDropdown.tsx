import { Fragment } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'
import { useTransition } from '@/contexts/TransitionContext'
import type { ReactNode } from 'react'

export interface NavDropdownItem {
  path: string
  label: string
  icon?: ReactNode
  divider?: boolean
}

export interface NavDropdownProps {
  label: string
  items: NavDropdownItem[]
  icon?: ReactNode
  variant?: 'default' | 'header'
}

const NavDropdown = ({ label, items, icon, variant = 'default' }: NavDropdownProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { config } = useTransition()
  const isActive = items.some(item => location.pathname === item.path)

  const handleItemClick = (path: string, close: () => void) => {
    navigate(path)
    close()
  }

  const isHeaderVariant = variant === 'header'

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className={cn(
              'flex items-center gap-1 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              isHeaderVariant
                ? 'font-bold text-white'
                : 'font-medium transition-all',
              isHeaderVariant
                ? isActive || open
                  ? 'bg-primary/20'
                  : ''
                : isActive || open
                ? 'text-primary bg-primary/10'
                : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
            aria-expanded={open}
            aria-haspopup="true"
          >
            {icon && <span className="mr-1">{icon}</span>}
            <span>{label}</span>
            <ChevronDownIcon
              className={cn(
                'w-4 h-4 transition-transform',
                isHeaderVariant && 'text-white',
                open && 'transform rotate-180'
              )}
              style={{ transitionDuration: `${config.duration}ms` }}
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out"
            enterFrom="opacity-0 scale-95 -translate-y-1"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition ease-in"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 -translate-y-1"
          >
            <div
              className="absolute left-0 z-50 mt-2 w-56 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10"
              style={{
                transitionProperty: 'transform, opacity',
                transitionDuration: `${config.duration}ms`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform, opacity',
              }}
            >
              <Menu.Items 
                className="focus:outline-none bg-white dark:bg-gray-800"
              >
                <div className="py-1">
                {items.map((item) => (
                  <Menu.Item key={item.path} as="div">
                    {({ active, close }) => (
                      <Link
                        to={item.path}
                        onClick={(e) => {
                          e.preventDefault()
                          handleItemClick(item.path, close)
                        }}
                        className={cn(
                          'flex items-center gap-3 px-4 py-2 text-sm transition-all block',
                          location.pathname === item.path
                            ? 'bg-primary/10 text-primary dark:bg-primary/20'
                            : active
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                            : 'text-gray-700 dark:text-gray-300',
                          item.divider && 'border-t border-gray-200 dark:border-gray-700 mt-1 pt-2'
                        )}
                        style={{ transitionDuration: `${config.duration}ms` }}
                        aria-current={location.pathname === item.path ? 'page' : undefined}
                      >
                        {item.icon && (
                          <span className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
              </Menu.Items>
            </div>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default NavDropdown

