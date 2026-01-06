import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/students/Footer';
import YouTube from 'react-youtube';
import Loading from '../../components/students/Loading';

const CourseDetail = () => {

  const {id}=useParams();
  const [courseData,setCourseData]=React.useState(null);
  const {allcourses,courseRatting, ChapterTimeCalculation, TotalTimeDuration, TotalLectures,currency,loading}=React.useContext(AppContext);
  const [plaerData,setPlayerData]=React.useState(null);

  const FetchCourseData=async()=>{
   
      const foundCourse=allcourses.find(course=>course._id===id);
      setCourseData(foundCourse);
    
  }

  useEffect(()=>{
    FetchCourseData();
  },[allcourses, id])

  const [openSection,setOpenSection]=React.useState({});
  const [isAlreadyEnrolled,setIsAlreadyEnrolled]=React.useState(false);

  const toggleSection=(index)=>{
    setOpenSection((prev)=>({...prev,[index]:!prev[index]}))
  }

  if (loading || !courseData) {
    return <Loading />;
  }

  return courseData ? ( 
    <>
    <div className='flex flex-col-reverse md:flex-row gap-10 md:gap-6 relative items-start justify-between md:px-24 px-4 md:pt-30 pt-20 text-left'>
    <div className='absolute top-0 left-0 w-full h-section-height z-10 bg-linear-to-b from-cyan-100/70'></div>
    <div className='max-w-xl text-gray-500 z-10'>
      <h1 className='md:text-4xl text-2xl font-semibold text-gray-800'>
        {courseData.courseTitle}
      </h1>
      <p className='pt-4 text-base' dangerouslySetInnerHTML={{__html:courseData.courseDescription.slice(0,200)}}></p>
    
       <div className='flex items-center gap-2 my-2 pt-1 pb-3 text-sm'>
            <p className='shrink-5'>{courseRatting(courseData)}</p>
            <div className='flex items-center gap-1'>
              {
                [...Array(5)].map((_,index)=>(
                  <img className='basis-[50%] w-2.5' key={index} src={index< Math.floor(courseRatting(courseData) ) ? assets.star : assets.star_blank}/>
                ))
              }
            </div>
            <p className='text-blue-500'>( {courseData.courseRatings.length} {courseData.courseRatings.length>1 ? 'ratings' : 'rating'})</p>
            <p className='text-gray-500'>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length >1 ?"students" : "student"}</p>
          </div>
          <p className='text-sm underline text-blue-600'>Course By {courseData.educator[0].name}</p>

          <div className='pt-8 text-gray-800' >
            <h2 className='font-semibold text-xl pb-2'>Course Details</h2>
            <div className='pt-5'>
              {courseData.courseContent.map((chapter,index)=>{
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
                    chapter.chapterContent.map((lecture,index)=>(
                      <li key={index} className='flex justify-between gap-2'>
                        <div className='flex items-center gap-3 px-6 py-2 hover:bg-gray-100'>
                        <img src={assets.play_icon} className='w-4 h-4 mt-1' />
                        <div>
                          <p >{lecture.lectureTitle}</p>

                          </div>
                           </div>
                          <div className='flex p-2 gap-2'>{lecture.isPreviewFree && <p onClick={()=>setPlayerData({
                            videoId:lecture.lectureUrl.split('/').pop()
                          })} className='cursor-pointer text-blue-600'>preview
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

            
          </div>

          <div className='mt-12 text-gray-800'>
            <h3 className='text-2xl font-semibold text-gray-800 '>Course Description</h3>
            <div className='text-gray-800 mt-2 prose prose-gray max-w-none 
             prose-ul:list-disc 
             prose-ul:pl-6
             prose-li:mb-2
             prose-li:text-gray-700' dangerouslySetInnerHTML={{__html:courseData.courseDescription}}></div>
          </div>
          
    </div>



    <div className='w-[60%] md:w-120 min-w-75 z-10 p-9 shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)]'>

      {plaerData ? <YouTube videoId={plaerData.videoId} opts={{playerVars:{autoplay:1}}} iframeClassName='w-full aspect-' /> :   <img className=' md:w-full' src={courseData.courseThumbnail} alt="Course" />
   }
     
    <div className='pt-5'>
      <div className='flex gap-2'>
        <img className='w-3.5 ' src={assets.time_left_clock_icon}/>
        <p className='text-red-500'><span className='font-medium'>5 days</span>left at this parcel</p>
      </div>

      <div className='text-gray-800 mt-3.5 flex items-center gap-2'>
        <p className="font-bold text-2xl md:text-4xl text-gray-800 ">
  {currency}
  {(
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100
  ).toFixed(2)}
</p>

      <p className='line-through md:text-lg text-gray-700'>{currency}{courseData.coursePrice }</p>
        <p className='md:text-lg text-gray-700'>{courseData.discount}% off</p>

      </div>
      <div className='flex items-center gap-2 pt-3 text-gray-700'>
        <div className='w-14 border-r border-gray-400 flex items-center gap-2'>
        <img className='w-4' src={assets.star}/>
        <p>{courseData.courseRatings.length > 0 ? courseData.courseRatings[0].rating : courseRatting(courseData)}</p>
        </div>

         <div className='w-28 border-r border-gray-400 flex items-center gap-2'>
        <img className='w-4' src={assets.time_clock_icon}/>
        <p>{TotalTimeDuration(courseData)}</p>
        </div>

         <div className='w-14 flex items-center gap-2'>
        <img className='w-4' src={assets.lesson_icon}/>
        <p>{TotalLectures(courseData)}</p>
        </div>

      </div>

     
        <button className='w-full bg-blue-600 p-3 text-center rounded mt-6 text-white'>{isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}</button>
    
      <div className='mt-4'>
        <h2 className='md:text-xl text-lg font-medium text-gray-800'>Whats in the Course?</h2>
        <ul className='text-gray-400 text-base list-disc '>
          <li>Lifetime access with free updates.</li>
          <li>Step-by-step, hands-on project guidance.</li>
          <li>Downloadable resources and source code.</li>
          <li>Quizzes to test your knowledge.</li>
          <li>Certificate of completion.</li>
        </ul>
      </div>
    </div>
    </div>

     </div>

     <div className='text-center mt-6'>
      <Footer/>
     </div>
    </>
  ) : (<div><Loading/></div>)
}

export default CourseDetail