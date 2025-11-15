import { Fragment } from 'react'
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

const Accordion = ({ items, allowMultiple = false, className }: AccordionProps) => {
  const { config } = useTransition()

  // Convert duration to seconds for Headless UI Transition
  const transitionDuration = config.duration / 1000

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => {
        const accordionId = `accordion-${index}`
        const contentId = `${accordionId}-content`
        const buttonId = `${accordionId}-button`

        return (
          <Disclosure
            key={index}
            defaultOpen={item.defaultOpen}
            as="div"
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  id={buttonId}
                  className="w-full flex items-center justify-between px-4 py-3 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  aria-expanded={open}
                  aria-controls={contentId}
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100">{item.title}</span>
                  <ChevronDownIcon
                    className={cn(
                      'h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform',
                      open && 'transform rotate-180'
                    )}
                    aria-hidden="true"
                    style={{
                      transitionDuration: `${transitionDuration}ms`,
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </Disclosure.Button>
                <Transition
                  as={Fragment}
                  show={open}
                  enter="transition ease-out"
                  enterFrom="transform opacity-0 -translate-y-2"
                  enterTo="transform opacity-100 translate-y-0"
                  leave="transition ease-in"
                  leaveFrom="transform opacity-100 translate-y-0"
                  leaveTo="transform opacity-0 -translate-y-2"
                  style={{
                    transitionDuration: `${transitionDuration}s`,
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <Disclosure.Panel
                    id={contentId}
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                    role="region"
                    aria-labelledby={buttonId}
                  >
                    {item.content}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        )
      })}
    </div>
  )
}

export default Accordion

