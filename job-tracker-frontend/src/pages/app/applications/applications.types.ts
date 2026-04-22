import type { AddJobFormValues } from '@/validations/job.validation'

export type SortDirection = 'asc' | 'desc' | null
export type SortField =
    | 'company'
    | 'position'
    | 'appliedDate'
    | 'lastUpdated'
    | 'salaryRange'
    | null

export type EditableApplication = AddJobFormValues & { id: number }
