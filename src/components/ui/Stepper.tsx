import type { ReactNode } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

export type StepStatus = 'completed' | 'current' | 'pending' | 'error'

export interface Step {
  id: string | number
  title: string
  description?: string
  icon?: ReactNode
  status?: StepStatus
  onClick?: () => void
}

export interface StepperProps {
  steps: Step[]
  currentStep?: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
  showStepNumber?: boolean
  clickable?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Stepper = ({
  steps,
  currentStep = 0,
  orientation = 'horizontal',
  className,
  showStepNumber = true,
  clickable = false,
  size = 'md',
}: StepperProps) => {
  const getStepStatus = (index: number): StepStatus => {
    const step = steps[index]
    if (step?.status) return step.status
    
    if (index < currentStep) return 'completed'
    if (index === currentStep) return 'current'
    return 'pending'
  }

  const sizes = {
    sm: {
      stepNumber: 'w-6 h-6 text-xs',
      icon: 'w-4 h-4',
      title: 'text-sm',
      description: 'text-xs',
      connector: 'h-0.5',
      verticalConnector: 'w-0.5',
    },
    md: {
      stepNumber: 'w-8 h-8 text-sm',
      icon: 'w-5 h-5',
      title: 'text-base',
      description: 'text-sm',
      connector: 'h-1',
      verticalConnector: 'w-1',
    },
    lg: {
      stepNumber: 'w-10 h-10 text-base',
      icon: 'w-6 h-6',
      title: 'text-lg',
      description: 'text-base',
      connector: 'h-1.5',
      verticalConnector: 'w-1.5',
    },
  }

  const stepSize = sizes[size]

  const renderStepIndicator = (step: Step, index: number, status: StepStatus) => {
    const stepNumber = index + 1
    const isCompleted = status === 'completed'
    const isCurrent = status === 'current'
    const isError = status === 'error'
    const isPending = status === 'pending'

    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full font-semibold transition-all relative z-10 flex-shrink-0',
          stepSize.stepNumber,
          isCompleted && 'bg-primary text-white',
          isCurrent && !isError && 'bg-primary text-white ring-4 ring-primary/20',
          isPending && 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
          isError && 'bg-red-500 text-white ring-4 ring-red-500/20',
          clickable && !isPending && 'cursor-pointer hover:scale-110',
          step.icon && 'p-0'
        )}
        onClick={clickable && step.onClick ? step.onClick : undefined}
        role={clickable && step.onClick ? 'button' : undefined}
        tabIndex={clickable && step.onClick ? 0 : undefined}
        aria-label={`Step ${stepNumber}: ${step.title}`}
        aria-current={isCurrent ? 'step' : undefined}
      >
        {isCompleted && !step.icon ? (
          <CheckIcon className={cn(stepSize.icon, 'text-white')} aria-hidden="true" />
        ) : isError && !step.icon ? (
          <XMarkIcon className={cn(stepSize.icon, 'text-white')} aria-hidden="true" />
        ) : step.icon ? (
          <div className={cn(stepSize.icon)}>{step.icon}</div>
        ) : (
          showStepNumber && stepNumber
        )}
      </div>
    )
  }

  if (orientation === 'horizontal') {
    return (
      <nav
        className={cn('w-full', className)}
        aria-label="Progress"
        role="navigation"
      >
        <ol className="flex items-center w-full">
          {steps.map((step, index) => {
            const status = getStepStatus(index)
            const isLast = index === steps.length - 1
            const isCompleted = status === 'completed'
            const isCurrent = status === 'current'
            const isError = status === 'error'
            const isPending = status === 'pending'

            return (
              <li
                key={step.id}
                className={cn(
                  'flex items-center',
                  !isLast && 'flex-1'
                )}
              >
                <div className="flex items-center">
                  {renderStepIndicator(step, index, status)}
                  <div className="flex flex-col ml-3">
                    <span
                      className={cn(
                        'font-medium transition-colors transition-all',
                        stepSize.title,
                        isCompleted && 'text-primary',
                        isCurrent && !isError && 'text-primary',
                        isPending && 'text-gray-500 dark:text-gray-400',
                        isError && 'text-red-600 dark:text-red-400'
                      )}
                    >
                      {step.title}
                    </span>
                    {step.description && (
                      <span
                        className={cn(
                          'mt-0.5 transition-colors transition-all',
                          stepSize.description,
                          isCompleted && 'text-gray-600 dark:text-gray-400',
                          isCurrent && !isError && 'text-gray-700 dark:text-gray-300',
                          isPending && 'text-gray-400 dark:text-gray-500',
                          isError && 'text-red-500 dark:text-red-400'
                        )}
                      >
                        {step.description}
                      </span>
                    )}
                  </div>
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      'flex-1 mx-4 transition-all transition-all',
                      stepSize.connector,
                      isCompleted || isCurrent || isError
                        ? 'bg-primary'
                        : 'bg-gray-200 dark:bg-gray-700'
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  // Vertical orientation
  return (
    <nav
      className={cn('w-full', className)}
      aria-label="Progress"
      role="navigation"
    >
      <ol className="flex flex-col space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(index)
          const isLast = index === steps.length - 1
          const isCompleted = status === 'completed'
          const isCurrent = status === 'current'
          const isError = status === 'error'
          const isPending = status === 'pending'

          return (
            <li
              key={step.id}
              className="flex items-start"
            >
              <div className="flex flex-col items-center mr-4">
                {renderStepIndicator(step, index, status)}
                {!isLast && (
                  <div
                    className={cn(
                      'mt-4 transition-all transition-all',
                      stepSize.verticalConnector,
                      'min-h-[3rem]',
                      isCompleted || isCurrent || isError
                        ? 'bg-primary'
                        : 'bg-gray-200 dark:bg-gray-700'
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="flex flex-col pt-1 flex-1">
                <span
                  className={cn(
                    'font-medium transition-colors transition-all',
                    stepSize.title,
                    isCompleted && 'text-primary',
                    isCurrent && !isError && 'text-primary',
                    isPending && 'text-gray-500 dark:text-gray-400',
                    isError && 'text-red-600 dark:text-red-400'
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span
                    className={cn(
                      'mt-0.5 transition-colors transition-all',
                      stepSize.description,
                      isCompleted && 'text-gray-600 dark:text-gray-400',
                      isCurrent && !isError && 'text-gray-700 dark:text-gray-300',
                      isPending && 'text-gray-400 dark:text-gray-500',
                      isError && 'text-red-500 dark:text-red-400'
                    )}
                  >
                    {step.description}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Stepper

