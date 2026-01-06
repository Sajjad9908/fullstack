import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets/assets';
import humanizeDuration from 'humanize-duration';
import Loading from '../../components/students/Loading';
import YouTube from 'react-youtube';
import Footer from '../../components/students/Footer';
import Ratting from '../../components/students/Ratting';

const Player = () => {
  const {courseId}=useParams();

  const {enrolledCourses,ChapterTimeCalculation}=useContext(AppContext);
  const [courseData,setCourseData]=React.useState(null);
  const [openSection,setOpenSection]=React.useState({});
  const [playerData,setPlayerData]=useState(null);
  const [loading,setLoading]=useState(false);

  const toggleSection=(index)=>{  
    setOpenSection((prevState)=>({
      ...prevState,
      [index]:!prevState[index]
    }))
  }

  const fetchEnrolledCourses= async()=>{
    try {
      setLoading(true);
        enrolledCourses.map((course)=>{
      if(course._id===courseId){
        setCourseData(course);
        console.log("Course data:", course);
        console.log(courseData)
      }
    })
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchEnrolledCourses();
  }, [enrolledCourses]);

  if(loading){
    return <div><Loading/></div>;
  }
  return (
   <>
   <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>


    <div className='text-gray-800'>
      <h2 className='text-xl font-semibold '>Course Structure</h2>
      <div className='pt-5'>
                  {courseData && courseData.courseContent.map((chapter,index)=>{
                    return  (
                      <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                        <div className={`flex items-center justify-between px-4 py-3 cursor-pointer select-none `} onClick={()=>toggleSection(index)}> 
                        
                         <div className='flex items-center gap-2'>
    
                        
                          <img className={`transform transition-transform duration-300 ${openSection[index] ? 'rotate-180' : 'rotate-0'}`} src={assets.down_arrow_icon}/>
                          <p className='font-medium md:text-base text-sm' >{chapter.chapterTitle}</p>
                         
                           </div>
                           <p className='text-sm md:text-default'>{chapter.chapterContent.length}-lecture {ChapterTimeCalculation(chapter.chapterContent)}</p>
    
                       </div>
                       <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-screen' : 'max-h-0'}`}> 
                        <ul className='text-gray-600 border-t border-t-gray-300'>
                       {
                        chapter.chapterContent.map((lecture,i)=>(
                          <li key={i} className='flex justify-between gap-2'>
                            <div className='flex items-center gap-3 px-6 py-2 hover:bg-gray-100'>
                            <img src={false ? assets.blue_tick_icon :assets.play_icon} className='w-4 h-4 mt-1' />
                            <div>
                              <p >{lecture.lectureTitle}</p>
    
                              </div>
                               </div>
                              <div className='flex p-2 gap-2'>{lecture.lectureUrl && <p onClick={()=>setPlayerData({
                                ...lecture, chapter: index+1,lecture:i+1
                              })} className='cursor-pointer text-blue-600'>watch
                              </p>}
                              {humanizeDuration(lecture.lectureDuration*60*1000,{round:true,units:['h','m']})} 
                              </div>
                           
                          </li>
                        ))
                       }
                        </ul>
                       </div>
    
                      </div>
    
                    ) 
                  })}
    
                </div>
                <div className='flex items-center gap-2 mt-10 py-3 '>
                  <h1 className='text-xl font-bold'>
                    rate this Course </h1>
                    <Ratting initialRating={0}/>
                </div>
    </div>

    <div>

      {playerData ? (<div className='md:mt-10'><YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video'/>
      
       <div className='flex items-center justify-between mt-1'>
        <p>{playerData.chapter},{playerData.lecture},{playerData.lectureTitle}</p>
        <button className='text-blue-600'>{false ? 'Completed' : 'Mark Completed'}</button>
       </div>
      </div>
     
    )
            :
      <img src={courseData? courseData.courseThumbnail : ''} />
    }

    </div>
   </div>

   <div className='text-center'>
    <Footer/>
   </div>
   </>
  )
}

export default Player