import { Download, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

type ApplicationsBulkActionsProps = {
  selectedCount: number
  onClearSelection: () => void
}

export const ApplicationsBulkActions = ({
  selectedCount,
  onClearSelection,
}: ApplicationsBulkActionsProps) => {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="rounded-2xl border border-blue-500 bg-blue-600 p-4 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
              </span>
              <button
                onClick={onClearSelection}
                className="text-sm text-blue-100 transition-colors hover:text-white"
              >
                Clear selection
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-white bg-white/10 px-4 py-2 font-medium transition-all hover:bg-white/20">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-white bg-white/10 px-4 py-2 font-medium transition-all hover:bg-white/20">
                Change Status
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-medium transition-all hover:bg-red-600">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
