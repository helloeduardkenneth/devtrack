import { Download, Tag, Trash2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

type ApplicationsBulkActionsProps = {
    selectedCount: number
    onClearSelection: () => void
    onExport: () => void
    onChangeStatus: () => void
    onDelete: () => void
}

export const ApplicationsBulkActions = ({
    selectedCount,
    onClearSelection,
    onExport,
    onChangeStatus,
    onDelete,
}: ApplicationsBulkActionsProps) => {
    return (
        <AnimatePresence>
            {selectedCount > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.98 }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        mass: 0.8,
                    }}
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/50"
                >
                    {/* Gradient accent bar */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-violet-500 via-indigo-500 to-cyan-500" />

                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-3">
                            {/* Selection count badge - left side */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    delay: 0.1,
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 12,
                                }}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-indigo-600 font-bold text-white shadow-lg ring-4 shadow-violet-500/30 ring-white dark:ring-slate-900"
                            >
                                {selectedCount}
                            </motion.div>

                            {/* Left section: Selection info */}
                            <div className="flex items-center gap-4">
                                <div className="space-y-2">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                        className="block text-sm font-semibold text-slate-900 dark:text-slate-100"
                                    >
                                        {selectedCount === 1
                                            ? '1 application selected'
                                            : `${selectedCount} applications selected`}
                                    </motion.span>
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        onClick={onClearSelection}
                                        className="mt-0.5 flex items-center gap-1.5 rounded-xl border border-slate-400 px-2 py-1 text-xs font-medium text-slate-500 transition-all hover:border-violet-400 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                        Clear selection
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Right section: Actions */}
                        <div className="flex items-center gap-2.5">
                            {/* Export - Secondary action */}
                            <motion.button
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 }}
                                onClick={onExport}
                                className="group dark:hover:bg-slate-750 relative flex items-center gap-2 overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
                            >
                                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                                <span>Export</span>
                            </motion.button>

                            {/* Change Status - Primary action */}
                            <motion.button
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={onChangeStatus}
                                className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-violet-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/30"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-violet-600 to-indigo-700 opacity-0 transition-opacity group-hover:opacity-100" />
                                <Tag className="relative h-4 w-4" />
                                <span className="relative">Change Status</span>
                            </motion.button>

                            {/* Delete - Destructive action */}
                            <motion.button
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 }}
                                onClick={onDelete}
                                className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-100 hover:shadow-md dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                            >
                                <Trash2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                                <span>Delete</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
