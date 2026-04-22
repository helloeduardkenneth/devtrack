import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import LoginPage from '@/pages/public/LoginPage'

const mutateMock = vi.fn()

vi.mock('@/queries/auth/signin.mutation', () => ({
    useSignInMutation: () => ({
        mutate: mutateMock,
        isPending: false,
    }),
}))

vi.mock('@/contexts/AuthContext', () => ({
    useAuth: () => ({ login: vi.fn() }),
}))

vi.mock('sonner', () => ({
    toast: { success: vi.fn(), error: vi.fn() },
    Toaster: () => null,
}))

describe('LoginPage', () => {
    it('submits valid form data', async () => {
        const user = userEvent.setup()

        render(
            <LoginPage
                onLogin={vi.fn()}
                onBackToLanding={vi.fn()}
                onSwitchToSignUp={vi.fn()}
            />,
        )

        await user.type(
            screen.getByPlaceholderText(/alex@example.com/i),
            'alex@example.com',
        )
        await user.type(
            screen.getByPlaceholderText(/••••••••/i),
            'Password123!',
        )

        await user.click(screen.getByRole('button', { name: /sign in/i }))

        expect(mutateMock).toHaveBeenCalledWith({
            email: 'alex@example.com',
            password: 'Password123!',
        })
    })

    it('shows validation error for empty password', async () => {
        const user = userEvent.setup()

        render(<LoginPage onLogin={vi.fn()} />)

        await user.type(
            screen.getByPlaceholderText(/alex@example.com/i),
            'alex@example.com',
        )

        await user.click(screen.getByRole('button', { name: /sign in/i }))

        expect(
            await screen.findByText(/password is required/i),
        ).toBeInTheDocument()
    })
})
