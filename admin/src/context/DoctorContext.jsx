import React, { createContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [hToken, setHToken] = useState(localStorage.getItem('hToken') ? localStorage.getItem('hToken') : '')
    const [hospitalData, setHospitalData] = useState(null)
    const socketRef = useRef(null)

    const value = {
        backendUrl,
        hToken,
        setHToken,
        hospitalData,
        setHospitalData,
        fetchHospitalProfile: async (token = hToken) => {
            if (!token) return null
            try {
                const { data } = await axios.get(`${backendUrl}/api/hospitals/me`, {
                    headers: { hToken: token },
                })

                if (data.success) {
                    setHospitalData(data.hospital)
                    // notify socket server to join hospital room
                    try {
                        if (socketRef.current && socketRef.current.connected) {
                            socketRef.current.emit('auth:hospital', token)
                        }
                    } catch (e) {
                        console.error('Socket auth emit failed', e)
                    }

                    return data.hospital
                }
            } catch (error) {
                console.error('Failed to fetch hospital profile', error)
            }
            return null
        },
        logoutHospital: () => {
            setHToken('')
            setHospitalData(null)
            localStorage.removeItem('hToken')
        },
    }

    useEffect(() => {
        if (!backendUrl) return;
        const socket = io(backendUrl);
        socketRef.current = socket
        socket.on('hospital:updated', (updated) => {
            setHospitalData((prev) => {
                if (!prev) return prev;
                if (prev._id === updated._id) return updated;
                return prev;
            });
        });

        return () => {
            try { socket.disconnect(); } catch(e){}
            socketRef.current = null
        };
    }, [backendUrl]);

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider