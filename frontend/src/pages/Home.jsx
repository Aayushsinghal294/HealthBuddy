import React from 'react'
import Header from '../components/Header'
import Diseasemenu from '../components/Diseasemenu'
import Nearbyhospitals from '../components/Nearbyhospitals'

const Home = () => {
  return (
    <div>
      <Header/>
      <Diseasemenu/>
      <Nearbyhospitals/>
    </div>
  )
}

export default Home
