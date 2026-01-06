import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets/assets'
import Loading from '../../components/students/Loading';

const StudentsEnrolled = () => {
  const [enrolledStudents,setEnrolledStudents]=useState(null);
  const FetchEnrolledStudents=()=>{
    setEnrolledStudents(dummyStudentEnrolled);
  }
  useEffect(()=>{
    FetchEnrolledStudents();
  })

  return enrolledStudents?
  (
    <>
    <div className='min-h-screen flex flex-col item-start justify-between md:p-8 md:pb-0 p-3.5 pt-8 pb-0'>
      <div className='flex flex-col max-w-4xl w-full overflow-hidden'>
        <h2 className='pb-4 text-lg font-bold'>Students Enrolled</h2>
      <table className='table-fixed md:table-auto w-full overflow-hidden pb-4 mb-3.5'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
        <tr>
          <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
          <th className='px-4 py-3 font-semibold '>Student Name</th>
          <th className='px-4 py-3 font-semibold '>Course Title</th>
          <th className='px-4 py-3 font-semibold '>Date</th>
        </tr></thead>
        <tbody className='text-sm text-gray-900'>
          { enrolledStudents.map((student,index)=>(
            <tr key={index} className='border-b border-gray-500/20'>
              <td className='hidden sm:table-cell p-2 pt-5'>{index+1}</td>
              <td className='flex items-start sm:gap-2 gap-0  p-2 pt-5'>
                <img src={student.student.imageUrl} className='w-5 rounded-full max-sm:hidden'/>
                {student.student.name}</td>
                <td className=' p-4 pt-5'>{student.courseTitle}</td>
                <td className=' p-2 pt-5'>{new Date(student.purchaseDate).toLocaleDateString()}</td>
            </tr>
          ))}
          </tbody>

      </table>
      </div>
    </div>
  
    </>
  ):<Loading/>;
}

export default StudentsEnrolled