import express from 'express'
import { registerUser, loginUser, getMe, updateMe } from '../controllers/userController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)
router.patch('/me', updateMe)

export default router
