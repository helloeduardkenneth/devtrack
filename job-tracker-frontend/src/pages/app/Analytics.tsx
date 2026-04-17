import React, { useState } from 'react'
import {
  TrendingUp,
 
  Download,
  Calendar,
  Briefcase,
  Clock,
  Target,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  Building2,
  Zap,
  Award,
} from 'lucide-react'
import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar,
} from 'recharts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { motion } from 'motion/react'

// Mock data for charts
const applicationsOverTimeData = [
  {
    week: 'Week 1',
    Applied: 12,
    'Phone Screen': 5,
    Technical: 3,
    Onsite: 1,
    Offer: 0,
    Rejected: 2,
  },
  {
    week: 'Week 2',
    Applied: 15,
    'Phone Screen': 8,
    Technical: 4,
    Onsite: 2,
    Offer: 1,
    Rejected: 3,
  },
  {
    week: 'Week 3',
    Applied: 18,
    'Phone Screen': 10,
    Technical: 6,
    Onsite: 3,
    Offer: 1,
    Rejected: 4,
  },
  {
    week: 'Week 4',
    Applied: 22,
    'Phone Screen': 12,
    Technical: 7,
    Onsite: 4,
    Offer: 2,
    Rejected: 5,
  },
  {
    week: 'Week 5',
    Applied: 20,
    'Phone Screen': 14,
    Technical: 9,
    Onsite: 5,
    Offer: 2,
    Rejected: 4,
  },
  {
    week: 'Week 6',
    Applied: 25,
    'Phone Screen': 16,
    Technical: 11,
    Onsite: 6,
    Offer: 3,
    Rejected: 6,
  },
]

// Multi-ring circular chart data
const multiRingData = [
  { name: 'Applied', value: 89, fill: '#3B82F6' },
  { name: 'Phone Screen', value: 76, fill: '#EAB308' },
  { name: 'Technical', value: 60, fill: '#10B981' },
  { name: 'Onsite', value: 51, fill: '#EF4444' },
  { name: 'Offer', value: 35, fill: '#A855F7' },
]

const companyResponseData = [
  { company: 'Google', responseRate: 85 },
  { company: 'Meta', responseRate: 78 },
  { company: 'Amazon', responseRate: 72 },
  { company: 'Microsoft', responseRate: 68 },
  { company: 'Apple', responseRate: 65 },
  { company: 'Netflix', responseRate: 60 },
  { company: 'Stripe', responseRate: 58 },
  { company: 'Airbnb', responseRate: 55 },
  { company: 'LinkedIn', responseRate: 52 },
  { company: 'Uber', responseRate: 48 },
]

const funnelData = [
  { stage: 'Applied', value: 126, percentage: 100 },
  { stage: 'Responded', value: 89, percentage: 71 },
  { stage: 'Interviewed', value: 52, percentage: 41 },
  { stage: 'Offered', value: 8, percentage: 6 },
]

const companyPerformanceData = [
  {
    company: 'Google',
    applications: 15,
    responses: 12,
    interviews: 8,
    offers: 2,
    responseRate: 80,
  },
  {
    company: 'Meta',
    applications: 12,
    responses: 10,
    interviews: 6,
    offers: 1,
    responseRate: 83,
  },
  {
    company: 'Amazon',
    applications: 18,
    responses: 13,
    interviews: 7,
    offers: 1,
    responseRate: 72,
  },
  {
    company: 'Microsoft',
    applications: 10,
    responses: 7,
    interviews: 4,
    offers: 1,
    responseRate: 70,
  },
  {
    company: 'Apple',
    applications: 8,
    responses: 6,
    interviews: 3,
    offers: 1,
    responseRate: 75,
  },
  {
    company: 'Netflix',
    applications: 6,
    responses: 4,
    interviews: 2,
    offers: 1,
    responseRate: 67,
  },
  {
    company: 'Stripe',
    applications: 14,
    responses: 9,
    interviews: 5,
    offers: 1,
    responseRate: 64,
  },
  {
    company: 'Airbnb',
    applications: 11,
    responses: 6,
    interviews: 3,
    offers: 0,
    responseRate: 55,
  },
]

const insights = [
  {
    type: 'positive',
    icon: TrendingUp,
    text: 'Your response rate increased by 15% this month compared to last month',
    color: 'text-green-600',
    bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
    border: 'border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    type: 'info',
    icon: Clock,
    text: 'Technical interviews take an average of 12 days to schedule after phone screen',
    color: 'text-blue-600',
    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    type: 'positive',
    icon: Target,
    text: 'You have the highest success rate (75%) with Series A startups',
    color: 'text-purple-600',
    bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
    border: 'border-purple-200',
    iconBg: 'bg-purple-100',
  },
  {
    type: 'info',
    icon: Briefcase,
    text: 'Remote positions have a 23% higher response rate than on-site roles',
    color: 'text-indigo-600',
    bg: 'bg-gradient-to-br from-indigo-50 to-blue-50',
    border: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
  },
]

interface AnalyticsDashboardProps {
  // Add any props if needed
}

// Circular Progress Component
const CircularProgress = ({
  percentage,
  color,
  size = 120,
  strokeWidth = 8,
  label,
  value,
}: {
  percentage: number
  color: string
  size?: number
  strokeWidth?: number
  label?: string
  value?: string
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90 transform">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${color}40)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">
          {value || `${percentage}%`}
        </span>
        {label && <span className="mt-1 text-xs text-slate-500">{label}</span>}
      </div>
    </div>
  )
}

export const Analytics: React.FC<AnalyticsDashboardProps> = () => {
  const [dateRange, setDateRange] = useState('Last 30 days')

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-2xl backdrop-blur-sm">
          <p className="mb-2 font-semibold text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="flex items-center gap-2 text-sm text-slate-200">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:{' '}
              <span className="font-semibold text-white">{entry.value}</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const ResponseRateTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-2xl backdrop-blur-sm">
          <p className="mb-1 font-semibold text-white">{payload[0].payload.company}</p>
          <p className="text-sm text-slate-200">
            Response Rate:{' '}
            <span className="font-semibold text-blue-400">{payload[0].value}%</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Analytics</h1>
          <p className="mt-1 text-slate-600">
            Track your job search performance and insights
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-slate-400" />
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="h-[42px] min-w-[160px] rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                <SelectItem value="Last 3 months">Last 3 months</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Metrics Overview - 4 Cards with Circular Progress */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Total Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-2xl bg-blue-600 p-6 text-white shadow-sm"
        >
          <div className="relative">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-white/20 px-2 py-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">12%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-100">Total Applications</p>
              <p className="text-4xl font-bold">126</p>
              <p className="text-xs text-blue-100">+14 from last period</p>
            </div>
          </div>
        </motion.div>

        {/* Average Response Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="absolute -right-6 -bottom-6 opacity-5">
            <Clock className="h-32 w-32" />
          </div>
          <div className="relative">
            <div className="mb-4 flex items-center justify-center">
              <CircularProgress
                percentage={72}
                color="#A855F7"
                size={100}
                strokeWidth={10}
                value="5.2"
                label="days"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">Avg Response Time</p>
              <div className="mt-1 flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <p className="text-xs font-medium text-green-600">8% faster</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="absolute -right-6 -bottom-6 opacity-5">
            <Target className="h-32 w-32" />
          </div>
          <div className="relative">
            <div className="mb-4 flex items-center justify-center">
              <CircularProgress
                percentage={71}
                color="#10B981"
                size={100}
                strokeWidth={10}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">Success Rate</p>
              <div className="mt-1 flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <p className="text-xs font-medium text-green-600">+15% increase</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="absolute -right-6 -bottom-6 opacity-5">
            <Zap className="h-32 w-32" />
          </div>
          <div className="relative">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-600">Active Applications</p>
              <p className="text-4xl font-bold text-slate-900">52</p>
              <p className="text-xs text-slate-500">In interview process</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section - 2 Column Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* CHART 1 - Applications Over Time */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 pb-16 shadow-sm"
        >
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Applications Over Time
                </h3>
                <p className="text-sm text-slate-500">Weekly application volume trends</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={applicationsOverTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="week"
                stroke="#94A3B8"
                style={{ fontSize: '12px', fontWeight: 500 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94A3B8"
                style={{ fontSize: '12px', fontWeight: 500 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px', fontWeight: 600 }}
                iconType="circle"
              />
              <Area
                type="monotone"
                dataKey="Applied"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="Phone Screen"
                stroke="#EAB308"
                fill="#EAB308"
                fillOpacity={0.2}
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="Offer"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.2}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* CHART 2 - Multi-Ring Status Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 pb-16 shadow-sm"
        >
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Status Distribution
                </h3>
                <p className="text-sm text-slate-500">Multi-ring progress overview</p>
              </div>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-center">
            <div className="relative">
              <ResponsiveContainer width={280} height={280}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="20%"
                  outerRadius="100%"
                  data={multiRingData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    // minAngle={15}
                    background
                    // clockWise={true}
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {multiRingData.map((status, _) => (
              <div key={status.name} className="text-center">
                <div className="relative mb-2 inline-flex items-center justify-center">
                  <svg width="56" height="56" className="-rotate-90 transform">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="6"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      fill="none"
                      stroke={status.fill}
                      strokeWidth="6"
                      strokeDasharray={`${(status.value / 100) * 150} 150`}
                      strokeLinecap="round"
                      style={{
                        filter: `drop-shadow(0 0 6px ${status.fill}80)`,
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-slate-900">
                      {status.value}%
                    </span>
                  </div>
                </div>
                <p className="truncate text-[10px] text-slate-600">{status.name}</p>
                <p className="text-xs font-semibold text-slate-900">
                  {Math.round((status.value / 100) * 126)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CHART 3 - Response Rate by Company */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 pb-16 shadow-sm"
        >
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Response Rate by Company
                </h3>
                <p className="text-sm text-slate-500">Top 10 companies performance</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={companyResponseData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E2E8F0"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                stroke="#94A3B8"
                style={{ fontSize: '12px', fontWeight: 500 }}
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="company"
                stroke="#94A3B8"
                style={{ fontSize: '12px', fontWeight: 600 }}
                width={90}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={ResponseRateTooltip} />
              <Bar dataKey="responseRate" fill="#3B82F6" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* CHART 4 - Enhanced Application Funnel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 pb-16 shadow-sm"
        >
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Application Funnel
                </h3>
                <p className="text-sm text-slate-500">Stage-by-stage conversion</p>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            {funnelData.map((stage, index) => {
              const isLast = index === funnelData.length - 1
              const prevValue = index > 0 ? funnelData[index - 1].value : stage.value
              const conversionRate = ((stage.value / prevValue) * 100).toFixed(0)

              const colors = [
                'bg-blue-600',
                'bg-indigo-600',
                'bg-purple-600',
                'bg-pink-600',
              ]

              return (
                <div key={stage.stage}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">
                      {stage.stage}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-slate-900">
                        {stage.value}
                      </span>
                      <span className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                        {stage.percentage}%
                      </span>
                    </div>
                  </div>
                  <div
                    className={`relative h-16 ${colors[index]} flex items-center rounded-2xl px-6 shadow-sm`}
                    style={{
                      width: `${stage.percentage}%`,
                      minWidth: '45%',
                    }}
                  >
                    <span className="text-base font-bold text-white">
                      {stage.value} applications
                    </span>
                    <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-lg" />
                  </div>
                  {!isLast && (
                    <div className="my-3 ml-6 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {conversionRate}% conversion rate
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Key Insights Section */}
      <div className="rounded-2xl border-2 border-blue-200 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Key Insights</h3>
            <p className="text-sm text-slate-600">
              AI-generated observations from your data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`${insight.bg} border-2 ${insight.border} flex items-start gap-3 rounded-xl p-4 shadow-sm transition-shadow hover:shadow-md`}
              >
                <div className={`${insight.iconBg} ${insight.color} rounded-lg p-2`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="flex-1 text-sm leading-relaxed text-slate-700">
                  {insight.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Company Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="border-b border-slate-200 bg-linear-to-r from-slate-50 to-slate-100 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Company Performance</h3>
          <p className="mt-1 text-sm text-slate-500">Detailed breakdown by company</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold tracking-wide text-slate-700 uppercase">
                  Company
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold tracking-wide text-slate-700 uppercase">
                  Applications
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold tracking-wide text-slate-700 uppercase">
                  Responses
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold tracking-wide text-slate-700 uppercase">
                  Interviews
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold tracking-wide text-slate-700 uppercase">
                  Offers
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold tracking-wide text-slate-700 uppercase">
                  Response Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companyPerformanceData.map((company, index) => (
                <motion.tr
                  key={company.company}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`transition-colors hover:bg-blue-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-semibold text-slate-900">
                        {company.company}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                      {company.applications}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 font-bold text-purple-700">
                      {company.responses}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-700">
                      {company.interviews}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl font-bold ${
                        company.offers > 0
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {company.offers}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100 shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${company.responseRate}%` }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          className="h-full rounded-full bg-blue-600"
                        />
                      </div>
                      <span className="w-14 text-sm font-bold text-slate-900">
                        {company.responseRate}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
