import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DesktopOnly({ children }: { children: ReactNode }) {
    const navigate = useNavigate()

    return (
        <>
            <div className="block lg:hidden">
                <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-zinc-950">
                    <div className="w-full max-w-sm text-center">
                        {/* Icon */}
                        <div className="mx-auto mb-6 h-18 w-18">
                            <svg
                                viewBox="0 0 72 72"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-full w-full"
                            >
                                <rect
                                    x="4"
                                    y="10"
                                    width="64"
                                    height="42"
                                    rx="5"
                                    fill="none"
                                    className="stroke-slate-200 dark:stroke-zinc-700"
                                    strokeWidth="2"
                                />
                                <rect
                                    x="10"
                                    y="16"
                                    width="52"
                                    height="30"
                                    rx="3"
                                    className="fill-slate-100 dark:fill-zinc-800"
                                />
                                <rect
                                    x="28"
                                    y="52"
                                    width="16"
                                    height="3"
                                    rx="1.5"
                                    className="fill-slate-300 dark:fill-zinc-600"
                                />
                                <rect
                                    x="22"
                                    y="55"
                                    width="28"
                                    height="2"
                                    rx="1"
                                    className="fill-slate-200 dark:fill-zinc-700"
                                />
                                <rect
                                    x="24"
                                    y="30"
                                    width="4"
                                    height="4"
                                    rx="1"
                                    className="fill-slate-300 dark:fill-zinc-500"
                                />
                                <rect
                                    x="31"
                                    y="28"
                                    width="4"
                                    height="6"
                                    rx="1"
                                    className="fill-slate-400 dark:fill-zinc-400"
                                />
                                <rect
                                    x="38"
                                    y="26"
                                    width="4"
                                    height="8"
                                    rx="1"
                                    className="fill-slate-700 dark:fill-zinc-200"
                                />
                                <line
                                    x1="22"
                                    y1="38"
                                    x2="50"
                                    y2="38"
                                    className="stroke-slate-200 dark:stroke-zinc-700"
                                    strokeWidth="1"
                                />
                                <circle
                                    cx="57"
                                    cy="14"
                                    r="8"
                                    className="fill-red-500"
                                />
                                <line
                                    x1="54"
                                    y1="11"
                                    x2="60"
                                    y2="17"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="60"
                                    y1="11"
                                    x2="54"
                                    y2="17"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Label */}
                        <p className="mb-1.5 text-[11px] font-medium tracking-widest text-slate-400 uppercase dark:text-zinc-500">
                            Display requirement
                        </p>

                        {/* Heading */}
                        <h1 className="mb-3 text-[22px] leading-snug font-medium text-slate-900 dark:text-zinc-100">
                            Desktop only
                        </h1>

                        {/* Description */}
                        <p className="mb-6 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
                            This application requires a larger screen to work
                            properly. Please switch to a desktop or laptop to
                            continue.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="mb-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            Back to Home
                        </button>

                        {/* Device status pills */}
                        <div className="flex items-center justify-center gap-3">
                            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-zinc-700 dark:bg-zinc-900">
                                <svg
                                    className="h-3.5 w-3.5 text-slate-500"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                >
                                    <rect
                                        x="0.5"
                                        y="1.5"
                                        width="13"
                                        height="9"
                                        rx="1.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                    />
                                    <line
                                        x1="4"
                                        y1="10.5"
                                        x2="10"
                                        y2="10.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                    />
                                    <line
                                        x1="7"
                                        y1="10.5"
                                        x2="7"
                                        y2="12.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                                    Desktop
                                </span>
                                <svg
                                    className="h-2.5 w-2.5"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                >
                                    <circle
                                        cx="5"
                                        cy="5"
                                        r="4"
                                        stroke="#3B6D11"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M3 5l1.5 1.5L7 3.5"
                                        stroke="#3B6D11"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-zinc-700 dark:bg-zinc-900">
                                <svg
                                    className="h-3.5 w-2.5 text-slate-500"
                                    viewBox="0 0 10 14"
                                    fill="none"
                                >
                                    <rect
                                        x="0.5"
                                        y="0.5"
                                        width="9"
                                        height="13"
                                        rx="1.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                    />
                                    <circle
                                        cx="5"
                                        cy="11.5"
                                        r="0.75"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                                    Mobile
                                </span>
                                <svg
                                    className="h-2.5 w-2.5"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                >
                                    <circle
                                        cx="5"
                                        cy="5"
                                        r="4"
                                        stroke="#A32D2D"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M3 3l4 4M7 3L3 7"
                                        stroke="#A32D2D"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block">{children}</div>
        </>
    )
}
