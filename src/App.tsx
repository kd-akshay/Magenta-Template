import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import { router } from '@/router'
import { ToastProvider } from '@/components/ui'
import { TransitionProvider } from '@/contexts/TransitionContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { TransitionControl } from '@/components/ui/TransitionControl'
import ThemeControl from '@/components/ui/ThemeControl'
import ErrorBoundary from '@/components/ErrorBoundary'
import SkipToContent from '@/components/SkipToContent'
import Chatbot from '@/components/Chatbot'
import '@/i18n/config'

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <TransitionProvider>
            <ToastProvider>
              <RouterProvider router={router} />
              <Chatbot />
              <TransitionControl />
              <ThemeControl />
            </ToastProvider>
          </TransitionProvider>
        </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
