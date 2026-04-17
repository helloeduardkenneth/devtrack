import { z } from 'zod'

const optionalStringField = z.string().trim().optional()

const optionalNumberField = z.number().int().nonnegative().optional()

export const AddJobSchema = z
  .object({
    company: z.string('Company is required').trim().min(2, 'Company is required'),

    position: z.string('Position is required').trim().min(2, 'Position is required'),

    jobUrl: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .refine((value) => !value || z.url().safeParse(value).success, {
        message: 'Please enter a valid URL',
      }),

    location: optionalStringField,

    companyLogoUrl: optionalStringField,

    companyLogoFilename: optionalStringField,

    jobType: z.enum(['Full-time', 'Contract', 'Part-time', 'Internship']),

    workMode: z.enum(['Remote', 'Hybrid', 'On-site']),

    salaryMin: optionalNumberField,

    salaryMax: optionalNumberField,

    status: z.enum([
      'Applied',
      'Phone Screen',
      'Technical',
      'Onsite',
      'Offer',
      'Rejected',
    ]),

    appliedDate: z.string('Applied date is required').min(1, 'Applied date is required'),

    priority: z.enum(['High', 'Medium', 'Low']),

    source: z.enum([
      'LinkedIn',
      'Indeed',
      'Jobstreet',
      'Company Website',
      'Referral',
      'Other',
    ]),

    jobDescription: optionalStringField,

    requirements: optionalStringField,

    notes: optionalStringField,

    recruiterName: optionalStringField,

    recruiterEmail: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .refine((value) => !value || z.email().safeParse(value).success, {
        message: 'Please enter a valid email',
      }),

    recruiterPhone: optionalStringField,
  })
  .superRefine((data, ctx) => {
    const min = data.salaryMin
    const max = data.salaryMax

    if (min !== undefined && max !== undefined && min > max) {
      ctx.addIssue({
        code: 'custom',
        path: ['salaryMax'],
        message: 'Maximum salary must be greater than or equal to minimum salary',
      })
    }
  })

export type AddJobFormValues = z.infer<typeof AddJobSchema>

export type AddJobPayload = AddJobFormValues
