import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  position?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  className?: string
}

const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  showCloseButton = true,
  className,
}: DrawerProps) => {
  const titleId = title ? `drawer-title-${Math.random().toString(36).substr(2, 9)}` : undefined
  const sizes = {
    sm: position === 'left' || position === 'right' ? 'w-80' : 'h-64',
    md: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
    lg: position === 'left' || position === 'right' ? 'w-[32rem]' : 'h-[32rem]',
    xl: position === 'left' || position === 'right' ? 'w-[40rem]' : 'h-[40rem]',
    full: position === 'left' || position === 'right' ? 'w-screen' : 'h-screen',
  }

  const positionClasses = {
    left: {
      container: 'fixed left-0 top-0 h-full',
      enterFrom: '-translate-x-full',
      enterTo: 'translate-x-0',
    },
    right: {
      container: 'fixed right-0 top-0 h-full',
      enterFrom: 'translate-x-full',
      enterTo: 'translate-x-0',
    },
    top: {
      container: 'fixed top-0 left-0 w-full',
      enterFrom: '-translate-y-full',
      enterTo: 'translate-y-0',
    },
    bottom: {
      container: 'fixed bottom-0 left-0 w-full',
      enterFrom: 'translate-y-full',
      enterTo: 'translate-y-0',
    },
  }

  const pos = positionClasses[position]

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose} aria-labelledby={titleId}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden z-[9999]">
          <div className="absolute inset-0 overflow-hidden">
            <div className={cn('pointer-events-none fixed inset-y-0', position === 'left' ? 'left-0' : position === 'right' ? 'right-0' : '')}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={pos.enterFrom}
                enterTo={pos.enterTo}
                leave="transform transition ease-in-out duration-200"
                leaveFrom={pos.enterTo}
                leaveTo={pos.enterFrom}
              >
                <Dialog.Panel
                  className={cn(
                    'pointer-events-auto relative flex flex-col bg-white dark:bg-gray-800 shadow-xl',
                    pos.container,
                    sizes[size],
                    className
                  )}
                >
                  {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                        id={titleId}
                      >
                        {title}
                      </Dialog.Title>
                      {showCloseButton && (
                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                          onClick={onClose}
                          aria-label="Close drawer"
                        >
                          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  )}

                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Drawer

