import {
  DEFAULT_STATUS_FILTER,
  type StatusFilterOption,
} from '@/constants/applications.constants'
import { APPLICATIONS_ITEMS_PER_PAGE } from '@/constants/pagination.constants'
import type { ApplicationRecord } from '@/pages/app/mockData'
import { usePagination } from '@/hooks/usePagination'
import { useMemo, useState } from 'react'
import type { SortDirection, SortField } from '@/pages/app/applications/applications.types'

type UseApplicationsPageParams = {
  applications: ApplicationRecord[]
}

export const useApplicationsPage = ({ applications }: UseApplicationsPageParams) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] =
    useState<StatusFilterOption>(DEFAULT_STATUS_FILTER)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const filteredApplications = useMemo(
    () =>
      applications.filter((app) => {
        const matchesSearch =
          app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.location.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus =
          statusFilter === DEFAULT_STATUS_FILTER || app.status === statusFilter

        return matchesSearch && matchesStatus
      }),
    [applications, searchQuery, statusFilter],
  )

  const sortedApplications = useMemo(() => {
    return [...filteredApplications].sort((a, b) => {
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
  }, [filteredApplications, sortDirection, sortField])

  const {
    currentPage,
    setCurrentPage,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    paginatedItems: paginatedApplications,
    visiblePages,
  } = usePagination({
    items: sortedApplications,
    itemsPerPage: APPLICATIONS_ITEMS_PER_PAGE,
  })

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
    setStatusFilter(DEFAULT_STATUS_FILTER)
    setSortField(null)
    setSortDirection(null)
  }

  const hasActiveFilters = !!searchQuery || statusFilter !== DEFAULT_STATUS_FILTER

  return {
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
  }
}
