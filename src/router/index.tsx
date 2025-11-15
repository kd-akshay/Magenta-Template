import { createBrowserRouter, Outlet } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import ErrorFallback from '@/components/ErrorFallback'
import Home from '@/pages/Home'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import Components from '@/pages/Components'
import ReduxExample from '@/pages/ReduxExample'
import PageLoaderExample from '@/pages/PageLoaderExample'
import SSEExample from '@/pages/SSEExample'
import ChatbotExample from '@/pages/ChatbotExample'
import UtilityExamples from '@/pages/UtilityExamples'
import HooksExamples from '@/pages/HooksExamples'
import {
  NestedRoutingLayout,
  Dashboard,
  Users,
  Settings,
  Analytics,
  NestedRoutingIndex,
} from '@/pages/NestedRoutingExample'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ProtectedRoute from '@/components/ProtectedRoute'
import FileUploadExample from '@/pages/FileUploadExample'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><Outlet /></MainLayout>,
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'components',
        element: <Components />,
      },
      {
        path: 'redux-example',
        element: <ReduxExample />,
      },
      {
        path: 'page-loader-example',
        element: <PageLoaderExample />,
      },
      {
        path: 'sse-example',
        element: <SSEExample />,
      },
      {
        path: 'chatbot-example',
        element: <ChatbotExample />,
      },
      {
        path: 'utility-examples',
        element: <UtilityExamples />,
      },
      {
        path: 'hooks-examples',
        element: <HooksExamples />,
      },
      {
        path: 'file-upload-example',
        element: <FileUploadExample />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <div>Profile Page - Protected Content</div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'nested-routing',
        element: <NestedRoutingLayout />,
        children: [
          {
            index: true,
            element: <NestedRoutingIndex />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'analytics',
            element: <Analytics />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

