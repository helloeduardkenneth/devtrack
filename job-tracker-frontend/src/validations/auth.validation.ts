import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z
      .string('Email is required')
      .trim()
      .toLowerCase()
      .pipe(z.email('Invalid email address')),

    full_name: z
      .string('Full name is required')
      .min(2, 'Name must be at least 2 characters')
      .trim(),

    employment_status: z.enum(['employed', 'unemployed']),

    current_job: z.string().trim().optional(),

    password: z
      .string('Password is required')
      .min(8, 'Password must be at least 8 characters'),

    confirmPassword: z.string('Confirm your password').min(8, 'Confirm your password'),

    agreeTerms: z.boolean().refine((val) => val, {
      message: 'You must agree to the Terms & Privacy Policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .superRefine((data, ctx) => {
    if (data.employment_status === 'employed' && !data.current_job?.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['current_job'],
        message: 'Current job title is required when employed',
      })
    }
  })

export const signInSchema = z.object({
  email: z
    .string('Email is required')
    .trim()
    .toLowerCase()
    .pipe(z.email('Invalid email address')),

  password: z.string('Password is required').min(1, 'Password is required'),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>

export type SignInFormValues = z.infer<typeof signInSchema>

export type SignUpPayload = Pick<
  SignUpFormValues,
  'full_name' | 'email' | 'password' | 'current_job'
>

export type SignInPayload = Pick<SignInFormValues, 'email' | 'password'>
