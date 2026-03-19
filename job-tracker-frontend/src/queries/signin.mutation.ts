import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

import { signInApi } from '@/api/auth.api'
import { queryKeys } from './queryKeys'
import type { SignInFormValues, SignInPayload } from '@/validations/auth.validation'

const toPayload = (values: SignInFormValues): SignInPayload => {
  const { email, password } = values
  return { email, password }
}

export const useSignInMutation = (onSuccess?: (data: unknown) => void) => {
  return useMutation({
    mutationKey: queryKeys.auth.signin,
    mutationFn: (values: SignInFormValues) => signInApi(toPayload(values)),
    onSuccess,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || 'Signin failed.'
        toast.error(message)
        return
      }
      toast.error('Signin failed.')
    },
  })
}
