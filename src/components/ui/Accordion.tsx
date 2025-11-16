import { Fragment, memo, useMemo, useRef, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'
import { useTransition } from '@/contexts/TransitionContext'

export interface AccordionItem {
  title: string
  content: ReactNode
  defaultOpen?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
}

const Accordion = memo(({ items, allowMultiple: _allowMultiple = false, className }: AccordionProps) => {
  const { config } = useTransition()

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => {
        const accordionId = `accordion-${index}`
        const contentId = `${accordionId}-content`
        const buttonId = `${accordionId}-button`

        return (
          <AccordionItem
            key={index}
            item={item}
            accordionId={accordionId}
            contentId={contentId}
            buttonId={buttonId}
          />
        )
      })}
    </div>
  )
})

Accordion.displayName = 'Accordion'

// Individual accordion item component with smooth animation
const AccordionItem = memo(({ 
  item, 
  accordionId, 
  contentId, 
  buttonId 
}: { 
  item: AccordionItem
  accordionId: string
  contentId: string
  buttonId: string
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)
  const prevOpenRef = useRef<boolean | null>(null)
  
  // Initialize height on mount for defaultOpen
  useEffect(() => {
    if (item.defaultOpen && contentRef.current) {
      requestAnimationFrame(() => {
        if (contentRef.current) {
          setHeight(contentRef.current.scrollHeight)
        }
      })
    }
  }, [])

  return (
    <Disclosure
      defaultOpen={item.defaultOpen}
      as="div"
      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
    >
      {({ open }) => {
        // Update height when open state changes
        if (prevOpenRef.current !== open) {
          prevOpenRef.current = open
          
          // Use requestAnimationFrame to ensure DOM has updated
          requestAnimationFrame(() => {
            if (contentRef.current) {
              if (open) {
                const scrollHeight = contentRef.current.scrollHeight
                setHeight(scrollHeight)
              } else {
                setHeight(0)
              }
            }
          })
        }

        return (
          <>
            <Disclosure.Button
              id={buttonId}
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-inset"
              aria-expanded={open}
              aria-controls={contentId}
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">{item.title}</span>
              <ChevronDownIcon
                className={cn(
                  'h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ease-in-out',
                  open && 'transform rotate-180'
                )}
                aria-hidden="true"
              />
            </Disclosure.Button>
            <div
              className="overflow-hidden transition-[height] duration-300 ease-out"
              style={{
                height: `${height}px`,
                willChange: 'height',
              }}
            >
              <Disclosure.Panel
                id={contentId}
                ref={contentRef}
                className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                role="region"
                aria-labelledby={buttonId}
                static
              >
                {item.content}
              </Disclosure.Panel>
            </div>
          </>
        )
      }}
    </Disclosure>
  )
})

AccordionItem.displayName = 'AccordionItem'

export default Accordion

