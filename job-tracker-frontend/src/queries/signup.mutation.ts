import { useMutation } from '@tanstack/react-query'
import { signUpApi } from '@/api/auth.api'
import { queryKeys } from './queryKeys'
import type { SignUpFormValues, SignUpPayload } from '@/validations/auth.validation'
import { toast } from 'sonner'
import axios from 'axios'

const toPayload = (values: SignUpFormValues): SignUpPayload => {
  const { full_name, email, password, employment_status, current_job } = values

  return {
    full_name,
    email,
    password,
    current_job: employment_status === 'employed' ? current_job?.trim() : undefined,
  }
}

export const useSignUpMutation = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: queryKeys.auth.signup,
    mutationFn: (values: SignUpFormValues) => signUpApi(toPayload(values)),
    onSuccess,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || 'Signup failed.'
        toast.error(message)
        return
      }
      toast.error('Signup failed.')
    },
  })
}
