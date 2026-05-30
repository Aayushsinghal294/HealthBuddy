import React, { createContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') : '')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const socketRef = useRef(null)

    const value = {
        aToken,
        setAToken,
        backendUrl,
        joinHospitalRoom: (hospitalId) => {
            try {
                if (socketRef.current && socketRef.current.connected) {
                    socketRef.current.emit('admin:join', hospitalId)
                }
            } catch (e) {
                console.error('admin join emit failed', e)
            }
        },
        socketOn: (event, cb) => {
            try { socketRef.current && socketRef.current.on(event, cb) } catch(e){}
        },
        socketOff: (event, cb) => {
            try { socketRef.current && socketRef.current.off(event, cb) } catch(e){}
        }
    }

    useEffect(() => {
        if (!backendUrl) return
        const socket = io(backendUrl)
        socketRef.current = socket

        if (aToken) {
            try { socket.emit('auth:admin', aToken) } catch(e){}
        }

        return () => {
            try { socket.disconnect() } catch(e){}
            socketRef.current = null
        }
    }, [backendUrl])

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider