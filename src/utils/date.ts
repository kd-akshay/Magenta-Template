/**
 * Formats a date to a readable string.
 *
 * @param date - Date object, string, or timestamp to format
 * @param format - Format style: 'short' | 'long' | 'medium' | 'full' | 'time' | 'datetime' | 'relative' | custom format string
 * @param locale - Locale string for formatting (default: 'en-US')
 * @returns Formatted date string
 *
 * @remarks
 * Supports multiple format styles including relative time (e.g., "2 hours ago").
 * Custom format strings support: YYYY, MM, DD, HH, mm, ss.
 *
 * @public
 *
 * @example
 * Standard formats:
 * ```ts
 * formatDate(new Date(), 'short') // "1/1/2024"
 * formatDate(new Date(), 'long') // "January 1, 2024"
 * formatDate(new Date(), 'medium') // "Jan 1, 2024"
 * ```
 *
 * @example
 * Relative time:
 * ```ts
 * formatDate(new Date(Date.now() - 2 * 60 * 60 * 1000), 'relative') // "2 hours ago"
 * ```
 *
 * @example
 * Custom format:
 * ```ts
 * formatDate(new Date(), 'YYYY-MM-DD') // "2024-01-01"
 * ```
 */
export function formatDate(
  date: Date | string | number,
  format: 'short' | 'long' | 'medium' | 'full' | 'time' | 'datetime' | 'relative' | string = 'medium',
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date'
  }

  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  // Relative time formatting
  if (format === 'relative') {
    if (diffInSeconds < 60) {
      return diffInSeconds < 0 
        ? 'in a few seconds' 
        : diffInSeconds <= 1 
        ? 'just now' 
        : `${diffInSeconds} seconds ago`
    }
    if (diffInMinutes < 60) {
      return diffInMinutes === 1 ? 'a minute ago' : `${diffInMinutes} minutes ago`
    }
    if (diffInHours < 24) {
      return diffInHours === 1 ? 'an hour ago' : `${diffInHours} hours ago`
    }
    if (diffInDays < 7) {
      return diffInDays === 1 ? 'yesterday' : `${diffInDays} days ago`
    }
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7)
      return weeks === 1 ? 'a week ago' : `${weeks} weeks ago`
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30)
      return months === 1 ? 'a month ago' : `${months} months ago`
    }
    const years = Math.floor(diffInDays / 365)
    return years === 1 ? 'a year ago' : `${years} years ago`
  }

  // Standard date formats
  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
    datetime: { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' },
  }

  // If it's a predefined format
  if (formatOptions[format]) {
    return new Intl.DateTimeFormat(locale, formatOptions[format]).format(dateObj)
  }

  // Custom format string (simplified implementation)
  if (format.includes('YYYY') || format.includes('MM') || format.includes('DD')) {
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    const hours = String(dateObj.getHours()).padStart(2, '0')
    const minutes = String(dateObj.getMinutes()).padStart(2, '0')
    const seconds = String(dateObj.getSeconds()).padStart(2, '0')

    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  }

  // Fallback to medium format
  return new Intl.DateTimeFormat(locale, formatOptions.medium).format(dateObj)
}

/**
 * Checks if a date is today.
 *
 * @param date - Date object, string, or timestamp to check
 * @returns Boolean indicating if the date is today
 *
 * @public
 *
 * @example
 * ```ts
 * isToday(new Date()) // true
 * isToday(new Date('2023-01-01')) // false (if not today)
 * ```
 */
export function isToday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date
  const today = new Date()
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  )
}

/**
 * Checks if a date is in the past.
 *
 * @param date - Date object, string, or timestamp to check
 * @returns Boolean indicating if the date is in the past
 *
 * @public
 *
 * @example
 * ```ts
 * isPast(new Date('2020-01-01')) // true
 * isPast(new Date('2025-01-01')) // false
 * ```
 */
export function isPast(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date
  return dateObj.getTime() < new Date().getTime()
}

/**
 * Checks if a date is in the future.
 *
 * @param date - Date object, string, or timestamp to check
 * @returns Boolean indicating if the date is in the future
 *
 * @public
 *
 * @example
 * ```ts
 * isFuture(new Date('2025-01-01')) // true
 * isFuture(new Date('2020-01-01')) // false
 * ```
 */
export function isFuture(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date
  return dateObj.getTime() > new Date().getTime()
}

/**
 * Adds days to a date.
 *
 * @param date - Date object, string, or timestamp to add days to
 * @param days - Number of days to add (can be negative to subtract)
 * @returns New Date object with days added
 *
 * @public
 *
 * @example
 * ```ts
 * addDays(new Date(), 7) // Date 7 days from now
 * addDays(new Date(), -7) // Date 7 days ago
 * ```
 */
export function addDays(date: Date | string | number, days: number): Date {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date
  const result = new Date(dateObj)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Gets the difference between two dates in days.
 *
 * @param date1 - First date (Date object, string, or timestamp)
 * @param date2 - Second date (Date object, string, or timestamp)
 * @returns Absolute difference in days between the two dates
 *
 * @public
 *
 * @example
 * ```ts
 * diffInDays(new Date('2024-01-01'), new Date('2024-01-08')) // 7
 * diffInDays(new Date('2024-01-08'), new Date('2024-01-01')) // 7 (absolute)
 * ```
 */
export function diffInDays(date1: Date | string | number, date2: Date | string | number): number {
  const d1 = typeof date1 === 'string' || typeof date1 === 'number' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' || typeof date2 === 'number' ? new Date(date2) : date2
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

