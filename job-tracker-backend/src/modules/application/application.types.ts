export type JobType = "Full-time" | "Contract" | "Part-time" | "Internship";
export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type ApplicationStatus =
  | "Applied"
  | "Phone Screen"
  | "Technical"
  | "Onsite"
  | "Offer"
  | "Rejected";
export type ApplicationPriority = "High" | "Medium" | "Low";
export type ApplicationSource =
  | "LinkedIn"
  | "Indeed"
  | "Jobstreet"
  | "Company Website"
  | "Referral"
  | "Other";

export interface ICreateApplicationRequestBody {
  company: string;
  companyLogoUrl?: string | undefined;
  companyLogoFilename?: string | undefined;
  position: string;
  jobUrl?: string | undefined;
  location?: string | undefined;
  jobType?: JobType | undefined;
  workMode?: WorkMode | undefined;
  salaryMin?: number | undefined;
  salaryMax?: number | undefined;
  status?: ApplicationStatus | undefined;
  appliedDate: string;
  priority?: ApplicationPriority | undefined;
  source?: ApplicationSource | undefined;
  jobDescription?: string | undefined;
  requirements?: string | undefined;
  notes?: string | undefined;
  recruiterName?: string | undefined;
  recruiterEmail?: string | undefined;
  recruiterPhone?: string | undefined;
}

export type IUpdateApplicationRequestBody = {
  [K in keyof ICreateApplicationRequestBody]?: ICreateApplicationRequestBody[K] | undefined;
};

export interface IBulkUpdateStatusRequestBody {
  ids: number[];
  status: ApplicationStatus;
}

export interface IBulkDeleteRequestBody {
  ids: number[];
}
