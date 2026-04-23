import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useQuickAddApplication } from '@/hooks/kanban/useQuickAddApplication'
import {
    useGetListApplications,
    type IApplicationItem,
} from '@/queries/applications/applications.queries'
import AddJobModal from '@/components/modals/AddJobModal'
import ViewApplicationModal from '@/components/modals/ViewApplicationModal'

import { ApplicationCard } from './ApplicationCard'
import { KanbanColumn } from './KanbanColumn'
import { mapApplicationToCard } from './applications.mappers'

const COLUMNS = [
    { status: 'Applied', label: 'Applied' },
    { status: 'Phone Screen', label: 'Phone Screen' },
    { status: 'Technical', label: 'Technical' },
    { status: 'Onsite', label: 'Onsite' },
    { status: 'Offer', label: 'Offer' },
    { status: 'Rejected', label: 'Rejected' },
] as const

const KanbanBoardContent = () => {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [viewApplication, setViewApplication] =
        useState<IApplicationItem | null>(null)

    const { data: applications = [], isLoading } = useGetListApplications()
    const mappedApplications = applications.map(mapApplicationToCard)

    const { handleQuickAdd } = useQuickAddApplication({
        onOpenModal: (status) => {
            setSelectedStatus(status)
            setIsAddModalOpen(true)
        },
    })

    const handleOpenAddModal = (status: string) => {
        handleQuickAdd(status)
    }

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false)
        setSelectedStatus(null)
    }

    const getApplicationsByStatus = (status: string) => {
        return mappedApplications.filter((app) => app.status === status)
    }

    const handleViewById = (id: number) => {
        const target = applications.find((app) => app.id === id)
        if (!target) return
        setViewApplication(target)
    }

    if (isLoading) {
        return (
            <div className="flex h-[600px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        Loading applications...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex h-full gap-6 overflow-x-auto pb-4">
                {COLUMNS.map((column) => {
                    const columnApps = getApplicationsByStatus(column.status)
                    return (
                        <KanbanColumn
                            key={column.status}
                            status={column.status}
                            count={columnApps.length}
                            onQuickAdd={() => handleOpenAddModal(column.status)}
                            gradientFrom={getColumnGradient(column.status).from}
                            gradientTo={getColumnGradient(column.status).to}
                            applications={
                                <>
                                    {columnApps.length === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50"
                                        >
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                No applications yet
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <AnimatePresence>
                                            {columnApps.map((app) => (
                                                <ApplicationCard
                                                    key={app.id}
                                                    id={app.id}
                                                    company={app.company}
                                                    companyLogo={
                                                        app.companyLogo
                                                    }
                                                    position={app.position}
                                                    location={app.location}
                                                    priority={app.priority}
                                                    status={app.status}
                                                    onClick={() =>
                                                        handleViewById(app.id)
                                                    }
                                                />
                                            ))}
                                        </AnimatePresence>
                                    )}
                                </>
                            }
                        />
                    )
                })}
            </div>

            <AddJobModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                defaultStatus={selectedStatus || undefined}
            />

            {viewApplication && (
                <ViewApplicationModal
                    isOpen={true}
                    onClose={() => setViewApplication(null)}
                    application={viewApplication}
                />
            )}
        </>
    )
}

const getColumnGradient = (status: string) => {
    const gradients: Record<string, { from: string; to: string }> = {
        Applied: { from: 'from-blue-500', to: 'to-blue-600' },
        'Phone Screen': { from: 'from-yellow-500', to: 'to-yellow-600' },
        Technical: { from: 'from-purple-500', to: 'to-purple-600' },
        Onsite: { from: 'from-indigo-500', to: 'to-indigo-600' },
        Offer: { from: 'from-green-500', to: 'to-green-600' },
        Rejected: { from: 'from-red-500', to: 'to-red-600' },
    }
    return gradients[status] || { from: 'from-slate-500', to: 'to-slate-600' }
}

export const KanbanBoard = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Kanban Board
                    </h1>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                        Drag and drop applications to update their status
                    </p>
                </div>
                <KanbanBoardContent />
            </div>
        </DndProvider>
    )
}
