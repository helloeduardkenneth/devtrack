import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import AddJobModal from '@/components/modals/AddJobModal'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'

const AppLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false)

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) {
      setActiveTab('dashboard')
      return
    }
    if (location.pathname.startsWith('/applications')) {
      setActiveTab('applications')
      return
    }
    if (location.pathname.startsWith('/kanban-board')) {
      setActiveTab('kanban-board')
      return
    }
    if (location.pathname.startsWith('/analytics')) {
      setActiveTab('analytics')
      return
    }
    setActiveTab('')
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) {
      document.title = 'DevTrack | Dashboard'
      return
    }
    if (location.pathname.startsWith('/applications')) {
      document.title = 'DevTrack | Applications'
      return
    }
    if (location.pathname.startsWith('/kanban-board')) {
      document.title = 'DevTrack | Kanban Board'
      return
    }
    if (location.pathname.startsWith('/analytics')) {
      document.title = 'DevTrack | Analytics'
      return
    }
    document.title = 'DevTrack'
  }, [location.pathname])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === 'dashboard') {
      navigate('/dashboard')
      return
    }
    if (tab === 'applications') {
      navigate('/applications')
      return
    }
    if (tab === 'kanban-board') {
      navigate('/kanban-board')
      return
    }
    if (tab === 'analytics') {
      navigate('/analytics')
    }
  }

  const handleAddJob = () => {
    setIsAddJobModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      <div className="ml-64">
        <Header onAddJob={handleAddJob} />
        <main className="p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
      <AddJobModal
        isOpen={isAddJobModalOpen}
        onClose={() => setIsAddJobModalOpen(false)}
      />
    </div>
  )
}

export default AppLayout
