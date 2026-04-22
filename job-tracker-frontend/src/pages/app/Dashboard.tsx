import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Briefcase,
    Building2,
    Calendar,
    ChevronRight,
    Clock,
    Edit2,
    Target,
    Trash2,
    TrendingUp,
    Trophy,
    Zap,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import AddJobModal from '../../components/modals/AddJobModal'

// Mock data
const weeklyData = [
    { day: 'Mon', applications: 3 },
    { day: 'Tue', applications: 7 },
    { day: 'Wed', applications: 5 },
    { day: 'Thu', applications: 9 },
    { day: 'Fri', applications: 4 },
    { day: 'Sat', applications: 2 },
    { day: 'Sun', applications: 1 },
]

const statusData = [
    { name: 'Applied', value: 42, color: '#3B82F6' },
    { name: 'Screen', value: 18, color: '#8B5CF6' },
    { name: 'Interview', value: 12, color: '#EC4899' },
    { name: 'Offer', value: 3, color: '#10B981' },
]

const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    isPrimary,
    subtitle,
    color,
    iconBg,
}: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl p-6 ${
            isPrimary
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'border border-slate-200 bg-white shadow-sm'
        }`}
    >
        <div className="mb-4 flex items-start justify-between">
            <div
                className={`rounded-xl p-3 ${isPrimary ? 'bg-white/20' : iconBg || 'bg-slate-50'}`}
            >
                <Icon
                    className={`h-6 w-6 ${isPrimary ? 'text-white' : color || 'text-blue-600'}`}
                />
            </div>
            {change && (
                <div
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 ${
                        isPrimary ? 'bg-white/20' : 'bg-green-50'
                    }`}
                >
                    <TrendingUp
                        className={`h-4 w-4 ${isPrimary ? 'text-white' : 'text-green-600'}`}
                    />
                    <span
                        className={`text-xs font-semibold ${isPrimary ? 'text-white' : 'text-green-600'}`}
                    >
                        {change}
                    </span>
                </div>
            )}
        </div>

        <div className="space-y-1">
            <p
                className={`text-sm font-medium ${isPrimary ? 'text-blue-100' : 'text-slate-500'}`}
            >
                {title}
            </p>
            <p
                className={`text-4xl font-bold ${isPrimary ? 'text-white' : 'text-slate-900'}`}
            >
                {value}
            </p>
            {subtitle && (
                <p
                    className={`text-xs font-medium ${isPrimary ? 'text-blue-100' : 'text-slate-500'}`}
                >
                    {subtitle}
                </p>
            )}
        </div>

        {isPrimary && (
            <div className="absolute -right-6 -bottom-6 opacity-10">
                <Briefcase className="h-32 w-32" />
            </div>
        )}
    </motion.div>
)

const ApplicationRow = ({
    company,
    position,
    status,
    date,
    salary,
    index,
}: any) => {
    const companyColors = [
        { bg: 'bg-blue-600', text: 'text-white' },
        { bg: 'bg-purple-600', text: 'text-white' },
        { bg: 'bg-pink-600', text: 'text-white' },
        { bg: 'bg-green-600', text: 'text-white' },
        { bg: 'bg-indigo-600', text: 'text-white' },
    ]

    const colorScheme = companyColors[index % companyColors.length]

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center justify-between rounded-xl p-4 transition-all hover:bg-slate-50"
        >
            <div className="flex flex-1 items-center gap-4">
                <div
                    className={`h-11 w-11 rounded-xl ${colorScheme.bg} ${colorScheme.text} flex shrink-0 items-center justify-center text-sm font-bold shadow-sm`}
                >
                    {company[0]}
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900">
                        {company}
                    </p>
                    <p className="text-xs text-slate-500">{position}</p>
                </div>

                <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${status.color}`}
                >
                    {status.label}
                </span>

                <span className="min-w-22.5 text-right text-sm font-medium text-slate-500">
                    {date}
                </span>

                <span className="min-w-22.5 text-right text-sm font-medium text-slate-900">
                    {salary}
                </span>

                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600">
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

const InterviewCard = ({ company, role, date, type, index }: any) => {
    const interviewColors = [
        { bg: 'bg-blue-600', icon: 'bg-blue-50', iconColor: 'text-blue-600' },
        {
            bg: 'bg-purple-600',
            icon: 'bg-purple-50',
            iconColor: 'text-purple-600',
        },
        { bg: 'bg-pink-600', icon: 'bg-pink-50', iconColor: 'text-pink-600' },
    ]

    const colorScheme = interviewColors[index % interviewColors.length]

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-all hover:bg-slate-50"
        >
            <div
                className={`h-10 w-10 rounded-xl ${colorScheme.icon} flex items-center justify-center`}
            >
                <Building2 className={`h-5 w-5 ${colorScheme.iconColor}`} />
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                    {company}
                </p>
                <p className="text-xs text-slate-500">
                    {role} • {type}
                </p>
                <div className="mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-xs font-medium text-slate-600">
                        {date}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

export const Dashboard = () => {
    const [timeRange, setTimeRange] = useState('Last 7 days')
    const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false)

    const handleAddApplication = () => {
        setIsAddJobModalOpen(true)
    }

    const applications = [
        {
            company: 'GCash',
            position: 'Senior Frontend Engineer',
            status: {
                label: 'Interview',
                color: 'bg-purple-100 text-purple-700',
            },
            date: '2 days ago',
            salary: '₱120k - ₱180k',
        },
        {
            company: 'Maya',
            position: 'Staff Frontend Engineer',
            status: { label: 'Applied', color: 'bg-blue-100 text-blue-700' },
            date: '3 days ago',
            salary: '₱130k - ₱190k',
        },
        {
            company: 'Globe Telecom',
            position: 'Fullstack Engineer',
            status: {
                label: 'Phone Screen',
                color: 'bg-indigo-100 text-indigo-700',
            },
            date: '5 days ago',
            salary: '₱90k - ₱150k',
        },
        {
            company: 'PLDT',
            position: 'Solutions Architect',
            status: { label: 'Offer', color: 'bg-green-100 text-green-700' },
            date: '1 week ago',
            salary: '₱110k - ₱160k',
        },
        {
            company: 'UnionBank',
            position: 'ML Engineer',
            status: { label: 'Technical', color: 'bg-pink-100 text-pink-700' },
            date: '1 week ago',
            salary: '₱140k - ₱220k',
        },
    ]

    const upcomingInterviews = [
        {
            company: 'GCash',
            role: 'Senior SWE',
            date: 'Today, 2:00 PM',
            type: 'System Design',
        },
        {
            company: 'Globe Telecom',
            role: 'Fullstack',
            date: 'Tomorrow, 10:00 AM',
            type: 'Coding Round',
        },
        {
            company: 'Maya',
            role: 'Staff Frontend',
            date: 'Oct 26, 9:00 AM',
            type: 'Behavioral',
        },
    ]

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Track your job search progress and upcoming interviews.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50">
                        Export Data
                    </button>
                    <button
                        onClick={handleAddApplication}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
                    >
                        + New Application
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Applications"
                    value="48"
                    change="12%"
                    icon={Briefcase}
                    isPrimary={true}
                    subtitle="+6 from last month"
                />
                <StatCard
                    title="Interview Rate"
                    value="38%"
                    change="5%"
                    icon={TrendingUp}
                    color="text-purple-600"
                    iconBg="bg-purple-50"
                    subtitle="15 of 48 apps"
                />
                <StatCard
                    title="Upcoming Interviews"
                    value="12"
                    change="3 this week"
                    icon={Calendar}
                    color="text-pink-600"
                    iconBg="bg-pink-50"
                    subtitle="Next: Today 2pm"
                />
                <StatCard
                    title="Offers Received"
                    value="3"
                    change="1 this week"
                    icon={Trophy}
                    color="text-yellow-600"
                    iconBg="bg-yellow-50"
                    subtitle="Pending decision"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {/* Application Activity Chart - 2/3 width */}
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Application Activity
                        </h3>
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger className="h-[42px] min-w-[140px] rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
                                <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-200">
                                <SelectItem value="Last 7 days">
                                    Last 7 days
                                </SelectItem>
                                <SelectItem value="Last 30 days">
                                    Last 30 days
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="h-52 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#f1f5f9"
                                />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow:
                                            '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Bar
                                    dataKey="applications"
                                    radius={[8, 8, 0, 0]}
                                >
                                    {weeklyData.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                index === 3
                                                    ? '#3B82F6'
                                                    : '#e2e8f0'
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Upcoming Interviews - 1/3 width */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Upcoming Interviews
                        </h3>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
                            {upcomingInterviews.length}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {upcomingInterviews.map((interview, i) => (
                            <InterviewCard key={i} {...interview} index={i} />
                        ))}
                    </div>

                    <button className="mt-4 w-full rounded-xl py-2.5 text-sm font-medium text-blue-600 transition-all hover:bg-blue-50">
                        View all interviews
                    </button>
                </div>
            </div>

            {/* Recent Applications */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                        Recent Applications
                    </h3>
                    <button className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-all hover:gap-2">
                        View all
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-1">
                    {applications.map((app, i) => (
                        <ApplicationRow key={i} {...app} index={i} />
                    ))}
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Application Pipeline */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-6 text-lg font-semibold text-slate-900">
                        Application Pipeline
                    </h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusData} layout="vertical">
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    horizontal={false}
                                    stroke="#f1f5f9"
                                />
                                <XAxis
                                    type="number"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: '#1e293b',
                                        fontSize: 13,
                                        fontWeight: 500,
                                    }}
                                    width={80}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow:
                                            '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        padding: '12px',
                                    }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                                    {statusData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-5">
                    {/* Response Time */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">
                                Avg Response Time
                            </h3>
                            <div className="rounded-xl bg-blue-50 p-2.5">
                                <Zap className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                        <p className="mb-2 text-4xl font-semibold text-slate-900">
                            5.2 days
                        </p>
                        <p className="text-sm font-medium text-slate-500">
                            23% faster than last month
                        </p>
                    </div>

                    {/* Success Rate */}
                    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 p-6 text-white">
                        <div className="absolute top-0 right-0 h-32 w-32">
                            <div className="absolute inset-0 translate-x-8 -translate-y-8 transform rounded-full bg-white/10"></div>
                        </div>
                        <div className="relative z-10">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold">
                                    Interview Success Rate
                                </h3>
                                <div className="rounded-xl bg-white/20 p-2.5">
                                    <Target className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="mb-2 text-4xl font-semibold">68%</p>
                            <p className="text-sm font-medium text-blue-100">
                                Applications converting to interviews
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <AddJobModal
                isOpen={isAddJobModalOpen}
                onClose={() => setIsAddJobModalOpen(false)}
            />
        </div>
    )
}
