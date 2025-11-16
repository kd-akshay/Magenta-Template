import { Fragment, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
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
  position?: 'left' | 'right' // Deprecated: use direction instead
  direction?: 'top' | 'bottom' | 'left' | 'right'
}

const PopupMenu = ({ trigger, items, position, direction }: PopupMenuProps) => {
  // Support both position (deprecated) and direction props
  const defaultDirection = direction || (position === 'left' ? 'left' : position === 'right' ? 'right' : 'bottom')
  
  const isOpenRef = useRef(false)
  const buttonElementRef = useRef<HTMLElement | null>(null)
  const [computedDirection, setComputedDirection] = useState<'top' | 'bottom' | 'left' | 'right'>(defaultDirection)
  const scrollbarWidthRef = useRef(0)
  const originalPaddingRef = useRef<string>('')
  const paddingAddedRef = useRef(false)

  // Calculate scrollbar width
  const getScrollbarWidth = () => {
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll'
    ;(outer.style as any).msOverflowStyle = 'scrollbar'
    outer.style.width = '100px'
    outer.style.height = '100px'
    document.body.appendChild(outer)
    
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '100%'
    outer.appendChild(inner)
    
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
    outer.parentNode?.removeChild(outer)
    
    return scrollbarWidth
  }

  // Check if scrollbar-gutter is supported
  const supportsScrollbarGutter = () => {
    if (typeof CSS === 'undefined' || !CSS.supports) return false
    return CSS.supports('scrollbar-gutter', 'stable')
  }

  // Prevent body scroll lock when menu is open - without causing layout shift
  useEffect(() => {
    // Calculate scrollbar width once
    scrollbarWidthRef.current = getScrollbarWidth()
    
    const checkScrollLock = () => {
      const body = document.body
      const html = document.documentElement
      const supportsGutter = supportsScrollbarGutter()
      
      if (isOpenRef.current) {
        // Remove scroll lock styles
        if (body.style.position === 'fixed') {
          const scrollY = body.style.top
          body.style.position = ''
          body.style.top = ''
          body.style.width = ''
          if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1)
          }
        }
        
        // Handle overflow hidden removal with padding compensation if scrollbar-gutter not supported
        if (body.style.overflow === 'hidden') {
          if (!supportsGutter && scrollbarWidthRef.current > 0 && !paddingAddedRef.current) {
            // Store original padding
            if (!originalPaddingRef.current) {
              originalPaddingRef.current = body.style.paddingRight || getComputedStyle(body).paddingRight
            }
            // Add padding BEFORE removing overflow to prevent shift
            const currentPadding = parseFloat(originalPaddingRef.current) || 0
            body.style.paddingRight = `${currentPadding + scrollbarWidthRef.current}px`
            paddingAddedRef.current = true
          }
          body.style.overflow = ''
        }
        
        if (html.style.overflow === 'hidden') {
          html.style.overflow = ''
        }
      } else {
        // Menu closed - restore padding if we added it
        if (paddingAddedRef.current && originalPaddingRef.current) {
          body.style.paddingRight = originalPaddingRef.current
          paddingAddedRef.current = false
          originalPaddingRef.current = ''
        }
      }
    }

    // Check periodically when menu might be open
    const interval = setInterval(checkScrollLock, 50)
    
    return () => {
      clearInterval(interval)
      // Cleanup on unmount
      if (paddingAddedRef.current && originalPaddingRef.current) {
        document.body.style.paddingRight = originalPaddingRef.current
      }
    }
  }, [])

  // Calculate smart direction based on available space
  const calculateDirection = (buttonElement: HTMLElement | null) => {
    if (!buttonElement) return defaultDirection
    
    const rect = buttonElement.getBoundingClientRect()
    const menuWidth = 224 // w-56 = 14rem = 224px
    const menuHeight = Math.min(items.length * 40 + 16, 300) // Approximate height
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const spaceOnRight = viewportWidth - rect.right
    const spaceOnLeft = rect.left
    const spaceOnBottom = viewportHeight - rect.bottom
    const spaceOnTop = rect.top
    
    // Smart positioning: only override if there's not enough space in preferred direction
    if (defaultDirection === 'top') {
      // Only switch if there's not enough space on top
      if (spaceOnTop < menuHeight && spaceOnBottom >= menuHeight) {
        return 'bottom'
      }
      return 'top'
    }
    
    if (defaultDirection === 'bottom') {
      // Only switch if there's not enough space on bottom
      if (spaceOnBottom < menuHeight && spaceOnTop >= menuHeight) {
        return 'top'
      }
      return 'bottom'
    }
    
    if (defaultDirection === 'right') {
      // Only switch if there's not enough space on right
      if (spaceOnRight < menuWidth && spaceOnLeft >= menuWidth) {
        return 'left'
      }
      return 'right'
    }
    
    if (defaultDirection === 'left') {
      // Only switch if there's not enough space on left
      if (spaceOnLeft < menuWidth && spaceOnRight >= menuWidth) {
        return 'right'
      }
      return 'left'
    }
    
    return defaultDirection
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => {
        isOpenRef.current = open
        
        // Immediately handle scroll lock when state changes
        if (open) {
          const body = document.body
          const html = document.documentElement
          const supportsGutter = supportsScrollbarGutter()
          
          // Remove scroll lock styles
          if (body.style.position === 'fixed') {
            const scrollY = body.style.top
            body.style.position = ''
            body.style.top = ''
            body.style.width = ''
            if (scrollY) {
              window.scrollTo(0, parseInt(scrollY || '0') * -1)
            }
          }
          
          // Handle overflow hidden removal with padding compensation if scrollbar-gutter not supported
          if (body.style.overflow === 'hidden') {
            if (!supportsGutter && scrollbarWidthRef.current > 0 && !paddingAddedRef.current) {
              // Store original padding
              if (!originalPaddingRef.current) {
                originalPaddingRef.current = body.style.paddingRight || getComputedStyle(body).paddingRight
              }
              // Add padding BEFORE removing overflow to prevent shift
              const currentPadding = parseFloat(originalPaddingRef.current) || 0
              body.style.paddingRight = `${currentPadding + scrollbarWidthRef.current}px`
              paddingAddedRef.current = true
            }
            body.style.overflow = ''
          }
          
          if (html.style.overflow === 'hidden') {
            html.style.overflow = ''
          }
          
          // Calculate smart direction when menu opens
          if (buttonElementRef.current) {
            const smartDirection = calculateDirection(buttonElementRef.current)
            setComputedDirection(smartDirection)
          }
        } else {
          // Menu closed - restore padding if we added it
          if (paddingAddedRef.current && originalPaddingRef.current) {
            document.body.style.paddingRight = originalPaddingRef.current
            paddingAddedRef.current = false
            originalPaddingRef.current = ''
          }
        }

        return (
        <>
            <Menu.Button as="div" className="inline-block cursor-pointer">
              {(buttonProps: any) => {
                // Store ref to button element for position calculation
                const setRef = (element: HTMLElement | null) => {
                  buttonElementRef.current = element
                  if (buttonProps.ref) {
                    if (typeof buttonProps.ref === 'function') {
                      buttonProps.ref(element)
                    } else {
                      buttonProps.ref.current = element
                    }
                  }
                }
                
                if (isValidElement(trigger)) {
                  // Clone the trigger and merge all Menu.Button props (including onClick)
                  return cloneElement(trigger, {
                    ...buttonProps,
                    ref: setRef,
                    'aria-expanded': buttonProps['aria-expanded'],
                    'aria-haspopup': 'true',
                  } as any)
                }
                return (
                  <div {...buttonProps} ref={setRef} className="cursor-pointer">
                    {trigger}
                  </div>
                )
              }}
            </Menu.Button>
            
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom={
                computedDirection === 'top' 
                  ? 'transform opacity-0 scale-95 translate-y-1'
                  : computedDirection === 'bottom'
                  ? 'transform opacity-0 scale-95 -translate-y-1'
                  : computedDirection === 'left'
                  ? 'transform opacity-0 scale-95 translate-x-1'
                  : 'transform opacity-0 scale-95 -translate-x-1'
              }
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo={
                computedDirection === 'top' 
                  ? 'transform opacity-0 scale-95 translate-y-1'
                  : computedDirection === 'bottom'
                  ? 'transform opacity-0 scale-95 -translate-y-1'
                  : computedDirection === 'left'
                  ? 'transform opacity-0 scale-95 translate-x-1'
                  : 'transform opacity-0 scale-95 -translate-x-1'
              }
            >
              <Menu.Items
                className={cn(
                  'absolute z-50 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none max-h-[300px] overflow-y-auto',
                  // Positioning based on direction
                  computedDirection === 'top' && 'bottom-full mb-2 left-0 origin-bottom-left',
                  computedDirection === 'bottom' && 'top-full mt-2 left-0 origin-top-left',
                  computedDirection === 'left' && 'right-full mr-2 top-0 origin-top-right',
                  computedDirection === 'right' && 'left-full ml-2 top-0 origin-top-left'
                )}
                style={{
                  willChange: 'transform, opacity',
                }}
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
          </>
        )
      }}
    </Menu>
  )
}

export default PopupMenu
