import { useEffect, useState } from 'react'

/**
 * Detects when a specific key is pressed.
 * 
 * @param targetKey - The key to detect (e.g., 'Enter', 'Escape', 'ArrowUp')
 * @returns Boolean indicating if the key is currently pressed
 * 
 * @example
 * ```tsx
 * const isEnterPressed = useKeyPress('Enter')
 * 
 * useEffect(() => {
 *   if (isEnterPressed) {
 *     handleSubmit()
 *   }
 * }, [isEnterPressed])
 * ```
 */
function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }

    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])

  return keyPressed
}

export default useKeyPress

