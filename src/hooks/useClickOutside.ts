import { useEffect, useRef, type RefObject } from 'react'

/**
 * Hook to detect clicks outside a specified element.
 *
 * @param handler - Callback function executed when a click occurs outside the element
 * @returns Ref object to attach to the element you want to monitor
 *
 * @remarks
 * Detects clicks (mouse and touch) outside the element and calls the handler.
 * Useful for closing dropdowns, modals, or popovers when clicking outside them.
 *
 * @public
 *
 * @example
 * Close dropdown on outside click:
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * const ref = useClickOutside(() => setIsOpen(false))
 *
 * return (
 *   <div ref={ref}>
 *     <button onClick={() => setIsOpen(true)}>Open</button>
 *     {isOpen && <Dropdown />}
 *   </div>
 * )
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void
): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [handler])

  return ref
}

export default useClickOutside

