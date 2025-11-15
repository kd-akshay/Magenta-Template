import { describe, it, expect } from 'vitest'
import { formatCurrency, formatNumber, formatPercentage, parseCurrency } from '../currency'

describe('currency utilities', () => {
  describe('formatCurrency', () => {
    it('formats USD currency', () => {
      const formatted = formatCurrency(1234.56, 'USD')
      expect(formatted).toContain('1,234.56')
      expect(formatted).toContain('$')
    })

    it('formats EUR currency', () => {
      const formatted = formatCurrency(1234.56, 'EUR', 'en-US')
      expect(formatted).toContain('1,234.56')
    })

    it('formats with custom options', () => {
      const formatted = formatCurrency(1234.56, 'USD', 'en-US', { minimumFractionDigits: 0 })
      expect(formatted).not.toContain('.')
    })

    it('handles zero', () => {
      const formatted = formatCurrency(0)
      expect(formatted).toContain('0')
    })

    it('handles negative numbers', () => {
      const formatted = formatCurrency(-1234.56)
      expect(formatted).toContain('-')
    })
  })

  describe('formatNumber', () => {
    it('formats number with thousand separators', () => {
      const formatted = formatNumber(1234567.89)
      expect(formatted).toContain('1,234,567.89')
    })

    it('formats with custom locale', () => {
      const formatted = formatNumber(1234567.89, 'de-DE')
      expect(formatted).toContain('1.234.567,89')
    })

    it('formats with options', () => {
      const formatted = formatNumber(1234.5, 'en-US', { maximumFractionDigits: 0 })
      expect(formatted).toContain('1,235')
    })
  })

  describe('formatPercentage', () => {
    it('formats decimal as percentage', () => {
      const formatted = formatPercentage(0.1234)
      expect(formatted).toContain('%')
      expect(parseFloat(formatted.replace('%', ''))).toBeGreaterThan(0)
    })

    it('formats number as percentage', () => {
      const formatted = formatPercentage(12.34, 'en-US', false)
      expect(formatted).toContain('%')
    })
  })

  describe('parseCurrency', () => {
    it('parses USD currency string', () => {
      const parsed = parseCurrency('$1,234.56', 'en-US')
      expect(parsed).toBe(1234.56)
    })

    it('handles simple number string', () => {
      const parsed = parseCurrency('1234.56', 'en-US')
      expect(parsed).toBe(1234.56)
    })
  })
})

