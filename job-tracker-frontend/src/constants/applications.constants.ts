import { type ApplicationRecord } from '@/pages/app/mockData'

export const STATUS_FILTER_OPTIONS = [
  'All Statuses',
  'Applied',
  'Phone Screen',
  'Technical',
  'Onsite',
  'Offer',
  'Rejected',
] as const

export type StatusFilterOption = (typeof STATUS_FILTER_OPTIONS)[number]

export const DEFAULT_STATUS_FILTER: StatusFilterOption = STATUS_FILTER_OPTIONS[0]

export const STATUS_COLORS: Record<ApplicationRecord['status'], string> = {
  Applied: 'bg-blue-50 text-blue-700 border-blue-200',
  'Phone Screen': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Technical: 'bg-purple-50 text-purple-700 border-purple-200',
  Onsite: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Offer: 'bg-green-50 text-green-700 border-green-200',
  Rejected: 'bg-red-50 text-red-700 border-red-200',
}
