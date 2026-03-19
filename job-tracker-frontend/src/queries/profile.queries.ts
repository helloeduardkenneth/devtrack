import { useQuery } from '@tanstack/react-query'

import { getUserProfileApi } from '@/api/auth.api'
import { queryKeys } from './queryKeys'

export interface IUserProfile {
  id: number
  email: string
  full_name: string | null
  current_job: string
}

export const useGetUserProfile = () => {
  return useQuery<IUserProfile>({
    queryKey: queryKeys.auth.profile,
    queryFn: async () => {
      const response = await getUserProfileApi()
      return response.data
    },
  })
}
