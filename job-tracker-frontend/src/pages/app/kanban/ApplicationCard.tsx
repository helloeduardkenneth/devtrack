import { Building2, MapPin } from 'lucide-react'
import { motion } from 'motion/react'

import { useKanbanDrag } from '@/hooks/kanban/useKanbanDragDrop'

type ApplicationCardProps = {
    id: number
    company: string
    companyLogo?: string | null
    position: string
    location?: string | null
    priority: 'High' | 'Medium' | 'Low'
    status: string
    onClick?: () => void
}

const PRIORITY_COLORS = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
}

export const ApplicationCard = ({
    id,
    company,
    companyLogo,
    position,
    location,
    priority,
    status,
    onClick,
}: ApplicationCardProps) => {
    const { isDragging, drag } = useKanbanDrag({
        applicationId: id,
        currentStatus: status,
    })

    return (
        <motion.div
            ref={(node) => {
                drag(node)
            }}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: isDragging ? 0.8 : 1,
                y: isDragging ? -5 : 0,
                rotate: isDragging ? 2 : 0,
                scale: isDragging ? 1.02 : 1,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.8,
            }}
            onClick={onClick}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
            <div className="flex items-start gap-3">
                {/* Company Logo */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                    {companyLogo ? (
                        <img
                            src={companyLogo}
                            alt={company}
                            className="h-full w-full object-contain"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none'
                            }}
                        />
                    ) : (
                        <Building2 className="h-5 w-5 text-slate-400" />
                    )}
                </div>

                {/* Card Content */}
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        {company}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                        {position}
                    </p>

                    {location && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
                            <MapPin className="h-3 w-3" />
                            <span>{location}</span>
                        </div>
                    )}
                </div>

                {/* Priority Badge */}
                <div
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${PRIORITY_COLORS[priority]}`}
                >
                    {priority}
                </div>
            </div>
        </motion.div>
    )
}
