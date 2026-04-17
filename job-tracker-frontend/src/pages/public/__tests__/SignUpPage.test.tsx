import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import SignUpPage from '../SignUpPage'

const mutateMock = vi.fn()

vi.mock('@/queries/auth/signup.mutation', () => ({
  useSignUpMutation: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
  Toaster: () => null,
}))

describe('SignUpPage', () => {
  it('submits valid form data', async () => {
    const user = userEvent.setup()

    render(
      <SignUpPage
        onSignUp={vi.fn()}
        onBackToLanding={vi.fn()}
        onSwitchToLogin={vi.fn()}
      />,
    )

    await user.type(screen.getByPlaceholderText(/alex martinez/i), 'Alex Martinez')
    await user.type(screen.getByPlaceholderText(/alex@example.com/i), 'alex@example.com')
    await user.type(screen.getAllByPlaceholderText(/••••••••/i)[0], 'Password123!')
    await user.type(screen.getAllByPlaceholderText(/••••••••/i)[1], 'Password123!')
    await user.click(screen.getByLabelText(/terms/i))

    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(mutateMock).toHaveBeenCalledWith({
      full_name: 'Alex Martinez',
      email: 'alex@example.com',
      employment_status: 'unemployed',
      current_job: '',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeTerms: true,
    })
  })

  it('shows validation error when terms are not accepted', async () => {
    const user = userEvent.setup()

    render(<SignUpPage onSignUp={vi.fn()} />)

    await user.type(screen.getByPlaceholderText(/alex martinez/i), 'Alex Martinez')
    await user.type(screen.getByPlaceholderText(/alex@example.com/i), 'alex@example.com')
    await user.type(screen.getAllByPlaceholderText(/••••••••/i)[0], 'Password123!')
    await user.type(screen.getAllByPlaceholderText(/••••••••/i)[1], 'Password123!')

    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(
      await screen.findByText(/you must agree to the terms/i),
    ).toBeInTheDocument()
  })
})
