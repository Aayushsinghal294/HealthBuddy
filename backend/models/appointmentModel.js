import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'hospital', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor', required: false },
  date: { type: Date, required: true },
  status: { type: String, enum: ['booked', 'cancelled', 'completed'], default: 'booked' },
  notes: { type: String, default: '' },
  createdAt: { type: Number, default: Date.now }
}, { minimize: false })

const AppointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)

export default AppointmentModel
