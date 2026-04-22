import { motion, AnimatePresence } from 'motion/react'
import {
    X,
    Building2,
    MapPin,
    Briefcase,
    Globe,
    Calendar,
    DollarSign,
    ExternalLink,
    FileText,
    List,
    StickyNote,
    User,
    Mail,
    Phone,
    Tag,
    Clock,
} from 'lucide-react'
import { STATUS_COLORS } from '@/constants/applications.constants'
import type { IApplicationItem } from '@/queries/applications/applications.queries'

interface ViewApplicationModalProps {
    isOpen: boolean
    onClose: () => void
    application: IApplicationItem | null
}

const formatSalary = (min: number | null, max: number | null): string => {
    if (min === null && max === null) return 'Not specified'
    const format = (n: number) => `₱${(n / 1000).toFixed(0)}k`
    if (min !== null && max !== null) return `${format(min)} - ${format(max)}`
    if (min !== null) return `From ${format(min)}`
    return `Up to ${format(max!)}`
}

const formatJobType = (type: string): string => {
    const map: Record<string, string> = {
        FULL_TIME: 'Full-time',
        CONTRACT: 'Contract',
        PART_TIME: 'Part-time',
        INTERNSHIP: 'Internship',
    }
    return map[type] || type
}

const formatWorkMode = (mode: string): string => {
    const map: Record<string, string> = {
        REMOTE: 'Remote',
        HYBRID: 'Hybrid',
        ON_SITE: 'On-site',
    }
    return map[mode] || mode
}

const formatStatus = (status: string): string => {
    const map: Record<string, string> = {
        APPLIED: 'Applied',
        PHONE_SCREEN: 'Phone Screen',
        TECHNICAL: 'Technical',
        ONSITE: 'Onsite',
        OFFER: 'Offer',
        REJECTED: 'Rejected',
    }
    return map[status] || status
}

const formatPriority = (priority: string): string => {
    const map: Record<string, string> = {
        HIGH: 'High',
        MEDIUM: 'Medium',
        LOW: 'Low',
    }
    return map[priority] || priority
}

const formatSource = (source: string): string => {
    const map: Record<string, string> = {
        LINKEDIN: 'LinkedIn',
        INDEED: 'Indeed',
        JOBSTREET: 'Jobstreet',
        COMPANY_WEBSITE: 'Company Website',
        REFERRAL: 'Referral',
        OTHER: 'Other',
    }
    return map[source] || source
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

export const ViewApplicationModal = ({
    isOpen,
    onClose,
    application,
}: ViewApplicationModalProps) => {
    if (!isOpen || !application) return null

    const hasRecruiterInfo =
        application.recruiter_name ||
        application.recruiter_email ||
        application.recruiter_phone

    const statusKey = formatStatus(
        application.status,
    ) as keyof typeof STATUS_COLORS
    const statusClass =
        STATUS_COLORS[statusKey] ||
        'bg-slate-100 text-slate-700 border-slate-200'

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                    style={{
                        boxShadow:
                            '0 0 0 1px rgba(0,0,0,0.08), 0 20px 48px rgba(0,0,0,0.12), 0 48px 96px rgba(0,0,0,0.08)',
                    }}
                >
                    {/* Blue top accent */}
                    <div
                        className="absolute top-0 right-0 left-0 h-1"
                        style={{
                            background:
                                'linear-gradient(90deg, #3b82f6, #6366f1 50%, #8b5cf6)',
                        }}
                    />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Scrollable content */}
                    <div className="max-h-[85vh] overflow-y-auto">
                        {/* Header Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="px-6 pt-8 pb-6"
                        >
                            <div className="flex items-stretch gap-5">
                                {/* Company Logo */}
                                {application.company_logo_url ? (
                                    <img
                                        src={application.company_logo_url}
                                        alt={`${application.company} logo`}
                                        className="h-24 w-24 shrink-0 rounded-xl border border-slate-200 bg-white object-contain shadow-sm"
                                    />
                                ) : (
                                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                                        <Building2 className="h-10 w-10 text-white" />
                                    </div>
                                )}

                                {/* Title Info */}
                                <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
                                    <h2 className="text-xl leading-tight font-bold tracking-tight text-slate-900">
                                        {application.position}
                                    </h2>
                                    <p className="mt-1.5 text-base font-medium text-slate-600">
                                        {application.company}
                                    </p>
                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold ${statusClass}`}
                                        >
                                            <Clock className="h-3.5 w-3.5" />
                                            {formatStatus(application.status)}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                                            <Tag className="h-3.5 w-3.5 text-slate-500" />
                                            {formatPriority(
                                                application.priority,
                                            )}{' '}
                                            Priority
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Sections */}
                        <div className="space-y-6 px-6 pb-8">
                            {/* Job Details Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                {application.location && (
                                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                                            <MapPin className="h-5 w-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                                Location
                                            </p>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {application.location}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <Briefcase className="h-5 w-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                            Job Type
                                        </p>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {formatJobType(
                                                application.job_type,
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <Globe className="h-5 w-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                            Work Mode
                                        </p>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {formatWorkMode(
                                                application.work_mode,
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                                        <DollarSign className="h-5 w-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                            Salary
                                        </p>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {formatSalary(
                                                application.salary_min,
                                                application.salary_max,
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Application Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="rounded-xl border border-slate-200 bg-white p-5"
                            >
                                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wide text-slate-900 uppercase">
                                    <Calendar className="h-4 w-4 text-blue-600" />
                                    Application Info
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Applied Date
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900">
                                            {formatDate(
                                                application.applied_date,
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Priority
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900">
                                            {formatPriority(
                                                application.priority,
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Source
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900">
                                            {formatSource(application.source)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Job URL */}
                            {application.job_url && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <a
                                        href={application.job_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                                <ExternalLink className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-slate-500">
                                                    Job Posting
                                                </p>
                                                <p className="max-w-[300px] truncate text-sm font-medium text-blue-600 group-hover:underline">
                                                    {application.job_url}
                                                </p>
                                            </div>
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-500" />
                                    </a>
                                </motion.div>
                            )}

                            {/* Job Description */}
                            {application.job_description && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="rounded-xl border border-slate-200 bg-white p-5"
                                >
                                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide text-slate-900 uppercase">
                                        <FileText className="h-4 w-4 text-purple-600" />
                                        Job Description
                                    </h3>
                                    <div className="max-h-48 overflow-y-auto rounded-lg bg-slate-50 p-4">
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                                            {application.job_description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Requirements */}
                            {application.requirements && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="rounded-xl border border-slate-200 bg-white p-5"
                                >
                                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide text-slate-900 uppercase">
                                        <List className="h-4 w-4 text-green-600" />
                                        Requirements
                                    </h3>
                                    <div className="max-h-48 overflow-y-auto rounded-lg bg-slate-50 p-4">
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                                            {application.requirements}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Notes */}
                            {application.notes && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                    className="rounded-xl border border-amber-200 bg-amber-50/50 p-5"
                                >
                                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide text-amber-800 uppercase">
                                        <StickyNote className="h-4 w-4" />
                                        Notes
                                    </h3>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-amber-900">
                                        {application.notes}
                                    </p>
                                </motion.div>
                            )}

                            {/* Recruiter Contact */}
                            {hasRecruiterInfo && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5"
                                >
                                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wide text-slate-900 uppercase">
                                        <User className="h-4 w-4 text-indigo-600" />
                                        Recruiter Contact
                                    </h3>
                                    <div className="space-y-3">
                                        {application.recruiter_name && (
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                                                    <User className="h-4 w-4 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-slate-500">
                                                        Name
                                                    </p>
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {
                                                            application.recruiter_name
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {application.recruiter_email && (
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                                                    <Mail className="h-4 w-4 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-slate-500">
                                                        Email
                                                    </p>
                                                    <a
                                                        href={`mailto:${application.recruiter_email}`}
                                                        className="text-sm font-semibold text-indigo-600 hover:underline"
                                                    >
                                                        {
                                                            application.recruiter_email
                                                        }
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                        {application.recruiter_phone && (
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                                                    <Phone className="h-4 w-4 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-slate-500">
                                                        Phone
                                                    </p>
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {
                                                            application.recruiter_phone
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default ViewApplicationModal
