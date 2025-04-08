import React from 'react'
import { diseasedata } from '../assets/asset'
import { Link } from 'react-router-dom'

const Diseasemenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='disease'>
      <h1 className='text-3xl font-medium'>Find By Disease</h1>
      <p className='sm:w-1/3 text-center text-1xl '>Find The Best Hospital for your Treatment Based on the Disease</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
             {diseasedata.map((item,index) => (
              <Link onClick={()=>scrollTo(0,0)} to={`/doctors/${item.disease}`} key={index} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 '>
              <img className='w-13 mx-3 sm:w-24 mb-2' src={item.image} alt="" />
              <p>{item.disease}</p>
              </Link>
             ))
              }
      </div>
    </div>
  )
}

export default Diseasemenu
