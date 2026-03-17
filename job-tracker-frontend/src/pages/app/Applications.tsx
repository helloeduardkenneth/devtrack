import { useState } from 'react'
import {
  Search,
  Plus,
  MoreVertical,
  Trash2,
  Edit2,
  ExternalLink,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Download,
  Calendar,
  Building2,
  MapPin,
  DollarSign,
  CheckSquare,
  Square,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { AddJobModal } from '@/components/modals/AddJobModal'
import { Dropdown } from '@/components/shared/Dropdown'
import { MOCK_APPLICATIONS, type ApplicationRecord } from '@/pages/app/mockData'

type SortDirection = 'asc' | 'desc' | null
type SortField =
  | 'company'
  | 'position'
  | 'appliedDate'
  | 'lastUpdated'
  | 'salaryRange'
  | null

const statusColors: Record<ApplicationRecord['status'], string> = {
  Applied: 'bg-blue-50 text-blue-700 border-blue-200',
  'Phone Screen': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Technical: 'bg-purple-50 text-purple-700 border-purple-200',
  Onsite: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Offer: 'bg-green-50 text-green-700 border-green-200',
  Rejected: 'bg-red-50 text-red-700 border-red-200',
}

export const Applications = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false)

  const itemsPerPage = 20

  const handleAddApplication = () => {
    setIsAddJobModalOpen(true)
  }

  const filteredApplications = MOCK_APPLICATIONS.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'All Statuses' || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (!sortField || !sortDirection) return 0

    let aVal: string | number = a[sortField]
    let bVal: string | number = b[sortField]

    if (sortField === 'appliedDate' || sortField === 'lastUpdated') {
      aVal = new Date(aVal).getTime()
      bVal = new Date(bVal).getTime()
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.max(1, Math.ceil(sortedApplications.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedApplications = sortedApplications.slice(startIndex, endIndex)

  const handleSort = (field: Exclude<SortField, null>) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortField(null)
        setSortDirection(null)
      }
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedApplications.length) {
      setSelectedItems([])
      return
    }
    setSelectedItems(paginatedApplications.map((app) => app.id))
  }

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setStatusFilter('All Statuses')
    setSortField(null)
    setSortDirection(null)
  }

  const hasActiveFilters = searchQuery || statusFilter !== 'All Statuses'

  const SortIcon = ({ field }: { field: Exclude<SortField, null> }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-slate-400" />
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4 text-blue-600" />
    ) : (
      <ArrowDown className="h-4 w-4 text-blue-600" />
    )
  }

  if (MOCK_APPLICATIONS.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-16 shadow-sm">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="mb-3 text-2xl font-semibold text-slate-900">
            No applications yet
          </h3>
          <p className="mb-8 text-slate-600">
            Track your first job application to get started on your career journey
          </p>
          <button
            onClick={handleAddApplication}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add Application
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Applications</h1>
          <p className="mt-1 text-slate-600">
            Manage and track all your job applications
          </p>
        </div>
        <button
          onClick={handleAddApplication}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add New Application
        </button>
      </div>

      {/* Filters Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="min-w-62.5 flex-1">
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies, positions, or locations..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <Dropdown
            options={[
              'All Statuses',
              'Applied',
              'Phone Screen',
              'Technical',
              'Onsite',
              'Offer',
              'Rejected',
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Status"
          />

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </button>
          )}

          {/* Results count */}
          <div className="ml-auto text-sm font-medium text-slate-600">
            {filteredApplications.length}{' '}
            {filteredApplications.length === 1 ? 'application' : 'applications'}
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-blue-500 bg-blue-600 p-4 text-white shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'}{' '}
                  selected
                </span>
                <button
                  onClick={() => setSelectedItems([])}
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  Clear selection
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 font-medium transition-all hover:bg-white/20">
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 font-medium transition-all hover:bg-white/20">
                  Change Status
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-medium transition-all hover:bg-red-600">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="w-12 px-6 py-4 text-left">
                  <button
                    onClick={toggleSelectAll}
                    className="text-slate-400 transition-colors hover:text-slate-600"
                  >
                    {selectedItems.length === paginatedApplications.length &&
                    paginatedApplications.length > 0 ? (
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('company')}
                    className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 uppercase transition-colors hover:text-slate-900"
                  >
                    Company
                    <SortIcon field="company" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('position')}
                    className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 uppercase transition-colors hover:text-slate-900"
                  >
                    Position
                    <SortIcon field="position" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
                    Location
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
                    Status
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('appliedDate')}
                    className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 uppercase transition-colors hover:text-slate-900"
                  >
                    Applied
                    <SortIcon field="appliedDate" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('lastUpdated')}
                    className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 uppercase transition-colors hover:text-slate-900"
                  >
                    Updated
                    <SortIcon field="lastUpdated" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('salaryRange')}
                    className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 uppercase transition-colors hover:text-slate-900"
                  >
                    Salary
                    <SortIcon field="salaryRange" />
                  </button>
                </th>
                <th className="w-16 px-6 py-4 text-left">
                  <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedApplications.map((app, index) => (
                <tr
                  key={app.id}
                  className={`transition-colors hover:bg-slate-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  }`}
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleSelectItem(app.id)}
                      className="text-slate-400 transition-colors hover:text-slate-600"
                    >
                      {selectedItems.includes(app.id) ? (
                        <CheckSquare className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Square className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          index % 5 === 0
                            ? 'bg-blue-600'
                            : index % 5 === 1
                              ? 'bg-purple-600'
                              : index % 5 === 2
                                ? 'bg-pink-600'
                                : index % 5 === 3
                                  ? 'bg-green-600'
                                  : 'bg-indigo-600'
                        }`}
                      >
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-slate-900">{app.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900">{app.position}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {app.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-lg border px-3 py-1 text-xs font-medium ${statusColors[app.status]}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      {new Date(app.appliedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {new Date(app.lastUpdated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <DollarSign className="h-4 w-4 text-slate-400" />
                      {app.salaryRange}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === app.id ? null : app.id)
                        }
                        className="rounded-lg p-1.5 transition-colors hover:bg-slate-100"
                      >
                        <MoreVertical className="h-5 w-5 text-slate-400" />
                      </button>

                      {openMenuId === app.id && (
                        <>
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setOpenMenuId(null)}
                          />
                          <div className="absolute top-full right-0 z-30 mt-1 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50">
                              <Edit2 className="h-4 w-4" />
                              Edit
                            </button>
                            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50">
                              <ExternalLink className="h-4 w-4" />
                              View Details
                            </button>
                            <div className="border-t border-slate-100" />
                            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition-colors hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing <span className="font-medium text-slate-900">{startIndex + 1}</span>{' '}
              to{' '}
              <span className="font-medium text-slate-900">
                {Math.min(endIndex, filteredApplications.length)}
              </span>{' '}
              of{' '}
              <span className="font-medium text-slate-900">
                {filteredApplications.length}
              </span>{' '}
              applications
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-10 w-10 rounded-lg text-sm font-medium transition-all ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddJobModal
        isOpen={isAddJobModalOpen}
        onClose={() => setIsAddJobModalOpen(false)}
      />
    </div>
  )
}
