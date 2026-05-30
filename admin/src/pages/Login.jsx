import React, { useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [hospitalAuthMode, setHospitalAuthMode] = useState('login')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [disease, setDisease] = useState('Viral Disease')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setAToken,backendUrl} = useContext(AdminContext)
  const { setHToken, setHospitalData } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if(state === 'Admin'){

        const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
        if(data.success){
          localStorage.setItem('aToken',data.token) 
          setAToken(data.token)
        }else{
          toast.error(data.message)
        }

      }else{
        const endpoint = hospitalAuthMode === 'register' ? '/api/hospitals/register' : '/api/hospitals/login'
        const payload = hospitalAuthMode === 'register'
          ? { name, email, password, phone, disease }
          : { email, password }

        const { data } = await axios.post(backendUrl + endpoint, payload)
        if(data.success){
          localStorage.setItem('hToken',data.token)
          setHToken(data.token)
          setHospitalData(data.hospital)
          toast.success(hospitalAuthMode === 'register' ? 'Hospital account created' : 'Hospital login successful')
        }else{
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center bg-linear-to-r from-blue-50 to-purple-100'>
      <div className='flex flex-col gap-6 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-[90%] max-w-sm'>
        <h2 className='text-xl font-semibold text-gray-700'>
          <span className='text-indigo-600'>{state}</span> {state === 'Doctor' && hospitalAuthMode === 'register' ? 'Register' : 'Login'}
        </h2>

        {state === 'Doctor' && hospitalAuthMode === 'register' && (
          <>
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-600'>Hospital Name</label>
              <input
                onChange={(e)=>setName(e.target.value)}
                value={name}
                type='text'
                required
                className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-600'>Phone</label>
              <input
                onChange={(e)=>setPhone(e.target.value)}
                value={phone}
                type='text'
                required
                className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-sm text-gray-600'>Primary Disease Type</label>
              <select
                onChange={(e)=>setDisease(e.target.value)}
                value={disease}
                className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                required
              >
                <option value='Viral Disease'>Viral Disease</option>
                <option value='Heart Problem'>Heart Problem</option>
                <option value='Respiratory Disease'>Respiratory Disease</option>
                <option value='Skin Diseases'>Skin Diseases</option>
                <option value='Common Cold'>Common Cold</option>
                <option value='Sun-Stroke'>Sun-Stroke</option>
              </select>
            </div>
          </>
        )}

        <div className='flex flex-col gap-1'>
          <label className='text-sm text-gray-600'>Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}
            type='email'
            required
            className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm text-gray-600'>Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} value={password}
            type='password'
            required
            className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
          />
        </div>

        <button
          type='submit'
          className='mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-medium transition'
        >
          {state === 'Doctor' && hospitalAuthMode === 'register' ? 'Create Account' : 'Login'}
        </button>
        {state === 'Doctor' && (
          <p className='text-sm text-gray-600'>
            {hospitalAuthMode === 'register' ? 'Already have a hospital account? ' : 'Need a hospital account? '}
            <span
              className='text-primary underline cursor-pointer'
              onClick={()=>setHospitalAuthMode(hospitalAuthMode === 'register' ? 'login' : 'register')}
            >
              {hospitalAuthMode === 'register' ? 'Login here' : 'Register here'}
            </span>
          </p>
        )}
        {
           state === 'Admin'
           ?<p>Hospital Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
           :<p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>{setState('Admin'); setHospitalAuthMode('login')}}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
