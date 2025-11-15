import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/utils/cn'

export interface SliderProps {
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step value */
  step?: number
  /** Current value */
  value?: number
  /** Default value (uncontrolled) */
  defaultValue?: number
  /** Callback when value changes */
  onChange?: (value: number) => void
  /** Callback when dragging ends */
  onValueChange?: (value: number) => void
  /** Disabled state */
  disabled?: boolean
  /** Show marks */
  marks?: boolean | number[]
  /** Custom label formatter */
  formatLabel?: (value: number) => string
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Custom className */
  className?: string
  /** Label */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error message */
  error?: string
}

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  onValueChange,
  disabled = false,
  marks = false,
  formatLabel,
  orientation = 'horizontal',
  size = 'md',
  className,
  label,
  helperText,
  error,
}: SliderProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const percentage = ((value - min) / (max - min)) * 100

  const updateValue = useCallback(
    (newValue: number) => {
      const clampedValue = Math.max(min, Math.min(max, newValue))
      const steppedValue = Math.round(clampedValue / step) * step

      if (!isControlled) {
        setInternalValue(steppedValue)
      }

      onChange?.(steppedValue)
    },
    [min, max, step, isControlled, onChange]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return

      e.preventDefault()
      setIsDragging(true)

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!sliderRef.current) return

        const rect = sliderRef.current.getBoundingClientRect()
        let newValue: number

        if (orientation === 'horizontal') {
          const x = moveEvent.clientX - rect.left
          const percentage = Math.max(0, Math.min(1, x / rect.width))
          newValue = min + percentage * (max - min)
        } else {
          const y = rect.bottom - moveEvent.clientY
          const percentage = Math.max(0, Math.min(1, y / rect.height))
          newValue = min + percentage * (max - min)
        }

        updateValue(newValue)
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        onValueChange?.(value)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      // Initial click
      handleMouseMove(e.nativeEvent)
    },
    [disabled, orientation, min, max, updateValue, onValueChange, value]
  )

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || isDragging) return
      if (!sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      let newValue: number

      if (orientation === 'horizontal') {
        const x = e.clientX - rect.left
        const percentage = Math.max(0, Math.min(1, x / rect.width))
        newValue = min + percentage * (max - min)
      } else {
        const y = rect.bottom - e.clientY
        const percentage = Math.max(0, Math.min(1, y / rect.height))
        newValue = min + percentage * (max - min)
      }

      updateValue(newValue)
      onValueChange?.(newValue)
    },
    [disabled, isDragging, orientation, min, max, updateValue, onValueChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return

      let newValue = value

      if (orientation === 'horizontal') {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault()
          newValue = value - step
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault()
          newValue = value + step
        }
      } else {
        if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
          e.preventDefault()
          newValue = value - step
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
          e.preventDefault()
          newValue = value + step
        }
      }

      if (newValue !== value) {
        updateValue(newValue)
        onValueChange?.(newValue)
      }
    },
    [disabled, value, step, orientation, updateValue, onValueChange]
  )

  // Generate marks
  const getMarks = () => {
    if (!marks) return []
    if (Array.isArray(marks)) return marks
    // Generate marks based on step
    const markCount = Math.floor((max - min) / step) + 1
    return Array.from({ length: markCount }, (_, i) => min + i * step)
  }

  const markValues = getMarks()

  const sizeClasses = {
    sm: {
      track: 'h-1',
      thumb: 'w-4 h-4',
      thumbFocus: 'w-6 h-6',
    },
    md: {
      track: 'h-2',
      thumb: 'w-5 h-5',
      thumbFocus: 'w-7 h-7',
    },
    lg: {
      track: 'h-3',
      thumb: 'w-6 h-6',
      thumbFocus: 'w-8 h-8',
    },
  }

  const formatDisplayValue = formatLabel || ((val: number) => val.toString())

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <div
        className={cn(
          'relative flex items-center',
          orientation === 'vertical' && 'flex-col h-64 w-auto',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {/* Track */}
        <div
          ref={sliderRef}
          className={cn(
            'relative flex-1 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer transition-colors',
            sizeClasses[size].track,
            orientation === 'vertical' && 'w-2 h-full',
            error && 'bg-red-200 dark:bg-red-900/30',
            disabled && 'cursor-not-allowed'
          )}
          onClick={handleTrackClick}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          {/* Filled track */}
          <div
            className={cn(
              'absolute rounded-full bg-primary transition-all',
              orientation === 'horizontal'
                ? `left-0 top-0 ${sizeClasses[size].track}`
                : `bottom-0 left-0 w-full`,
              error && 'bg-red-500 dark:bg-red-400'
            )}
            style={
              orientation === 'horizontal'
                ? { width: `${percentage}%` }
                : { height: `${percentage}%` }
            }
          />

          {/* Marks */}
          {markValues.length > 0 && (
            <div className="absolute inset-0">
              {markValues.map((mark) => {
                const markPercentage = ((mark - min) / (max - min)) * 100
                return (
                  <div
                    key={mark}
                    className={cn(
                      'absolute w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500',
                      orientation === 'horizontal'
                        ? 'top-1/2 -translate-y-1/2'
                        : 'left-1/2 -translate-x-1/2'
                    )}
                    style={
                      orientation === 'horizontal'
                        ? { left: `${markPercentage}%` }
                        : { bottom: `${markPercentage}%` }
                    }
                  />
                )
              })}
            </div>
          )}

          {/* Thumb */}
          <div
            ref={thumbRef}
            className={cn(
              'absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary border-2 border-white dark:border-gray-800 shadow-lg transition-all cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              sizeClasses[size].thumb,
              orientation === 'vertical' && 'translate-x-1/2 translate-y-1/2',
              error && 'bg-red-500 dark:bg-red-400',
              disabled && 'cursor-not-allowed'
            )}
            style={
              orientation === 'horizontal'
                ? { left: `${percentage}%`, top: '50%' }
                : { bottom: `${percentage}%`, left: '50%' }
            }
            onMouseDown={disabled ? undefined : handleMouseDown}
            onKeyDown={disabled ? undefined : handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-disabled={disabled}
          >
            {/* Value tooltip */}
            {isDragging && (
              <div
                className={cn(
                  'absolute px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded whitespace-nowrap pointer-events-none',
                  orientation === 'horizontal' ? 'bottom-full mb-2' : 'left-full ml-2'
                )}
              >
                {formatDisplayValue(value)}
              </div>
            )}
          </div>
        </div>

        {/* Value labels */}
        <div
          className={cn(
            'flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2',
            orientation === 'vertical' && 'flex-col space-y-1 w-full text-center'
          )}
        >
          <span>{formatDisplayValue(min)}</span>
          <span className="font-semibold text-primary">{formatDisplayValue(value)}</span>
          <span>{formatDisplayValue(max)}</span>
        </div>
      </div>

      {/* Helper text or error */}
      {(helperText || error) && (
        <p
          className={cn(
            'mt-2 text-sm',
            error
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-500 dark:text-gray-400'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  )
}

export default Slider

