import { Dropdown } from '@/components/shared/Dropdown'
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
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Upload,
  User,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState } from 'react'

interface AddJobModalProps {
  isOpen: boolean
  onClose: () => void
  editMode?: boolean
}

const AddJobModal: React.FC<AddJobModalProps> = ({
  isOpen,
  onClose,
  editMode = false,
}) => {
  const [isAiProcessing, setIsAiProcessing] = useState(false)
  const [jobUrl, setJobUrl] = useState('')
  const [isUrlValid, setIsUrlValid] = useState<boolean | null>(null)
  const [companyLogo, setCompanyLogo] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [isDraggingLogo, setIsDraggingLogo] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    jobUrl: '',
    location: '',
    jobType: 'Full-time',
    workMode: 'Remote',
    salaryMin: '',
    salaryMax: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    source: 'LinkedIn',
    jobDescription: '',
    requirements: '',
    notes: '',
    recruiterName: '',
    recruiterEmail: '',
    recruiterPhone: '',
  })

  const handleLogoUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB')
        return
      }

      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCompanyLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingLogo(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleLogoUpload(file)
    }
  }

  const handleLogoFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleLogoUpload(file)
    }
  }

  const handleUrlChange = (value: string) => {
    setJobUrl(value)
    setFormData({ ...formData, jobUrl: value })

    // Simple URL validation
    try {
      new URL(value)
      setIsUrlValid(true)
    } catch {
      setIsUrlValid(value.length > 0 ? false : null)
    }
  }

  const handlePasteJobDescription = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setFormData({ ...formData, jobDescription: text })
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  const handleAiAutoFill = () => {
    setIsAiProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      setFormData({
        ...formData,
        company: 'GCash',
        position: 'Senior Frontend Engineer',
        location: 'BGC, Taguig',
        salaryMin: '120000',
        salaryMax: '180000',
        requirements:
          '• 5+ years of React experience\n• Strong TypeScript skills\n• Experience with modern frontend tooling and API integration\n• Experience working with fintech or high-traffic platforms',
      })
      setIsAiProcessing(false)
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {editMode ? 'Edit Application' : 'Add New Application'}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Track a new opportunity in your pipeline
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 transition-colors hover:bg-slate-100"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>

          {/* Form Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-8 p-6">
              {/* AI Assistant Section - Highlighted */}
              <div className="space-y-4 rounded-2xl border-2 border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">AI Assistant</h3>
                    <p className="text-xs text-slate-600">
                      Let AI help you fill out the form automatically
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handlePasteJobDescription}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-blue-200 bg-white px-4 py-3 font-medium text-slate-700 shadow-sm transition-all hover:bg-blue-50"
                  >
                    <ClipboardPaste className="h-4 w-4" />
                    Paste Job Description
                  </button>

                  <button
                    type="button"
                    onClick={handleAiAutoFill}
                    disabled={isAiProcessing}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-3 font-medium text-white shadow-lg shadow-blue-600/30 transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                  </button>
                </div>

                {isAiProcessing && (
                  <div className="rounded-lg border border-blue-200 bg-white/80 p-3">
                    <p className="flex items-center gap-2 text-xs text-slate-600">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      AI is parsing the job description and extracting relevant
                      information...
                    </p>
                  </div>
                )}
              </div>

              {/* SECTION 1 - JOB DETAILS */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Job Details</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="e.g. GCash, Globe Telecom, Maya"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </div>
                  </div>

                  {/* Company Logo Upload */}
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
                            <p className="truncate text-xs font-medium text-slate-700">
                              {logoFile?.name || 'Logo loaded'}
                            </p>
                            <p className="text-[10px] text-green-600">Ready to upload</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setCompanyLogo(null)
                              setLogoFile(null)
                            }}
                            className="rounded p-1 transition-colors hover:bg-slate-200"
                          >
                            <X className="h-4 w-4 text-slate-500" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-500">
                          <Upload className="h-4 w-4" />
                          <span className="text-xs font-medium">
                            {isDraggingLogo ? 'Drop logo here' : 'Upload or drag logo'}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="mt-1.5 text-[10px] text-slate-500">
                      PNG, JPG or SVG. Max 2MB. Auto-fetches on company name entry.
                    </p>
                  </div>

                  {/* Position Title */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Position Title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) =>
                          setFormData({ ...formData, position: e.target.value })
                        }
                        placeholder="e.g. Senior Frontend Engineer"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </div>
                  </div>

                  {/* Job URL */}
                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Job URL
                    </label>
                    <div className="relative">
                      <Globe className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="url"
                        value={jobUrl}
                        onChange={(e) => handleUrlChange(e.target.value)}
                        placeholder="https://company.com/careers/job-id"
                        className={`w-full rounded-xl border bg-white py-3 pr-12 pl-12 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 ${
                          isUrlValid === true
                            ? 'border-green-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10'
                            : isUrlValid === false
                              ? 'border-red-300 focus:border-red-600 focus:ring-4 focus:ring-red-600/10'
                              : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10'
                        }`}
                      />
                      {isUrlValid === true && (
                        <CheckCircle2 className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-green-600" />
                      )}
                      {isUrlValid === false && (
                        <AlertCircle className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-red-600" />
                      )}
                    </div>
                    {isUrlValid === false && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        Please enter a valid URL
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="e.g. BGC, Taguig / Makati"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </div>
                  </div>

                  {/* Job Type */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Job Type
                    </label>
                    <Dropdown
                      options={['Full-time', 'Contract', 'Part-time', 'Internship']}
                      value={formData.jobType}
                      onChange={(value) => setFormData({ ...formData, jobType: value })}
                      placeholder="Select job type"
                    />
                  </div>

                  {/* Work Mode */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Work Mode
                    </label>
                    <Dropdown
                      options={['Remote', 'Hybrid', 'On-site']}
                      value={formData.workMode}
                      onChange={(value) => setFormData({ ...formData, workMode: value })}
                      placeholder="Select work mode"
                    />
                  </div>

                  {/* Salary Range */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Salary Range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="number"
                          value={formData.salaryMin}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              salaryMin: e.target.value,
                            })
                          }
                          placeholder="Min"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-3 pl-9 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="number"
                          value={formData.salaryMax}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              salaryMax: e.target.value,
                            })
                          }
                          placeholder="Max"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-3 pl-9 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2 - STATUS & DATES */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Status & Timeline</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Current Status */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Current Status <span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      options={[
                        'Applied',
                        'Phone Screen',
                        'Technical',
                        'Onsite',
                        'Offer',
                        'Rejected',
                      ]}
                      value={formData.status}
                      onChange={(value) => setFormData({ ...formData, status: value })}
                      placeholder="Select status"
                    />
                  </div>

                  {/* Applied Date */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Applied Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="date"
                        value={formData.appliedDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            appliedDate: e.target.value,
                          })
                        }
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Priority
                    </label>
                    <Dropdown
                      options={['High', 'Medium', 'Low']}
                      value={formData.priority}
                      onChange={(value) => setFormData({ ...formData, priority: value })}
                      placeholder="Select priority"
                    />
                  </div>

                  {/* Source */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Source
                    </label>
                    <Dropdown
                      options={[
                        'LinkedIn',
                        'Indeed',
                        'Company Website',
                        'Referral',
                        'Other',
                      ]}
                      value={formData.source}
                      onChange={(value) => setFormData({ ...formData, source: value })}
                      placeholder="Select source"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3 - ADDITIONAL INFO */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                    <FileText className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Additional Information</h3>
                </div>

                {/* Job Description */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Job Description
                  </label>
                  <textarea
                    value={formData.jobDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jobDescription: e.target.value,
                      })
                    }
                    rows={6}
                    placeholder="Paste the full job description here..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Key Requirements
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({ ...formData, requirements: e.target.value })
                    }
                    rows={4}
                    placeholder="• List key requirements&#10;• Technical skills needed&#10;• Years of experience"
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>

                {/* Application Notes */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Application Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    placeholder="Add any notes about this application, interview prep, or follow-up tasks..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                  />
                </div>
              </div>

              {/* SECTION 4 - CONTACT INFO */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                    <User className="h-4 w-4 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Contact Information</h3>
                  <span className="ml-auto text-xs text-slate-500">(Optional)</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Recruiter Name */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Recruiter Name
                    </label>
                    <div className="relative">
                      <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.recruiterName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            recruiterName: e.target.value,
                          })
                        }
                        placeholder="e.g. Juan Dela Cruz"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </div>
                  </div>

                  {/* Recruiter Email */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Recruiter Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={formData.recruiterEmail}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            recruiterEmail: e.target.value,
                          })
                        }
                        placeholder="maria@company.ph"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </div>
                  </div>

                  {/* Recruiter Phone */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Recruiter Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={formData.recruiterPhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            recruiterPhone: e.target.value,
                          })
                        }
                        placeholder="+63 917 123 4567"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Footer - Sticky */}
          <div className="sticky bottom-0 flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
            <p className="text-xs text-slate-500">
              <span className="text-red-500">*</span> Required fields
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
              >
                {editMode ? 'Save Changes' : 'Save Application'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default AddJobModal