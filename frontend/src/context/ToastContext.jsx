import React, { createContext, useCallback, useState } from 'react'

export const ToastContext = createContext()

let idCounter = 1

export default function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  const show = useCallback((message, opts = {}) => {
    const id = idCounter++
    const toast = { id, message, type: opts.type || 'info', duration: opts.duration || 4000 }
    setToasts(t => [toast, ...t])
    if (toast.duration > 0) setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), toast.duration)
    return id
  }, [])

  const remove = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), [])

  return (
    <ToastContext.Provider value={{ show, remove, toasts }}>
      {children}
    </ToastContext.Provider>
  )
}
