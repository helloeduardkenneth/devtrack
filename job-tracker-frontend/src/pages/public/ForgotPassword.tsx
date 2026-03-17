import React, { useEffect, useState } from 'react'
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  KeyRound,
  Shield,
  Info,
  ArrowRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import devtrackLogo from '@/assets/devtrack_logo.png'

type PasswordResetStep = 'email' | 'sent' | 'success'

interface ForgotPasswordProps {
  onBackToLogin: () => void
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
  const [step, setStep] = useState<PasswordResetStep>('email')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (step === 'sent' && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (resendTimer === 0) {
      setCanResend(true)
    }
  }, [step, resendTimer])

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setStep('sent')
      setResendTimer(60)
      setCanResend(false)
    }, 1500)
  }

  const handleResendEmail = () => {
    if (!canResend) return
    setResendTimer(60)
    setCanResend(false)
    // Simulate resend
    console.log('Resending email...')
  }

  const handleOpenEmailApp = () => {
    // Try to open default email app
    window.location.href = 'mailto:'
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-6">
      <div className="w-full max-w-120">
        <AnimatePresence mode="wait">
          {step === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={onBackToLogin}
                className="group mb-8 flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to login
              </button>

              <div className="rounded-2xl bg-white p-12 shadow-xl">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                    <KeyRound className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <h1 className="mb-4 text-center text-[32px] font-bold text-[#1E293B]">
                  Forgot your password?
                </h1>

                <p className="mx-auto mb-8 max-w-100 text-center text-base leading-relaxed text-[#64748B]">
                  No worries! Enter your email address and we&apos;ll send you
                  instructions to reset your password.
                </p>

                <form onSubmit={handleSubmitEmail} className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pr-4 pl-12 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm font-medium text-slate-600">
                  Remember your password?{' '}
                  <button
                    onClick={onBackToLogin}
                    className="font-medium text-blue-600 transition-colors hover:text-[#2563EB]"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {step === 'sent' && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 flex items-center gap-2">
                <img
                  src={devtrackLogo}
                  alt="DevTrack logo"
                  className="h-8 w-8 rounded-lg bg-white object-contain p-1 shadow-sm"
                />
                <span className="text-xl font-bold text-slate-900">DevTrack</span>
              </div>

              <div className="rounded-2xl bg-white p-12 shadow-xl">
                <div className="mb-6 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-50"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-blue-100 opacity-30"
                    />
                    <CheckCircle className="relative z-10 h-10 w-10 text-blue-600" />
                  </motion.div>
                </div>

                <h1 className="mb-4 text-center text-[32px] font-bold text-[#1E293B]">
                  Check your email
                </h1>

                <p className="mb-4 text-center text-base text-[#64748B]">
                  We&apos;ve sent password reset instructions to:
                </p>

                <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-center text-lg font-bold text-slate-900">{email}</p>
                </div>

                <div className="mb-8 rounded-xl border border-blue-500/20 bg-[#EFF6FF] p-4">
                  <div className="flex gap-3">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <p className="text-sm text-slate-700">
                      Didn&apos;t receive the email? Check your spam folder or click below
                      to resend.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleOpenEmailApp}
                    className="h-12 w-full rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-[#2563EB]"
                  >
                    Open Email App
                  </button>

                  <button
                    onClick={handleResendEmail}
                    disabled={!canResend}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white font-bold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {canResend ? 'Resend Email' : `Resend available in ${resendTimer}s`}
                  </button>
                </div>

                <button
                  onClick={onBackToLogin}
                  className="mt-6 flex w-full items-center justify-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 flex items-center gap-2">
                <img
                  src={devtrackLogo}
                  alt="DevTrack logo"
                  className="h-8 w-8 rounded-lg bg-white object-contain p-1 shadow-sm"
                />
                <span className="text-xl font-bold text-slate-900">DevTrack</span>
              </div>

              <div className="rounded-2xl bg-white p-12 shadow-xl">
                <div className="mb-6 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="relative"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-50"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-green-100 opacity-20"
                      />
                      <Shield className="relative z-10 h-10 w-10 text-[#10B981]" />
                      <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981]">
                        <CheckCircle className="h-4 w-4 text-white" fill="currentColor" />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                <h1 className="mb-4 text-center text-[32px] font-bold text-[#1E293B]">
                  Password reset successful!
                </h1>

                <p className="mx-auto mb-8 max-w-100 text-center text-base leading-relaxed text-[#64748B]">
                  Your password has been successfully reset. You can now sign in with your
                  new password.
                </p>

                <div className="mb-8 rounded-xl border border-green-500/20 bg-[#ECFDF5] p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-[#10B981]" />
                    <p className="text-sm font-medium text-slate-700">
                      Your account is secure and ready to use
                    </p>
                  </div>
                </div>

                <button
                  onClick={onBackToLogin}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-[#2563EB]"
                >
                  Continue to Sign In
                  <ArrowRight className="h-5 w-5" />
                </button>

                <p className="mt-6 text-center text-sm text-slate-500">
                  Need help?{' '}
                  <button className="font-medium text-slate-700 transition-colors hover:text-slate-900">
                    Contact support
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
          <p className="mb-3 text-center text-xs font-bold tracking-wide text-slate-500 uppercase">
            Demo Controls
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setStep('email')}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                step === 'email'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              1. Email Input
            </button>
            <button
              onClick={() => setStep('sent')}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                step === 'sent'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              2. Email Sent
            </button>
            <button
              onClick={() => setStep('success')}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                step === 'success'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              3. Success
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
