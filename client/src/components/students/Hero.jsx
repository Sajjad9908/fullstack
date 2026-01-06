import React from 'react'
import { assets } from '../../assets/assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
  
    <div  className='flex items-center justify-center flex-col w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-linear-to-b from-[rgba(224,255,255,0.7)]
' >
      <h1 className='text-home-heading-small md:text-home-heading-large relative font-bold text-gray-500 max-w-3xl mx-auto '>
        Empower your future with the courses designed to <span className='text-[#2563eb]'>fit your choice.</span>
        <img src={assets.sketch} className='md:block hidden absolute -bottom-7 right-0' alt='sketch'/>
      </h1>
      <p className='md:block hidden text-[16px] font-normal max-w-2xl text-gray-500 mx-auto h-12'>We bring together world-class instructors, interactive content, and a supportive
community to help you achieve your personal and professional goals.</p>

  <p className='md:hidden text-[16px] font-normal max-w-sm text-gray-500 mx-auto h-12'>We bring together world-class instructors, interactive content, and a supportive
community to help you achieve your personal and professional goals.</p>
<SearchBar/>
    </div>
 
  )
}

export default Hero