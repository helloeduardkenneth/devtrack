import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getUserProfileApi } from '@/api/auth.api'
import { useGetUserProfile } from '../profile.queries'

vi.mock('@/api/auth.api', () => ({
  getUserProfileApi: vi.fn(),
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useGetUserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns user profile data on success', async () => {
    const mockedGetUserProfileApi = vi.mocked(getUserProfileApi)

    mockedGetUserProfileApi.mockResolvedValueOnce({
      data: {
        id: 1,
        email: 'alex@example.com',
        full_name: 'Alex Doe',
        current_job: 'Frontend Developer',
      },
    } as Awaited<ReturnType<typeof getUserProfileApi>>)

    const { result } = renderHook(() => useGetUserProfile(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(getUserProfileApi).toHaveBeenCalledTimes(1)
    expect(result.current.data).toEqual({
      id: 1,
      email: 'alex@example.com',
      full_name: 'Alex Doe',
      current_job: 'Frontend Developer',
    })
  })

  it('returns error state when request fails', async () => {
    const mockedGetUserProfileApi = vi.mocked(getUserProfileApi)
    mockedGetUserProfileApi.mockRejectedValueOnce(new Error('Unauthorized'))

    const { result } = renderHook(() => useGetUserProfile(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(getUserProfileApi).toHaveBeenCalledTimes(1)
  })
})
