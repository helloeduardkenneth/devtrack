import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

import {
    bulkDelete,
    bulkUpdateStatus,
    createApplication,
    deleteApplicationById,
    updateApplicationById,
} from '@/api/applications.api'
import { queryKeys } from '@/queries/queryKeys'
import type { AddJobPayload } from '@/validations/job.validation'

export const useCreateApplicationMutation = (onSuccess?: () => void) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: queryKeys.applications.create,
        mutationFn: (payload: AddJobPayload) => createApplication(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.applications.list,
            })
            toast.success('Application saved successfully.')
            onSuccess?.()
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.error || 'Failed to save application.'
                toast.error(message)
                return
            }

            toast.error('Failed to save application.')
        },
    })
}

export const useUpdateApplicationMutation = (onSuccess?: () => void) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: queryKeys.applications.update,
        mutationFn: ({
            id,
            payload,
        }: {
            id: number
            payload: Partial<AddJobPayload>
        }) => updateApplicationById(id, payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.applications.list,
            })
            toast.success('Application updated successfully.')
            onSuccess?.()
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.error ||
                    'Failed to update application.'
                toast.error(message)
                return
            }

            toast.error('Failed to update application.')
        },
    })
}

export const useDeleteApplicationMutation = (onSuccess?: () => void) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: queryKeys.applications.delete,
        mutationFn: (id: number) => deleteApplicationById(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.applications.list,
            })
            toast.success('Application deleted successfully.')
            onSuccess?.()
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.error ||
                    'Failed to delete application.'
                toast.error(message)
                return
            }

            toast.error('Failed to delete application.')
        },
    })
}

export const useBulkUpdateStatusMutation = (onSuccess?: () => void) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: queryKeys.applications.bulkUpdateStatus,
        mutationFn: ({ ids, status }: { ids: number[]; status: string }) =>
            bulkUpdateStatus(ids, status),
        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.applications.list,
            })
            toast.success(
                response.data.message || 'Applications updated successfully.',
            )
            onSuccess?.()
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.error ||
                    'Failed to update applications.'
                toast.error(message)
                return
            }

            toast.error('Failed to update applications.')
        },
    })
}

export const useBulkDeleteMutation = (onSuccess?: () => void) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: queryKeys.applications.bulkDelete,
        mutationFn: (ids: number[]) => bulkDelete(ids),
        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.applications.list,
            })
            toast.success(
                response.data.message || 'Applications deleted successfully.',
            )
            onSuccess?.()
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    'Failed to delete applications.'
                toast.error(message)
                return
            }

            toast.error('Failed to delete applications.')
        },
    })
}

export const useUpdateApplicationStatusMutation = (
    onSuccess?: () => void,
    onError?: (error: string) => void,
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: queryKeys.applications.update,
        mutationFn: ({
            id,
            status,
        }: {
            id: number
            status: AddJobPayload['status']
        }) => updateApplicationById(id, { status }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.applications.list,
            })
            toast.success('Status updated successfully.')
            onSuccess?.()
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.error || 'Failed to update status.'
                toast.error(message)
                onError?.(message)
                return
            }

            toast.error('Failed to update status.')
            onError?.('Failed to update status.')
        },
    })
}
