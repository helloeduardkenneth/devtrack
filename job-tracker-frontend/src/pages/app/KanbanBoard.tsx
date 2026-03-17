import { AddJobModal } from '@/components/modals/AddJobModal'
import { MOCK_APPLICATIONS, type ApplicationRecord } from '@/pages/app/mockData'
import {
  Building2,
  Clock,
  DollarSign,
  Edit2,
  ExternalLink,
  Filter,
  LayoutGrid,
  List,
  MoreVertical,
  Plus,
  Trash2,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

type Job = ApplicationRecord
const MOCK_JOBS: Job[] = MOCK_APPLICATIONS

const COLUMNS: Job['status'][] = [
  'Applied',
  'Phone Screen',
  'Technical',
  'Onsite',
  'Offer',
  'Rejected',
]

const columnColors: Record<Job['status'], { bg: string; text: string; border: string }> =
  {
    Applied: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    'Phone Screen': {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
    },
    Technical: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
    },
    Onsite: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
    },
    Offer: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
    },
    Rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  }

const priorityColors = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
}

interface JobCardProps {
  job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'JOB_CARD',
    item: { id: job.id, status: job.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Generate color for company logo based on job id
  const logoColors = [
    'bg-blue-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-green-600',
    'bg-indigo-600',
  ]
  const logoColor = logoColors[parseInt(job.id) % logoColors.length]

  return (
    <div
      ref={drag as any}
      className={`group cursor-grab rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-lg active:cursor-grabbing ${
        isDragging ? 'scale-105 rotate-2 opacity-50 shadow-2xl' : 'opacity-100'
      }`}
    >
      {/* Header with Logo and Menu */}
      <div className="mb-3 flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${logoColor}`}
        >
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <div className="relative">
          <button
            onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)}
            className="rounded-lg p-1 opacity-0 transition-colors group-hover:opacity-100 hover:bg-slate-100"
          >
            <MoreVertical className="h-4 w-4 text-slate-400" />
          </button>

          {openMenuId === job.id && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
              <div className="absolute top-full right-0 z-50 mt-1 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50">
                  <Edit2 className="h-4 w-4" />
                  Edit
                </button>
                <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50">
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </button>
                <div className="border-t border-slate-100" />
                <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Position Title */}
      <h4 className="mb-1 line-clamp-2 text-sm leading-snug font-semibold text-slate-900">
        {job.position}
      </h4>

      {/* Company Name */}
      <p className="mb-3 text-xs font-medium text-blue-600">{job.company}</p>

      {/* Applied Date */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-500">
        <Clock className="h-3.5 w-3.5" />
        Applied {formatDate(job.appliedDate)}
      </div>

      {/* Priority Indicator */}
      {job.priority && (
        <div className="mb-3 flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${priorityColors[job.priority]}`} />
          <span className="text-xs font-medium text-slate-600">
            {job.priority} Priority
          </span>
        </div>
      )}

      {/* Salary */}
      {job.salaryRange && (
        <div className="mb-3 flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600">
          <DollarSign className="h-3.5 w-3.5 text-slate-400" />
          {job.salaryRange}
        </div>
      )}

      {/* Tags */}
      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className={`rounded-md px-2 py-1 text-[10px] font-medium ${
                tag === 'Urgent'
                  ? 'border border-red-200 bg-red-100 text-red-700'
                  : tag === 'Remote'
                    ? 'border border-green-200 bg-green-100 text-green-700'
                    : 'border border-slate-200 bg-slate-100 text-slate-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

interface ColumnProps {
  title: Job['status']
  jobs: Job[]
  moveJob: (id: string, status: Job['status']) => void
  onAddCard: () => void
}

const Column: React.FC<ColumnProps> = ({ title, jobs, moveJob, onAddCard }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'JOB_CARD',
    drop: (item: { id: string }) => moveJob(item.id, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const colors = columnColors[title]

  return (
    <div className="w-80 shrink-0">
      {/* Column Header */}
      <div className={`${colors.bg} ${colors.border} mb-4 rounded-xl border p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className={`text-sm font-semibold ${colors.text}`}>{title}</h3>
            <span
              className={`${colors.bg} ${colors.text} rounded-full border px-2 py-0.5 text-xs font-bold ${colors.border}`}
            >
              {jobs.length}
            </span>
          </div>
          <button
            onClick={onAddCard}
            className={`${colors.text} transition-opacity hover:opacity-70`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        ref={drop as any}
        className={`min-h-150 rounded-xl p-2 transition-all ${
          isOver ? 'border-2 border-dashed border-blue-300 bg-blue-50' : 'bg-transparent'
        }`}
      >
        <div className="space-y-3">
          <AnimatePresence>
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Placeholder when empty */}
          {jobs.length === 0 && !isOver && (
            <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
              <p className="text-sm font-medium text-slate-400">Drop cards here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface KanbanBoardProps {
  onAddApplication?: () => void
  onSwitchToList?: () => void
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  onAddApplication,
  onSwitchToList,
}) => {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS)
  const [view, setView] = useState<'board' | 'list'>('board')
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false)

  const handleAddApplication = () => {
    if (onAddApplication) {
      onAddApplication()
      return
    }
    setIsAddJobModalOpen(true)
  }

  const moveJob = (id: string, newStatus: Job['status']) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Application Pipeline</h1>
          <p className="mt-1 text-slate-600">
            Drag and drop to update application status
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setView('board')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                view === 'board'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Board
            </button>
            <button
              onClick={() => {
                setView('list')
                onSwitchToList?.()
              }}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                view === 'list'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="h-4 w-4" />
              Table
            </button>
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50">
            <Filter className="h-4 w-4" />
            Filter
          </button>

          {/* Add Application Button */}
          <button
            onClick={onAddApplication}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add Application
          </button>
        </div>
      </div>
      {/* Board */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <DndProvider backend={HTML5Backend}>
          <div className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 -mx-2 flex gap-6 overflow-x-auto px-2 pb-4">
            {COLUMNS.map((column) => (
              <Column
                key={column}
                title={column}
                jobs={jobs.filter((job) => job.status === column)}
                moveJob={moveJob}
                onAddCard={handleAddApplication}
              />
            ))}
          </div>
        </DndProvider>
      </div>
      <AddJobModal
        isOpen={isAddJobModalOpen}
        onClose={() => setIsAddJobModalOpen(false)}
      />
      F
    </div>
  )
}
