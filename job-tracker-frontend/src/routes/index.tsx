import { createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from '@/components/shared/ProtectedRoute'
import {
  ForgotPasswordWrapper,
  LandingPageWrapper,
  LoginPageWrapper,
  SignUpPageWrapper,
} from '@/components/shared/Wrappers'
import AppLayout from '@/layouts/AppLayout'
import PublicLayout from '@/layouts/PublicLayout'
import { Analytics, Applications, Dashboard, KanbanBoard } from '@/pages/app'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <LandingPageWrapper />,
      },
      {
        path: '/login',
        element: <LoginPageWrapper />,
      },
      {
        path: '/signup',
        element: <SignUpPageWrapper />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordWrapper />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/kanban-board',
        element: <KanbanBoard />,
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },
      {
        path: '/applications',
        element: <Applications />,
      },
    ],
  },
])
