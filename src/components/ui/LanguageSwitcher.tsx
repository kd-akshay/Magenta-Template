import { useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'
import PopupMenu from './PopupMenu'
import type { MenuItem } from './PopupMenu'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import Button from './Button'

interface LanguageSwitcherProps {
  variant?: 'default' | 'header'
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
] as const

const LanguageSwitcher = memo(({ variant = 'default' }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation()
  
  const currentLanguage = useMemo(
    () => LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0],
    [i18n.language]
  )
  
  const menuItems: MenuItem[] = useMemo(
    () => LANGUAGES.map((lang) => ({
      label: lang.label,
      onClick: () => {
        i18n.changeLanguage(lang.code)
        localStorage.setItem('language', lang.code)
      },
    })),
    [i18n]
  )
  
  const isHeaderVariant = variant === 'header'
  
  return (
    <PopupMenu
      trigger={
        <Button 
          variant="ghost" 
          size="sm" 
          className={isHeaderVariant ? "gap-2 text-white" : "gap-2"}
          aria-label={`Current language: ${currentLanguage.label}. Click to change language.`}
          aria-haspopup="menu"
        >
          <GlobeAltIcon className="h-5 w-5" aria-hidden="true" />
          <span>{currentLanguage.label}</span>
        </Button>
      }
      items={menuItems}
    />
  )
})

LanguageSwitcher.displayName = 'LanguageSwitcher'

export default LanguageSwitcher

