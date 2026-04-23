import { Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef } from 'react'

import { useKanbanDrop } from '@/hooks/kanban/useKanbanDragDrop'

type KanbanColumnProps = {
    status: string
    count: number
    applications: React.ReactNode
    onQuickAdd: () => void
    gradientFrom: string
    gradientTo: string
}

const COLUMN_GRADIENTS: Record<string, { from: string; to: string }> = {
    Applied: { from: 'from-blue-500', to: 'to-blue-600' },
    'Phone Screen': { from: 'from-yellow-500', to: 'to-yellow-600' },
    Technical: { from: 'from-purple-500', to: 'to-purple-600' },
    Onsite: { from: 'from-indigo-500', to: 'to-indigo-600' },
    Offer: { from: 'from-green-500', to: 'to-green-600' },
    Rejected: { from: 'from-red-500', to: 'to-red-600' },
}

export const KanbanColumn = ({
    status,
    count,
    applications,
    onQuickAdd,
    gradientFrom,
    gradientTo,
}: KanbanColumnProps) => {
    const columnRef = useRef<HTMLDivElement>(null)
    const { isOver, drop } = useKanbanDrop({
        status,
        onDrop: () => {},
    })

    drop(columnRef)

    const gradient = COLUMN_GRADIENTS[status] || { from: gradientFrom, to: gradientTo }

    return (
        <div
            ref={columnRef}
            className={`flex h-full min-h-[500px] w-80 shrink-0 flex-col rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 ${isOver ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
        >
            {/* Column Header */}
            <div className="relative overflow-hidden rounded-t-2xl">
                {/* Gradient accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${gradient.from} ${gradient.to}`} />

                <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center gap-3">
                        <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                            {status}
                        </h2>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                        >
                            {count}
                        </motion.div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onQuickAdd}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradient.from} ${gradient.to} text-white shadow-md transition-shadow hover:shadow-lg`}
                    >
                        <Plus className="h-4 w-4" />
                    </motion.button>
                </div>
            </div>

            {/* Cards Container */}
            <div className="flex-1 space-y-3 overflow-y-auto p-3">
                {applications}
            </div>

            {/* Drop indicator */}
            {isOver && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mx-3 mb-3 h-20 rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                />
            )}
        </div>
    )
}
