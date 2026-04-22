import type { AddJobFormValues } from '@/validations/job.validation'

export const JOB_TYPE_OPTIONS: AddJobFormValues['jobType'][] = [
    'Full-time',
    'Contract',
    'Part-time',
    'Internship',
]

export const WORK_MODE_OPTIONS: AddJobFormValues['workMode'][] = [
    'Remote',
    'Hybrid',
    'On-site',
]

export const STATUS_OPTIONS: AddJobFormValues['status'][] = [
    'Applied',
    'Phone Screen',
    'Technical',
    'Onsite',
    'Offer',
    'Rejected',
]

export const PRIORITY_OPTIONS: AddJobFormValues['priority'][] = [
    'High',
    'Medium',
    'Low',
]

export const SOURCE_OPTIONS: AddJobFormValues['source'][] = [
    'LinkedIn',
    'Indeed',
    'Jobstreet',
    'Company Website',
    'Referral',
    'Other',
]
