import type { AddJobFormValues } from '@/validations/job.validation'

export const ADD_JOB_DEFAULT_VALUES: AddJobFormValues = {
  company: '',
  position: '',
  jobUrl: '',
  location: '',
  jobType: 'Full-time',
  workMode: 'Remote',
  salaryMin: undefined,
  salaryMax: undefined,
  status: 'Applied',
  appliedDate: new Date().toISOString().split('T')[0],
  priority: 'Medium',
  source: 'LinkedIn',
  jobDescription: '',
  requirements: '',
  notes: '',
  recruiterName: '',
  recruiterEmail: '',
  recruiterPhone: '',
}
