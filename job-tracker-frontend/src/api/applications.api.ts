import type { AddJobPayload } from '@/validations/job.validation'
import api from './axios'

export const createApplication = (payload: AddJobPayload) => {
    return api.post('/applications', payload)
}

export const getListApplications = () => {
    return api.get('/applications')
}

export const updateApplicationById = (
    id: number,
    payload: Partial<AddJobPayload>,
) => {
    return api.patch(`/applications/${id}`, payload)
}

export const deleteApplicationById = (id: number) => {
    return api.delete(`/applications/${id}`)
}

export const bulkUpdateStatus = (ids: number[], status: string) => {
    return api.patch('/applications/bulk/status', { ids, status })
}

export const bulkDelete = (ids: number[]) => {
    return api.post('/applications/bulk/delete', { ids })
}
