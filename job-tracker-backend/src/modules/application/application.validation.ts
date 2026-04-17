import { z } from "zod";

const JobTypeEnum = z.enum(["Full-time", "Contract", "Part-time", "Internship"]);
const WorkModeEnum = z.enum(["Remote", "Hybrid", "On-site"]);
const StatusEnum = z.enum([
  "Applied",
  "Phone Screen",
  "Technical",
  "Onsite",
  "Offer",
  "Rejected",
]);
const PriorityEnum = z.enum(["High", "Medium", "Low"]);
const SourceEnum = z.enum([
  "LinkedIn",
  "Indeed",
  "Jobstreet",
  "Company Website",
  "Referral",
  "Other",
]);

const optionalTrimmedString = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v && v.length > 0 ? v : undefined));

const createBaseApplicationSchema = () =>
  z.object({
    company: z.string("Company is required").trim().min(2, "Company is required"),
    companyLogoUrl: optionalTrimmedString,
    companyLogoFilename: optionalTrimmedString,
    position: z.string("Position is required").trim().min(2, "Position is required"),
    jobUrl: optionalTrimmedString.refine(
      (val) => !val || z.url().safeParse(val).success,
      "Please provide a valid URL",
    ),
    location: optionalTrimmedString,
    jobType: JobTypeEnum.optional().default("Full-time"),
    workMode: WorkModeEnum.optional().default("Remote"),
    salaryMin: z.number().int().nonnegative().optional(),
    salaryMax: z.number().int().nonnegative().optional(),
    status: StatusEnum.optional().default("Applied"),
    appliedDate: z.string("Applied date is required").min(1, "Applied date is required"),
    priority: PriorityEnum.optional().default("Medium"),
    source: SourceEnum.optional().default("LinkedIn"),
    jobDescription: optionalTrimmedString,
    requirements: optionalTrimmedString,
    notes: optionalTrimmedString,
    recruiterName: optionalTrimmedString,
    recruiterEmail: optionalTrimmedString.refine(
      (val) => !val || z.email().safeParse(val).success,
      "Please provide a valid recruiter email",
    ),
    recruiterPhone: optionalTrimmedString,
  });

const withSalaryValidation = <T extends z.ZodTypeAny>(schema: T) =>
  schema.superRefine((data: any, ctx) => {
    if (
      data.salaryMin !== undefined &&
      data.salaryMax !== undefined &&
      data.salaryMin > data.salaryMax
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryMax"],
        message: "salaryMax must be greater than or equal to salaryMin",
      });
    }
  });

export const CreateApplicationSchema = withSalaryValidation(createBaseApplicationSchema());
export const UpdateApplicationSchema = withSalaryValidation(
  createBaseApplicationSchema().partial(),
);
