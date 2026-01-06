import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import Sidebar from '../../components/educator/Sidebar'
import Footer from '../../components/educator/Footer'


const Educator = () => {
  return (
  <>
    <div className='relative'>
  <Navbar/>
  <div className='flex'>
    <Sidebar/>
    <div className='flex-1'>
   <Outlet/>
   </div>
  
   </div>
   <div className='text-center'>
   <Footer/>
   </div>
   
    </div>
   

  </>

  )
}

export default Educator