import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Badge, Divider, Button, useToast } from '@/components/ui'
import { usePageLoader } from '@/hooks/usePageLoader'
import PageLoader from '@/components/PageLoader'
import {
  HiShieldCheck,
  HiSparkles,
  HiCode,
  HiDeviceMobile,
  HiGlobeAlt,
  HiCube,
  HiChip,
  HiRefresh,
  HiServer,
  HiDocumentText,
} from 'react-icons/hi'
import { MdSpeed, MdPalette } from 'react-icons/md'

const Home = () => {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const { isLoading, startLoading, stopLoading } = usePageLoader()

  // Simulate page loading on mount
  useEffect(() => {
    startLoading('Loading page content...')
    // Simulate async data fetching
    const timer = setTimeout(() => {
      stopLoading()
    }, 800)
    return () => clearTimeout(timer)
  }, [startLoading, stopLoading])

  const features = [
    {
      icon: MdSpeed,
      title: 'Fast Development',
      description: 'Built with Vite for lightning-fast HMR and optimized production builds',
      color: 'primary',
    },
    {
      icon: HiShieldCheck,
      title: 'Type Safe',
      description: 'Full TypeScript support for enhanced developer experience and reliability',
      color: 'success',
    },
    {
      icon: HiSparkles,
      title: 'Modern UI Components',
      description: 'Comprehensive set of accessible, customizable React components',
      color: 'warning',
    },
    {
      icon: MdPalette,
      title: 'Theme System',
      description: 'Flexible theming with dark mode, custom colors, and global controls',
      color: 'info',
    },
    {
      icon: HiGlobeAlt,
      title: 'i18n Ready',
      description: 'Built-in internationalization support for multiple languages',
      color: 'primary',
    },
    {
      icon: HiDeviceMobile,
      title: 'Responsive Design',
      description: 'Mobile-first approach with responsive breakpoints and layouts',
      color: 'success',
    },
    {
      icon: HiCube,
      title: 'State Management',
      description: 'Redux Toolkit integration with persistence and middleware support',
      color: 'warning',
    },
    {
      icon: HiCode,
      title: 'Developer Tools',
      description: 'Hot reload, error boundaries, and comprehensive testing setup',
      color: 'info',
    },
  ]

  const techStack = [
    { name: 'React 18', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Vite', category: 'Build Tool' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Redux Toolkit', category: 'State' },
    { name: 'React Router', category: 'Routing' },
    { name: 'Axios', category: 'HTTP Client' },
    { name: 'React i18next', category: 'i18n' },
    { name: 'Vitest', category: 'Testing' },
    { name: 'React Testing Library', category: 'Testing' },
    { name: 'Headless UI', category: 'UI Library' },
    { name: 'React Icons', category: 'Icons' },
  ]

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <Badge variant="primary" size="lg" className="mb-4">
            Production Ready Template
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
            {t('pages.home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('pages.home.description')}
          </p>
        </div>

        {/* Mission Section */}
        <Card>
          <Card header={<h2 className="text-2xl font-semibold">Our Mission</h2>}>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              To provide developers with a comprehensive, production-ready React template that
              accelerates development while maintaining best practices, accessibility, and code quality.
              We believe in empowering developers with the tools they need to build exceptional
              web applications efficiently.
            </p>
          </Card>
        </Card>

        {/* Features Grid */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Key Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Everything you need to build modern web applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const colorClasses = {
                primary: 'bg-primary/10 text-primary',
                success: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
                warning: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
                info: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
              }
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`p-3 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <Divider />

        {/* Technology Stack */}
        <Card>
          <Card header={
            <div className="flex items-center gap-3">
              <HiChip className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Technology Stack</h2>
            </div>
          }>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-primary/50 transition-colors"
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {tech.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {tech.category}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Card>

        {/* Core Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <Card header={
              <div className="flex items-center gap-3">
                <HiRefresh className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Performance</h3>
              </div>
            }>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Optimized build configuration with Vite</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Code splitting and lazy loading support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Efficient state management with Redux</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Global transition and animation controls</span>
                </li>
              </ul>
            </Card>
          </Card>

          <Card>
            <Card header={
              <div className="flex items-center gap-3">
                <HiServer className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Developer Experience</h3>
              </div>
            }>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Hot module replacement (HMR)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Comprehensive TypeScript types</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Testing setup with Vitest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Error boundaries and fallback UI</span>
                </li>
              </ul>
            </Card>
          </Card>
        </div>

        {/* What's Included */}
        <Card>
          <Card header={
            <div className="flex items-center gap-3">
              <HiDocumentText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">What's Included</h2>
            </div>
          }>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  UI Components
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Buttons, Inputs, Selects, Textareas</li>
                  <li>• Cards, Modals, Tabs, Accordions</li>
                  <li>• Tables, Pagination, Breadcrumbs</li>
                  <li>• Alerts, Badges, Avatars, Tooltips</li>
                  <li>• Stepper, Slider, Rating, Empty State</li>
                  <li>• Animated components (Button, Badge, Card, Counter, Progress, Skeleton)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Features & Utilities
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Custom React hooks (localStorage, debounce, mediaQuery, etc.)</li>
                  <li>• Utility functions (date, currency, validation, string manipulation)</li>
                  <li>• Server-Sent Events (SSE) support</li>
                  <li>• Chatbot component</li>
                  <li>• Page-level loader system</li>
                  <li>• Theme and transition controls</li>
                  <li>• Internationalization (i18n)</li>
                  <li>• Accessible components (WCAG 2.1 compliant)</li>
                </ul>
              </div>
            </div>
          </Card>
        </Card>

        {/* Call to Action */}
        <Card className="bg-primary/5 border-primary/20">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Ready to Get Started?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              This template is designed to help you kickstart your next project quickly.
              All the foundational pieces are in place - just add your features and deploy!
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge variant="primary">TypeScript</Badge>
              <Badge variant="success">React 18</Badge>
              <Badge variant="warning">Vite</Badge>
              <Badge variant="info">Tailwind CSS</Badge>
              <Badge variant="primary">Redux Toolkit</Badge>
              <Badge variant="success">Fully Accessible</Badge>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <Button
                onClick={() => showToast('This is a success message!', 'success')}
              >
                Show Success Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() => showToast('This is an error message!', 'error')}
              >
                Show Error Toast
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Home

