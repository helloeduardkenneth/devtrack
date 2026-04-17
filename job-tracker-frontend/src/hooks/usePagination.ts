import { useMemo, useState } from 'react'

type UsePaginationParams<T> = {
  items: T[]
  itemsPerPage: number
  maxVisiblePages?: number
}

export const usePagination = <T,>({
  items,
  itemsPerPage,
  maxVisiblePages = 5,
}: UsePaginationParams<T>) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = totalItems === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  const paginatedItems = useMemo(
    () => items.slice(startIndex, startIndex + itemsPerPage),
    [items, startIndex, itemsPerPage],
  )

  const visiblePages = useMemo(() => {
    const pageCount = Math.min(maxVisiblePages, totalPages)

    return Array.from({ length: pageCount }, (_, i) => {
      if (totalPages <= maxVisiblePages) return i + 1
      if (safeCurrentPage <= Math.ceil(maxVisiblePages / 2)) return i + 1
      if (safeCurrentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
        return totalPages - (maxVisiblePages - 1) + i
      }
      return safeCurrentPage - Math.floor(maxVisiblePages / 2) + i
    })
  }, [maxVisiblePages, safeCurrentPage, totalPages])

  return {
    currentPage: safeCurrentPage,
    setCurrentPage,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    paginatedItems,
    visiblePages,
  }
}
