interface UseQuickAddApplicationProps {
    onOpenModal: (status: string) => void
}

export const useQuickAddApplication = ({ onOpenModal }: UseQuickAddApplicationProps) => {
    const handleQuickAdd = (status: string) => {
        onOpenModal(status)
    }

    return { handleQuickAdd }
}
