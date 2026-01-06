import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets/assets';
const AddCourse = () => {
  const quillref=useRef(null);
  const editorref=useRef(null);

  const [coursePrice,setCoursePrice]=React.useState(0);
  const[courseTitle,setCourseTitle]=React.useState('');
  const[discount,setDiscount]=React.useState(0);
  const [image,setImage]=useState(null)
  const[chapters,setChapters]=useState([]);
  const[showPopup,setShowPopup]=useState(false);
  const[currentChapterId,setCurrentChapterId]=useState(null);
  const[lectureDetail,setLectureDetail]=useState({
    title:'',
    lectureDuration:'',
    lectureUrl:'',
    isPreviewFree:false
  });

  useEffect(()=>{
    if(!quillref.current && editorref.current){
      quillref.current=new Quill(editorref.current,{
        theme:'snow',
      })
    }
  },[])

  const handleChapter=(action,chapterId)=>{
    if(action==='add'){
      const title=prompt('Enter Chapter Title');
      if(title){
        const newChapter={
          id:uniqid(),
          chapterTitle:title,
          chapterContent:[],
          collapsed:false,
          chapterOrder:chapters.length>0 ? chapters.slice(-1)[0].chapterOrder +1 : 1
        };
       setChapters([...chapters,newChapter]);
      }
    }
      else if(action==='remove'){
       setChapters(chapters.filter(chapter=> chapter.chapterId !== chapterId));
      }
      else if(action==='toggle'){
        setChapters(chapters.map(chapter=> chapter.chapterId === chapterId ? {...chapter, collapsed: !chapter.collapsed} : chapter));
      }
    
  }

  const handleLecture=(action,chapterId,lecIndex)=>{
      if(action ==='add'){
        setShowPopup(true);
        setCurrentChapterId(chapterId);

      }
      else if(action === 'remove'){
        setChapters(chapters.map((chapter)=>{
          if(chapter.chapterId ===chapterId){
            chapter.chapterContent.splice(lecIndex,1);
          }
          return chapter;
        }))
      }
  }

  const AddLecture=()=>{
    setChapters(chapters.map((chapter)=>{
      if(chapter.chapterId === currentChapterId){
       const newLecture={
        ...lectureDetail,
        lectureOrder:chapter.chapterContent.length>0 ?chapter.chapterContent.slice(-1)[0].lectureOrder+1:1,
        lectureId:uniqid(),
       };
       return{
        ...chapter,
        chapterContent:[...chapter.chapterContent,newLecture],
       };
      }
      return chapter;
    }));
    setShowPopup(false);
    setLectureDetail({
      title:'',
      lectureDuration:'',
      lectureUrl:'',
      isPreviewFree:false
    });
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
  }
  return (
    <div className='h-screen overflow-scroll flex flex-col item-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-4'>
          <input type='text' placeholder='Course Title' value={courseTitle} onChange={(e)=>setCourseTitle(e.target.value)} className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/20' required/>
        </div>

        <div className='flex flex-col gap-1 border-amber-300 mt-9'>
          <p>Course Description</p>
          <div ref={editorref}>
        </div>
        </div>
        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input onChange={e => setCoursePrice(e.target.value)} type='number' placeholder='0' value={coursePrice} className='outline-none md:py-2.5 py-2 w-28 px-3 rounded  border border-gray-500' required/>
          </div>
          <div className='flex md:flex-row flex-col item-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage">
              <img src={assets.file_upload_icon} alt='' className='p-3 bg-blue-500 rounded'/>
              <input type='file' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden/>
              <img className='max-h-10' src={image ? URL.createObjectURL(image):''} alt=''/>
            </label>
          </div>
        </div>
       <div className='flex flex-col gap-1' >
        <p>Discount %</p>
        <input onChange={e=> setDiscount(e.target.value) } value={discount} type='number' placeholder='0' min={0} max={100} className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500 ' required/>

       </div >
        <div>
      {chapters.map((chapter,index)=>(
        <div key={index} className='bg-white border rounded-lg mb-4 '> 
        <div className='flex items-center justify-between p-4 border-b'> 
          <div className='flex items-center '>
            <img onClick={()=>handleChapter('toggle',chapter.chapterId)} src={assets.dropdown_icon} width={14} alt='' className={`mr-2 cursor-pointer transition-all ${chapter.collapsed ? '-rotate-90' : ''}`}/>
            <span className='font-semibold'>{index+1}: {chapter.chapterTitle}</span>
          </div>
          <span className='text-gray-500'>{chapter.chapterContent.length}Lectures</span>
          <img onClick={()=>handleChapter('remove',chapter.chapterId)} src={assets.cross_icon} alt='' className='cursor-pointer '/>
          </div>
          {!chapter.collapsed && (
            <div className='p-4'>
              {chapter.chapterContent.map((lecture,lecIndex)=>(
                <div key={lecIndex} className='flex justify-between item-center mb-2 '>
                  <span>
                    {lecIndex+1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank'>Link</a>
                    {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                  </span>
                  <img src={assets.cross_icon} alt='' className='cursor-pointer' onClick={()=>handleLecture('remove',chapter.chapterId,lecIndex)}/>

                </div>
              ))}
              <div className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2' onClick={()=>handleLecture('add',chapter.chapterId)}>
                 + Add Lecture
              </div>
                 
               </div>
          ) }
        </div>
      ))}

      <div className='flex justify-center item-center bg-blue-100 p-2 rounded-lg cursor-pointer ' onClick={()=>handleChapter('add')}>
        + Add Chapter 
      </div>
      
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 " onClick={() => setShowPopup(false)}>
          <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80 ' onClick={(e) => e.stopPropagation()}>
            <h2 className='text-lg font-semibold mb-4 '>Add Lecture </h2>
            <div className='mb-2'> 
              <p>Lecture Title</p>
              <input
              type='text'
              className='mt-1 block w-full borser rounded py-1 px-2 '
              value={lectureDetail.lectureTitle}
              onChange={e => setLectureDetail({...lectureDetail, lectureTitle: e.target.value})}
              />
            </div>


              <div className='mb-2'> 
              <p>Duration (Minutes)</p>
              <input
              type='number'
              className='mt-1 block w-full borser rounded py-1 px-2 '
              value={lectureDetail.lectureDuration}
              onChange={e => setLectureDetail({...lectureDetail, lectureDuration: e.target.value})}
              />
            </div>

              <div className='mb-2'> 
              <p>Lecture Url</p>
              <input
              type='text'
              className='mt-1 block w-full borser rounded py-1 px-2 '
              value={lectureDetail.lectureUrl}
              onChange={e => setLectureDetail({...lectureDetail, lectureUrl: e.target.value})}
              />
            </div>

                <div className='mb-2'> 
              <p>is Preview Free ? </p>
              <input
              type='checkbox'
              className='mt-1 scale-125 '
              checked={lectureDetail.isPreviewFree}
              onChange={e => setLectureDetail({...lectureDetail, isPreviewFree: e.target.checked})}
              />
            </div>

            <button type='button' className='w-full bg-blue-400 text-white px-4 py-2 rounded ' onClick={AddLecture}>Add</button>
            <img src={assets.cross_icon} onClick={() => setShowPopup(false)} className='absolute top-4 right-4 w-4 cursor-pointer'/>

            </div>

        </div>
      )}
        </div>
        <button  type='submit' className='bg-black text-white w-max py-2.5 px-8 rounded my-4'>ADD</button>
      </form>
    
    </div>

  )
}

export default AddCourse