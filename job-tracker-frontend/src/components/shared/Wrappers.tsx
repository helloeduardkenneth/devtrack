import { useNavigate } from 'react-router-dom'

import { LandingPage } from '@/pages/public/LandingPage'
import LoginPage from '@/pages/public/LoginPage'
import { ForgotPassword } from '@/pages/public/ForgotPassword'
import SignUpPage from '@/pages/public/SignUpPage'

export function LandingPageWrapper() {
    const navigate = useNavigate()

    const handleStart = () => {
        navigate('/signup')
    }

    return <LandingPage onStart={handleStart} />
}

export function LoginPageWrapper() {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/dashboard')
    }

    const handleBackToLanding = () => {
        navigate('/')
    }

    const handleSwitchToSignUp = () => {
        navigate('/signup')
    }

    const handleForgotPassword = () => {
        navigate('/forgot-password')
    }

    return (
        <LoginPage
            onLogin={handleLogin}
            onBackToLanding={handleBackToLanding}
            onSwitchToSignUp={handleSwitchToSignUp}
            onForgotPassword={handleForgotPassword}
        />
    )
}

export function ForgotPasswordWrapper() {
    const navigate = useNavigate()

    const handleBackToLogin = () => {
        navigate('/login')
    }

    return <ForgotPassword onBackToLogin={handleBackToLogin} />
}

export function SignUpPageWrapper() {
    const navigate = useNavigate()

    const handleSignUp = () => {
        navigate('/dashboard')
    }

    const handleBackToLanding = () => {
        navigate('/')
    }

    const handleSwitchToLogin = () => {
        navigate('/login')
    }

    return (
        <SignUpPage
            onSignUp={handleSignUp}
            onBackToLanding={handleBackToLanding}
            onSwitchToLogin={handleSwitchToLogin}
        />
    )
}
