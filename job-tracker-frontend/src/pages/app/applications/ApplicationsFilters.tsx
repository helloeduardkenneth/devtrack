import {
    STATUS_FILTER_OPTIONS,
    type StatusFilterOption,
} from '@/constants/applications.constants'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Search, X } from 'lucide-react'

type ApplicationsFiltersProps = {
    searchQuery: string
    onSearchQueryChange: (value: string) => void
    statusFilter: StatusFilterOption
    onStatusFilterChange: (value: StatusFilterOption) => void
    hasActiveFilters: boolean
    onClearFilters: () => void
    resultsCount: number
}

export const ApplicationsFilters = ({
    searchQuery,
    onSearchQueryChange,
    statusFilter,
    onStatusFilterChange,
    hasActiveFilters,
    onClearFilters,
    resultsCount,
}: ApplicationsFiltersProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-62.5 flex-1">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) =>
                                onSearchQueryChange(e.target.value)
                            }
                            placeholder="Search companies, positions, or locations..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                        />
                    </div>
                </div>

                <Select
                    value={statusFilter}
                    onValueChange={(value) =>
                        onStatusFilterChange(value as StatusFilterOption)
                    }
                >
                    <SelectTrigger className="h-[42px] min-w-[140px] rounded-xl border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200">
                        {STATUS_FILTER_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100"
                    >
                        <X className="h-4 w-4" />
                        Clear Filters
                    </button>
                )}

                <div className="w-full text-sm font-medium text-slate-600 sm:ml-auto sm:w-auto">
                    {resultsCount}{' '}
                    {resultsCount === 1 ? 'application' : 'applications'}
                </div>
            </div>
        </div>
    )
}
