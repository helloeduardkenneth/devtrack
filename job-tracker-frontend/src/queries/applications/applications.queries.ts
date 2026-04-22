import { useQuery } from '@tanstack/react-query'

import { getListApplications } from '@/api/applications.api'
import { queryKeys } from '@/queries/queryKeys'

export interface IApplicationItem {
    id: number
    user_id: number
    company: string
    company_logo_url: string | null
    company_logo_filename: string | null
    position: string
    job_url: string | null
    location: string | null
    job_type: 'FULL_TIME' | 'CONTRACT' | 'PART_TIME' | 'INTERNSHIP'
    work_mode: 'REMOTE' | 'HYBRID' | 'ON_SITE'
    salary_min: number | null
    salary_max: number | null
    status:
        | 'APPLIED'
        | 'PHONE_SCREEN'
        | 'TECHNICAL'
        | 'ONSITE'
        | 'OFFER'
        | 'REJECTED'
    applied_date: string
    priority: 'HIGH' | 'MEDIUM' | 'LOW'
    source:
        | 'LINKEDIN'
        | 'INDEED'
        | 'JOBSTREET'
        | 'COMPANY_WEBSITE'
        | 'REFERRAL'
        | 'OTHER'
    job_description: string | null
    requirements: string | null
    notes: string | null
    recruiter_name: string | null
    recruiter_email: string | null
    recruiter_phone: string | null
    created_at: string
    updated_at: string
}

export const useGetListApplications = () => {
    return useQuery<IApplicationItem[]>({
        queryKey: queryKeys.applications.list,
        queryFn: async () => {
            const response = await getListApplications()
            return response.data
        },
    })
}
