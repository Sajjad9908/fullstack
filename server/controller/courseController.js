import Course from '../model/Course.js'
import Purchase from '../model/purchase.js';
import User from '../model/User.js';

export const GetAllCourses=async(req,res)=>{
    try {
        const courses=await Course.find({isPublished:true}).select(['-courseContent','-enrolledStudents']).populate({path:'educator'});
        res.json({success:true, courses:courses});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}
export const getCourseId=async(req,res)=>{
     const {id}=req.params;
try {
   const courseData=await Course.findById(id).populate({path:'educator'});
   courseData.courseContent.forEach((chapter)=>{
    chapter.chapterContent.forEach((lecture)=>{
       if(!lecture.isPreviewFree){
        lecture.lectureUrl="";
       }
    })
   })
    res.json({success:true, courseData:courseData});
} catch (error) {
    res.json({success:false, message:error.message});
}
}

