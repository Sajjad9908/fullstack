import React from 'react'
import { assets } from '../../assets/assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-6 md:px-0'>
   <h1 className='text-xl md:text-4xl font-semibold text-gray-800'> Learn anything, anytime, anywhere </h1>
   <p className='text-gray-500 sm:text-sm'>
   Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.
   </p>
   <div className='flex items-center max-w-100 min-w-50 sm:flex-nowrap font-medium gap-6 mt-4'>
    <button className='px-10 cursor-pointer py-3 rounded-md text-white bg-blue-600'> Get Started </button>
    <button className='bg-white flex items-center justify-betwee px-6 py-3 rounded-md gap-4 cursor-pointer'> Learn More <img src={assets.arrow_icon} alt="Arrow-Icon" /></button>
   </div>
   </div>
  )
}

export default CallToAction