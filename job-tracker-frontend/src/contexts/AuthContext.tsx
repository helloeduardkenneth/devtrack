import { createContext, useContext, useMemo, useState } from 'react'

import { clearAuthToken, getAuthToken, setAuthToken } from '@/helpers/auth'

interface AuthContextValue {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => getAuthToken())

  const login = (newToken: string) => {
    setAuthToken(newToken)
    setToken(newToken)
  }

  const logout = () => {
    clearAuthToken()
    setToken(null)
  }

  const value = useMemo(
    () => ({ token, isAuthenticated: Boolean(token), login, logout }),
    [token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
