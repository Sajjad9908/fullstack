import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { Line } from 'rc-progress';
import Footer from '../../components/students/Footer';

const MyEnrollments = () => {
  const {enrolledCourses,TotalTimeDuration}=useContext(AppContext);
  const [progressArray,setProgressArray]=React.useState( [ {
    lectureCompleted: 2,
    totalLecture: 4
  },
  {
    lectureCompleted: 1,
    totalLecture: 4
  },
  {
    lectureCompleted: 2,
    totalLecture: 5
  }
,
  {
    lectureCompleted: 6,
    totalLecture: 6
  }
  ,
  {
    lectureCompleted: 3,
    totalLecture: 9
  }
  ,
  {
    lectureCompleted: 1,
    totalLecture: 5
  }
  ,
  {
    lectureCompleted: 9,
    totalLecture: 12
  }
  ,
  {
    lectureCompleted: 2,
    totalLecture: 10
  }
]);
const navigate=useNavigate();
  return (

    <>
    <div className='px-8 md:px-36 pt-10'>
      <h1 className='text-2xl font-semibold'>My Enrollments</h1>
    
    <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
      <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
        <tr>
          <th className='px-4 py-3 font-semibold truncate'>Course</th>
          <th className='px-4 py-3 font-semibold truncate'>Duration</th>
          <th className='px-4 py-3 font-semibold truncate'>Completed</th>
          <th className='px-4 py-3 font-semibold truncate'>Status</th>
        </tr>
        </thead>
        <tbody className='text-gray-700'>
          {enrolledCourses.map((course,index)=>(
            <tr className='border-b border-gray-500/70' key={index} >
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 flex-wrap'>
                <img className='w-44' src={course.courseThumbnail}  />
                <div className='flex-1'>
                  <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line strokeWidth={2} percent={progressArray[index]? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLecture : 0} className='bg-gray-300 rounded-full'/>
                </div >
              </td>

              <td className='px-4 py-3 max-sm:hidden'>
                {TotalTimeDuration(course)}
              </td>
           
           <td className='px-4 py-3 max-sm:hidden'>
            {progressArray[index]&& `${progressArray[index].lectureCompleted}/${progressArray[index].totalLecture}`} <span>Lecture</span>
           </td>
           <td className='px-4 py-3 max-sm:text-right'><button onClick={()=>navigate('/player/'+course._id)} className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white cursor-pointer'>{progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLecture === 1 ? "Completed" : "Ongoing"}</button></td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
    <div className='text-center mt-8'>
    <Footer/>
    </div>
    </>
  )
}

export default MyEnrollments