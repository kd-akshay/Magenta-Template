import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Card, Button, Breadcrumbs, Badge } from '@/components/ui'
import { HomeIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

// Parent Layout Component
const NestedRoutingLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Extract path segments
  const pathSegments = location.pathname.split('/').filter(Boolean)
  
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    ...pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/')
      return {
        label: segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        path,
      }
    }),
  ]

  // Navigation items for nested routes
  const navItems = [
    { path: '/nested-routing/dashboard', label: 'Dashboard', description: 'Overview and statistics' },
    { path: '/nested-routing/users', label: 'Users', description: 'User management' },
    { path: '/nested-routing/settings', label: 'Settings', description: 'Application settings' },
    { path: '/nested-routing/analytics', label: 'Analytics', description: 'Reports and insights' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Nested Routing Example
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Demonstrates nested routes with React Router v6
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            <HomeIcon className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={breadcrumbItems.map((item) => ({
            label: item.label,
            path: item.path,
          }))}
        />
      </div>

      {/* Navigation Tabs */}
      <Card className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-1 -mb-px" aria-label="Tabs">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'px-4 py-3 text-sm font-medium transition-all border-b-2',
                  isActive(item.path)
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Card>

      {/* Nested Route Content */}
      <Card>
        <div className="p-6">
          <Outlet />
        </div>
      </Card>
    </div>
  )
}

// Child Route Components
const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is the Dashboard page nested under /nested-routing/dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,234</p>
            </div>
            <Badge variant="primary">+12%</Badge>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$45,678</p>
            </div>
            <Badge variant="success">+8%</Badge>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">567</p>
            </div>
            <Badge variant="warning">+5%</Badge>
          </div>
        </Card>
      </div>
    </div>
  )
}

const Users = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Users
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is the Users page nested under /nested-routing/users
          </p>
        </div>
        <Button variant="primary">Add User</Button>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>
                  {user.status}
                </Badge>
                <Badge variant="info">{user.role}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

const Settings = () => {
  const settings = [
    { category: 'General', items: ['Language', 'Theme', 'Notifications'] },
    { category: 'Privacy', items: ['Data Sharing', 'Cookies', 'Location'] },
    { category: 'Security', items: ['Password', 'Two-Factor Auth', 'API Keys'] },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is the Settings page nested under /nested-routing/settings
        </p>
      </div>

      <div className="space-y-6">
        {settings.map((setting) => (
          <Card key={setting.category} className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {setting.category}
            </h3>
            <div className="space-y-2">
              {setting.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

const Analytics = () => {
  const metrics = [
    { label: 'Page Views', value: '24,567', change: '+12.5%', trend: 'up' },
    { label: 'Unique Visitors', value: '18,234', change: '+8.3%', trend: 'up' },
    { label: 'Bounce Rate', value: '32.1%', change: '-4.2%', trend: 'down' },
    { label: 'Avg. Session', value: '3m 45s', change: '+2.1%', trend: 'up' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Analytics
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is the Analytics page nested under /nested-routing/analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
              <Badge
                variant={metric.trend === 'up' ? 'success' : 'warning'}
              >
                {metric.change}
              </Badge>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {metric.value}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Index/Default Route for Nested Routing
const NestedRoutingIndex = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Welcome to Nested Routing
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
        This example demonstrates nested routing in React Router v6. Navigate using the tabs above
        to see different nested routes in action.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/nested-routing/dashboard">
          <Button variant="primary">Go to Dashboard</Button>
        </Link>
        <Link to="/nested-routing/users">
          <Button variant="secondary">View Users</Button>
        </Link>
        <Link to="/nested-routing/settings">
          <Button variant="outline">Open Settings</Button>
        </Link>
        <Link to="/nested-routing/analytics">
          <Button variant="ghost">View Analytics</Button>
        </Link>
      </div>
    </div>
  )
}

export {
  NestedRoutingLayout,
  Dashboard,
  Users,
  Settings,
  Analytics,
  NestedRoutingIndex,
}

