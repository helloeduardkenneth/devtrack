import { z } from 'zod'

export const jobSchema = z
  .object({
    company: z.string('Company is required').trim().min(2, 'Company is required'),
    position: z.string('Position is required').trim().min(2, 'Position is required'),
    jobUrl: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .refine((val) => !val || z.url().safeParse(val).success, {
        message: 'Please enter a valid URL',
      }),
    location: z.string().trim().optional(),
    jobType: z.enum(['Full-time', 'Contract', 'Part-time', 'Internship']),
    workMode: z.enum(['Remote', 'Hybrid', 'On-site']),
    salaryMin: z.string().trim().optional(),
    salaryMax: z.string().trim().optional(),
    status: z.enum(['Applied', 'Phone Screen', 'Technical', 'Onsite', 'Offer', 'Rejected']),
    appliedDate: z.string('Applied date is required').min(1, 'Applied date is required'),
    priority: z.enum(['High', 'Medium', 'Low']),
    source: z.enum(['LinkedIn', 'Indeed', 'Company Website', 'Referral', 'Other']),
    jobDescription: z.string().trim().optional(),
    requirements: z.string().trim().optional(),
    notes: z.string().trim().optional(),
    recruiterName: z.string().trim().optional(),
    recruiterEmail: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .refine((val) => !val || z.email().safeParse(val).success, {
        message: 'Please enter a valid email',
      }),
    recruiterPhone: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    const min = data.salaryMin ? Number(data.salaryMin) : null
    const max = data.salaryMax ? Number(data.salaryMax) : null

    if (data.salaryMin && Number.isNaN(min)) {
      ctx.addIssue({
        code: 'custom',
        path: ['salaryMin'],
        message: 'Minimum salary must be a valid number',
      })
    }

    if (data.salaryMax && Number.isNaN(max)) {
      ctx.addIssue({
        code: 'custom',
        path: ['salaryMax'],
        message: 'Maximum salary must be a valid number',
      })
    }

    if (min !== null && max !== null && !Number.isNaN(min) && !Number.isNaN(max) && min > max) {
      ctx.addIssue({
        code: 'custom',
        path: ['salaryMax'],
        message: 'Maximum salary must be greater than or equal to minimum salary',
      })
    }
  })

export type AddJobFormValues = z.infer<typeof jobSchema>

export const addJobDefaultValues: AddJobFormValues = {
  company: '',
  position: '',
  jobUrl: '',
  location: '',
  jobType: 'Full-time',
  workMode: 'Remote',
  salaryMin: '',
  salaryMax: '',
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
