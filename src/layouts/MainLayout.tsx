import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import SidebarToggle from '@/components/SidebarToggle'
import { cn } from '@/utils/cn'

interface MainLayoutProps {
  children: ReactNode
}

const SIDEBAR_VISIBILITY_KEY = 'sidebar-visible'

const MainLayout = ({ children }: MainLayoutProps) => {
  // Sidebar visibility - check localStorage first, then default based on screen size
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SIDEBAR_VISIBILITY_KEY)
      if (saved !== null) {
        return saved === 'true'
      }
      return window.innerWidth >= 1024 // lg breakpoint
    }
    return false
  })
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Persist sidebar visibility to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SIDEBAR_VISIBILITY_KEY, isSidebarOpen.toString())
    }
  }, [isSidebarOpen])

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const hideSidebar = () => {
    setIsSidebarOpen(false)
  }

  const toggleCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev)
  }

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header sidebarToggle={<SidebarToggle onClick={toggleSidebar} isVisible={isSidebarOpen} variant="header" />} />
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={toggleSidebar}
            isCollapsed={isSidebarCollapsed}
            onCollapse={toggleCollapse}
            onHide={hideSidebar}
          />
          <main 
            id="main-content"
            className={cn(
              'flex-1 overflow-y-auto',
              'px-4 sm:px-6 lg:px-8 py-8 pb-20',
              'transition-all duration-300 ease-in-out',
              'min-w-0' // Prevent overflow issues
            )}
            role="main"
          >
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default MainLayout

