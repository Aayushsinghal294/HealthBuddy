import React, { useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
  const {setAToken,backendUrl} = useContext(AdminContext)

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
           
      }
      
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100'>
      <div className='flex flex-col gap-6 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-[90%] max-w-sm'>
        <h2 className='text-xl font-semibold text-gray-700'>
          <span className='text-indigo-600'>{state}</span> Login
        </h2>

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
          Login
        </button>
        {
           state === 'Admin'
           ?<p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
           :<p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
