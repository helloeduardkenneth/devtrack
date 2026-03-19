import { z } from "zod";

export const SignUpSchema = z.object({
  email: z
    .string("Email is required")
    .trim()
    .toLowerCase()
    .pipe(z.email("Invalid email address")),

  full_name: z
    .string("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),

  current_job: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value && value.length > 0 ? value : "Unemployed")),

  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const SignInSchema = z.object({
  email: z
    .string("Email is required")
    .trim() 
    .toLowerCase() 
    .pipe(z.email("Invalid email address")),

  password: z.string("Password is required").min(1, "Password is required"),
});
