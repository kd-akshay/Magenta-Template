import { forwardRef, useId, useMemo, useState, useEffect } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'
import Checkbox from './Checkbox'

export interface CheckboxCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  header?: ReactNode
  footer?: ReactNode
  checkboxPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  showCheckbox?: boolean
  className?: string
  cardClassName?: string
  checkboxClassName?: string
}

const CheckboxCard = forwardRef<HTMLDivElement, CheckboxCardProps>(
  (
    {
      children,
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      header,
      footer,
      checkboxPosition = 'top-right',
      showCheckbox = true,
      className,
      cardClassName,
      checkboxClassName,
      onClick,
      ...props
    },
    ref
  ) => {
    const cardId = useId()
    const checkboxId = useMemo(() => `checkbox-card-${cardId}`, [cardId])
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)

    // Sync internal state with controlled prop
    useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked)
      }
    }, [checked])

    const isChecked = checked !== undefined ? checked : internalChecked

    const handleToggle = () => {
      if (disabled) return
      
      const newChecked = !isChecked
      
      if (checked === undefined) {
        // Uncontrolled mode
        setInternalChecked(newChecked)
      }
      
      onChange?.(newChecked)
    }

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      
      // Don't toggle if clicking directly on the checkbox or its label
      const target = e.target as HTMLElement
      if (
        target.closest('input[type="checkbox"]') || 
        target.closest('label[for]') ||
        target.tagName === 'LABEL' ||
        target.closest('button')
      ) {
        return
      }

      onClick?.(e)
      handleToggle()
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      
      const newChecked = e.target.checked
      
      if (checked === undefined) {
        // Uncontrolled mode
        setInternalChecked(newChecked)
      }
      
      onChange?.(newChecked)
    }

    const checkboxPositionClasses = {
      'top-right': 'absolute top-4 right-4',
      'top-left': 'absolute top-4 left-4',
      'bottom-right': 'absolute bottom-4 right-4',
      'bottom-left': 'absolute bottom-4 left-4',
    }

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        {...props}
      >
        <div
          onClick={handleCardClick}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault()
              handleToggle()
            }
          }}
          role="checkbox"
          aria-checked={isChecked}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={cn(
            'relative bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 transition-all duration-200',
            'border-gray-200 dark:border-gray-700',
            isChecked && 'border-primary shadow-lg ring-2 ring-primary/20',
            disabled && 'opacity-50 cursor-not-allowed',
            !disabled && 'cursor-pointer hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            cardClassName
          )}
        >
          {showCheckbox && (
            <div 
              className={cn('z-10', checkboxPositionClasses[checkboxPosition], checkboxClassName)}
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                id={checkboxId}
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={handleCheckboxChange}
                disabled={disabled}
              />
            </div>
          )}

          {header && (
            <header className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
              {header}
            </header>
          )}

          <div className={cn('px-6 py-4', header && 'pt-4', footer && 'pb-4')}>
            {children}
          </div>

          {footer && (
            <footer className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
              {footer}
            </footer>
          )}
        </div>
      </div>
    )
  }
)

CheckboxCard.displayName = 'CheckboxCard'

export default CheckboxCard

