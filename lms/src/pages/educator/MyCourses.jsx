import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading';

const MyCourses = () => {
  const {currency, allcourses} = useContext(AppContext);
  const [courses,setCourses]=useState([]);

  const FetchEducator=()=>{
    setCourses(allcourses)
  }
  useEffect(()=>{
    FetchEducator();
  },[])
  return courses? (
    <div className='h-screen flex flex-col item-start justify-between md:p-8 md:pb-0 px-2 max-sm:flex-wrap pt-8 pb-0'>
   <div className='w-full'>
    <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
    <div className='flex flex-col item-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
      <table >
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:text-center'>
        <tr>
          <th className='px-4 py-3 font-semibold truncate min-w-0 max-sm:whitespace-normal max-sm:overflow-visible max-sm:text-clip max-sm:px-2 max-sm:py-1 '>AllCourses</th>
          <th className='px-4 py-3 font-semibold truncate min-w-0 max-sm:whitespace-normal max-sm:overflow-visible max-sm:text-clip max-sm:px-2 max-sm:py-1 '>Earnings</th>
          <th className='px-4 py-3 font-semibold truncate min-w-0 max-sm:whitespace-normal max-sm:overflow-visible max-sm:text-clip max-sm:px-2 max-sm:py-1 '>Published On</th>
        </tr>
         </thead>
        <tbody className='text-sm text-gray-900 truncate  max-sm:whitespace-normal max-sm:overflow-visible max-sm:text-clip'>
        {courses.map((course,index)=>(
          <tr key={index} className='border-b border-gray-500/20'>
            <td className='md:px-4 pl-2 md:pl-4 py-3 flex item-center space-x-3 max-sm:space-x-0 max-sm:pl-0 max-sm:pr-0 truncate min-w-0'>
              <img src={course.courseThumbnail} className='w-16 min-w-0' alt='thumbnail Image'/>
              <span className='truncate hidden md:block '>{course.courseTitle}</span>
            </td>
            <td className='px-4 py-3'>{currency}{Math.floor(course.enrolledStudents.length *(course.coursePrice - course.discount*course.coursePrice/100))}</td>
            <td className='px-4 py-3 hidden md:inline-block'>{course.enrolledStudents.length}</td>
            <td className='px-4 py-3'>{new Date(course.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
        </tbody>
       
      </table>
    </div>
   </div>

    </div>
     
    
  ):<Loading/>;
}

export default MyCourses