import React, { useContext } from 'react'
import { dummyTestimonial, assets } from '../../assets/assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const Testimonials = () => {

  return (
    <>
  
    <div className='pb-14 px-8 md:px-0 space-y-7'>
      <h2 className='text-[#1f2937] text-[30px] font-medium'>
        Testimonials Page
      </h2>
      <p className='text-gray-500 text-[16px] font-normal'>Hear from our learners as they share their journeys of transformation, success, and how our<br/>
platform has made a difference in their lives.</p>

    </div>
    <div className='grid mx-auto gap-2 sm:w-[80%] md:w-[60%] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 md:px-0 mb-14 rounded-lg'>
      {/* Testimonial Card 1 */}
     { dummyTestimonial.map((testimonial,index)=>(
      <div key={index} className='mx-auto flex flex-col item-center min-w-[180px] max-w-87.5 justify-center border border-gray-300/70'>
        <div className='flex items-center gap-4 bg-gray-500/10 basis-[25%] py-4 px-5'>
        <img className='w-16 h-16 rounded-full object-cover' src={testimonial.image} alt={testimonial.name} />
        <div className='flex flex-col items-start justify-center'>
          <p className='text-gray-800 text-[16px] md:text-[18px] font-medium'>{testimonial.name}</p>
          <p className='text-gray-500 text-[14px] font-normal'>{testimonial.role}</p>
        </div>
        </div>
<div className='p-4 lg:p-6 text-left pl-2'>
      <div className='flex items-start justify-start mt-4 pl-2'>
            {[...Array(5)].map((_,index)=>(

              <img style={{width:'20px',height:'20px'}} key={index} src={index < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt="star" /> 
            ))}
             </div>
            <div className='text-left pl-2'>
            <p className='text-gray-600 text-[14px] font-normal mt-2 max-w-80'>{testimonial.feedback}</p>
            </div>
          
            <Link onClick={()=>scrollTo(0,0)} className='text-blue-600 block underline pl-2 mt-5 text-[14px]' >Read More</Link  >
          
           
          </div>
          </div>
       
       
      ))}

    </div>

      </>
  )
}

export default Testimonials