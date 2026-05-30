import React, { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

const ToastItem = ({ t, remove }) => {
  const color = t.type === 'error' ? 'bg-red-500' : t.type === 'success' ? 'bg-green-600' : 'bg-gray-800'
  return (
    <div className={`text-white px-4 py-2 rounded shadow-md ${color} max-w-xs break-words`}>
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm">{t.message}</div>
        <button onClick={() => remove(t.id)} className="text-white opacity-80 hover:opacity-100 ml-2">✕</button>
      </div>
    </div>
  )
}

export default function ToastContainer(){
  const { toasts, remove } = useContext(ToastContext)
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col-reverse gap-2">
      {toasts.map(t => <ToastItem key={t.id} t={t} remove={remove} />)}
    </div>
  )
}
