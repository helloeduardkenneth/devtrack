import { zodResolver } from '@hookform/resolvers/zod'
import {
    type ChangeEvent,
    type DragEvent,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ADD_JOB_DEFAULT_VALUES } from '@/constants/add-job-default-values.constants'
import {
    useCreateApplicationMutation,
    useUpdateApplicationMutation,
} from '@/queries/applications/applications.mutation'
import type { AddJobFormValues } from '@/validations/job.validation'
import { AddJobSchema } from '@/validations/job.validation'

type UseAddJobModalParams = {
    isOpen: boolean
    onClose: () => void
    editMode?: boolean
    initialData?: Partial<AddJobFormValues> & { id: number }
    defaultStatus?: string
}

export const useAddJobModal = ({
    isOpen,
    onClose,
    editMode = false,
    initialData,
    defaultStatus,
}: UseAddJobModalParams) => {
    const [isAiProcessing, setIsAiProcessing] = useState(false)
    const [companyLogo, setCompanyLogo] = useState<string | null>(null)
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [isDraggingLogo, setIsDraggingLogo] = useState(false)

    const form = useForm<AddJobFormValues>({
        resolver: zodResolver(AddJobSchema),
        defaultValues: ADD_JOB_DEFAULT_VALUES,
        mode: 'onChange',
    })

    const { setValue, watch, reset, formState, control } = form
    const { isSubmitting, isValid } = formState

    const jobUrl = watch('jobUrl')
    const jobType = watch('jobType')
    const workMode = watch('workMode')
    const status = watch('status')
    const priority = watch('priority')
    const source = watch('source')

    const isUrlValid = useMemo(() => {
        if (!jobUrl?.trim()) return null
        return z.url().safeParse(jobUrl.trim()).success
    }, [jobUrl])

    const saveJobMutation = useCreateApplicationMutation(() => {
        reset(ADD_JOB_DEFAULT_VALUES)
        setCompanyLogo(null)
        setLogoFile(null)
        onClose()
    })

    const updateJobMutation = useUpdateApplicationMutation(() => {
        reset(ADD_JOB_DEFAULT_VALUES)
        setCompanyLogo(null)
        setLogoFile(null)
        onClose()
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
        setValue('companyLogoFilename', file.name, {
            shouldDirty: true,
            shouldValidate: true,
        })
        const reader = new FileReader()
        reader.onloadend = () => {
            setCompanyLogo(reader.result as string)
            setValue('companyLogoUrl', reader.result as string, {
                shouldDirty: true,
                shouldValidate: true,
            })
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
            setValue('jobDescription', text, {
                shouldDirty: true,
                shouldValidate: true,
            })
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
                salaryMin: 120000,
                salaryMax: 180000,
                requirements:
                    '• 5+ years of React experience\n• Strong TypeScript skills\n• Experience with modern frontend tooling and API integration\n• Experience working with fintech or high-traffic platforms',
            }

            Object.entries(aiResult).forEach(([key, value]) => {
                setValue(
                    key as keyof AddJobFormValues,
                    value as AddJobFormValues[keyof AddJobFormValues],
                    {
                        shouldDirty: true,
                        shouldValidate: true,
                    },
                )
            })

            toast.success('AI autofill completed.')
            setIsAiProcessing(false)
        }, 1500)
    }

    useEffect(() => {
        if (!isOpen) return

        if (editMode && initialData) {
            reset({ ...ADD_JOB_DEFAULT_VALUES, ...initialData })
            setCompanyLogo(initialData.companyLogoUrl ?? null)
            setLogoFile(null)
        } else {
            reset(ADD_JOB_DEFAULT_VALUES)
            setCompanyLogo(null)
            setLogoFile(null)
            // Set default status if provided (for quick-add from Kanban)
            if (defaultStatus) {
                setValue('status', defaultStatus, {
                    shouldDirty: false,
                    shouldValidate: true,
                })
            }
        }
    }, [isOpen, editMode, initialData, reset, defaultStatus, setValue])

    const onSubmit = (values: AddJobFormValues) => {
        if (editMode && initialData?.id) {
            updateJobMutation.mutate({ id: initialData.id, payload: values })
            return
        }

        saveJobMutation.mutate(values)
    }

    const resetForm = () => {
        reset(ADD_JOB_DEFAULT_VALUES)
        setCompanyLogo(null)
        setLogoFile(null)
        setValue('companyLogoUrl', undefined, {
            shouldDirty: true,
            shouldValidate: true,
        })
        setValue('companyLogoFilename', undefined, {
            shouldDirty: true,
            shouldValidate: true,
        })
        setIsDraggingLogo(false)
        setIsAiProcessing(false)
    }

    const handleResetForm = () => {
        resetForm()
        toast.success('Form reset.')
    }

    useEffect(() => {
        if (!isOpen) {
            resetForm()
        }
    }, [isOpen])

    return {
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
    }
}
