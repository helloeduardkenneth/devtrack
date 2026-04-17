import { zodResolver } from '@hookform/resolvers/zod'
import { Chrome, Eye, EyeOff, Github } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import devtrackLogo from '@/assets/devtrack_logo.png'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { useSignInMutation } from '@/queries/auth/signin.mutation'
import { signInSchema, type SignInFormValues } from '@/validations/auth.validation'

interface LoginProps {
  onLogin: () => void
  onBackToLanding?: () => void
  onSwitchToSignUp?: () => void
  onForgotPassword?: () => void
}

const LoginPage = ({
  onLogin,
  onBackToLanding,
  onSwitchToSignUp,
  onForgotPassword,
}: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const { login } = useAuth()

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  })

  const signInMutation = useSignInMutation((data) => {
    const token = (data as { data?: { token?: string } })?.data?.token
    if (token) {
      login(token)
    }
    toast.success('Signed in successfully!')
    onLogin()
  })

  const handleSubmit = (values: SignInFormValues) => {
    signInMutation.mutate(values)
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="relative hidden overflow-hidden bg-blue-600 lg:flex lg:w-1/2">
        <div className="absolute inset-0 z-0 opacity-40">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764821047387-6d81692f2c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJsdWUlMjBncmFkaWVudCUyMGJhY2tncm91bmQlMjB0ZWNofGVufDF8fHx8MTc3MDk0NjE4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-linear-to-br from-blue-600/90 to-blue-800/90" />

        <div className="relative z-20 flex h-full w-full flex-col justify-between p-16">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-3 self-start transition-opacity hover:opacity-80"
          >
            <img
              src={devtrackLogo}
              alt="DevTrack logo"
              className="h-10 w-10 rounded-xl bg-white object-contain p-1.5 shadow-xl"
            />
            <span className="text-2xl font-bold tracking-tight text-white">DevTrack</span>
          </button>

          <div className="max-w-md">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-5xl leading-tight font-extrabold text-white"
            >
              Track your job applications with confidence.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-medium text-blue-100"
            >
              The unified workspace for developers to manage their career growth and job
              hunt pipeline.
            </motion.p>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-blue-100/60">
            <span>© 2026 DevTrack</span>
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-8 lg:w-1/2 lg:p-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-105"
        >
          <button
            onClick={onBackToLanding}
            className="mb-10 flex items-center gap-3 transition-opacity hover:opacity-80 lg:hidden"
          >
            <img
              src={devtrackLogo}
              alt="DevTrack logo"
              className="h-8 w-8 rounded-lg bg-white object-contain p-1.5 shadow-sm"
            />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              DevTrack
            </span>
          </button>

          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-extrabold text-slate-900">Welcome back</h2>
            <p className="font-medium text-slate-500">
              Enter your credentials to access your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="ml-1 text-sm font-bold text-slate-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="alex@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex items-center justify-between px-1">
                      <FormLabel className="text-sm font-bold text-slate-700">
                        Password
                      </FormLabel>
                      <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 bg-slate-50 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 cursor-pointer text-sm font-medium text-slate-600"
                >
                  Remember me for 30 days
                </label>
              </div>

              <Button
                type="submit"
                disabled={signInMutation.isPending}
                className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                {signInMutation.isPending ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </Form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 font-bold text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
            >
              <Chrome className="h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </div>

          <p className="mt-10 text-center text-sm font-medium text-slate-500">
            Don&apos;t have an account?{' '}
            <button
              onClick={onSwitchToSignUp}
              className="font-bold text-blue-600 transition-colors hover:text-blue-700"
            >
              Sign up for free
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
