/**
 * Formats a number as currency.
 *
 * @param amount - Amount to format
 * @param currency - Currency code (ISO 4217, default: 'USD')
 * @param locale - Locale string for formatting (default: 'en-US')
 * @param options - Additional Intl.NumberFormatOptions for customization
 * @returns Formatted currency string
 *
 * @remarks
 * Uses the Intl.NumberFormat API for locale-aware currency formatting.
 *
 * @public
 *
 * @example
 * Basic usage:
 * ```ts
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(1234.56, 'EUR') // "€1,234.56"
 * formatCurrency(1234.56, 'JPY') // "¥1,235" (no decimals for JPY)
 * ```
 *
 * @example
 * With options:
 * ```ts
 * formatCurrency(1234.56, 'USD', 'en-US', { minimumFractionDigits: 0 }) // "$1,235"
 * formatCurrency(1234.5, 'EUR', 'de-DE') // "1.234,50 €"
 * ```
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    ...options,
  }).format(amount)
}

/**
 * Formats a number with thousand separators.
 *
 * @param value - Number to format
 * @param locale - Locale string for formatting (default: 'en-US')
 * @param options - Additional Intl.NumberFormatOptions for customization
 * @returns Formatted number string with thousand separators
 *
 * @remarks
 * Uses the Intl.NumberFormat API for locale-aware number formatting.
 *
 * @public
 *
 * @example
 * Basic usage:
 * ```ts
 * formatNumber(1234567.89) // "1,234,567.89"
 * formatNumber(1234567.89, 'de-DE') // "1.234.567,89"
 * ```
 *
 * @example
 * With options:
 * ```ts
 * formatNumber(1234.5, 'en-US', { maximumFractionDigits: 0 }) // "1,235"
 * formatNumber(1234.567, 'en-US', { maximumFractionDigits: 2 }) // "1,234.57"
 * ```
 */
export function formatNumber(
  value: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value)
}

/**
 * Formats a number as a percentage.
 *
 * @param value - Number to format (0-1 if isDecimal is true, otherwise 0-100)
 * @param locale - Locale string for formatting (default: 'en-US')
 * @param isDecimal - If true, treats value as decimal (0-1), otherwise as percentage (0-100)
 * @param options - Additional Intl.NumberFormatOptions for customization
 * @returns Formatted percentage string
 *
 * @remarks
 * Uses the Intl.NumberFormat API for locale-aware percentage formatting.
 *
 * @public
 *
 * @example
 * With decimal value:
 * ```ts
 * formatPercentage(0.1234) // "12%"
 * formatPercentage(0.1234, 'en-US', true, { minimumFractionDigits: 1 }) // "12.3%"
 * ```
 *
 * @example
 * With percentage value:
 * ```ts
 * formatPercentage(12.34, 'en-US', false) // "12%"
 * formatPercentage(87.5, 'en-US', false) // "88%"
 * ```
 */
export function formatPercentage(
  value: number,
  locale: string = 'en-US',
  isDecimal: boolean = true,
  options?: Intl.NumberFormatOptions
): string {
  const percentageValue = isDecimal ? value * 100 : value
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...options,
  }).format(percentageValue / 100)
}

/**
 * Parses a currency string to a number.
 *
 * @param currencyString - Currency string to parse (e.g., "$1,234.56")
 * @param locale - Locale string to determine decimal separator (default: 'en-US')
 * @returns Parsed number or NaN if invalid
 *
 * @remarks
 * Handles different decimal separators based on locale (e.g., ',' for German, '.' for US).
 *
 * @public
 *
 * @example
 * US format:
 * ```ts
 * parseCurrency("$1,234.56") // 1234.56
 * parseCurrency("1,234.56") // 1234.56
 * ```
 *
 * @example
 * European format:
 * ```ts
 * parseCurrency("€1.234,56", "de-DE") // 1234.56
 * parseCurrency("1.234,56", "de-DE") // 1234.56
 * ```
 */
export function parseCurrency(
  currencyString: string,
  locale: string = 'en-US'
): number {
  // Remove currency symbols and parse
  const cleaned = currencyString.replace(/[^\d.,-]/g, '')
  const parts = cleaned.split(/[.,]/)
  
  if (parts.length > 2) {
    return NaN
  }

  // Determine decimal separator based on locale
  const decimalSeparator = locale.includes('de') || locale.includes('fr') ? ',' : '.'
  const hasDecimalSeparator = cleaned.includes(decimalSeparator)

  if (hasDecimalSeparator) {
    const integerPart = parts[0].replace(/\D/g, '')
    const decimalPart = parts[1] || ''
    return parseFloat(`${integerPart}.${decimalPart}`)
  }

  return parseFloat(parts[0].replace(/\D/g, ''))
}

