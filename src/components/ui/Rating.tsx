import { useState, useCallback } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

export interface RatingProps {
  /** Maximum rating value */
  max?: number
  /** Current rating value */
  value?: number
  /** Default value (uncontrolled) */
  defaultValue?: number
  /** Callback when rating changes */
  onChange?: (value: number) => void
  /** Read-only mode */
  readOnly?: boolean
  /** Allow half stars */
  allowHalf?: boolean
  /** Allow clearing rating */
  allowClear?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Color variant */
  variant?: 'primary' | 'warning' | 'success' | 'danger'
  /** Show labels */
  showLabels?: boolean
  /** Custom labels for each rating */
  labels?: string[]
  /** Custom className */
  className?: string
  /** Helper text */
  helperText?: string
  /** Label */
  label?: string
}

const Rating = ({
  max = 5,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  readOnly = false,
  allowHalf = false,
  allowClear = false,
  size = 'md',
  variant = 'warning',
  showLabels = false,
  labels,
  className,
  helperText,
  label,
}: RatingProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const isControlled = controlledValue !== undefined
  const displayValue = hoverValue ?? (isControlled ? controlledValue : internalValue)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  }

  const variantClasses = {
    primary: 'text-primary',
    warning: 'text-yellow-400',
    success: 'text-green-400',
    danger: 'text-red-400',
  }

  const handleClick = useCallback(
    (newValue: number) => {
      if (readOnly) return

      if (allowClear && newValue === (isControlled ? controlledValue : internalValue)) {
        // Clear rating if clicking the same value and allowClear is true
        if (!isControlled) {
          setInternalValue(0)
        }
        onChange?.(0)
        return
      }

      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    },
    [readOnly, allowClear, isControlled, controlledValue, internalValue, onChange]
  )

  const handleMouseEnter = useCallback(
    (value: number) => {
      if (readOnly) return
      setHoverValue(value)
    },
    [readOnly]
  )

  const handleMouseLeave = useCallback(() => {
    if (readOnly) return
    setHoverValue(null)
  }, [readOnly])

  const getStarFill = (index: number) => {
    const starValue = index + 1
    const halfStarValue = starValue - 0.5

    if (displayValue >= starValue) {
      return 'full'
    } else if (allowHalf && displayValue >= halfStarValue) {
      return 'half'
    }
    return 'empty'
  }

  const defaultLabels = [
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent',
  ]

  const ratingLabels = labels || defaultLabels.slice(0, max)

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div 
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label={label || 'Rating'}
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1
          const fill = getStarFill(index)

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={readOnly}
              className={cn(
                'relative transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded',
                !readOnly && 'cursor-pointer hover:scale-110',
                readOnly && 'cursor-default opacity-50'
              )}
              aria-label={`Rate ${starValue} out of ${max}${showLabels && ratingLabels[index] ? `, ${ratingLabels[index]}` : ''}`}
              aria-pressed={displayValue >= starValue}
              aria-checked={displayValue >= starValue}
            >
              {/* Half star overlay */}
              {allowHalf && fill === 'half' && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <StarIcon
                    className={cn(sizeClasses[size], variantClasses[variant])}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Full or empty star */}
              {fill === 'full' ? (
                <StarIcon
                  className={cn(sizeClasses[size], variantClasses[variant])}
                  aria-hidden="true"
                />
              ) : (
                <StarIconOutline
                  className={cn(sizeClasses[size], 'text-gray-300 dark:text-gray-600')}
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}

        {/* Value display */}
        {displayValue > 0 && (
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {displayValue.toFixed(allowHalf ? 1 : 0)} / {max}
          </span>
        )}
      </div>

      {/* Label display */}
      {showLabels && displayValue > 0 && displayValue <= ratingLabels.length && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {ratingLabels[Math.ceil(displayValue) - 1]}
        </p>
      )}

      {/* Helper text */}
      {helperText && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  )
}

export default Rating

