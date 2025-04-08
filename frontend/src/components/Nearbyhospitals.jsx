import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Nearbyhospitals = () => {

const navigate = useNavigate()
const { hospitals } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Hospitals Nearby You</h1>
      <p className='sm:w-1/3 text-center text-1xl'>Simply Browse through an extensive list of Hospitals Nearby you</p>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 pt-5 px-3 sm:px-0'>
        {hospitals.slice(0, 10).map((item, index) => (
          <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'>
            <img className='bg-blue-50 w-full h-60 object-cover ' src={item.image} alt=""  />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Opened</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm '>{item.disease}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg'>More</button>
    </div>
  );
};

  
export default Nearbyhospitals
