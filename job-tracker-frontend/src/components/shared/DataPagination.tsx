import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

type DataPaginationProps = {
    currentPage: number
    totalPages: number
    visiblePages: number[]
    startIndex: number
    endIndex: number
    totalItems: number
    itemLabel?: string
    onPageChange: (page: number) => void
    className?: string
}

export const DataPagination = ({
    currentPage,
    totalPages,
    visiblePages,
    startIndex,
    endIndex,
    totalItems,
    itemLabel = 'items',
    onPageChange,
    className,
}: DataPaginationProps) => {
    const isFirstPage = currentPage <= 1
    const isLastPage = currentPage >= totalPages

    return (
        <div
            className={cn(
                'border-t border-slate-200 px-4 py-4 sm:px-6',
                className,
            )}
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-600">
                    Showing{' '}
                    <span className="font-medium text-slate-900">
                        {totalItems === 0 ? 0 : startIndex + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium text-slate-900">
                        {endIndex}
                    </span>{' '}
                    of{' '}
                    <span className="font-medium text-slate-900">
                        {totalItems}
                    </span>{' '}
                    {itemLabel}
                </div>

                <Pagination className="mx-0 w-auto justify-start sm:justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (!isFirstPage)
                                        onPageChange(currentPage - 1)
                                }}
                                className={cn(
                                    isFirstPage &&
                                        'pointer-events-none opacity-50',
                                )}
                            />
                        </PaginationItem>

                        {visiblePages.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === page}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onPageChange(page)
                                    }}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (!isLastPage)
                                        onPageChange(currentPage + 1)
                                }}
                                className={cn(
                                    isLastPage &&
                                        'pointer-events-none opacity-50',
                                )}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}
