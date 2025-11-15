import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge and deduplicate Tailwind CSS classes.
 *
 * @param inputs - Variable number of class values (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class string
 *
 * @remarks
 * Combines `clsx` for conditional class joining and `twMerge` for Tailwind class deduplication.
 * This ensures that conflicting Tailwind classes are properly resolved (e.g., `p-4 p-2` becomes `p-2`).
 *
 * @public
 *
 * @example
 * Basic usage:
 * ```tsx
 * cn('p-4', 'text-center') // 'p-4 text-center'
 * ```
 *
 * @example
 * With conditional classes:
 * ```tsx
 * cn('p-4', isActive && 'bg-blue-500', 'text-white') // Conditionally includes bg-blue-500
 * ```
 *
 * @example
 * Deduplication:
 * ```tsx
 * cn('p-4', 'p-2') // 'p-2' (p-4 is overridden)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

