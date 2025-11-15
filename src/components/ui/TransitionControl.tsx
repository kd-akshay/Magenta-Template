import { useState } from 'react'
import { useTransition, type TransitionSpeed } from '@/contexts/TransitionContext'
import { Card, Button, Input, Select } from '@/components/ui'
import { Cog6ToothIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export const TransitionControl = () => {
  const { config, setSpeed, setDuration, getDurationClass } = useTransition()
  const [customDuration, setCustomDuration] = useState(config.duration.toString())
  const [isOpen, setIsOpen] = useState(false)

  const handleSpeedChange = (newSpeed: TransitionSpeed) => {
    setSpeed(newSpeed)
    if (newSpeed !== 'custom') {
      setCustomDuration(config.duration.toString())
    }
  }

  const handleCustomDurationChange = (value: string) => {
    setCustomDuration(value)
    const numValue = parseInt(value, 10)
    if (!isNaN(numValue) && numValue > 0) {
      setDuration(numValue)
    }
  }

  const resetToDefault = () => {
    setSpeed('normal')
    setCustomDuration('300')
    setDuration(300)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-110"
        aria-label="Open transition settings"
        title="Transition Settings"
      >
        <Cog6ToothIcon className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80">
      <Card className="p-6 shadow-2xl">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Transition Settings
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close transition settings"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Speed Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Transition Speed
              </label>
              <Select
                value={config.speed}
                onChange={(e) => handleSpeedChange(e.target.value as TransitionSpeed)}
                className="mt-1"
                aria-label="Transition speed"
                options={[
                  { value: 'fast', label: 'Fast (150ms)' },
                  { value: 'normal', label: 'Normal (300ms)' },
                  { value: 'slow', label: 'Slow (500ms)' },
                  { value: 'custom', label: 'Custom' },
                ]}
              />
            </div>

            {/* Custom Duration */}
            {config.speed === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Custom Duration (ms)
                </label>
                <Input
                  type="number"
                  min="50"
                  max="2000"
                  step="50"
                  value={customDuration}
                  onChange={(e) => handleCustomDurationChange(e.target.value)}
                  className="mt-1"
                  placeholder="Duration in milliseconds"
                  aria-label="Custom transition duration in milliseconds"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Range: 50ms - 2000ms
                </p>
              </div>
            )}

            {/* Current Duration Display */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Duration</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                {config.duration}ms
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Class: {getDurationClass()}
              </div>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefault}
              className="w-full"
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>

            {/* Preview */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preview
              </div>
              <div className="flex gap-2">
                <div
                  className={`w-12 h-12 bg-primary rounded-lg transition-all ${getDurationClass()} ease-in-out hover:scale-110 hover:rotate-12`}
                  style={{ transitionDuration: `${config.duration}ms` }}
                />
                <div
                  className={`w-12 h-12 bg-primary rounded-lg transition-all ${getDurationClass()} ease-in-out hover:scale-110 hover:rotate-12`}
                  style={{ transitionDuration: `${config.duration}ms` }}
                />
                <div
                  className={`w-12 h-12 bg-primary rounded-lg transition-all ${getDurationClass()} ease-in-out hover:scale-110 hover:rotate-12`}
                  style={{ transitionDuration: `${config.duration}ms` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TransitionControl

