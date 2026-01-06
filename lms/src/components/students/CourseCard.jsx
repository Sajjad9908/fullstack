import React, { useContext } from 'react'
import { assets } from '../../assets/assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {
  const {currency,courseRatting}=useContext(AppContext)
  return (
   <>
   <Link to={'/course/' + course._id} onClick={()=>scrollTo(0,0)} className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer w-full pb-12 border border-gray-500/30 overflow-hidden min-w-0'>
    <img className='w-full h-auto rounded-tl-2xl rounded-tr-2xl object-cover' src={course.courseThumbnail}/>
    <div className='flex flex-col items-start pl-2 pt-4 min-w-0 '>
      <h3 className='text-base font-semibold text-left'>{course.courseTitle}</h3>
      <p>{course.educator[0].name}</p>
      <div className='flex items-center gap-2 my-2'>
        <p className='shrink-5'>{courseRatting(course)}</p>
        <div className='flex items-center gap-1'>
          {
            [...Array(5)].map((_,index)=>(
              <img className='basis-[50%] w-2.5' key={index} src={index< Math.floor(courseRatting(course) ) ? assets.star : assets.star_blank}/>
            ))
          }
        </div>
        <p>{course.courseRatings.length}</p>
      </div>
      <p className='text-base font-semibold text-gray-800'>{currency}{(course.coursePrice-course.discount * course.coursePrice / 100).toFixed(2)}</p>
    </div>
   </Link>
   </>
  )
}

export default CourseCard