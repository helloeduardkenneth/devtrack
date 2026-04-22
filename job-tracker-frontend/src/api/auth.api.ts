import api from './axios'
import type {
    SignInPayload,
    SignUpPayload,
} from '@/validations/auth.validation'

export const signUpApi = (payload: SignUpPayload) => {
    return api.post('/auth/signup', payload)
}

export const signInApi = (payload: SignInPayload) => {
    return api.post('/auth/signin', payload)
}

export const getUserProfileApi = () => {
    return api.get('/auth/profile')
}
