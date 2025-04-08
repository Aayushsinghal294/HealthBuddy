import React from 'react'
import { assets } from '../assets/asset'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-emerald-500 rounded-lg px-6 md:px-10 lg:px-20'>
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
      <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>  Find Fastest Treatment <br/> With Best Hospitals </p>
      <div className='flex flex-xol md:flex-row items-center gap-3 text-white text-1.5xl font-light '>
        <img className='w-25 rounded' src={assets.docicon} alt="" />
        <p>Get the fastest hospital by calculating <br className='hidden sm:block' />queue time + travel time.</p>
      </div>
      <a href="#disease" className='flex items-center gap-2 bg-white mt-1 px-8 py-3 rounded-full text-gray-600 text-1xl m-auto md:m-0 hover:scale-105 transition-all duration-300'>
        Find Hospitals  <img className='w-3' src={assets.arrow} alt="" />
      </a>
      </div>
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg ' src={assets.h1} alt="" />
      </div>
    </div>
  )
}

export default Header
