import React from 'react'
import { assets } from '../../assets/assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <>
   <footer className='bg-[#111827] w-full '>
    <div className='inline-flex md:p-4 items-center flex-wrap md:flex-nowrap px-2.5 gap-2 justify-center sm:gap-2 md:gap-14 lg:gap-36 text-left mt-6'>
      <div className='flex w-full flex-col justify-center md:justify-start items-center md:items-baseline text-center md:text-left'>
        <img src={assets.logo_dark} className='w-45' alt='dark-logo'/>
        <p className='text-gray-400 mt-6 text-[14px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
      </div>
      
    <div className='w-full flex flex-col items-center justify-center md:items-start text-center md:text-left '>
        
        <h3 className='text-gray-400 font-semibold mb-5'>Company</h3>
        <div className='flex w-full md:max-w-55 flex-row md:flex-col pl-8 md:pl-0 items-start gap-6 md:gap-2 md:item-center md:items-baseline '>
        <Link className='text-[14px] text-gray-400' onClick={()=>scrollTo(0,0)} >Home</Link>
         <Link className='text-[14px] text-gray-400' onClick={()=>scrollTo(0,0)} >About us</Link>
         <Link className='text-gray-400 text-[14px]' onClick={()=>scrollTo(0,0)} >Contact Us</Link>
        <Link className='text-gray-400 text-[14px]' onClick={()=>scrollTo(0,0)} >Privacy Policy</Link>
        </div>
        
      </div>

        <div className='w-full flex flex-col items-center mt-6 md:mt-0 md:items-baseline justify-start text-left'>
         <h3 className='text-gray-400 font-semibold mb-5'>Subscribe to our newsletter</h3>
         <p className='text-[14px] text-gray-500 '>The latest news, articles, and resources, sent to your inbox weekly.</p>
         <div className='flex flex-col sm:flex-row items-center gap-2 min-w-50 '>
         <input type="email" placeholder='Enter your email' className='mt-4 p-2.5 border border-gray-500 text-gray-500 w-72 md:w-80 rounded-md outline-none text-[14px]'/>
         <button className='bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium px-4 py-2.5 rounded-md mt-4'>Subscribe</button>
        </div>

        </div>

       
     
    
   
    </div>
    <hr className='mt-6 text-white'/>
     <p className='text-white p-4 text-[14px]'>Copyright 2024 © GreatStack. All Right Reserved.</p>
   </footer>
   </>
  )
}

export default Footer