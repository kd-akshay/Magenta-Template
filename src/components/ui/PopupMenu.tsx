import { Fragment, cloneElement, isValidElement } from 'react'
import type { ReactNode } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { cn } from '@/utils/cn'

export type MenuItem = {
  label: string
  onClick: () => void
  icon?: ReactNode
  disabled?: boolean
  danger?: boolean
}

export interface PopupMenuProps {
  trigger: ReactNode
  items: MenuItem[]
  position?: 'left' | 'right'
}

const PopupMenu = ({ trigger, items, position = 'right' }: PopupMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as="div" className="inline-block cursor-pointer">
        {(buttonProps: any) => {
          if (isValidElement(trigger)) {
            // Clone the trigger and merge all Menu.Button props (including onClick)
            return cloneElement(trigger, {
              ...buttonProps,
              'aria-expanded': buttonProps['aria-expanded'],
              'aria-haspopup': 'true',
            } as any)
          }
          return (
            <div {...buttonProps} className="cursor-pointer">
              {trigger}
            </div>
          )
        }}
      </Menu.Button>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            'absolute z-50 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none',
            position === 'right' ? 'right-0' : 'left-0'
          )}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={cn(
                      'w-full flex items-center px-4 py-2 text-sm transition-all duration-200 ease-in-out text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset',
                      active
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        : 'text-gray-700 dark:text-gray-300',
                      item.danger && 'text-red-600 dark:text-red-400',
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default PopupMenu
