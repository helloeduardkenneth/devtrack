import {
  ApplicationJobType,
  ApplicationPriority,
  ApplicationSource,
  ApplicationStatus,
  ApplicationWorkMode,
} from "../../../generated/prisma/enums";
import { prisma } from "../../db/prisma";
import type {
  ICreateApplicationRequestBody,
  IUpdateApplicationRequestBody,
} from "./application.types";

const jobTypeMap: Record<NonNullable<ICreateApplicationRequestBody["jobType"]>, ApplicationJobType> = {
  "Full-time": ApplicationJobType.FULL_TIME,
  Contract: ApplicationJobType.CONTRACT,
  "Part-time": ApplicationJobType.PART_TIME,
  Internship: ApplicationJobType.INTERNSHIP,
};

const workModeMap: Record<NonNullable<ICreateApplicationRequestBody["workMode"]>, ApplicationWorkMode> = {
  Remote: ApplicationWorkMode.REMOTE,
  Hybrid: ApplicationWorkMode.HYBRID,
  "On-site": ApplicationWorkMode.ON_SITE,
};

const statusMap: Record<NonNullable<ICreateApplicationRequestBody["status"]>, ApplicationStatus> = {
  Applied: ApplicationStatus.APPLIED,
  "Phone Screen": ApplicationStatus.PHONE_SCREEN,
  Technical: ApplicationStatus.TECHNICAL,
  Onsite: ApplicationStatus.ONSITE,
  Offer: ApplicationStatus.OFFER,
  Rejected: ApplicationStatus.REJECTED,
};

const priorityMap: Record<NonNullable<ICreateApplicationRequestBody["priority"]>, ApplicationPriority> = {
  High: ApplicationPriority.HIGH,
  Medium: ApplicationPriority.MEDIUM,
  Low: ApplicationPriority.LOW,
};

const sourceMap: Record<NonNullable<ICreateApplicationRequestBody["source"]>, ApplicationSource> = {
  LinkedIn: ApplicationSource.LINKEDIN,
  Indeed: ApplicationSource.INDEED,
  Jobstreet: ApplicationSource.JOBSTREET,
  "Company Website": ApplicationSource.COMPANY_WEBSITE,
  Referral: ApplicationSource.REFERRAL,
  Other: ApplicationSource.OTHER,
};

const toCreateData = (userId: number, data: ICreateApplicationRequestBody) => ({
  user_id: userId,
  company: data.company,
  company_logo_url: data.companyLogoUrl ?? null,
  company_logo_filename: data.companyLogoFilename ?? null,
  position: data.position,
  job_url: data.jobUrl ?? null,
  location: data.location ?? null,
  job_type: jobTypeMap[data.jobType ?? "Full-time"],
  work_mode: workModeMap[data.workMode ?? "Remote"],
  salary_min: data.salaryMin ?? null,
  salary_max: data.salaryMax ?? null,
  status: statusMap[data.status ?? "Applied"],
  applied_date: new Date(data.appliedDate),
  priority: priorityMap[data.priority ?? "Medium"],
  source: sourceMap[data.source ?? "LinkedIn"],
  job_description: data.jobDescription ?? null,
  requirements: data.requirements ?? null,
  notes: data.notes ?? null,
  recruiter_name: data.recruiterName ?? null,
  recruiter_email: data.recruiterEmail ?? null,
  recruiter_phone: data.recruiterPhone ?? null,
});

const toUpdateData = (data: IUpdateApplicationRequestBody) => {
  const update: Record<string, unknown> = {};

  if (data.company !== undefined) update.company = data.company;
  if (data.companyLogoUrl !== undefined) update.company_logo_url = data.companyLogoUrl;
  if (data.companyLogoFilename !== undefined) update.company_logo_filename = data.companyLogoFilename;
  if (data.position !== undefined) update.position = data.position;
  if (data.jobUrl !== undefined) update.job_url = data.jobUrl;
  if (data.location !== undefined) update.location = data.location;
  if (data.jobType !== undefined) update.job_type = jobTypeMap[data.jobType];
  if (data.workMode !== undefined) update.work_mode = workModeMap[data.workMode];
  if (data.salaryMin !== undefined) update.salary_min = data.salaryMin;
  if (data.salaryMax !== undefined) update.salary_max = data.salaryMax;
  if (data.status !== undefined) update.status = statusMap[data.status];
  if (data.appliedDate !== undefined) update.applied_date = new Date(data.appliedDate);
  if (data.priority !== undefined) update.priority = priorityMap[data.priority];
  if (data.source !== undefined) update.source = sourceMap[data.source];
  if (data.jobDescription !== undefined) update.job_description = data.jobDescription;
  if (data.requirements !== undefined) update.requirements = data.requirements;
  if (data.notes !== undefined) update.notes = data.notes;
  if (data.recruiterName !== undefined) update.recruiter_name = data.recruiterName;
  if (data.recruiterEmail !== undefined) update.recruiter_email = data.recruiterEmail;
  if (data.recruiterPhone !== undefined) update.recruiter_phone = data.recruiterPhone;

  return update;
};

export const createApplication = async (userId: number, data: ICreateApplicationRequestBody) => {
  return prisma.application.create({ data: toCreateData(userId, data) });
};

export const listApplications = async (userId: number) => {
  return prisma.application.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
  });
};

export const getApplicationById = async (userId: number, applicationId: number) => {
  return prisma.application.findFirst({
    where: { id: applicationId, user_id: userId },
  });
};

export const updateApplicationById = async (
  userId: number,
  applicationId: number,
  data: IUpdateApplicationRequestBody,
) => {
  const existing = await prisma.application.findFirst({
    where: { id: applicationId, user_id: userId },
    select: { id: true },
  });

  if (!existing) return null;

  return prisma.application.update({
    where: { id: applicationId },
    data: toUpdateData(data),
  });
};

export const deleteApplicationById = async (userId: number, applicationId: number) => {
  const existing = await prisma.application.findFirst({
    where: { id: applicationId, user_id: userId },
    select: { id: true },
  });

  if (!existing) return false;

  await prisma.application.delete({ where: { id: applicationId } });
  return true;
};
