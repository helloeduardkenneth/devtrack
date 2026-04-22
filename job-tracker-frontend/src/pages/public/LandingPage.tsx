import devtrackLogo from '@/assets/devtrack_logo.png'
import {
    ArrowRight,
    BarChart,
    Bell,
    Check,
    Clock,
    FileText,
    Github,
    Linkedin,
    Shield,
    Sparkles,
    Star,
    Target,
    Trello,
    TrendingUp,
    Twitter,
    Users,
    Zap,
} from 'lucide-react'
import { motion } from 'motion/react'

const Nav = ({ onLogin }: { onLogin: () => void }) => (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-slate-200/50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-2">
                <img
                    src={devtrackLogo}
                    alt="DevTrack logo"
                    className="h-8 w-8 rounded-lg object-contain"
                />
                <span className="text-lg font-bold text-slate-900">
                    DevTrack
                </span>
            </div>

            <div className="hidden items-center gap-8 md:flex">
                <a
                    href="#features"
                    className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
                >
                    Features
                </a>
                <a
                    href="#testimonials"
                    className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
                >
                    Testimonials
                </a>
                <a
                    href="#pricing"
                    className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
                >
                    Pricing
                </a>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onLogin}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900"
                >
                    Sign In
                </button>
                <button
                    onClick={onLogin}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800"
                >
                    Get Started
                </button>
            </div>
        </div>
    </nav>
)

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/30 via-white to-white px-6 pt-32 pb-20">
        {/* Gradient orb background */}
        <div className="absolute top-0 left-1/2 -z-10 h-150 w-200 -translate-x-1/2 rounded-full bg-linear-to-br from-blue-400/30 via-indigo-400/20 to-purple-400/20 blur-3xl"></div>

        <div className="mx-auto max-w-5xl space-y-8 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
            >
                <Sparkles className="h-3 w-3" />
                Trusted by 10,000+ developers
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl leading-[1.1] font-semibold tracking-tight text-slate-900 md:text-7xl"
            >
                Track Your Applications.
                <br />
                <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Land Your Dream Job.
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl"
            >
                The modern job application tracker built for developers.
                Organize, analyze, and optimize your job search with AI-powered
                insights.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
            >
                <button
                    onClick={onGetStarted}
                    className="flex h-12 items-center gap-2 rounded-xl bg-slate-900 px-8 font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800"
                >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                </button>
                <button className="h-12 rounded-xl border-2 border-slate-200 bg-white px-8 font-semibold text-slate-900 transition-all hover:bg-slate-50">
                    View Demo
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-3 pt-8"
            >
                <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-500/10 px-4 py-2 text-sm text-slate-700">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Free forever</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-500/10 px-4 py-2 text-sm text-slate-700">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="font-medium">No credit card</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-500/10 px-4 py-2 text-sm text-slate-700">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="font-medium">2-min setup</span>
                </div>
            </motion.div>
        </div>

        {/* Floating Dashboard Preview Cards */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative mx-auto mt-20 max-w-6xl"
        >
            {/* Main dashboard card */}
            <div className="relative z-10 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xl">
                <div className="space-y-4 rounded-xl bg-slate-900 p-6">
                    {/* Mock dashboard header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-blue-500"></div>
                            <div className="space-y-1">
                                <div className="h-3 w-32 rounded bg-slate-700"></div>
                                <div className="h-2 w-24 rounded bg-slate-800"></div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-8 w-8 rounded-lg bg-slate-800"></div>
                            <div className="h-8 w-8 rounded-lg bg-slate-800"></div>
                        </div>
                    </div>

                    {/* Mock stats */}
                    <div className="grid grid-cols-4 gap-3 pt-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="space-y-2 rounded-xl bg-slate-800 p-4"
                            >
                                <div className="h-2 w-12 rounded bg-slate-700"></div>
                                <div className="h-6 w-16 rounded bg-blue-500/20"></div>
                            </div>
                        ))}
                    </div>

                    {/* Mock kanban columns */}
                    <div className="grid grid-cols-4 gap-3 pt-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="mb-3 h-2 w-20 rounded bg-slate-700"></div>
                                {[1, 2].map((j) => (
                                    <div
                                        key={j}
                                        className="space-y-2 rounded-lg bg-slate-800 p-3"
                                    >
                                        <div className="h-2 w-full rounded bg-slate-700"></div>
                                        <div className="h-2 w-3/4 rounded bg-slate-700"></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating notification card */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute -top-4 -right-4 z-20 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-900">
                        Interview Scheduled!
                    </p>
                    <p className="text-xs text-slate-500">
                        Google • Tomorrow 2PM
                    </p>
                </div>
            </motion.div>

            {/* Floating stats card */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute -bottom-4 -left-4 z-20 rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
            >
                <p className="mb-2 text-xs font-semibold text-slate-500">
                    This Week
                </p>
                <div className="flex items-end gap-1">
                    {[40, 60, 45, 80, 55, 70, 90].map((h, i) => (
                        <div
                            key={i}
                            className="w-6 rounded-sm bg-blue-500"
                            style={{ height: `${h}%` }}
                        ></div>
                    ))}
                </div>
                <p className="mt-2 text-xs font-bold text-slate-900">
                    +23% Response Rate
                </p>
            </motion.div>
        </motion.div>
    </section>
)

const SocialProof = () => (
    <section className="border-y border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
            <p className="mb-8 text-center text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Trusted by developers at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40">
                <span className="text-xl font-bold text-slate-900">Google</span>
                <span className="text-xl font-bold text-slate-900">Meta</span>
                <span className="text-xl font-bold text-slate-900">Amazon</span>
                <span className="text-xl font-bold text-slate-900">
                    Microsoft
                </span>
                <span className="text-xl font-bold text-slate-900">
                    Netflix
                </span>
                <span className="text-xl font-bold text-slate-900">Stripe</span>
            </div>
        </div>
    </section>
)

const BentoFeatures = () => (
    <section id="features" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl space-y-12">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
                <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">
                    Everything you need to land offers
                </h2>
                <p className="text-lg text-slate-600">
                    All the tools to organize, track, and optimize your
                    developer job search in one place.
                </p>
            </div>

            {/* Bento Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                {/* Large feature - Kanban Board */}
                <div className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 to-slate-800 p-8 md:col-span-2 md:p-12">
                    <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
                    <div className="relative z-10 space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1">
                            <Trello className="h-4 w-4 text-blue-400" />
                            <span className="text-xs font-semibold text-blue-400">
                                Visual Pipeline
                            </span>
                        </div>
                        <h3 className="text-3xl font-semibold text-white">
                            Drag & Drop Kanban Board
                        </h3>
                        <p className="max-w-lg text-lg leading-relaxed text-slate-400">
                            Move applications through your pipeline with a
                            beautiful Kanban interface. Visual tracking that
                            actually feels good to use.
                        </p>

                        {/* Mock Kanban Preview */}
                        <div className="grid grid-cols-3 gap-3 pt-6">
                            {['Applied', 'Interview', 'Offer'].map((col) => (
                                <div key={col} className="space-y-2">
                                    <div className="mb-3 text-xs font-semibold text-slate-500">
                                        {col}
                                    </div>
                                    {[1, 2].map((j) => (
                                        <div
                                            key={j}
                                            className="space-y-2 rounded-lg border border-slate-700/50 bg-slate-800/60 p-3 backdrop-blur transition-colors hover:border-blue-500/50"
                                        >
                                            <div className="h-2 w-full rounded bg-slate-700"></div>
                                            <div className="h-2 w-2/3 rounded bg-slate-700"></div>
                                            <div className="flex gap-1 pt-1">
                                                {[1, 2, 3].map((k) => (
                                                    <div
                                                        key={k}
                                                        className="h-1 w-6 rounded bg-slate-700"
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats card */}
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-500 to-indigo-600 p-8">
                    <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="relative z-10 flex h-full flex-col space-y-6">
                        <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                            <BarChart className="h-4 w-4 text-white" />
                            <span className="text-xs font-semibold text-white">
                                Analytics
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-white">
                            Real-Time Insights
                        </h3>
                        <p className="leading-relaxed text-blue-100">
                            Track response rates, time-to-offer, and optimize
                            your strategy with data.
                        </p>

                        {/* Mock stats */}
                        <div className="mt-auto space-y-3">
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                                <p className="mb-1 text-xs text-blue-100">
                                    Response Rate
                                </p>
                                <p className="text-3xl font-semibold text-white">
                                    34%
                                </p>
                            </div>
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                                <p className="mb-1 text-xs text-blue-100">
                                    Avg. Time to Offer
                                </p>
                                <p className="text-3xl font-semibold text-white">
                                    21d
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Feature */}
                <div className="rounded-3xl border border-purple-100 bg-linear-to-br from-purple-50 to-pink-50 p-8">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1">
                            <Sparkles className="h-4 w-4 text-purple-600" />
                            <span className="text-xs font-semibold text-purple-600">
                                AI-Powered
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-900">
                            Smart Job Parser
                        </h3>
                        <p className="leading-relaxed text-slate-600">
                            Paste any job posting and AI extracts company, role,
                            salary, and requirements instantly.
                        </p>

                        <div className="space-y-2 rounded-xl border border-purple-200 bg-white p-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                                <span className="text-xs font-semibold text-slate-500">
                                    Parsing...
                                </span>
                            </div>
                            <div className="space-y-1.5">
                                <div className="h-2 w-full rounded bg-slate-100"></div>
                                <div className="h-2 w-4/5 rounded bg-slate-100"></div>
                                <div className="h-2 w-3/5 rounded bg-slate-100"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reminders */}
                <div className="rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50 to-orange-50 p-8">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1">
                            <Bell className="h-4 w-4 text-amber-600" />
                            <span className="text-xs font-semibold text-amber-600">
                                Reminders
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-900">
                            Never Miss a Follow-up
                        </h3>
                        <p className="leading-relaxed text-slate-600">
                            Automatic reminders keep you on top of every
                            application, interview, and deadline.
                        </p>

                        <div className="space-y-2">
                            {[
                                {
                                    text: 'Follow up with Meta',
                                    time: 'Today, 3PM',
                                    color: 'bg-red-100 text-red-700',
                                },
                                {
                                    text: 'Google interview prep',
                                    time: 'Tomorrow',
                                    color: 'bg-amber-100 text-amber-700',
                                },
                            ].map((reminder, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 rounded-lg border border-amber-200 bg-white p-3"
                                >
                                    <div
                                        className={`h-2 w-2 rounded-full ${reminder.color.split(' ')[0].replace('text', 'bg')}`}
                                    ></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {reminder.text}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {reminder.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="rounded-3xl border border-green-100 bg-linear-to-br from-green-50 to-emerald-50 p-8">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">
                            <Clock className="h-4 w-4 text-green-600" />
                            <span className="text-xs font-semibold text-green-600">
                                Activity
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-900">
                            Complete History
                        </h3>
                        <p className="leading-relaxed text-slate-600">
                            Every action tracked. See exactly what happened and
                            when for each application.
                        </p>

                        <div className="space-y-3 pt-2">
                            {[
                                {
                                    icon: FileText,
                                    label: 'Application sent',
                                    color: 'blue',
                                },
                                {
                                    icon: Users,
                                    label: 'Recruiter call',
                                    color: 'purple',
                                },
                                {
                                    icon: Target,
                                    label: 'Interview scheduled',
                                    color: 'green',
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <div
                                        className={`h-8 w-8 bg-${item.color}-100 flex items-center justify-center rounded-full`}
                                    >
                                        <item.icon
                                            className={`h-4 w-4 text-${item.color}-600`}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

const DarkProductSection = () => (
    <section className="relative overflow-hidden bg-slate-900 px-6 py-24">
        {/* Background gradients */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
                <h2 className="text-4xl font-semibold text-white md:text-5xl">
                    Built for the modern developer
                </h2>
                <p className="text-lg text-slate-400">
                    Experience the job tracking tool that actually understands
                    your workflow.
                </p>
            </div>

            {/* Product showcase */}
            <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="space-y-8">
                    {[
                        {
                            icon: Zap,
                            title: 'Lightning Fast',
                            desc: 'Add applications in seconds. Built with performance in mind.',
                            bgColor: 'bg-yellow-500/10',
                            hoverColor: 'group-hover:bg-yellow-500/20',
                            iconColor: 'text-yellow-400',
                        },
                        {
                            icon: Shield,
                            title: 'Private & Secure',
                            desc: 'Your data is encrypted and never shared. Privacy first.',
                            bgColor: 'bg-blue-500/10',
                            hoverColor: 'group-hover:bg-blue-500/20',
                            iconColor: 'text-blue-400',
                        },
                        {
                            icon: TrendingUp,
                            title: 'Optimize Your Search',
                            desc: "Data-driven insights show you what works and what doesn't.",
                            bgColor: 'bg-green-500/10',
                            hoverColor: 'group-hover:bg-green-500/20',
                            iconColor: 'text-green-400',
                        },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex gap-4"
                        >
                            <div
                                className={`h-12 w-12 ${feature.bgColor} ${feature.hoverColor} flex shrink-0 items-center justify-center rounded-xl transition-colors`}
                            >
                                <feature.icon
                                    className={`h-6 w-6 ${feature.iconColor}`}
                                />
                            </div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold text-white">
                                    {feature.title}
                                </h3>
                                <p className="leading-relaxed text-slate-400">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mock product screenshot */}
                <div className="relative">
                    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
                        {/* Mock app interface */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-blue-500"></div>
                                    <div>
                                        <div className="mb-1.5 h-3 w-32 rounded bg-slate-600"></div>
                                        <div className="h-2 w-20 rounded bg-slate-700"></div>
                                    </div>
                                </div>
                                <div className="h-8 w-24 rounded-lg bg-blue-500"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="space-y-2 rounded-xl bg-slate-700/50 p-4"
                                    >
                                        <div className="h-2 w-16 rounded bg-slate-600"></div>
                                        <div className="h-8 w-20 rounded bg-slate-600"></div>
                                        <div className="h-1.5 w-full rounded bg-slate-600"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 pt-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between rounded-lg bg-slate-700/50 p-4"
                                    >
                                        <div className="flex flex-1 items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-slate-600"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-2 w-32 rounded bg-slate-600"></div>
                                                <div className="h-2 w-24 rounded bg-slate-600"></div>
                                            </div>
                                        </div>
                                        <div className="h-6 w-16 rounded bg-slate-600"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating element */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-6 -right-6 flex items-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-white shadow-xl"
                    >
                        <Check className="h-5 w-5" />
                        <div>
                            <p className="text-sm font-bold">Offer Accepted!</p>
                            <p className="text-xs opacity-90">$160k at Meta</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
)

const Testimonials = () => (
    <section id="testimonials" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
                <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">
                    Loved by developers everywhere
                </h2>
                <p className="text-lg text-slate-600">
                    Join 10,000+ engineers who landed their dream jobs with
                    DevTrack.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {[
                    {
                        name: 'Sarah Chen',
                        role: 'Senior Engineer at Google',
                        quote: 'DevTrack helped me track 47 applications and land 3 offers. The analytics showed me exactly where to improve.',
                        rating: 5,
                    },
                    {
                        name: 'Marcus Johnson',
                        role: 'Full Stack Dev at Stripe',
                        quote: 'Finally ditched my messy spreadsheet. The Kanban board and reminders are game changers.',
                        rating: 5,
                    },
                    {
                        name: 'Priya Patel',
                        role: 'Frontend Dev at Netflix',
                        quote: 'The AI job parser saved me hours of data entry. This tool is essential for any serious job search.',
                        rating: 5,
                    },
                ].map((testimonial, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition-all hover:border-blue-200 hover:shadow-lg"
                    >
                        <div className="mb-4 flex gap-1 text-yellow-400">
                            {[...Array(testimonial.rating)].map((_, j) => (
                                <Star
                                    key={j}
                                    className="h-4 w-4 fill-current"
                                />
                            ))}
                        </div>
                        <p className="mb-6 leading-relaxed text-slate-700">
                            "{testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
                            <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    {testimonial.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
)

const Pricing = () => (
    <section id="pricing" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
                <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">
                    Simple, transparent pricing
                </h2>
                <p className="text-lg text-slate-600">
                    Start free. Upgrade when you need more power.
                </p>
            </div>

            <div className="mx-auto max-w-lg">
                <div className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:border-blue-500">
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl"></div>

                    <div className="relative z-10 space-y-6">
                        <div className="border-b border-slate-100 pb-6 text-center">
                            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-600">
                                FREE FOREVER
                            </span>
                            <div className="mb-3 flex items-baseline justify-center gap-2">
                                <span className="text-6xl font-semibold text-slate-900">
                                    $0
                                </span>
                                <span className="font-semibold text-slate-500">
                                    /month
                                </span>
                            </div>
                            <p className="text-slate-600">
                                Everything you need to land your next role
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {[
                                'Unlimited applications',
                                'Visual Kanban board',
                                'AI job parser (5/month)',
                                'Smart reminders',
                                'Analytics dashboard',
                                'Export to CSV/PDF',
                            ].map((feature, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-3 font-medium text-slate-700"
                                >
                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                                        <Check className="h-3 w-3 text-green-600" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button className="h-12 w-full rounded-xl bg-slate-900 font-bold text-white shadow-lg transition-all hover:bg-slate-800">
                            Get Started Free
                        </button>
                        <p className="text-center text-xs font-medium text-slate-500">
                            No credit card required • 2-min setup
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

const FinalCTA = ({ onGetStarted }: { onGetStarted: () => void }) => (
    <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
            <div className="relative space-y-8 overflow-hidden rounded-[48px] bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-12 text-center md:p-20">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>

                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl leading-tight font-semibold text-white md:text-6xl">
                        Ready to land your
                        <br />
                        dream developer role?
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-slate-300">
                        Join 10,000+ developers already using DevTrack to
                        organize their job search and land offers faster.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                    <button
                        onClick={onGetStarted}
                        className="flex h-14 items-center gap-2 rounded-xl bg-white px-10 font-bold text-slate-900 shadow-xl transition-all hover:bg-blue-50"
                    >
                        Get Started Free
                        <ArrowRight className="h-5 w-5" />
                    </button>
                    <button className="h-14 rounded-xl border border-white/20 bg-white/10 px-10 font-bold text-white backdrop-blur transition-all hover:bg-white/20">
                        Watch Demo
                    </button>
                </div>

                <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 text-sm">
                    <div className="inline-flex items-center gap-2 rounded-full border border-green-300/25 bg-green-500/10 px-4 py-2 text-slate-200 backdrop-blur">
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="font-medium">Free forever</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-green-300/25 bg-green-500/10 px-4 py-2 text-slate-200 backdrop-blur">
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="font-medium">No credit card</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-green-300/25 bg-green-500/10 px-4 py-2 text-slate-200 backdrop-blur">
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="font-medium">2-min setup</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

const Footer = () => (
    <footer className="bg-slate-900 px-6 py-16 text-slate-400">
        <div className="mx-auto mb-12 grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-white">
                    <img
                        src={devtrackLogo}
                        alt="DevTrack logo"
                        className="h-7 w-7 rounded-lg bg-white object-contain p-1"
                    />
                    <span className="text-lg font-bold">DevTrack</span>
                </div>
                <p className="max-w-sm text-sm leading-relaxed">
                    The modern job application tracker built for developers who
                    want to land their dream roles faster.
                </p>
                <div className="flex gap-4 pt-2">
                    <Twitter className="h-5 w-5 cursor-pointer transition-colors hover:text-white" />
                    <Github className="h-5 w-5 cursor-pointer transition-colors hover:text-white" />
                    <Linkedin className="h-5 w-5 cursor-pointer transition-colors hover:text-white" />
                </div>
            </div>

            <div>
                <h4 className="mb-4 text-sm font-bold text-white">Product</h4>
                <ul className="space-y-3 text-sm">
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Features
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Pricing
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Changelog
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Roadmap
                        </a>
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="mb-4 text-sm font-bold text-white">Company</h4>
                <ul className="space-y-3 text-sm">
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Blog
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Contact
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Privacy
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs md:flex-row">
            <p>© 2026 DevTrack. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="transition-colors hover:text-white">
                    Privacy
                </a>
                <a href="#" className="transition-colors hover:text-white">
                    Terms
                </a>
                <a href="#" className="transition-colors hover:text-white">
                    Cookies
                </a>
            </div>
        </div>
    </footer>
)

export const LandingPage = ({ onStart }: { onStart: () => void }) => {
    return (
        <div className="min-h-screen bg-white">
            <Nav onLogin={onStart} />
            <Hero onGetStarted={onStart} />
            <SocialProof />
            <BentoFeatures />
            <DarkProductSection />
            <Testimonials />
            <Pricing />
            <FinalCTA onGetStarted={onStart} />
            <Footer />
        </div>
    )
}
