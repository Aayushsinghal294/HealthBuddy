import express from 'express'
import { createAppointment, getMyAppointments, cancelAppointment } from '../controllers/appointmentController.js'

const router = express.Router()

router.post('/', createAppointment)
router.get('/me', getMyAppointments)
router.patch('/:id/cancel', cancelAppointment)

export default router
