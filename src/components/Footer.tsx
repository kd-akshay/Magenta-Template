import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  
  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {t('footer.description')}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

