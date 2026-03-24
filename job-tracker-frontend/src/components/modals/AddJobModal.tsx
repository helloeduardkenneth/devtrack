import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
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
import { type ChangeEvent, type DragEvent, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Dropdown } from '@/components/shared/Dropdown'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addJobDefaultValues, jobSchema } from '@/validations/job.validation'
import type { AddJobFormValues } from '@/validations/job.validation'

interface AddJobModalProps {
  isOpen: boolean
  onClose: () => void
  editMode?: boolean
}

const AddJobModal = ({
  isOpen,
  onClose,
  editMode = false,
}: AddJobModalProps) => {
  const [isAiProcessing, setIsAiProcessing] = useState(false)
  const [companyLogo, setCompanyLogo] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [isDraggingLogo, setIsDraggingLogo] = useState(false)

  const form = useForm<AddJobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: addJobDefaultValues,
    mode: 'onChange',
  })

  const { register, setValue, watch, reset, formState } = form
  const { errors, isSubmitting, isValid } = formState

  const jobUrl = watch('jobUrl')
  const isUrlValid = useMemo(() => {
    if (!jobUrl?.trim()) return null
    return z.url().safeParse(jobUrl.trim()).success
  }, [jobUrl])

  const saveJobMutation = useMutation({
    mutationKey: ['jobs', editMode ? 'update' : 'create'],
    mutationFn: async (payload: AddJobFormValues) => {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return payload
    },
    onSuccess: () => {
      toast.success(editMode ? 'Application updated successfully.' : 'Application saved successfully.')
      reset(addJobDefaultValues)
      setCompanyLogo(null)
      setLogoFile(null)
      onClose()
    },
    onError: () => {
      toast.error('Failed to save application. Please try again.')
    },
  })

  const handleLogoUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB.')
      return
    }

    setLogoFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setCompanyLogo(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleLogoDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingLogo(false)

    const file = e.dataTransfer.files[0]
    if (file) handleLogoUpload(file)
  }

  const handleLogoFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleLogoUpload(file)
  }

  const handlePasteJobDescription = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setValue('jobDescription', text, { shouldDirty: true, shouldValidate: true })
      toast.success('Job description pasted.')
    } catch {
      toast.error('Clipboard access failed. Paste manually instead.')
    }
  }

  const handleAiAutoFill = () => {
    setIsAiProcessing(true)

    setTimeout(() => {
      const aiResult: Partial<AddJobFormValues> = {
        company: 'GCash',
        position: 'Senior Frontend Engineer',
        location: 'BGC, Taguig',
        salaryMin: '120000',
        salaryMax: '180000',
        requirements:
          '• 5+ years of React experience\n• Strong TypeScript skills\n• Experience with modern frontend tooling and API integration\n• Experience working with fintech or high-traffic platforms',
      }

      Object.entries(aiResult).forEach(([key, value]) => {
        setValue(key as keyof AddJobFormValues, value as string, {
          shouldDirty: true,
          shouldValidate: true,
        })
      })

      toast.success('AI autofill completed.')
      setIsAiProcessing(false)
    }, 1500)
  }

  const onSubmit = (values: AddJobFormValues) => {
    saveJobMutation.mutate(values)
  }

  useEffect(() => {
    if (!isOpen) {
      reset(addJobDefaultValues)
      setCompanyLogo(null)
      setLogoFile(null)
      setIsDraggingLogo(false)
      setIsAiProcessing(false)
    }
  }, [isOpen, reset])

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
          className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {editMode ? 'Edit Application' : 'Add New Application'}
              </h2>
              <p className="mt-1 text-sm text-slate-500">Track a new opportunity in your pipeline</p>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5 text-slate-400" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Form {...form}>
              <form id="add-job-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
              <div className="space-y-4 rounded-2xl border-2 border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">AI Assistant</h3>
                    <p className="text-xs text-slate-600">Let AI help you fill out the form automatically</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1" onClick={handlePasteJobDescription}>
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Job Details</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Company Name *</label>
                    <Input {...register('company')} placeholder="e.g. GCash, Globe Telecom, Maya" className="h-12" />
                    {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Company Logo</label>
                    <div
                      onDrop={handleLogoDrop}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDraggingLogo(true)
                      }}
                      onDragLeave={() => setIsDraggingLogo(false)}
                      className={`relative flex h-13 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-all ${
                        isDraggingLogo
                          ? 'border-blue-400 bg-blue-50'
                          : companyLogo
                            ? 'border-green-300 bg-green-50'
                            : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileInput}
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
                            <p className="truncate text-xs font-medium text-slate-700">{logoFile?.name || 'Logo loaded'}</p>
                          </div>
                          <Button
                            type="button"
                            size="icon-xs"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              setCompanyLogo(null)
                              setLogoFile(null)
                            }}
                          >
                            <X className="h-4 w-4 text-slate-500" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-500">
                          <Upload className="h-4 w-4" />
                          <span className="text-xs font-medium">{isDraggingLogo ? 'Drop logo here' : 'Upload or drag logo'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Position Title *</label>
                    <Input {...register('position')} placeholder="e.g. Senior Frontend Engineer" className="h-12" />
                    {errors.position && <p className="mt-1 text-xs text-red-600">{errors.position.message}</p>}
                  </div>

                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Job URL</label>
                    <div className="relative">
                      <Globe className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input
                        type="url"
                        {...register('jobUrl')}
                        placeholder="https://company.com/careers/job-id"
                        className="h-12 pr-12 pl-12"
                      />
                      {isUrlValid === true && (
                        <CheckCircle2 className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-green-600" />
                      )}
                      {isUrlValid === false && (
                        <AlertCircle className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-red-600" />
                      )}
                    </div>
                    {errors.jobUrl && <p className="mt-1 text-xs text-red-600">{errors.jobUrl.message}</p>}
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Location</label>
                    <Input {...register('location')} placeholder="e.g. BGC, Taguig / Makati" className="h-12" />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Job Type</label>
                    <Dropdown
                      options={['Full-time', 'Contract', 'Part-time', 'Internship']}
                      value={watch('jobType')}
                      onChange={(value) => setValue('jobType', value as AddJobFormValues['jobType'], { shouldValidate: true })}
                      placeholder="Select job type"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Work Mode</label>
                    <Dropdown
                      options={['Remote', 'Hybrid', 'On-site']}
                      value={watch('workMode')}
                      onChange={(value) => setValue('workMode', value as AddJobFormValues['workMode'], { shouldValidate: true })}
                      placeholder="Select work mode"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Salary Range</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input type="number" {...register('salaryMin')} placeholder="Min" className="h-12 pl-9" />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input type="number" {...register('salaryMax')} placeholder="Max" className="h-12 pl-9" />
                      </div>
                    </div>
                    {(errors.salaryMin || errors.salaryMax) && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.salaryMin?.message || errors.salaryMax?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Status & Timeline</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Current Status *</label>
                    <Dropdown
                      options={['Applied', 'Phone Screen', 'Technical', 'Onsite', 'Offer', 'Rejected']}
                      value={watch('status')}
                      onChange={(value) => setValue('status', value as AddJobFormValues['status'], { shouldValidate: true })}
                      placeholder="Select status"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Applied Date *</label>
                    <Input type="date" {...register('appliedDate')} className="h-12" />
                    {errors.appliedDate && <p className="mt-1 text-xs text-red-600">{errors.appliedDate.message}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Priority</label>
                    <Dropdown
                      options={['High', 'Medium', 'Low']}
                      value={watch('priority')}
                      onChange={(value) => setValue('priority', value as AddJobFormValues['priority'], { shouldValidate: true })}
                      placeholder="Select priority"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Source</label>
                    <Dropdown
                      options={['LinkedIn', 'Indeed', 'Company Website', 'Referral', 'Other']}
                      value={watch('source')}
                      onChange={(value) => setValue('source', value as AddJobFormValues['source'], { shouldValidate: true })}
                      placeholder="Select source"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                    <FileText className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Additional Information</h3>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Job Description</label>
                  <textarea
                    {...register('jobDescription')}
                    rows={6}
                    placeholder="Paste the full job description here..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Key Requirements</label>
                  <textarea
                    {...register('requirements')}
                    rows={4}
                    placeholder="• List key requirements&#10;• Technical skills needed&#10;• Years of experience"
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Application Notes</label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    placeholder="Add any notes about this application, interview prep, or follow-up tasks..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                    <User className="h-4 w-4 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Contact Information</h3>
                  <span className="ml-auto text-xs text-slate-500">(Optional)</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Recruiter Name</label>
                    <Input {...register('recruiterName')} placeholder="e.g. Juan Dela Cruz" className="h-12" />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Recruiter Email</label>
                    <Input type="email" {...register('recruiterEmail')} placeholder="maria@company.ph" className="h-12" />
                    {errors.recruiterEmail && <p className="mt-1 text-xs text-red-600">{errors.recruiterEmail.message}</p>}
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Recruiter Phone</label>
                    <Input type="tel" {...register('recruiterPhone')} placeholder="+63 917 123 4567" className="h-12" />
                  </div>
                </div>
              </div>
              </form>
            </Form>
          </div>

          <div className="sticky bottom-0 flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
            <p className="text-xs text-slate-500">
              <span className="text-red-500">*</span> Required fields
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset(addJobDefaultValues)
                  setCompanyLogo(null)
                  setLogoFile(null)
                  setIsDraggingLogo(false)
                  setIsAiProcessing(false)
                  toast.success('Form reset.')
                }}
              >
                Reset
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="add-job-form"
                disabled={isSubmitting || saveJobMutation.isPending || !isValid}
              >
                {(isSubmitting || saveJobMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editMode ? 'Save Changes' : 'Save Application'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default AddJobModal
