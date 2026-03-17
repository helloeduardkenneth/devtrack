import { createBrowserRouter } from 'react-router-dom'

// Layouts
import AppLayout from '@/layouts/AppLayout'
import PublicLayout from '@/layouts/PublicLayout'

// Public Pages
import { Analytics, Applications, Dashboard, KanbanBoard } from '@/pages/app'

// Wrappers
import {
  ForgotPasswordWrapper,
  LandingPageWrapper,
  LoginPageWrapper,
  SignUpPageWrapper,
} from '@/components/shared/Wrappers'

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
    element: <AppLayout />,
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
