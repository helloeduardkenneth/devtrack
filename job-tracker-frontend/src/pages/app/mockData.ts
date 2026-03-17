export type ApplicationStatus =
  | 'Applied'
  | 'Phone Screen'
  | 'Technical'
  | 'Onsite'
  | 'Offer'
  | 'Rejected'

export interface ApplicationRecord {
  id: string
  company: string
  companyLogo: string
  position: string
  location: string
  status: ApplicationStatus
  appliedDate: string
  lastUpdated: string
  salaryRange: string
  priority?: 'High' | 'Medium' | 'Low'
  tags?: string[]
}

export const MOCK_APPLICATIONS: ApplicationRecord[] = [
  {
    id: '1',
    company: 'GCash',
    companyLogo: 'https://logo.clearbit.com/gcash.com',
    position: 'Senior Frontend Engineer',
    location: 'BGC, Taguig',
    status: 'Technical',
    appliedDate: '2024-02-15',
    lastUpdated: '2024-02-20',
    salaryRange: '₱120k - ₱180k',
    priority: 'High',
    tags: ['BGC', 'Urgent'],
  },
  {
    id: '2',
    company: 'Maya',
    companyLogo: 'https://logo.clearbit.com/maya.ph',
    position: 'Full Stack Developer',
    location: 'Mandaluyong',
    status: 'Phone Screen',
    appliedDate: '2024-02-14',
    lastUpdated: '2024-02-18',
    salaryRange: '₱110k - ₱165k',
    priority: 'Medium',
    tags: ['Mandaluyong', 'Hybrid'],
  },
  {
    id: '3',
    company: 'Globe Telecom',
    companyLogo: 'https://logo.clearbit.com/globe.com.ph',
    position: 'Software Engineer',
    location: 'BGC, Taguig',
    status: 'Applied',
    appliedDate: '2024-02-12',
    lastUpdated: '2024-02-12',
    salaryRange: '₱95k - ₱140k',
    tags: ['BGC', 'Onsite'],
  },
  {
    id: '4',
    company: 'Accenture Philippines',
    companyLogo: 'https://logo.clearbit.com/accenture.com',
    position: 'Senior Software Engineer',
    location: 'Makati',
    status: 'Onsite',
    appliedDate: '2024-02-10',
    lastUpdated: '2024-02-22',
    salaryRange: '₱105k - ₱160k',
    priority: 'High',
    tags: ['Makati'],
  },
  {
    id: '5',
    company: 'Deloitte Philippines',
    companyLogo: 'https://logo.clearbit.com/deloitte.com',
    position: 'Cloud Engineer',
    location: 'BGC, Taguig',
    status: 'Offer',
    appliedDate: '2024-02-08',
    lastUpdated: '2024-02-23',
    salaryRange: '₱130k - ₱190k',
    priority: 'High',
    tags: ['BGC', 'Urgent'],
  },
  {
    id: '6',
    company: 'PLDT',
    companyLogo: 'https://logo.clearbit.com/pldt.com.ph',
    position: 'Frontend Engineer',
    location: 'Makati',
    status: 'Rejected',
    appliedDate: '2024-02-05',
    lastUpdated: '2024-02-15',
    salaryRange: '₱90k - ₱130k',
  },
  {
    id: '7',
    company: 'UnionBank',
    companyLogo: 'https://logo.clearbit.com/unionbankph.com',
    position: 'Backend Engineer',
    location: 'Pasig',
    status: 'Technical',
    appliedDate: '2024-02-18',
    lastUpdated: '2024-02-21',
    salaryRange: '₱115k - ₱170k',
    priority: 'Medium',
    tags: ['Pasig'],
  },
  {
    id: '8',
    company: 'Shopee Philippines',
    companyLogo: 'https://logo.clearbit.com/shopee.ph',
    position: 'Senior Software Engineer',
    location: 'BGC, Taguig',
    status: 'Phone Screen',
    appliedDate: '2024-02-17',
    lastUpdated: '2024-02-19',
    salaryRange: '₱100k - ₱150k',
    tags: ['BGC', 'Hybrid'],
  },
  {
    id: '9',
    company: 'Coins.ph',
    companyLogo: 'https://logo.clearbit.com/coins.ph',
    position: 'Platform Engineer',
    location: 'Taguig',
    status: 'Applied',
    appliedDate: '2024-02-20',
    lastUpdated: '2024-02-20',
    salaryRange: '₱100k - ₱145k',
    priority: 'Low',
    tags: ['Taguig', 'Hybrid'],
  },
]
