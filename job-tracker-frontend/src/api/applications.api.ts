import type { AddJobPayload } from '@/validations/job.validation'
import api from './axios'

export const createApplication = (payload: AddJobPayload) => {
  return api.post('/applications', payload)
}

export const getListApplications = () => {
  return api.get('/applications')
}

export const updateApplicationById = (id: number, payload: Partial<AddJobPayload>) => {
  return api.patch(`/applications/${id}`, payload)
}

export const deleteApplicationById = (id: number) => {
  return api.delete(`/applications/${id}`)
}
