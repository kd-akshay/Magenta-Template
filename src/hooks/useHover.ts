import { useCallback, useEffect, useState } from 'react'
import type { RefObject } from 'react'

/**
 * Detects hover state on an element.
 * 
 * @param ref - Ref to the element to track
 * @returns Boolean indicating if element is hovered
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const isHovered = useHover(ref)
 * 
 * return (
 *   <div 
 *     ref={ref}
 *     className={isHovered ? 'bg-blue-100' : 'bg-white'}
 *   >
 *     Hover me
 *   </div>
 * )
 * ```
 */
function useHover<T extends HTMLElement = HTMLElement>(ref: RefObject<T>): boolean {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, handleMouseEnter, handleMouseLeave])

  return isHovered
}

export default useHover

