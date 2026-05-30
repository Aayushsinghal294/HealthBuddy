import React, { useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { ToastContext } from '../context/ToastContext'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const ctx = useContext(AppContext)
  const toast = useContext(ToastContext)

  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleBook = async () => {
    if (!date) return toast.show('Please select a date and time', { type: 'error' })
    const picked = new Date(date)
    if (isNaN(picked.getTime()) || picked < new Date()) return toast.show('Please pick a future date/time', { type: 'error' })
    setLoading(true)
    const res = await ctx.bookAppointment({ hospitalId: docId, date, notes })
    setLoading(false)
    if (res.success) {
      toast.show('Appointment booked', { type: 'success' })
      navigate('/my-appointments')
    } else toast.show(res.message || 'Booking failed', { type: 'error' })
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
        <label className="block mb-2 text-sm">Choose date & time</label>
        <input type="datetime-local" className="w-full p-2 border rounded mb-4" value={date} onChange={e=>setDate(e.target.value)} />
        <label className="block mb-2 text-sm">Notes (optional)</label>
        <textarea className="w-full p-2 border rounded mb-4" value={notes} onChange={e=>setNotes(e.target.value)} />
        {message && <div className="mb-3 text-sm text-red-500">{message}</div>}
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={()=>navigate(-1)}>Back</button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded" onClick={handleBook} disabled={loading}>{loading? 'Booking...' : 'Book'}</button>
        </div>
      </div>
    </div>
  )
}

export default Appointment;
