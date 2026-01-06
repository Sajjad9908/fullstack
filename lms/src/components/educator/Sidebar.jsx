import React, { useContext } from 'react'
import { assets } from '../../assets/assets/assets';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  const {educator}=useContext(AppContext);
  const menuItems=[ 
    {name:'Dashboard',path:'/educator/',icon:assets.home_icon},
    {name:'Add Courses',path:'/educator/add-course',icon:assets.add_icon},
    {name:'My Courses',path:'/educator/my-courses',icon:assets.my_course_icon},
    {name:'Student Ecrolled',path:'/educator/student-enrolled',icon:assets.person_tick_icon},

   
  ];
  return educator && (
    <>
    <div className='w-16 md:w-64 h-screen border-r border-gray-300 flex flex-col gap-10 sticky top-0 bg-white pt-8 px-2 md:px-4 truncate'>

    
    {menuItems.map((item=>(
      
      <NavLink to={item.path} key={item.name} className={({isActive})=>`flex items-center md:flex-row flex-col md:justify-start justify-center py-4 md:px-10 gap-3 rounded transition-colors ${isActive ? 'bg-gray-200 font-semibold':''}`}>
        <div className='flex items-center gap-8'>
        <img src={item.icon} className='w-6 h-6 md:w-8 md:h-8'/>
        <p className='md:block hidden'>{item.name}  </p>
  
        </div>

      </NavLink>
      
    )))}
    </div>

    </>
  )
}

export default Sidebar