import React from 'react'
import { assets } from '../../assets/assets/assets'


const Footer = () => {
  return (
   <footer className="flex flex-col-reverse md:flex-row text-center justify-between md:px-11 px-0">
    
  <div className='flex items-center gap-4'>
    <img src={assets.logo} className='hidden md:block w-20'/>
    <div className='hidden md:block h-7 w-px bd-gray-500/60'></div>
    <p className='py-4 text-center text-xs md-text-sm text-gray-500'>copy right 2025 @GreatStack.All Rights Reserved</p>

  </div>

  <div className='flex item-center gap-3 max-md:mt-4'>
    <a href="#"><img src={assets.facebook_icon}/></a>
    <a href="#"><img src={assets.twitter_icon}/></a>
    <a href="#"><img src={assets.instagram_icon}/></a>
  </div>
   </footer>
  )
}

export default Footer