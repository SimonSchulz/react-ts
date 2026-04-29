import { useToastStore } from '../lib/useToast.ts'

export const ToastContainer = () => {
  const toasts = useToastStore((s) => s.toasts)

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-black text-white px-4 py-2 rounded shadow text-sm animate-fade-in"
        >
          {t.text}
        </div>
      ))}
    </div>
  )
}
