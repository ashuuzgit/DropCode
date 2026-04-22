import { useToast } from '../context/ToastContext'

export default function Toast() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            animate-in slide-in-from-bottom-5 duration-300
            px-6 py-4 rounded-lg shadow-lg text-secondary font-semibold
            flex items-center gap-3
            ${
              toast.type === 'success'
                ? 'bg-green-500'
                : toast.type === 'error'
                ? 'bg-red-500'
                : 'bg-accent'
            }
          `}
        >
          {toast.type === 'success' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {toast.message}
        </div>
      ))}
    </div>
  )
}
