import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '../context/AppContext'
import { ToastContext } from '../context/ToastContext'

const MyAppointments = () => {
  const ctx = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await ctx.getMyAppointments()
    if (res.success) setAppointments(res.appointments || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleCancel = async (id) => {
    const res = await ctx.cancelAppointment(id)
    if (res.success) {
      toast.show('Appointment cancelled', { type: 'success' })
      load()
    } else {
      toast.show(res.message || 'Cancel failed', { type: 'error' })
    }
  }

  const toast = useContext(ToastContext)

  if (loading) return (
    <div className="p-6">
      <div className="space-y-3">
        <div className="h-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-20 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  )

  if (!appointments.length) return <div className="p-6">You have no appointments.</div>

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
      <ul className="space-y-3">
        {appointments.map(appt => (
          <li key={appt._id} className="p-4 border rounded-md flex justify-between items-center">
            <div>
              <div className="font-medium">{appt.hospitalId?.name || 'Hospital'}</div>
              <div className="text-sm text-gray-600">{new Date(appt.date).toLocaleString()}</div>
              <div className="text-sm text-gray-600">Status: {appt.status}</div>
            </div>
            <div>
              {appt.status === 'booked' && (
                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleCancel(appt._id)}>Cancel</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyAppointments;
