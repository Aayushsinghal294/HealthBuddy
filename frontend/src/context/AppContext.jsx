import { createContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { hospitals as fallbackHospitals } from '../assets/asset'
import { io } from 'socket.io-client'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
    const [hospitals, setHospitals] = useState(fallbackHospitals)
    const [user, setUser] = useState(localStorage.getItem('uToken') ? JSON.parse(localStorage.getItem('user') || 'null') : null)
    const [uToken, setUToken] = useState(localStorage.getItem('uToken') || '')

    const refreshHospitals = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/hospitals`)

            if (data.success && Array.isArray(data.hospitals)) {
                setHospitals(data.hospitals)
            }
        } catch (error) {
            console.error('Hospital fetch failed, using fallback data:', error)
        }
    }

    const register = async ({ name, email, password }) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/users/register`, { name, email, password })
            if (data.success) {
                setUToken(data.token)
                setUser(data.user)
                localStorage.setItem('uToken', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
            }
            return data
        } catch (e) { console.error(e); return { success: false, message: 'Registration failed' } }
    }

    const login = async ({ email, password }) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/users/login`, { email, password })
            if (data.success) {
                setUToken(data.token)
                setUser(data.user)
                localStorage.setItem('uToken', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
            }
            return data
        } catch (e) { console.error(e); return { success: false, message: 'Login failed' } }
    }

    const logout = () => {
        setUToken('')
        setUser(null)
        localStorage.removeItem('uToken')
        localStorage.removeItem('user')
    }

    const bookAppointment = async ({ hospitalId, doctorId, date, notes }) => {
        try {
            const headers = {}
            if (uToken) headers.utoken = uToken
            const { data } = await axios.post(`${backendUrl}/api/appointments`, { hospitalId, doctorId, date, notes }, { headers })
            return data
        } catch (e) { console.error(e); return { success: false, message: 'Booking failed' } }
    }

    const getMyAppointments = async () => {
        try {
            const headers = {}
            if (uToken) headers.utoken = uToken
            const { data } = await axios.get(`${backendUrl}/api/appointments/me`, { headers })
            return data
        } catch (e) { console.error(e); return { success: false, message: 'Fetch failed' } }
    }

    const cancelAppointment = async (id) => {
        try {
            const headers = {}
            if (uToken) headers.utoken = uToken
            const { data } = await axios.patch(`${backendUrl}/api/appointments/${id}/cancel`, {}, { headers })
            return data
        } catch (e) { console.error(e); return { success: false, message: 'Cancel failed' } }
    }

    useEffect(() => {
        refreshHospitals()
    }, [])

    useEffect(() => {
        if (!backendUrl) return
        const socket = io(backendUrl)
        
        socket.on('hospital:updated', (updated) => {
            setHospitals((prev) => prev.map(h => (h._id === updated._id ? updated : h)))
        })

        socket.on('hospital:created', (created) => {
            setHospitals((prev) => [created, ...prev])
        })

        return () => socket.disconnect()
    }, [backendUrl])

    const value = {
        hospitals,
        refreshHospitals,
        backendUrl,
        user,
        uToken,
        register,
        login,
        logout,
        bookAppointment,
        getMyAppointments,
        cancelAppointment,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider