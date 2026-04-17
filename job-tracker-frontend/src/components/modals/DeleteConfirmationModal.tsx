import { motion, AnimatePresence } from 'motion/react'
import { Trash2, X, Building2, Briefcase, Hash } from 'lucide-react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isDeleting?: boolean
  application: {
    id: string
    company: string
    position: string
  } | null
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
  application,
}: DeleteConfirmationModalProps) => {
  if (!isOpen || !application) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-500/20 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 12 }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white"
          style={{
            boxShadow:
              '0 0 0 1px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.06)',
          }}
        >
          {/* Red top accent stripe */}
          <div
            className="absolute top-0 right-0 left-0 h-0.75"
            style={{
              background: 'linear-gradient(90deg, #fca5a5, #ef4444 40%, #dc2626)',
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 disabled:pointer-events-none disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="px-6 pt-7 pb-6">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.06, type: 'spring', stiffness: 320 }}
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                boxShadow: '0 0 0 1px rgba(239,68,68,0.12)',
              }}
            >
              <Trash2 className="h-5 w-5 text-red-500" strokeWidth={2} />
            </motion.div>

            {/* Title & description */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-[17px] font-semibold tracking-tight text-slate-900">
                Delete Application
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                This action is permanent and cannot be undone. The following record will
                be removed.
              </p>
            </motion.div>

            {/* Application details card */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
            >
              {[
                { icon: Hash, label: 'ID', value: `#${application.id}` },
                { icon: Building2, label: 'Company', value: application.company },
                { icon: Briefcase, label: 'Position', value: application.position },
              ].map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.17 + i * 0.05 }}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={2} />
                  <span className="w-16 shrink-0 text-xs font-medium text-slate-400">
                    {label}
                  </span>
                  <span className="truncate text-sm font-medium text-slate-700">
                    {value}
                  </span>
                </motion.div>
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
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 disabled:pointer-events-none disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: isDeleting
                    ? '#f87171'
                    : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  boxShadow: isDeleting
                    ? 'none'
                    : '0 2px 8px rgba(239,68,68,0.3), 0 1px 2px rgba(239,68,68,0.2)',
                }}
              >
                {isDeleting ? (
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
                    Deleting…
                  </span>
                ) : (
                  'Delete'
                )}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default DeleteConfirmationModal
