import { STATUS_FILTER_OPTIONS } from '@/constants/applications.constants'
import { motion, AnimatePresence } from 'motion/react'
import { X, Tag, Check } from 'lucide-react'
import { useState } from 'react'

interface ChangeStatusModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (status: string) => void
    isUpdating?: boolean
    selectedCount: number
}

const statusOptions = STATUS_FILTER_OPTIONS.filter(
    (status) => status !== 'All Statuses',
)

export const ChangeStatusModal = ({
    isOpen,
    onClose,
    onConfirm,
    isUpdating = false,
    selectedCount,
}: ChangeStatusModalProps) => {
    const [selectedStatus, setSelectedStatus] = useState<string>('')

    if (!isOpen) return null

    const handleConfirm = () => {
        if (selectedStatus) {
            onConfirm(selectedStatus)
        }
    }

    const handleClose = () => {
        if (!isUpdating) {
            setSelectedStatus('')
            onClose()
        }
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-slate-500/20 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.94, opacity: 0, y: 12 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.94, opacity: 0, y: 12 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white"
                    style={{
                        boxShadow:
                            '0 0 0 1px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.06)',
                    }}
                >
                    {/* Blue top accent stripe */}
                    <div
                        className="absolute top-0 right-0 left-0 h-0.75"
                        style={{
                            background:
                                'linear-gradient(90deg, #60a5fa, #3b82f6 40%, #2563eb)',
                        }}
                    />

                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        disabled={isUpdating}
                        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 disabled:pointer-events-none disabled:opacity-40"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="px-6 pt-7 pb-6">
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: 0.06,
                                type: 'spring',
                                stiffness: 320,
                            }}
                            className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                            style={{
                                background:
                                    'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                                boxShadow: '0 0 0 1px rgba(59,130,246,0.12)',
                            }}
                        >
                            <Tag
                                className="h-5 w-5 text-blue-600"
                                strokeWidth={2}
                            />
                        </motion.div>

                        {/* Title & description */}
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-[17px] font-semibold tracking-tight text-slate-900">
                                Change Status
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-slate-500">
                                Update the status for {selectedCount}{' '}
                                {selectedCount === 1
                                    ? 'application'
                                    : 'applications'}
                                . Select the new status below.
                            </p>
                        </motion.div>

                        {/* Status options */}
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.14 }}
                            className="mt-5 space-y-2"
                        >
                            {statusOptions.map((status, index) => (
                                <motion.button
                                    key={status}
                                    initial={{ opacity: 0, x: -4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.17 + index * 0.05 }}
                                    onClick={() => setSelectedStatus(status)}
                                    disabled={isUpdating}
                                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                                        selectedStatus === status
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                                    } disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    <span
                                        className={`font-medium ${
                                            selectedStatus === status
                                                ? 'text-blue-700'
                                                : 'text-slate-700'
                                        }`}
                                    >
                                        {status}
                                    </span>
                                    {selectedStatus === status && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500"
                                        >
                                            <Check className="h-3 w-3 text-white" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Action buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.26 }}
                            className="mt-5 flex gap-2.5"
                        >
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isUpdating}
                                className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                disabled={isUpdating || !selectedStatus}
                                className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-70"
                                style={{
                                    background: isUpdating
                                        ? '#60a5fa'
                                        : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                    boxShadow: isUpdating
                                        ? 'none'
                                        : '0 2px 8px rgba(59,130,246,0.3), 0 1px 2px rgba(59,130,246,0.2)',
                                }}
                            >
                                {isUpdating ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg
                                            className="h-3.5 w-3.5 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                        </svg>
                                        Updating…
                                    </span>
                                ) : (
                                    'Update'
                                )}
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default ChangeStatusModal
