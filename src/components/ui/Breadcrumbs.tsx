import { Link } from 'react-router-dom'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

export interface BreadcrumbItem {
  label: string
  path?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-2', className)}>
      <ol className="flex items-center space-x-2" role="list">
        <li>
          <Link
            to="/"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            aria-label="Home"
          >
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center">
              <ChevronRightIcon
                className="h-4 w-4 text-gray-400 dark:text-gray-500 mx-2"
                aria-hidden="true"
              />
              {isLast ? (
                <span
                  className="text-gray-900 dark:text-gray-100 font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.path ? (
                <Link
                  to={item.path}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs

