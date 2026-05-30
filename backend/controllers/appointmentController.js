import AppointmentModel from '../models/appointmentModel.js'
import jwt from 'jsonwebtoken'

const verifyUserFromHeader = (req) => {
  const token = req.headers['utoken'] || req.headers['uToken'] || req.headers.authorization
  if (!token) throw new Error('Not authenticated')
  let raw = token
  if (raw.startsWith('Bearer ')) raw = raw.split(' ')[1]
  const payload = jwt.verify(raw, process.env.JWT_SECRET)
  if (!payload?.userId) throw new Error('Invalid token')
  return payload.userId
}

const createAppointment = async (req, res) => {
  try {
    const userId = verifyUserFromHeader(req)
    const { hospitalId, doctorId, date, notes } = req.body
    if (!hospitalId || !date) return res.json({ success: false, message: 'Missing required fields' })

    const appt = await AppointmentModel.create({ userId, hospitalId, doctorId: doctorId || null, date: new Date(date), notes: notes || '' })
    res.json({ success: true, appointment: appt })
  } catch (e) {
    console.error(e)
    res.json({ success: false, message: e.message || 'Something went wrong' })
  }
}

const getMyAppointments = async (req, res) => {
  try {
    const userId = verifyUserFromHeader(req)
    const appts = await AppointmentModel.find({ userId }).populate('hospitalId', 'name address phone').sort({ createdAt: -1 })
    res.json({ success: true, appointments: appts })
  } catch (e) {
    console.error(e)
    res.json({ success: false, message: e.message || 'Something went wrong' })
  }
}

const cancelAppointment = async (req, res) => {
  try {
    const userId = verifyUserFromHeader(req)
    const { id } = req.params
    const appt = await AppointmentModel.findOne({ _id: id, userId })
    if (!appt) return res.json({ success: false, message: 'Appointment not found' })
    appt.status = 'cancelled'
    await appt.save()
    res.json({ success: true, appointment: appt })
  } catch (e) {
    console.error(e)
    res.json({ success: false, message: e.message || 'Something went wrong' })
  }
}

export { createAppointment, getMyAppointments, cancelAppointment }
