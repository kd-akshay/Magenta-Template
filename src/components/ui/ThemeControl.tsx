import { useState } from 'react'
import { Button, Input, Select, Divider } from '@/components/ui'
import { useTheme } from '@/contexts/ThemeContext'
import { XMarkIcon, PaintBrushIcon } from '@heroicons/react/24/outline'

const ThemeControl = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    config,
    setMode,
    setColors,
    setTypography,
    setSpacing,
    setBorderRadius,
    setShadows,
    resetTheme,
  } = useTheme()

  const [colorInputs, setColorInputs] = useState({
    primary: config.colors.primary,
    secondary: config.colors.secondary,
    success: config.colors.success,
    warning: config.colors.warning,
    danger: config.colors.danger,
    info: config.colors.info,
  })

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-110"
        aria-label="Open theme settings"
        title="Theme Settings"
      >
        <PaintBrushIcon className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black/5 dark:ring-white/10">
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
        <div className="flex items-center gap-2">
          <PaintBrushIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Theme Settings</h2>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          aria-label="Close theme settings"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Theme Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme Mode
          </label>
          <Select
            value={config.mode}
            onChange={(e) => setMode(e.target.value as 'light' | 'dark' | 'system')}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ]}
          />
        </div>

        <Divider />

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Colors
          </label>
          <div className="space-y-3">
            {Object.entries(colorInputs).map(([key, value]) => (
              <div key={key}>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1 capitalize">
                  {key}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => {
                      const newColors = { ...colorInputs, [key]: e.target.value }
                      setColorInputs(newColors)
                      setColors({ [key]: e.target.value } as any)
                    }}
                    aria-label={`Select ${key} color`}
                    className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                  <Input
                    value={value}
                    onChange={(e) => {
                      const newColors = { ...colorInputs, [key]: e.target.value }
                      setColorInputs(newColors)
                      setColors({ [key]: e.target.value } as any)
                    }}
                    aria-label={`${key} color hex value`}
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Typography */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Font Size
          </label>
          <Select
            value={config.typography.fontSize}
            onChange={(e) =>
              setTypography({ fontSize: e.target.value as 'small' | 'medium' | 'large' })
            }
            options={[
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' },
            ]}
          />
        </div>

        <Divider />

        {/* Spacing */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Spacing Scale
          </label>
          <Select
            value={config.spacing.scale}
            onChange={(e) =>
              setSpacing({ scale: e.target.value as 'compact' | 'comfortable' | 'spacious' })
            }
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'comfortable', label: 'Comfortable' },
              { value: 'spacious', label: 'Spacious' },
            ]}
          />
        </div>

        <Divider />

        {/* Border Radius */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Border Radius
          </label>
          <Select
            value={config.borderRadius}
            onChange={(e) => setBorderRadius(e.target.value as any)}
            options={[
              { value: 'none', label: 'None' },
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' },
              { value: 'full', label: 'Full' },
            ]}
          />
        </div>

        <Divider />

        {/* Shadows */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Shadows
          </label>
          <Select
            value={config.shadows}
            onChange={(e) => setShadows(e.target.value as any)}
            options={[
              { value: 'none', label: 'None' },
              { value: 'subtle', label: 'Subtle' },
              { value: 'medium', label: 'Medium' },
              { value: 'elevated', label: 'Elevated' },
            ]}
          />
        </div>

        <Divider />

        {/* Reset */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetTheme} className="flex-1">
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ThemeControl

