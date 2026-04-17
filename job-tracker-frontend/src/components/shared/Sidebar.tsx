import DEVTRACK_LOGO from '@/assets/devtrack_logo.png'
import {
  BarChart3,
  Bell,
  LayoutDashboard,
  List,
  LogOut,
  Settings,
  Trello,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/contexts/AuthContext'
import { useGetUserProfile } from '@/queries/auth/profile.queries'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const { data: userData, isLoading } = useGetUserProfile()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'applications', icon: List, label: 'Applications' },
    { id: 'kanban-board', icon: Trello, label: 'Kanban Board' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'reminders', icon: Bell, label: 'Reminders' },
  ]

  return (
    <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-3 p-6 text-left hover:opacity-95"
        aria-label="Go to landing page"
      >
        <img
          src={DEVTRACK_LOGO}
          alt="DevTrack logo"
          className="h-10 w-10 rounded-xl object-contain"
        />
        <h1 className="text-xl font-semibold text-slate-900">DevTrack</h1>
      </button>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-600"
              />
            )}
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="space-y-3 border-t border-slate-100 p-4">
        <button
          onClick={() => setActiveTab('settings')}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900"
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </button>

        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
          {isLoading ? (
            <>
              {/* Avatar skeleton */}
              <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />

              {/* Text skeleton */}
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
              </div>
            </>
          ) : (
            <>
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-medium text-white">
                {userData?.full_name?.trim()?.charAt(0).toUpperCase() ?? 'U'}
              </div>

              {/* User info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {userData?.full_name ?? 'User'}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {userData?.current_job ?? 'Unemployed'}
                </p>
              </div>
            </>
          )}

          <button
            onClick={handleLogout}
            className="text-slate-400 transition-colors hover:text-red-600"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
