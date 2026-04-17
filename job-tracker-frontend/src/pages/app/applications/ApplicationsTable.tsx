import { STATUS_COLORS } from '@/constants/applications.constants'
import type {
  SortDirection,
  SortField,
} from '@/pages/app/applications/applications.types'
import type { ApplicationRecord } from '@/pages/app/mockData'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Building2,
  Calendar,
  CheckSquare,
  DollarSign,
  Edit2,
  ExternalLink,
  MapPin,
  Square,
  Trash2,
} from 'lucide-react'

type ApplicationsTableProps = {
  applications: ApplicationRecord[]
  selectedItems: string[]
  onToggleSelectAll: () => void
  onToggleSelectItem: (id: string) => void
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: Exclude<SortField, null>) => void
  onEditById: (id: string) => void
  onDeleteById: (id: string) => void
  onViewById: (id: string) => void
}

export const ApplicationsTable = ({
  applications,
  selectedItems,
  onToggleSelectAll,
  onToggleSelectItem,
  sortField,
  sortDirection,
  onSort,
  onEditById,
  onDeleteById,
  onViewById,
}: ApplicationsTableProps) => {
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

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-215 whitespace-nowrap">
          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="w-12 px-6 py-4 text-left">
                <button
                  onClick={onToggleSelectAll}
                  className="text-slate-400 transition-colors hover:text-slate-600"
                >
                  {selectedItems.length === applications.length &&
                  applications.length > 0 ? (
                    <CheckSquare className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Square className="h-5 w-5" />
                  )}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => onSort('company')}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 uppercase transition-colors hover:text-slate-900"
                >
                  Company
                  <SortIcon field="company" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => onSort('position')}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 uppercase transition-colors hover:text-slate-900"
                >
                  Position
                  <SortIcon field="position" />
                </button>
              </th>
              <th className="hidden px-4 py-4 text-left md:table-cell lg:px-6">
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
                  onClick={() => onSort('appliedDate')}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 uppercase transition-colors hover:text-slate-900"
                >
                  Applied
                  <SortIcon field="appliedDate" />
                </button>
              </th>
              <th className="hidden px-4 py-4 text-left lg:table-cell lg:px-6">
                <button
                  onClick={() => onSort('lastUpdated')}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 uppercase transition-colors hover:text-slate-900"
                >
                  Updated
                  <SortIcon field="lastUpdated" />
                </button>
              </th>
              <th className="hidden px-4 py-4 text-left xl:table-cell xl:px-6">
                <button
                  onClick={() => onSort('salaryRange')}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 uppercase transition-colors hover:text-slate-900"
                >
                  Salary
                  <SortIcon field="salaryRange" />
                </button>
              </th>
              <th className="w-20 px-4 py-4 text-left lg:px-6">
                <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map((app, index) => (
              <tr
                key={app.id}
                className={`transition-colors hover:bg-slate-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleSelectItem(app.id)}
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
                    {app.companyLogo ? (
                      <img
                        src={app.companyLogo}
                        alt={`${app.company} logo`}
                        className="h-8 w-8 rounded-lg border border-slate-200 bg-white object-contain"
                      />
                    ) : (
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
                    )}
                    <span className="font-medium text-slate-900">{app.company}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-900">{app.position}</span>
                </td>
                <td className="hidden px-4 py-4 md:table-cell lg:px-6">
                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {app.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-lg border px-3 py-1 text-xs font-medium ${STATUS_COLORS[app.status]}`}
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
                <td className="hidden px-4 py-4 lg:table-cell lg:px-6">
                  <span className="text-sm text-slate-600">
                    {new Date(app.lastUpdated).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </td>
                <td className="hidden px-4 py-4 xl:table-cell xl:px-6">
                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    {app.salaryRange}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEditById(app.id)}
                      className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onViewById(app.id)}
                      className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      title="View Details"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteById(app.id)}
                      className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
