import devtrackLogo from '@/assets/devtrack_logo.png'
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

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout: () => void
}

export const Sidebar = ({ activeTab, setActiveTab, onLogout }: SidebarProps) => {
  const navigate = useNavigate()
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
          src={devtrackLogo}
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-medium text-white">
            EK
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">Eduard Kenneth</p>
            <p className="truncate text-xs text-slate-500">Senior Dev</p>
          </div>
          <button
            onClick={onLogout}
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
