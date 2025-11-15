import { describe, it, expect } from 'vitest'
import { capitalize, titleCase, truncate, stripHtml, randomString, slugify, pluralize, getInitials } from '../string'

describe('string utilities', () => {
  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('handles already capitalized', () => {
      expect(capitalize('HELLO')).toBe('Hello')
    })

    it('handles empty string', () => {
      expect(capitalize('')).toBe('')
    })
  })

  describe('titleCase', () => {
    it('converts to title case', () => {
      expect(titleCase('hello world')).toBe('Hello World')
    })

    it('handles uppercase', () => {
      expect(titleCase('HELLO WORLD')).toBe('Hello World')
    })

    it('handles mixed case', () => {
      expect(titleCase('hELLO wORLD')).toBe('Hello World')
    })
  })

  describe('truncate', () => {
    it('truncates long string', () => {
      expect(truncate('Hello world', 5)).toBe('Hello...')
    })

    it('does not truncate short string', () => {
      expect(truncate('Hello', 10)).toBe('Hello')
    })

    it('uses custom suffix', () => {
      expect(truncate('Hello world', 5, '...')).toBe('Hello...')
    })
  })

  describe('stripHtml', () => {
    it('removes HTML tags', () => {
      expect(stripHtml('<p>Hello <strong>world</strong></p>')).toBe('Hello world')
    })

    it('handles plain text', () => {
      expect(stripHtml('Hello world')).toBe('Hello world')
    })
  })

  describe('randomString', () => {
    it('generates string of specified length', () => {
      const str = randomString(10)
      expect(str).toHaveLength(10)
    })

    it('generates alphanumeric string by default', () => {
      const str = randomString(20)
      expect(str).toMatch(/^[A-Za-z0-9]+$/)
    })

    it('uses custom charset', () => {
      const str = randomString(5, '0123456789')
      expect(str).toMatch(/^\d+$/)
    })
  })

  describe('slugify', () => {
    it('converts to slug', () => {
      expect(slugify('Hello World!')).toBe('hello-world')
    })

    it('removes special characters', () => {
      expect(slugify('Hello@World#123')).toBe('helloworld123')
    })

    it('handles multiple spaces', () => {
      expect(slugify('Hello    World')).toBe('hello-world')
    })
  })

  describe('pluralize', () => {
    it('returns singular for count 1', () => {
      expect(pluralize(1, 'item')).toBe('item')
    })

    it('returns plural for count > 1', () => {
      expect(pluralize(5, 'item')).toBe('items')
    })

    it('uses custom plural form', () => {
      expect(pluralize(5, 'child', 'children')).toBe('children')
    })
  })

  describe('getInitials', () => {
    it('gets initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD')
    })

    it('handles single name', () => {
      expect(getInitials('John')).toBe('J')
    })

    it('handles max length', () => {
      expect(getInitials('John Michael Doe', 3)).toBe('JMD')
    })
  })
})

