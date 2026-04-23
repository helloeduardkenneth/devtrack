import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import type { DragItem } from '@/hooks/kanban/useKanbanDragDrop'
import { useKanbanDrop } from '@/hooks/kanban/useKanbanDragDrop'

const mutateMock = vi.fn()
const dropConnectorMock = vi.fn()
let capturedDropHandler: ((item: DragItem) => void) | null = null

vi.mock('@/queries/applications/applications.mutation', () => ({
    useUpdateApplicationStatusMutation: () => ({
        mutate: mutateMock,
    }),
}))

vi.mock('react-dnd', () => ({
    useDrag: vi.fn(() => [{ isDragging: false }, vi.fn()]),
    useDrop: vi.fn(
        (
            specFactory: () => {
                drop: (item: DragItem) => void
            },
        ) => {
            const spec = specFactory()
            capturedDropHandler = spec.drop
            return [{ isOver: false }, dropConnectorMock]
        },
    ),
}))

describe('useKanbanDrop', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        capturedDropHandler = null
    })

    it('updates application status when dropped to a different column', () => {
        const onDropMock = vi.fn()
        renderHook(() =>
            useKanbanDrop({
                status: 'Offer',
                onDrop: onDropMock,
            }),
        )

        expect(capturedDropHandler).toBeTruthy()
        capturedDropHandler?.({
            type: 'APPLICATION_CARD',
            id: 101,
            currentStatus: 'Applied',
        })

        expect(mutateMock).toHaveBeenCalledWith({
            id: 101,
            status: 'Offer',
        })
        expect(onDropMock).toHaveBeenCalledWith(101)
    })

    it('does not update status when dropped in the same column', () => {
        const onDropMock = vi.fn()
        renderHook(() =>
            useKanbanDrop({
                status: 'Technical',
                onDrop: onDropMock,
            }),
        )

        expect(capturedDropHandler).toBeTruthy()
        capturedDropHandler?.({
            type: 'APPLICATION_CARD',
            id: 202,
            currentStatus: 'Technical',
        })

        expect(mutateMock).not.toHaveBeenCalled()
        expect(onDropMock).not.toHaveBeenCalled()
    })
})
