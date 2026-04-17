import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

import { createApplication, deleteApplicationById, updateApplicationById } from '@/api/applications.api'
import { queryKeys } from '@/queries/queryKeys'
import type { AddJobPayload } from '@/validations/job.validation'

export const useCreateApplicationMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: queryKeys.applications.create,
    mutationFn: (payload: AddJobPayload) => createApplication(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.applications.list })
      toast.success('Application saved successfully.')
      onSuccess?.()
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || 'Failed to save application.'
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
    mutationFn: ({ id, payload }: { id: number; payload: Partial<AddJobPayload> }) =>
      updateApplicationById(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.applications.list })
      toast.success('Application updated successfully.')
      onSuccess?.()
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || 'Failed to update application.'
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
      await queryClient.invalidateQueries({ queryKey: queryKeys.applications.list })
      toast.success('Application deleted successfully.')
      onSuccess?.()
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || 'Failed to delete application.'
        toast.error(message)
        return
      }

      toast.error('Failed to delete application.')
    },
  })
}
