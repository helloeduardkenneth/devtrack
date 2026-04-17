import AddJobModal from '@/components/modals/AddJobModal'
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal'
import ViewApplicationModal from '@/components/modals/ViewApplicationModal'
import { DataPagination } from '@/components/shared/DataPagination'
import { ApplicationsBulkActions } from '@/pages/app/applications/ApplicationsBulkActions'
import { ApplicationsFilters } from '@/pages/app/applications/ApplicationsFilters'
import { ApplicationsHeader } from '@/pages/app/applications/ApplicationsHeader'
import { ApplicationsTable } from '@/pages/app/applications/ApplicationsTable'
import { mapApplicationToRecord } from '@/pages/app/applications/applications.mappers'
import type { EditableApplication } from '@/pages/app/applications/applications.types'
import { useApplicationsPage } from '@/hooks/useApplicationsPage'
import { useDeleteApplicationMutation } from '@/queries/applications/applications.mutation'
import {
  useGetListApplications,
  type IApplicationItem,
} from '@/queries/applications/applications.queries'
import { Building2, Plus } from 'lucide-react'
import { useState } from 'react'
import {
  mapJobTypeToForm,
  mapPriorityToForm,
  mapSourceToForm,
  mapStatusToForm,
  mapWorkModeToForm,
} from './applications/applications.mappers'

const Applications = () => {
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [selectedApplication, setSelectedApplication] =
    useState<EditableApplication | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [applicationToDelete, setApplicationToDelete] = useState<{
    id: string
    company: string
    position: string
  } | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [applicationToView, setApplicationToView] = useState<IApplicationItem | null>(null)

  const { data: applicationsData = [], isLoading, isError } = useGetListApplications()
  const applications = applicationsData.map(mapApplicationToRecord)

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedItems,
    setSelectedItems,
    sortField,
    sortDirection,
    currentPage,
    setCurrentPage,
    filteredApplications,
    totalItems,
    totalPages,
    visiblePages,
    startIndex,
    endIndex,
    paginatedApplications,
    handleSort,
    toggleSelectAll,
    toggleSelectItem,
    clearFilters,
    hasActiveFilters,
  } = useApplicationsPage({ applications })

  const handleAddApplication = () => {
    setIsAddJobModalOpen(true)
  }
  
  const handleEditApplication = (item: IApplicationItem) => {
    const editable: EditableApplication = {
      id: item.id,
      company: item.company ?? '',
      companyLogoUrl: item.company_logo_url ?? undefined,
      companyLogoFilename: item.company_logo_filename ?? undefined,
      position: item.position ?? '',
      jobUrl: item.job_url ?? '',
      location: item.location ?? '',
      jobType: mapJobTypeToForm(item.job_type),
      workMode: mapWorkModeToForm(item.work_mode),
      salaryMin: item.salary_min ?? undefined,
      salaryMax: item.salary_max ?? undefined,
      status: mapStatusToForm(item.status),
      appliedDate: item.applied_date?.slice(0, 10) ?? '',
      priority: mapPriorityToForm(item.priority),
      source: mapSourceToForm(item.source),
      jobDescription: item.job_description ?? '',
      requirements: item.requirements ?? '',
      notes: item.notes ?? '',
      recruiterName: item.recruiter_name ?? '',
      recruiterEmail: item.recruiter_email ?? '',
      recruiterPhone: item.recruiter_phone ?? '',
    }

    setSelectedApplication(editable)
    setIsEditMode(true)
    setIsAddJobModalOpen(true)
  }

  const handleEditById = (id: string) => {
    const target = applicationsData.find((application) => String(application.id) === id)
    if (!target) return

    handleEditApplication(target)
  }

  const deleteApplicationMutation = useDeleteApplicationMutation(() => {
    setIsDeleteModalOpen(false)
    setApplicationToDelete(null)
  })

  const handleDeleteById = (id: string) => {
    const target = applications.find((app) => app.id === id)
    if (!target) return

    setApplicationToDelete({
      id: target.id,
      company: target.company,
      position: target.position,
    })
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!applicationToDelete) return
    deleteApplicationMutation.mutate(Number(applicationToDelete.id))
  }

  const handleViewById = (id: string) => {
    const target = applicationsData.find((app) => String(app.id) === id)
    if (!target) return

    setApplicationToView(target)
    setIsViewModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
        <p className="text-slate-600">Loading applications...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-16 text-center shadow-sm">
        <p className="text-red-700">
          Failed to load applications. Please refresh the page.
        </p>
      </div>
    )
  }

  if (applications.length === 0) {
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
      <ApplicationsHeader />

      <ApplicationsFilters
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        resultsCount={filteredApplications.length}
      />

      <ApplicationsBulkActions
        selectedCount={selectedItems.length}
        onClearSelection={() => setSelectedItems([])}
      />

      <ApplicationsTable
        applications={paginatedApplications}
        selectedItems={selectedItems}
        onToggleSelectAll={toggleSelectAll}
        onToggleSelectItem={toggleSelectItem}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEditById={handleEditById}
        onDeleteById={handleDeleteById}
        onViewById={handleViewById}
      />

      <DataPagination
        currentPage={currentPage}
        totalPages={totalPages}
        visiblePages={visiblePages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        itemLabel="applications"
        onPageChange={setCurrentPage}
      />

      <AddJobModal
        isOpen={isAddJobModalOpen}
        onClose={() => {
          setIsAddJobModalOpen(false)
          setIsEditMode(false)
          setSelectedApplication(null)
        }}
        editMode={isEditMode}
        initialData={selectedApplication ?? undefined}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setApplicationToDelete(null)
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteApplicationMutation.isPending}
        application={applicationToDelete}
      />

      <ViewApplicationModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setApplicationToView(null)
        }}
        application={applicationToView}
      />
    </div>
  )
}

export default Applications
