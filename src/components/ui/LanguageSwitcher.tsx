import { useTranslation } from 'react-i18next'
import PopupMenu from './PopupMenu'
import type { MenuItem } from './PopupMenu'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import Button from './Button'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
  ]
  
  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]
  
  const menuItems: MenuItem[] = languages.map((lang) => ({
    label: lang.label,
    onClick: () => {
      i18n.changeLanguage(lang.code)
      localStorage.setItem('language', lang.code)
    },
  }))
  
  return (
    <PopupMenu
      trigger={
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2"
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
}

export default LanguageSwitcher

