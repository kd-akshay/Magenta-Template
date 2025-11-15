/**
 * Email validation regex pattern.
 *
 * @public
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * URL validation regex pattern.
 *
 * @public
 */
export const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

/**
 * Phone number validation regex (US format).
 *
 * @public
 */
export const PHONE_REGEX = /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/

/**
 * Validates an email address.
 *
 * @param email - Email address to validate
 * @returns Boolean indicating if the email is valid
 *
 * @remarks
 * Uses regex pattern to validate email format. Trims whitespace before validation.
 *
 * @public
 *
 * @example
 * ```ts
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 * isValidEmail('  user@example.com  ') // true (trims whitespace)
 * ```
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false
  return EMAIL_REGEX.test(email.trim())
}

/**
 * Validates a URL.
 *
 * @param url - URL string to validate
 * @returns Boolean indicating if the URL is valid
 *
 * @remarks
 * Attempts to use the URL constructor for validation, falls back to regex pattern.
 * Supports URLs with or without protocol (http:// or https://).
 *
 * @public
 *
 * @example
 * ```ts
 * isValidUrl('https://example.com') // true
 * isValidUrl('http://example.com') // true
 * isValidUrl('example.com') // true
 * isValidUrl('invalid-url') // false
 * ```
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return URL_REGEX.test(url.trim())
  }
}

/**
 * Validates a phone number (US format).
 *
 * @param phone - Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 *
 * @remarks
 * Validates US phone number formats including:
 * - 123-456-7890
 * - (123) 456-7890
 * - 1234567890
 * - +1 123-456-7890
 * Trims whitespace before validation.
 *
 * @public
 *
 * @example
 * Various formats:
 * ```ts
 * isValidPhone('123-456-7890') // true
 * isValidPhone('(123) 456-7890') // true
 * isValidPhone('1234567890') // true
 * isValidPhone('+1 123-456-7890') // true
 * ```
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false
  return PHONE_REGEX.test(phone.trim())
}

/**
 * Validates password strength and provides feedback.
 *
 * @param password - Password string to validate
 * @param options - Validation options for password requirements
 * @returns Validation result with validity, score (0-8), errors, and suggestions
 *
 * @remarks
 * Validates password based on configurable requirements:
 * - Minimum length (default: 8)
 * - Uppercase letters (default: required)
 * - Lowercase letters (default: required)
 * - Numbers (default: required)
 * - Special characters (default: optional)
 *
 * Provides a strength score (0-8) and helpful suggestions for improvement.
 *
 * @public
 *
 * @example
 * Strong password:
 * ```ts
 * validatePassword('Password123!')
 * // { isValid: true, score: 4, errors: [], suggestions: [] }
 * ```
 *
 * @example
 * Weak password:
 * ```ts
 * validatePassword('weak')
 * // {
 * //   isValid: false,
 * //   score: 1,
 * //   errors: ['Password must be at least 8 characters long', ...],
 * //   suggestions: ['Add uppercase letters (A-Z)', ...]
 * // }
 * ```
 */
export function validatePassword(
  password: string,
  options: {
    minLength?: number
    requireUppercase?: boolean
    requireLowercase?: boolean
    requireNumbers?: boolean
    requireSpecial?: boolean
  } = {}
): {
  isValid: boolean
  score: number
  errors: string[]
  suggestions: string[]
} {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecial = false,
  } = options

  const errors: string[] = []
  const suggestions: string[] = []
  let score = 0

  if (!password) {
    return { isValid: false, score: 0, errors: ['Password is required'], suggestions: [] }
  }

  // Length check
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`)
  } else {
    score++
    if (password.length >= 12) score++
  }

  // Uppercase check
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
    suggestions.push('Add uppercase letters (A-Z)')
  } else if (/[A-Z]/.test(password)) {
    score++
  }

  // Lowercase check
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
    suggestions.push('Add lowercase letters (a-z)')
  } else if (/[a-z]/.test(password)) {
    score++
  }

  // Numbers check
  if (requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
    suggestions.push('Add numbers (0-9)')
  } else if (/[0-9]/.test(password)) {
    score++
  }

  // Special characters check
  if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
    suggestions.push('Add special characters (!@#$%^&*)')
  } else if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score++
  }

  // Additional strength checks
  if (password.length >= 16) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score++
  }

  return {
    isValid: errors.length === 0,
    score: Math.min(score, 8), // Max score of 8
    errors,
    suggestions,
  }
}

/**
 * Checks if a string is empty or contains only whitespace.
 *
 * @param str - String to check
 * @returns Boolean indicating if the string is empty or whitespace-only
 *
 * @remarks
 * Returns true for null, undefined, empty strings, or strings containing only whitespace.
 *
 * @public
 *
 * @example
 * ```ts
 * isEmpty('') // true
 * isEmpty('   ') // true
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty('text') // false
 * ```
 */
export function isEmpty(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0
}

/**
 * Sanitizes user input to prevent XSS attacks.
 *
 * @param input - Input string to sanitize
 * @returns HTML-escaped string safe for display
 *
 * @remarks
 * Escapes HTML special characters to prevent XSS attacks.
 * Uses browser DOM API when available, falls back to regex for server-side rendering.
 *
 * @public
 *
 * @example
 * ```ts
 * sanitizeInput('<script>alert("xss")</script>')
 * // "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 *
 * sanitizeInput('Hello <strong>world</strong>')
 * // "Hello &lt;strong&gt;world&lt;/strong&gt;"
 * ```
 */
export function sanitizeInput(input: string): string {
  if (typeof window === 'undefined') {
    // Server-side: basic escaping
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }
  
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

