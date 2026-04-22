import { type ApplicationRecord } from '@/pages/app/mockData'
import { type IApplicationItem } from '@/queries/applications/applications.queries'
import type { AddJobFormValues } from '@/validations/job.validation'

export const mapJobTypeToForm = (
    jobType: IApplicationItem['job_type'],
): AddJobFormValues['jobType'] => {
    const map: Record<
        IApplicationItem['job_type'],
        AddJobFormValues['jobType']
    > = {
        FULL_TIME: 'Full-time',
        CONTRACT: 'Contract',
        PART_TIME: 'Part-time',
        INTERNSHIP: 'Internship',
    }
    return map[jobType]
}

export const mapWorkModeToForm = (
    workMode: IApplicationItem['work_mode'] | string,
): AddJobFormValues['workMode'] => {
    const normalized = String(workMode).toUpperCase().replace(/[-\s]/g, '_')

    const map: Record<string, AddJobFormValues['workMode']> = {
        REMOTE: 'Remote',
        HYBRID: 'Hybrid',
        ON_SITE: 'On-site',
    }

    return map[normalized] ?? 'Remote'
}

export const mapStatusToForm = (
    status: IApplicationItem['status'] | string,
): AddJobFormValues['status'] => {
    const normalized = String(status).toUpperCase().replace(/[-\s]/g, '_')

    const map: Record<string, AddJobFormValues['status']> = {
        APPLIED: 'Applied',
        PHONE_SCREEN: 'Phone Screen',
        TECHNICAL: 'Technical',
        ONSITE: 'Onsite',
        ON_SITE: 'Onsite',
        OFFER: 'Offer',
        REJECTED: 'Rejected',
    }

    return map[normalized] ?? 'Applied'
}

export const mapPriorityToForm = (
    priority: IApplicationItem['priority'],
): AddJobFormValues['priority'] => {
    const map: Record<
        IApplicationItem['priority'],
        AddJobFormValues['priority']
    > = {
        HIGH: 'High',
        MEDIUM: 'Medium',
        LOW: 'Low',
    }
    return map[priority]
}

export const mapSourceToForm = (
    source: IApplicationItem['source'],
): AddJobFormValues['source'] => {
    const map: Record<IApplicationItem['source'], AddJobFormValues['source']> =
        {
            LINKEDIN: 'LinkedIn',
            INDEED: 'Indeed',
            JOBSTREET: 'Jobstreet',
            COMPANY_WEBSITE: 'Company Website',
            REFERRAL: 'Referral',
            OTHER: 'Other',
        }
    return map[source]
}

export const mapStatusToUi = (
    status: IApplicationItem['status'],
): ApplicationRecord['status'] => {
    const statusMap: Record<
        IApplicationItem['status'],
        ApplicationRecord['status']
    > = {
        APPLIED: 'Applied',
        PHONE_SCREEN: 'Phone Screen',
        TECHNICAL: 'Technical',
        ONSITE: 'Onsite',
        OFFER: 'Offer',
        REJECTED: 'Rejected',
    }

    return statusMap[status]
}

export const formatSalaryRange = (
    salaryMin: number | null,
    salaryMax: number | null,
) => {
    if (salaryMin === null && salaryMax === null) return '-'

    const formatCurrency = (value: number) => `₱${Math.round(value / 1000)}k`

    if (salaryMin !== null && salaryMax !== null) {
        return `${formatCurrency(salaryMin)} - ${formatCurrency(salaryMax)}`
    }

    if (salaryMin !== null) return `From ${formatCurrency(salaryMin)}`
    return `Up to ${formatCurrency(salaryMax as number)}`
}

export const mapApplicationToRecord = (
    item: IApplicationItem,
): ApplicationRecord => ({
    id: String(item.id),
    company: item.company,
    companyLogo: item.company_logo_url ?? '',
    position: item.position,
    location: item.location ?? '-',
    status: mapStatusToUi(item.status),
    appliedDate: item.applied_date,
    lastUpdated: item.updated_at,
    salaryRange: formatSalaryRange(item.salary_min, item.salary_max),
    priority: mapPriorityToForm(item.priority),
})
