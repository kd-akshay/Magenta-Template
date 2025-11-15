import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidUrl, isValidPhone, validatePassword, isEmpty, sanitizeInput } from '../validation'

describe('validation utilities', () => {
  describe('isValidEmail', () => {
    it('validates correct email', () => {
      expect(isValidEmail('user@example.com')).toBe(true)
    })

    it('rejects invalid email', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
    })

    it('rejects empty email', () => {
      expect(isValidEmail('')).toBe(false)
    })

    it('handles email with spaces', () => {
      expect(isValidEmail('  user@example.com  ')).toBe(true)
    })
  })

  describe('isValidUrl', () => {
    it('validates http URL', () => {
      expect(isValidUrl('http://example.com')).toBe(true)
    })

    it('validates https URL', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
    })

    it('validates URL without protocol', () => {
      expect(isValidUrl('example.com')).toBe(true)
    })

    it('rejects invalid URL', () => {
      expect(isValidUrl('invalid-url')).toBe(false)
    })
  })

  describe('isValidPhone', () => {
    it('validates US phone format', () => {
      expect(isValidPhone('123-456-7890')).toBe(true)
    })

    it('validates phone with parentheses', () => {
      expect(isValidPhone('(123) 456-7890')).toBe(true)
    })

    it('validates phone without formatting', () => {
      expect(isValidPhone('1234567890')).toBe(true)
    })
  })

  describe('validatePassword', () => {
    it('validates strong password', () => {
      const result = validatePassword('Password123!')
      expect(result.isValid).toBe(true)
      expect(result.score).toBeGreaterThan(5)
    })

    it('rejects weak password', () => {
      const result = validatePassword('weak')
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('rejects empty password', () => {
      const result = validatePassword('')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password is required')
    })
  })

  describe('isEmpty', () => {
    it('returns true for empty string', () => {
      expect(isEmpty('')).toBe(true)
    })

    it('returns true for whitespace only', () => {
      expect(isEmpty('   ')).toBe(true)
    })

    it('returns false for non-empty string', () => {
      expect(isEmpty('hello')).toBe(false)
    })

    it('handles null', () => {
      expect(isEmpty(null)).toBe(true)
    })

    it('handles undefined', () => {
      expect(isEmpty(undefined)).toBe(true)
    })
  })

  describe('sanitizeInput', () => {
    it('sanitizes script tags', () => {
      const sanitized = sanitizeInput('<script>alert("xss")</script>')
      expect(sanitized).not.toContain('<script>')
    })

    it('handles plain text', () => {
      expect(sanitizeInput('Hello world')).toBe('Hello world')
    })
  })
})

