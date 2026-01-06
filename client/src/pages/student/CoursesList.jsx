import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SearchBar from '../../components/students/SearchBar'
import { AppContext } from '../../context/AppContext'
import CourseCard from '../../components/students/CourseCard'
import { assets } from '../../assets/assets/assets'
import Footer from '../../components/students/Footer'
import Loading from '../../components/students/Loading'

const CoursesList = () => {
  const {allcourses,loading}=useContext(AppContext)
  const {input}=useParams();

  const [filteredCourses,setFilteredCourses]=React.useState([]);
  useEffect(()=>{
    if(allcourses && allcourses.length>0){
    const temporyCourse=allcourses.slice()
   input ? setFilteredCourses(temporyCourse.filter((item)=>item.courseTitle.toLowerCase().includes(input.toLocaleLowerCase()) )):setFilteredCourses(temporyCourse);

  }

  },[allcourses,input])
const navigate=useNavigate();
  const setInputEmpty=()=>{
    setFilteredCourses(allcourses.slice());
    navigate('/course-list');

  }

  if (loading) {
    return <Loading />;
  }

  return (
  <>
  <div className='px-8 md:px-36 pt-20 text-left'>
    <div className='flex gap-6 items-start flex-col md:flex-row md:items-center md:justify-between'>
      <div className='w-full' >
      <h1 className='text-2xl sm:text-4xl font-semibold text-gray-800'>Course List</h1>
      <p><Link to="/"> <span className="text-blue-600">Home</span> </Link>/ Course List</p>
      </div>
      <div className='w-full  min-w-50 sm:min-w-100 '>
        <SearchBar data={input}/>
      </div>
    </div>

  {input &&  <>
  
  <div className='inline-flex items-center '>
    <p className='text-gray-600 text-lg mt-6'>Showing results for "<span className='font-medium'>{input}</span>"</p>
    <img className='w-[20px] h-[20px] text-red-600 mt-6 cursor-pointer ml-2' onClick={setInputEmpty} src={assets.cross_icon}/>

  </div>
  </>

  }
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 px-2 md:p-0 gap-2'>
      {filteredCourses.map((course,index)=>(
        <CourseCard key={index} course={course}/>
      ))}
    </div>
   
  </div>
  <div className='px-14 bg-[#111827]'>
  <Footer/>
  </div>
  </>
  )
}

export default CoursesList