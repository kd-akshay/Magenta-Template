import { useState, useCallback } from 'react'

/**
 * Hook to copy text to the clipboard.
 *
 * @param text - Optional initial text to copy (can also be passed to the copy function)
 * @returns Tuple containing copied state, copy function, and error state
 *
 * @remarks
 * This hook:
 * - Uses the modern Clipboard API when available
 * - Falls back to `document.execCommand` for older browsers
 * - Automatically resets the `copied` state after 2 seconds
 * - Handles both secure and non-secure contexts
 *
 * @public
 *
 * @example
 * Without initial text:
 * ```tsx
 * const [copied, copy, error] = useCopyToClipboard()
 *
 * const handleCopy = async () => {
 *   await copy('Text to copy')
 *   // copied will be true for 2 seconds
 * }
 * ```
 *
 * @example
 * With initial text:
 * ```tsx
 * const [copied, copy] = useCopyToClipboard('Initial text')
 *
 * <button onClick={() => copy()}>Copy Initial Text</button>
 * <button onClick={() => copy('Different text')}>Copy Different Text</button>
 * ```
 */
export function useCopyToClipboard(text?: string): [
  boolean,
  (textToCopy?: string) => Promise<void>,
  Error | null
] {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const copy = useCallback(
    async (textToCopy?: string) => {
      const textToCopyValue = textToCopy ?? text

      if (!textToCopyValue) {
        setError(new Error('No text provided to copy'))
        return
      }

      try {
        // Use the Clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopyValue)
        } else {
          // Fallback for older browsers or non-secure contexts
          const textArea = document.createElement('textarea')
          textArea.value = textToCopyValue
          textArea.style.position = 'fixed'
          textArea.style.left = '-999999px'
          textArea.style.top = '-999999px'
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          try {
            document.execCommand('copy')
          } catch (err) {
            throw new Error('Failed to copy text')
          } finally {
            document.body.removeChild(textArea)
          }
        }

        setCopied(true)
        setError(null)

        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to copy text'))
        setCopied(false)
      }
    },
    [text]
  )

  return [copied, copy, error]
}

export default useCopyToClipboard

