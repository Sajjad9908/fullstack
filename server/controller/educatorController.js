import {clerkClient, } from '@clerk/express';
import Course from '../model/Course.js';
import {v2 as cloudinary} from 'cloudinary';
import Purchase from '../model/purchase.js';
import User from '../model/User.js';


export const UpdateRoleToEducator=async(req,res)=>{
    try {
        const userId=req.auth().userId;
        await clerkClient.users.updateUserMetadata(userId,{
            publicMetadata:{
                role:"educator"
            }

        })
        res.json({success:true, message:"You can Publish a course now"})
    } catch (error) {
        res.json({success:false, message:"Failed to update role"})
        console.log("Error updating role to educator",error);
    }
}

export const Addcourse=async(req,res)=>{
    try {
        const {courseData}=req.body;
        const imageFile=req.file;
        const educatorId=req.auth().userId;
        if(!imageFile){
            return res.json({success:false, message:"Thumbnail not found"})
        }
        const ParsedData= await JSON.parse(courseData);
        console.log("Parsed Data:",ParsedData);
        ParsedData.educator=educatorId;
        
        // Upload image first before creating course
        const imageUpload= await cloudinary.uploader.upload(imageFile.path);
        ParsedData.courseThumbnail = imageUpload.secure_url;
        
        // Now create course with thumbnail URL included
        const newCourse = await Course.create(ParsedData);
        res.json({success:true, message:"Course added successfully", courseId: newCourse._id});
    } catch (error) {
          console.error("AddCourse Error:", error);
        res.json({success:false, message:"Failed to add course"});
    }
}


//Get Educator's Courses
export const EducatorCourses=async(req,res)=>{
    try {
        const educator=req.auth().userId;
        const courses=await Course.find({educator:educator});
        res.json({success:true, courses:courses});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export const educatorDashboardData=async(req,res)=>{
    try {
        const educator=req.auth().userId;
        const courses=await Course.find({educator:educator});
        const totalCourses=courses.length;
        const CourseIds=courses.map(course=>course._id);
        const Purchases=await Purchase.find({
            courseId:{$in:CourseIds},
            status:"completed"
        });

        const totalEarnings=Purchases.reduce((sum,purchase)=>sum+purchase.amount,0);
        const enrolledStudentsData=[];
        for(const course of courses){
            const students=await User.find({
                _id:{$in:course.enrolledStudents}
            },'name imageUrl')
        students.forEach(student=>{
            enrolledStudentsData.push({
                courseTitle:course.courseTitle,
                student
            })
        })
    }
        res.json({
            success:true,
            Dashboarddata:{
               
                totalEarnings,
                totalCourses,
                enrolledStudentsData
            }
        });
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export const getEnrolledStudentsData=async(req,res)=>{
    try {
        const educator=req.auth().userId;
         const courses=await Course.find({educator:educator});
         const CourseIds=courses.map(course=>course._id);
         const purchases= await Purchase.find({
            courseId:{$in:CourseIds},
            status:"completed"
         }).populate('userId','name imageUrl').populate('courseId','courseTitle');
          const enrolledStudents=purchases.map(purchase=>({
            student:purchase.userId,
           courseTitle:purchase.courseId.courseTitle,
           purchaseDate:purchase.createdAt
          }))
          res.json({success:true, enrolledStudents:enrolledStudents});

    } catch (error) {
        res.json({success:false, message:error.message});
    }
}