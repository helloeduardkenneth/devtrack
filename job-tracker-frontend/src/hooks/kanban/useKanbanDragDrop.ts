import { useDrag, useDrop } from 'react-dnd'

import { useUpdateApplicationStatusMutation } from '@/queries/applications/applications.mutation'

export interface DragItem {
    type: 'APPLICATION_CARD'
    id: number
    currentStatus: string
}

interface UseKanbanDragDropProps {
    applicationId: number
    currentStatus: string
    onStatusChange?: (newStatus: string) => void
}

interface UseKanbanColumnDropProps {
    status: string
    onDrop?: (applicationId: number) => void
}

const STATUS_MAP: Record<string, string> = {
    Applied: 'Applied',
    'Phone Screen': 'Phone Screen',
    Technical: 'Technical',
    Onsite: 'Onsite',
    Offer: 'Offer',
    Rejected: 'Rejected',
}

export const useKanbanDrag = ({
    applicationId,
    currentStatus,
}: UseKanbanDragDropProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'APPLICATION_CARD',
        item: {
            type: 'APPLICATION_CARD',
            id: applicationId,
            currentStatus,
        } satisfies DragItem,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    return { isDragging, drag }
}

export const useKanbanDrop = ({
    status,
    onDrop,
}: UseKanbanColumnDropProps) => {
    const updateStatusMutation = useUpdateApplicationStatusMutation()

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'APPLICATION_CARD',
        drop: (item: DragItem) => {
            if (item.currentStatus !== status) {
                updateStatusMutation.mutate({
                    id: item.id,
                    status: STATUS_MAP[status] || status,
                })
                onDrop?.(item.id)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }))

    return { isOver, drop }
}
