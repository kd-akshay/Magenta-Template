import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui'

const NotFound = () => {
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
        {t('pages.notFound.title')}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
        {t('pages.notFound.description')}
      </p>
      <Link to="/">
        <Button>{t('common.home')}</Button>
      </Link>
    </div>
  )
}

export default NotFound

