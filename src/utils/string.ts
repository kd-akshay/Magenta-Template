/**
 * Capitalizes the first letter of a string.
 *
 * @param str - String to capitalize
 * @returns String with first letter capitalized and rest lowercase
 *
 * @public
 *
 * @example
 * ```ts
 * capitalize('hello') // "Hello"
 * capitalize('HELLO') // "Hello"
 * capitalize('hELLO') // "Hello"
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Converts a string to title case.
 *
 * @param str - String to convert
 * @returns String with each word capitalized
 *
 * @public
 *
 * @example
 * ```ts
 * titleCase('hello world') // "Hello World"
 * titleCase('HELLO WORLD') // "Hello World"
 * titleCase('hello WORLD') // "Hello World"
 * ```
 */
export function titleCase(str: string): string {
  if (!str) return str
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

/**
 * Truncates a string to a specified length with an ellipsis.
 *
 * @param str - String to truncate
 * @param length - Maximum length before truncation
 * @param suffix - Suffix to append when truncated (default: '...')
 * @returns Truncated string with suffix if original exceeds length
 *
 * @remarks
 * If the string is shorter than or equal to the specified length, returns the original string unchanged.
 *
 * @public
 *
 * @example
 * ```ts
 * truncate('Hello world', 5) // "Hello..."
 * truncate('Hello world', 20) // "Hello world" (no truncation)
 * truncate('Hello world', 5, '…') // "Hello…" (custom suffix)
 * ```
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (!str || str.length <= length) return str
  return str.slice(0, length) + suffix
}

/**
 * Removes HTML tags from a string.
 *
 * @param html - HTML string to strip tags from
 * @returns Plain text string with all HTML tags removed
 *
 * @remarks
 * Uses browser DOM API when available, falls back to regex for server-side rendering.
 *
 * @public
 *
 * @example
 * ```ts
 * stripHtml('<p>Hello <strong>world</strong></p>') // "Hello world"
 * stripHtml('<div>Text</div>') // "Text"
 * ```
 */
export function stripHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: use regex
    return html.replace(/<[^>]*>/g, '')
  }
  
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

/**
 * Generates a random string.
 *
 * @param length - Length of the random string to generate
 * @param charset - Character set to use for generation (default: alphanumeric)
 * @returns Random string of specified length using the provided charset
 *
 * @public
 *
 * @example
 * Alphanumeric string:
 * ```ts
 * randomString(10) // "aB3dE5fG7h"
 * ```
 *
 * @example
 * Numeric string:
 * ```ts
 * randomString(8, '0123456789') // "12345678"
 * ```
 *
 * @example
 * Custom charset:
 * ```ts
 * randomString(6, 'ABCDEF') // "ABCDEF" (randomized)
 * ```
 */
export function randomString(length: number = 10, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return result
}

/**
 * Converts a string to a URL-friendly slug.
 *
 * @param str - String to convert to slug
 * @returns Slug string with lowercase, hyphens, and no special characters
 *
 * @remarks
 * Removes special characters, converts to lowercase, and replaces spaces/underscores with hyphens.
 * Useful for creating URL-friendly identifiers from titles or names.
 *
 * @public
 *
 * @example
 * ```ts
 * slugify('Hello World!') // "hello-world"
 * slugify('My Article Title') // "my-article-title"
 * slugify('React & TypeScript') // "react-typescript"
 * ```
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Pluralizes a word based on count.
 *
 * @param count - Number to check for pluralization
 * @param singular - Singular form of the word
 * @param plural - Plural form of the word (optional, defaults to singular + 's')
 * @returns Singular or plural form based on count
 *
 * @remarks
 * Returns singular form when count is 1, otherwise returns plural form.
 *
 * @public
 *
 * @example
 * Regular pluralization:
 * ```ts
 * pluralize(1, 'item') // "item"
 * pluralize(5, 'item') // "items"
 * ```
 *
 * @example
 * Irregular pluralization:
 * ```ts
 * pluralize(1, 'child', 'children') // "child"
 * pluralize(5, 'child', 'children') // "children"
 * ```
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return singular
  return plural || `${singular}s`
}

/**
 * Extracts initials from a name.
 *
 * @param name - Full name to extract initials from
 * @param maxLength - Maximum number of initials to extract (default: 2)
 * @returns Uppercase initials string
 *
 * @remarks
 * Takes the first letter of each word (up to maxLength), or just the first letter if single word.
 *
 * @public
 *
 * @example
 * Two-word name:
 * ```ts
 * getInitials('John Doe') // "JD"
 * ```
 *
 * @example
 * Multi-word name:
 * ```ts
 * getInitials('John Michael Doe', 3) // "JMD"
 * getInitials('John Michael Doe', 2) // "JM" (limited to 2)
 * ```
 *
 * @example
 * Single word:
 * ```ts
 * getInitials('John') // "J"
 * ```
 */
export function getInitials(name: string, maxLength: number = 2): string {
  if (!name) return ''
  
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  
  return parts
    .slice(0, maxLength)
    .map(part => part.charAt(0).toUpperCase())
    .join('')
}

