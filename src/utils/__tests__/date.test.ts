import { describe, it, expect } from 'vitest'
import { formatDate, isToday, isPast, isFuture, addDays, diffInDays } from '../date'

describe('date utilities', () => {
  describe('formatDate', () => {
    it('formats date in short format', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date, 'short')
      expect(formatted).toContain('2024')
      expect(formatted).toContain('1')
      expect(formatted).toContain('15')
    })

    it('formats date in medium format', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date, 'medium')
      expect(formatted).toContain('2024')
    })

    it('formats date in long format', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date, 'long')
      expect(formatted).toContain('2024')
      expect(formatted).toContain('January')
    })

    it('formats date in relative format (just now)', () => {
      const date = new Date()
      const formatted = formatDate(date, 'relative')
      expect(formatted).toMatch(/just now|seconds ago/)
    })

    it('formats date in relative format (minutes ago)', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000)
      const formatted = formatDate(date, 'relative')
      expect(formatted).toContain('minutes ago')
    })

    it('formats date in relative format (hours ago)', () => {
      const date = new Date(Date.now() - 3 * 60 * 60 * 1000)
      const formatted = formatDate(date, 'relative')
      expect(formatted).toContain('hours ago')
    })

    it('formats date with custom format', () => {
      const date = new Date('2024-01-15T10:30:00')
      const formatted = formatDate(date, 'YYYY-MM-DD')
      expect(formatted).toBe('2024-01-15')
    })

    it('handles invalid date', () => {
      const formatted = formatDate(new Date('invalid'), 'short')
      expect(formatted).toBe('Invalid Date')
    })

    it('handles string date', () => {
      const formatted = formatDate('2024-01-15', 'YYYY-MM-DD')
      expect(formatted).toBe('2024-01-15')
    })

    it('handles timestamp', () => {
      const timestamp = new Date('2024-01-15').getTime()
      const formatted = formatDate(timestamp, 'YYYY-MM-DD')
      expect(formatted).toBe('2024-01-15')
    })
  })

  describe('isToday', () => {
    it('returns true for today', () => {
      expect(isToday(new Date())).toBe(true)
    })

    it('returns false for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isToday(yesterday)).toBe(false)
    })

    it('returns false for tomorrow', () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      expect(isToday(tomorrow)).toBe(false)
    })
  })

  describe('isPast', () => {
    it('returns true for past date', () => {
      const past = new Date()
      past.setDate(past.getDate() - 1)
      expect(isPast(past)).toBe(true)
    })

    it('returns false for future date', () => {
      const future = new Date()
      future.setDate(future.getDate() + 1)
      expect(isPast(future)).toBe(false)
    })
  })

  describe('isFuture', () => {
    it('returns true for future date', () => {
      const future = new Date()
      future.setDate(future.getDate() + 1)
      expect(isFuture(future)).toBe(true)
    })

    it('returns false for past date', () => {
      const past = new Date()
      past.setDate(past.getDate() - 1)
      expect(isFuture(past)).toBe(false)
    })
  })

  describe('addDays', () => {
    it('adds days to date', () => {
      const date = new Date('2024-01-15')
      const result = addDays(date, 5)
      expect(result.getDate()).toBe(20)
    })

    it('subtracts days with negative number', () => {
      const date = new Date('2024-01-15')
      const result = addDays(date, -5)
      expect(result.getDate()).toBe(10)
    })
  })

  describe('diffInDays', () => {
    it('calculates difference in days', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-01-20')
      expect(diffInDays(date1, date2)).toBe(5)
    })

    it('handles reverse order', () => {
      const date1 = new Date('2024-01-20')
      const date2 = new Date('2024-01-15')
      expect(diffInDays(date1, date2)).toBe(5)
    })
  })
})

