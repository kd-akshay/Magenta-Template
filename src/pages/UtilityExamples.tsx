import { useState } from 'react'
import { Card, Button, Input, Badge, Divider } from '@/components/ui'
import {
  formatDate,
  isToday,
  isPast,
  isFuture,
  formatCurrency,
  formatNumber,
  formatPercentage,
  debounce,
  capitalize,
  titleCase,
  truncate,
  stripHtml,
  slugify,
  pluralize,
  getInitials,
  isValidEmail,
  isValidUrl,
  isValidPhone,
  validatePassword,
  isEmpty,
  sanitizeInput,
} from '@/utils'
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'

const UtilityExamples = () => {
  const [dateInput, setDateInput] = useState(new Date().toISOString().split('T')[0])
  const [selectedDateFormat, setSelectedDateFormat] = useState<'short' | 'medium' | 'long' | 'relative' | string>('medium')
  const [currencyAmount, setCurrencyAmount] = useState('1234.56')
  const [currencyType, setCurrencyType] = useState('USD')
  const [debounceInput, setDebounceInput] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [stringInput, setStringInput] = useState('hello world example text')
  const [emailInput, setEmailInput] = useState('user@example.com')
  const [passwordInput, setPasswordInput] = useState('')
  const [copiedText, setCopiedText] = useState('')

  // Debounced search example
  const handleDebounceChange = debounce((value: string) => {
    setDebouncedValue(value)
  }, 500)

  const handleDebounceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDebounceInput(value)
    handleDebounceChange(value)
  }

  const passwordValidation = validatePassword(passwordInput)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(''), 2000)
  }

  const exampleDates = [
    new Date(),
    new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    new Date('2024-01-15'),
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Utility Functions Examples</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Interactive examples of utility functions for date, currency, performance, string, and validation
        </p>
      </div>

      {/* Date Utilities */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Date Utilities</h2>
        <div className="space-y-6">
          {/* Date Formatting */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Date Formatting</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Input
                    type="date"
                    label="Select Date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={selectedDateFormat}
                    onChange={(e) => setSelectedDateFormat(e.target.value)}
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                    <option value="full">Full</option>
                    <option value="relative">Relative</option>
                    <option value="YYYY-MM-DD">Custom: YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <code className="text-sm text-gray-600 dark:text-gray-400">
                    formatDate(new Date('{dateInput}'), '{selectedDateFormat}')
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(formatDate(new Date(dateInput), selectedDateFormat))}
                  >
                    {copiedText === formatDate(new Date(dateInput), selectedDateFormat) ? (
                      <CheckIcon className="w-4 h-4 text-green-600" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {formatDate(new Date(dateInput), selectedDateFormat)}
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* Date Examples */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Date Format Examples</h3>
            <div className="space-y-2">
              {exampleDates.map((date, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Short:</span>
                      <p className="font-semibold">{formatDate(date, 'short')}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Medium:</span>
                      <p className="font-semibold">{formatDate(date, 'medium')}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Relative:</span>
                      <p className="font-semibold">{formatDate(date, 'relative')}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {isToday(date) && <Badge variant="success" size="sm">Today</Badge>}
                    {isPast(date) && !isToday(date) && <Badge variant="secondary" size="sm">Past</Badge>}
                    {isFuture(date) && <Badge variant="info" size="sm">Future</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Currency Utilities */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Currency & Number Utilities</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Currency Formatting</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Input
                    type="number"
                    label="Amount"
                    value={currencyAmount}
                    onChange={(e) => setCurrencyAmount(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={currencyType}
                    onChange={(e) => setCurrencyType(e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <code className="text-sm text-gray-600 dark:text-gray-400">
                    formatCurrency({currencyAmount}, '{currencyType}')
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(formatCurrency(parseFloat(currencyAmount) || 0, currencyType))}
                  >
                    {copiedText === formatCurrency(parseFloat(currencyAmount) || 0, currencyType) ? (
                      <CheckIcon className="w-4 h-4 text-green-600" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(parseFloat(currencyAmount) || 0, currencyType)}
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* Number Format Examples */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Number Format Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Number:</span>
                <p className="text-lg font-semibold">{formatNumber(1234567.89)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Percentage:</span>
                <p className="text-lg font-semibold">{formatPercentage(0.1234)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Custom:</span>
                <p className="text-lg font-semibold">{formatNumber(1234567.89, 'en-US', { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Utilities */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Performance Utilities</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Debounce Example</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Type in the input below. The debounced value will update 500ms after you stop typing.
            </p>
            <Input
              label="Type something..."
              value={debounceInput}
              onChange={handleDebounceInputChange}
              placeholder="Watch the debounced value update"
            />
            <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <span className="text-sm text-gray-500 dark:text-gray-400">Debounced Value (500ms delay):</span>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
                {debouncedValue || <span className="text-gray-400">Waiting for input...</span>}
              </p>
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="text-lg font-semibold mb-4">Performance Functions</h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <ul className="space-y-2 text-sm">
                <li>
                  <code className="text-primary">debounce(func, delay)</code> - Delays function execution until after delay
                </li>
                <li>
                  <code className="text-primary">throttle(func, limit)</code> - Limits function execution to once per time period
                </li>
                <li>
                  <code className="text-primary">rafThrottle(func)</code> - Optimized throttle using requestAnimationFrame
                </li>
                <li>
                  <code className="text-primary">memoize(func, maxCacheSize)</code> - Memoizes function results with cache size limit
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* String Utilities */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">String Utilities</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">String Transformations</h3>
            <Input
              label="Input Text"
              value={stringInput}
              onChange={(e) => setStringInput(e.target.value)}
              placeholder="Enter text to transform"
            />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Capitalize:</span>
                <p className="text-lg font-semibold">{capitalize(stringInput)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Title Case:</span>
                <p className="text-lg font-semibold">{titleCase(stringInput)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Truncate (10 chars):</span>
                <p className="text-lg font-semibold">{truncate(stringInput, 10)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Slug:</span>
                <p className="text-lg font-semibold">{slugify(stringInput)}</p>
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="text-lg font-semibold mb-4">String Utility Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Initials:</span>
                <p className="text-lg font-semibold">{getInitials('John Michael Doe', 3)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Pluralize:</span>
                <p className="text-lg font-semibold">
                  {pluralize(5, 'item')} | {pluralize(1, 'child', 'children')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Strip HTML:</span>
                <p className="text-lg font-semibold">
                  {stripHtml('<p>Hello <strong>world</strong></p>')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Sanitize Input:</span>
                <p className="text-lg font-semibold text-xs break-all">
                  {sanitizeInput('<script>alert("xss")</script>Hello')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Validation Utilities */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Validation Utilities</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Email Validation</h3>
            <Input
              label="Email Address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter email to validate"
              error={!isEmpty(emailInput) && !isValidEmail(emailInput) ? 'Invalid email format' : undefined}
            />
            <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant={isValidEmail(emailInput) ? 'success' : 'danger'} size="sm">
                  {isValidEmail(emailInput) ? 'Valid Email' : 'Invalid Email'}
                </Badge>
                <code className="text-sm text-gray-600 dark:text-gray-400">
                  isValidEmail('{emailInput}')
                </code>
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="text-lg font-semibold mb-4">Password Strength Validation</h3>
            <Input
              type="password"
              label="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
            />
            {passwordInput && (
              <div className="mt-4 space-y-3">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Password Strength</span>
                    <Badge
                      variant={
                        passwordValidation.score >= 7
                          ? 'success'
                          : passwordValidation.score >= 5
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      Score: {passwordValidation.score}/8
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        passwordValidation.score >= 7
                          ? 'bg-green-500'
                          : passwordValidation.score >= 5
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${(passwordValidation.score / 8) * 100}%` }}
                    />
                  </div>
                </div>
                {passwordValidation.errors.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">Errors:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
                      {passwordValidation.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {passwordValidation.suggestions.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Suggestions:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                      {passwordValidation.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <Divider />

          <div>
            <h3 className="text-lg font-semibold mb-4">Validation Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">URL:</span>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={isValidUrl('https://example.com') ? 'success' : 'danger'} size="sm">Valid</Badge>
                    <code className="text-xs">example.com</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isValidUrl('invalid-url') ? 'success' : 'danger'} size="sm">Invalid</Badge>
                    <code className="text-xs">invalid-url</code>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Phone:</span>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={isValidPhone('123-456-7890') ? 'success' : 'danger'} size="sm">Valid</Badge>
                    <code className="text-xs">123-456-7890</code>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">Empty Check:</span>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={isEmpty('') ? 'success' : 'danger'} size="sm">Empty</Badge>
                    <code className="text-xs">isEmpty('')</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isEmpty('   ') ? 'success' : 'danger'} size="sm">Whitespace</Badge>
                    <code className="text-xs">isEmpty('   ')</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UtilityExamples

