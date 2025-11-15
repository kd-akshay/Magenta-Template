import { Fragment, type ReactNode } from 'react'
import { Popover as HeadlessPopover, Transition } from '@headlessui/react'
import { cn } from '@/utils/cn'
import { useTransition } from '@/contexts/TransitionContext'

export interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
  position?: 'left' | 'right' | 'top' | 'bottom'
  className?: string
  panelClassName?: string
}

const Popover = ({
  trigger,
  children,
  position = 'bottom',
  className,
  panelClassName,
}: PopoverProps) => {
  const { config } = useTransition()

  // Convert duration to seconds for Headless UI Transition
  const transitionDuration = config.duration / 1000

  const positionClasses = {
    bottom: 'absolute z-50 mt-2 left-1/2 -translate-x-1/2',
    top: 'absolute z-50 mb-2 bottom-full left-1/2 -translate-x-1/2',
    left: 'absolute z-50 mr-2 right-full top-1/2 -translate-y-1/2',
    right: 'absolute z-50 ml-2 left-full top-1/2 -translate-y-1/2',
  }

  return (
    <HeadlessPopover className={cn('relative', className)}>
      <HeadlessPopover.Button as="div" className="cursor-pointer">
        {trigger}
      </HeadlessPopover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessPopover.Panel
          className={cn(
            'w-64 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none',
            positionClasses[position],
            panelClassName
          )}
          style={{
            transitionDuration: `${transitionDuration}s`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {children}
        </HeadlessPopover.Panel>
      </Transition>
    </HeadlessPopover>
  )
}

export default Popover

