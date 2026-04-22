import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Chrome, Eye, EyeOff, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import DEVTRACK_LOGO from '@/assets/devtrack_logo.png'
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
import { getPasswordStrength } from '@/helpers/password'
import { useSignUpMutation } from '@/queries/auth/signup.mutation'
import {
    signUpSchema,
    type SignUpFormValues,
} from '@/validations/auth.validation'

interface SignUpProps {
    onSignUp: () => void
    onBackToLanding?: () => void
    onSwitchToLogin?: () => void
}

const SignUpPage = ({
    onSignUp,
    onBackToLanding,
    onSwitchToLogin,
}: SignUpProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            full_name: '',
            email: '',
            employment_status: 'unemployed',
            current_job: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false,
        },
        mode: 'onTouched',
    })

    const password = form.watch('password')
    const confirmPassword = form.watch('confirmPassword')
    const employmentStatus = form.watch('employment_status')

    const passwordStrength = useMemo(
        () => getPasswordStrength(password),
        [password],
    )

    const signUpMutation = useSignUpMutation(() => {
        toast.success('Account created successfully! You can now sign in.')
        onSignUp()
    })

    const handleSubmit = (values: SignUpFormValues) => {
        signUpMutation.mutate(values)
    }

    return (
        <div className="flex min-h-screen w-full bg-white">
            <div className="relative hidden overflow-hidden bg-linear-to-br from-blue-600 to-indigo-700 lg:flex lg:w-1/2">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_40%)]" />

                <div className="relative z-20 flex h-full w-full flex-col justify-between p-16">
                    <button
                        onClick={onBackToLanding}
                        className="flex items-center gap-3 self-start transition-opacity hover:opacity-80"
                    >
                        <img
                            src={DEVTRACK_LOGO}
                            alt="DevTrack logo"
                            className="h-10 w-10 rounded-xl bg-white object-contain p-1.5 shadow-xl"
                        />
                        <span className="text-2xl font-bold tracking-tight text-white">
                            DevTrack
                        </span>
                    </button>

                    <div className="max-w-md space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="mb-6 text-5xl leading-tight font-extrabold text-white">
                                Start tracking your applications today.
                            </h1>
                            <p className="text-lg font-medium text-blue-100">
                                Join 10,000+ developers who landed their dream
                                jobs with DevTrack.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            {[
                                'Track unlimited applications',
                                'AI-powered insights & analytics',
                                'Never miss a follow-up',
                                'Visual Kanban pipeline',
                                'Export data anytime',
                            ].map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-lg font-medium text-white">
                                        {benefit}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-6 text-sm font-medium text-blue-100/60">
                        <span>© 2026 DevTrack</span>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-center justify-center p-8 lg:w-1/2 lg:p-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-1053"
                >
                    <button
                        onClick={onBackToLanding}
                        className="mb-10 flex items-center gap-3 transition-opacity hover:opacity-80 lg:hidden"
                    >
                        <img
                            src={DEVTRACK_LOGO}
                            alt="DevTrack logo"
                            className="h-8 w-8 rounded-lg bg-white object-contain p-1.5 shadow-sm"
                        />
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            DevTrack
                        </span>
                    </button>

                    <div className="mb-8">
                        <h2 className="mb-2 text-3xl font-extrabold text-slate-900">
                            Create your account
                        </h2>
                        <p className="font-medium text-slate-500">
                            Start organizing your job search for free
                        </p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-5"
                        >
                            <FormField
                                control={form.control}
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="ml-1 text-sm font-bold text-slate-700">
                                            Full Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Alex Martinez"
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
                                name="employment_status"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="ml-1 text-sm font-bold text-slate-700">
                                            Employment Status
                                        </FormLabel>
                                        <FormControl>
                                            <div className="flex flex-wrap items-center gap-6 px-1 py-1">
                                                <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                                                    <input
                                                        type="radio"
                                                        name={field.name}
                                                        value="employed"
                                                        checked={
                                                            field.value ===
                                                            'employed'
                                                        }
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        onBlur={field.onBlur}
                                                        className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    Employed
                                                </label>
                                                <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                                                    <input
                                                        type="radio"
                                                        name={field.name}
                                                        value="unemployed"
                                                        checked={
                                                            field.value ===
                                                            'unemployed'
                                                        }
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        onBlur={field.onBlur}
                                                        className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    Unemployed
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {employmentStatus === 'employed' && (
                                <FormField
                                    control={form.control}
                                    name="current_job"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel className="ml-1 text-sm font-bold text-slate-700">
                                                Current Job Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Software Engineer"
                                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="ml-1 text-sm font-bold text-slate-700">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder="••••••••"
                                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
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

                                        {password && (
                                            <div className="space-y-1.5 pt-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-semibold text-slate-500">
                                                        Password strength
                                                    </span>
                                                    <span
                                                        className={`text-xs font-bold ${
                                                            passwordStrength.label ===
                                                            'Weak'
                                                                ? 'text-red-600'
                                                                : passwordStrength.label ===
                                                                    'Fair'
                                                                  ? 'text-orange-600'
                                                                  : passwordStrength.label ===
                                                                      'Good'
                                                                    ? 'text-yellow-600'
                                                                    : 'text-green-600'
                                                        }`}
                                                    >
                                                        {passwordStrength.label}
                                                    </span>
                                                </div>
                                                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                                    <div
                                                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                                        style={{
                                                            width: `${passwordStrength.strength}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="ml-1 text-sm font-bold text-slate-700">
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        showConfirmPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder="••••••••"
                                                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm transition-all outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 ${
                                                        confirmPassword &&
                                                        password !==
                                                            confirmPassword
                                                            ? 'border-red-300 focus:border-red-500'
                                                            : 'border-slate-200 focus:border-blue-500'
                                                    }`}
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword,
                                                        )
                                                    }
                                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />

                                        {confirmPassword && (
                                            <div className="flex items-center gap-2 pt-1">
                                                {password ===
                                                confirmPassword ? (
                                                    <>
                                                        <Check className="h-3.5 w-3.5 text-green-600" />
                                                        <span className="text-xs font-semibold text-green-600">
                                                            Passwords match
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <X className="h-3.5 w-3.5 text-red-600" />
                                                        <span className="text-xs font-semibold text-red-600">
                                                            Passwords don&apos;t
                                                            match
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="agreeTerms"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <div className="flex items-start pt-2">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 bg-slate-50 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="ml-2 cursor-pointer text-sm font-medium text-slate-600"
                                            >
                                                I agree to the{' '}
                                                <a
                                                    href="#"
                                                    className="font-bold text-blue-600 hover:text-blue-700"
                                                >
                                                    Terms of Service
                                                </a>{' '}
                                                and{' '}
                                                <a
                                                    href="#"
                                                    className="font-bold text-blue-600 hover:text-blue-700"
                                                >
                                                    Privacy Policy
                                                </a>
                                            </label>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={signUpMutation.isPending}
                                className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
                            >
                                {signUpMutation.isPending
                                    ? 'Creating...'
                                    : 'Create account'}
                            </Button>
                        </form>
                    </Form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 font-bold text-slate-400">
                                Or
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={onSignUp}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
                    >
                        <Chrome className="h-4 w-4" />
                        Sign up with Google
                    </Button>

                    <p className="mt-10 text-center text-sm font-medium text-slate-500">
                        Already have an account?{' '}
                        <button
                            onClick={onSwitchToLogin}
                            className="font-bold text-blue-600 transition-colors hover:text-blue-700"
                        >
                            Sign in
                        </button>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default SignUpPage
