import {
    AlertCircle,
    Briefcase,
    Calendar,
    CheckCircle2,
    ClipboardPaste,
    DollarSign,
    FileText,
    Globe,
    Loader2,
    Sparkles,
    Upload,
    User,
    X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    JOB_TYPE_OPTIONS,
    PRIORITY_OPTIONS,
    SOURCE_OPTIONS,
    STATUS_OPTIONS,
    WORK_MODE_OPTIONS,
} from '@/constants/add-job-options.constants'
import { useAddJobModal } from '@/hooks/useAddJobModal'
import type { AddJobFormValues } from '@/validations/job.validation'

interface AddJobModalProps {
    isOpen: boolean
    onClose: () => void
    editMode?: boolean
    initialData?: Partial<AddJobFormValues> & { id: number }
    defaultStatus?: string
}

const AddJobModal = ({
    isOpen,
    onClose,
    editMode = false,
    initialData,
    defaultStatus,
}: AddJobModalProps) => {
    const {
        form,
        control,
        setValue,
        isSubmitting,
        isValid,
        isUrlValid,
        jobType,
        workMode,
        status,
        priority,
        source,
        isAiProcessing,
        companyLogo,
        logoFile,
        isDraggingLogo,
        setIsDraggingLogo,
        setCompanyLogo,
        setLogoFile,
        handleLogoDrop,
        handleLogoFileInput,
        handlePasteJobDescription,
        handleAiAutoFill,
        handleResetForm,
        onSubmit,
        saveJobMutation,
        updateJobMutation,
    } = useAddJobModal({
        isOpen,
        onClose,
        editMode,
        initialData,
        defaultStatus,
    })

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    style={{
                        boxShadow:
                            '0 0 0 1px rgba(0,0,0,0.08), 0 20px 48px rgba(0,0,0,0.12), 0 48px 96px rgba(0,0,0,0.08)',
                    }}
                >
                    {/* Blue top accent */}
                    <div
                        className="absolute top-0 right-0 left-0 z-20 h-1"
                        style={{
                            background:
                                'linear-gradient(90deg, #3b82f6, #6366f1 50%, #8b5cf6)',
                        }}
                    />

                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900">
                                {editMode
                                    ? 'Edit Application'
                                    : 'Add New Application'}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Track a new opportunity in your pipeline
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <Form {...form}>
                            <form
                                id="add-job-form"
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8 p-6"
                            >
                                <div className="space-y-4 rounded-xl border border-blue-200 bg-linear-to-br from-blue-50/80 to-indigo-50/80 p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-xl"
                                            style={{
                                                background:
                                                    'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                                                boxShadow:
                                                    '0 2px 8px rgba(59,130,246,0.3)',
                                            }}
                                        >
                                            <Sparkles className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">
                                                AI Assistant
                                            </h3>
                                            <p className="text-xs text-slate-600">
                                                Let AI help you fill out the
                                                form automatically
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={handlePasteJobDescription}
                                        >
                                            <ClipboardPaste className="h-4 w-4" />
                                            Paste Job Description
                                        </Button>

                                        <Button
                                            type="button"
                                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                                            onClick={handleAiAutoFill}
                                            disabled={isAiProcessing}
                                        >
                                            {isAiProcessing ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="h-4 w-4" />
                                                    Auto-fill with AI
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                                        <div
                                            className="flex h-9 w-9 items-center justify-center rounded-lg"
                                            style={{
                                                background:
                                                    'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                                                boxShadow:
                                                    '0 0 0 1px rgba(59,130,246,0.12)',
                                            }}
                                        >
                                            <Briefcase className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">
                                            Job Details
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <FormField
                                            control={control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2 md:col-span-1">
                                                    <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                        Company Name *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="e.g. GCash, Globe Telecom, Maya"
                                                            className="h-12"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="col-span-2 md:col-span-1">
                                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                                Company Logo
                                            </label>
                                            <div
                                                onDrop={handleLogoDrop}
                                                onDragOver={(e) => {
                                                    e.preventDefault()
                                                    setIsDraggingLogo(true)
                                                }}
                                                onDragLeave={() =>
                                                    setIsDraggingLogo(false)
                                                }
                                                className={`relative flex h-13 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-all ${
                                                    isDraggingLogo
                                                        ? 'border-blue-400 bg-blue-50'
                                                        : companyLogo
                                                          ? 'border-green-300 bg-green-50'
                                                          : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50'
                                                }`}
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            'logo-upload',
                                                        )
                                                        ?.click()
                                                }
                                            >
                                                <input
                                                    id="logo-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={
                                                        handleLogoFileInput
                                                    }
                                                    className="hidden"
                                                />

                                                {companyLogo ? (
                                                    <div className="flex items-center gap-3 px-4">
                                                        <img
                                                            src={companyLogo}
                                                            alt="Company logo"
                                                            className="h-8 w-8 rounded-lg border border-slate-200 bg-white object-contain"
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-xs font-medium text-slate-700">
                                                                {logoFile?.name ||
                                                                    form.getValues(
                                                                        'companyLogoFilename',
                                                                    ) ||
                                                                    'Logo loaded'}
                                                            </p>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            size="icon-xs"
                                                            variant="ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setCompanyLogo(
                                                                    null,
                                                                )
                                                                setLogoFile(
                                                                    null,
                                                                )
                                                                setValue(
                                                                    'companyLogoUrl',
                                                                    undefined,
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldValidate: true,
                                                                    },
                                                                )
                                                                setValue(
                                                                    'companyLogoFilename',
                                                                    undefined,
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldValidate: true,
                                                                    },
                                                                )
                                                            }}
                                                        >
                                                            <X className="h-4 w-4 text-slate-500" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-slate-500">
                                                        <Upload className="h-4 w-4" />
                                                        <span className="text-xs font-medium">
                                                            {isDraggingLogo
                                                                ? 'Drop logo here'
                                                                : 'Upload or drag logo'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <FormField
                                            control={control}
                                            name="position"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2 md:col-span-1">
                                                    <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                        Position Title *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="e.g. Senior Frontend Engineer"
                                                            className="h-12"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name="jobUrl"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                        Job URL
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Globe className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                                            <Input
                                                                type="url"
                                                                {...field}
                                                                placeholder="https://company.com/careers/job-id"
                                                                className="h-12 pr-12 pl-12"
                                                            />
                                                            {isUrlValid ===
                                                                true && (
                                                                <CheckCircle2 className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-green-600" />
                                                            )}
                                                            {isUrlValid ===
                                                                false && (
                                                                <AlertCircle className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-red-600" />
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2 md:col-span-1">
                                                    <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                        Location
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="e.g. BGC, Taguig / Makati"
                                                            className="h-12"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="col-span-2 md:col-span-1">
                                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                                Job Type
                                            </label>
                                            <Select
                                                value={jobType}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        'jobType',
                                                        value as AddJobFormValues['jobType'],
                                                        {
                                                            shouldValidate: true,
                                                        },
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white">
                                                    <SelectValue placeholder="Select job type" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-slate-200">
                                                    {JOB_TYPE_OPTIONS.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="col-span-2 md:col-span-1">
                                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                                Work Mode
                                            </label>
                                            <Select
                                                value={workMode}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        'workMode',
                                                        value as AddJobFormValues['workMode'],
                                                        {
                                                            shouldValidate: true,
                                                        },
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white">
                                                    <SelectValue placeholder="Select work mode" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-slate-200">
                                                    {WORK_MODE_OPTIONS.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <FormItem className="col-span-2 md:col-span-1">
                                            <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                Salary Range
                                            </FormLabel>
                                            <div className="grid grid-cols-2 gap-3">
                                                <FormField
                                                    control={control}
                                                    name="salaryMin"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                                    <Input
                                                                        type="number"
                                                                        value={
                                                                            field.value ??
                                                                            ''
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) => {
                                                                            const value =
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            field.onChange(
                                                                                value ===
                                                                                    ''
                                                                                    ? undefined
                                                                                    : Number(
                                                                                          value,
                                                                                      ),
                                                                            )
                                                                        }}
                                                                        placeholder="Min"
                                                                        className="h-12 pl-9"
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={control}
                                                    name="salaryMax"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                                    <Input
                                                                        type="number"
                                                                        value={
                                                                            field.value ??
                                                                            ''
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) => {
                                                                            const value =
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            field.onChange(
                                                                                value ===
                                                                                    ''
                                                                                    ? undefined
                                                                                    : Number(
                                                                                          value,
                                                                                      ),
                                                                            )
                                                                        }}
                                                                        placeholder="Max"
                                                                        className="h-12 pl-9"
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <FormField
                                                control={control}
                                                name="salaryMax"
                                                render={() => (
                                                    <FormMessage className="mt-1 text-xs" />
                                                )}
                                            />
                                        </FormItem>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                                        <div
                                            className="flex h-9 w-9 items-center justify-center rounded-lg"
                                            style={{
                                                background:
                                                    'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                                                boxShadow:
                                                    '0 0 0 1px rgba(34,197,94,0.12)',
                                            }}
                                        >
                                            <Calendar className="h-4 w-4 text-green-600" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">
                                            Status & Timeline
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                                Current Status *
                                            </label>
                                            <Select
                                                value={status}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        'status',
                                                        value as AddJobFormValues['status'],
                                                        {
                                                            shouldValidate: true,
                                                        },
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-slate-200">
                                                    {STATUS_OPTIONS.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <FormField
                                            control={control}
                                            name="appliedDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                        Applied Date *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                            className="h-12"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <div>
                                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                                Priority
                                            </label>
                                            <Select
                                                value={priority}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        'priority',
                                                        value as AddJobFormValues['priority'],
                                                        {
                                                            shouldValidate: true,
                                                        },
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white">
                                                    <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-slate-200">
                                                    {PRIORITY_OPTIONS.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                                Source
                                            </label>
                                            <Select
                                                value={source}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        'source',
                                                        value as AddJobFormValues['source'],
                                                        {
                                                            shouldValidate: true,
                                                        },
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white">
                                                    <SelectValue placeholder="Select source" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-slate-200">
                                                    {SOURCE_OPTIONS.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                                        <div
                                            className="flex h-9 w-9 items-center justify-center rounded-lg"
                                            style={{
                                                background:
                                                    'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                                                boxShadow:
                                                    '0 0 0 1px rgba(168,85,247,0.12)',
                                            }}
                                        >
                                            <FileText className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">
                                            Additional Information
                                        </h3>
                                    </div>

                                    <FormField
                                        control={control}
                                        name="jobDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                    Job Description
                                                </FormLabel>
                                                <FormControl>
                                                    <textarea
                                                        {...field}
                                                        rows={6}
                                                        placeholder="Paste the full job description here..."
                                                        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                                                    />
                                                </FormControl>
                                                <FormMessage className="mt-1 text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="requirements"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                    Key Requirements
                                                </FormLabel>
                                                <FormControl>
                                                    <textarea
                                                        {...field}
                                                        rows={4}
                                                        placeholder="• List key requirements&#10;• Technical skills needed&#10;• Years of experience"
                                                        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                                                    />
                                                </FormControl>
                                                <FormMessage className="mt-1 text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="notes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                    Application Notes
                                                </FormLabel>
                                                <FormControl>
                                                    <textarea
                                                        {...field}
                                                        rows={3}
                                                        placeholder="Add any notes about this application, interview prep, or follow-up tasks..."
                                                        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                                                    />
                                                </FormControl>
                                                <FormMessage className="mt-1 text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                                        <div
                                            className="flex h-9 w-9 items-center justify-center rounded-lg"
                                            style={{
                                                background:
                                                    'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
                                                boxShadow:
                                                    '0 0 0 1px rgba(249,115,22,0.12)',
                                            }}
                                        >
                                            <User className="h-4 w-4 text-orange-600" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">
                                            Contact Information
                                        </h3>
                                        <span className="ml-auto text-xs text-slate-500">
                                            (Optional)
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <FormField
                                            control={control}
                                            name="recruiterName"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2 md:col-span-1">
                                                    <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                        Recruiter Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="e.g. Juan Dela Cruz"
                                                            className="h-12"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name="recruiterEmail"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2 md:col-span-1">
                                                    <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                        Recruiter Email
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            {...field}
                                                            placeholder="maria@company.ph"
                                                            className="h-12"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name="recruiterPhone"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2 md:col-span-1">
                                                    <FormLabel className="mb-2 block text-sm font-bold text-slate-700">
                                                        Recruiter Phone
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="tel"
                                                            {...field}
                                                            placeholder="+63 917 123 4567"
                                                            className="h-12"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="mt-1 text-xs" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>

                    <div className="sticky bottom-0 flex items-center justify-between border-t border-slate-200 bg-slate-50/80 px-6 py-4 backdrop-blur-sm">
                        <p className="text-xs text-slate-500">
                            <span className="text-red-500">*</span> Required
                            fields
                        </p>
                        <div className="flex gap-2.5">
                            <button
                                type="button"
                                onClick={handleResetForm}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="add-job-form"
                                disabled={
                                    isSubmitting ||
                                    saveJobMutation.isPending ||
                                    updateJobMutation.isPending ||
                                    !isValid
                                }
                                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                style={{
                                    boxShadow:
                                        '0 2px 8px rgba(37,99,235,0.3), 0 1px 2px rgba(37,99,235,0.2)',
                                }}
                            >
                                <span className="flex items-center gap-2">
                                    {(isSubmitting ||
                                        saveJobMutation.isPending) && (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    )}
                                    {editMode
                                        ? 'Save Changes'
                                        : 'Save Application'}
                                </span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default AddJobModal
