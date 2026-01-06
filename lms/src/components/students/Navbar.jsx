import React, { useContext } from 'react'
import {assets} from '../../assets/assets/assets.js'
import { Link, useNavigate } from 'react-router-dom';
import { useClerk,UserButton,useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext.jsx';

const Navbar = () => {

  const navigate=useNavigate();
  const {educator,setEducator}=useContext(AppContext)
  const {openSignIn}=useClerk();

  const {user}=useUser();

    const isCourseListPage=location.pathname.includes('/course-list');     
  return (

    <>
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white':'bg-cyan-100/70'}`}>
       <Link to='/' onClick={()=>scrollTo(0,0)}><img src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' /></Link>
        <div className='hidden md:flex items-center gap-5 text-gray-500'>
            <div className='flex items-center gap-5'>
            {
              user && <>
                <button onClick={()=>navigate('/educator')}  className='cursor-pointer'> {educator ? 'Educator Dashboard' : 'Become Educator'}|</button>
            <Link to='/my-enrollments'> My Enrollment </Link>
              
              </>
            }
          
            </div>
            {
              user ? <UserButton/> :
            <button onClick={()=>(openSignIn())} className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>
            }
        </div>
{/* 
       { Phone Screen} */}
        <div className='md:hidden'>
            <div className='flex items-center gap-2 sm:gap-5'>
              {user &&
              <>
                <button onClick={()=>navigate('/educator')}  className='cursor-pointer'> {educator ? 'Educator Dashboard' : 'Become Educator'}|</button>
            <Link to='/my-enrollments'> My Enrollment </Link>
              </>
              }
                  
            {user ? <UserButton/> :
            <button onClick={()=>(openSignIn())}><img src={assets.user_icon}/></button>
            }
            </div>

        </div>
    </div>
    </>
  )
}

export default Navbar