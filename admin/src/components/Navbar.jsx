import React, { useContext } from 'react'
import { assets } from '../assets/asset'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken , setAToken} = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
       aToken && setAToken('')
       aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md border-b">
      <div className="flex items-center gap-4">
        <img src={assets.logo} alt="Logo" className="h-10 w-auto object-contain" />
        <p className="text-lg font-semibold text-gray-700">
          {aToken ? 'Admin' : 'Doctor'} Panel
        </p>
      </div>

      <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-medium">
        Logout
      </button>
    </div>
  )
}

export default Navbar
