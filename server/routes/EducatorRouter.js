import express from 'express';
import { Addcourse, EducatorCourses, educatorDashboardData, getEnrolledStudentsData, UpdateRoleToEducator } from '../controller/educatorController.js';
import { requireAuth } from '@clerk/express';
import upload from '../configs/multer.js';
import { ProtectEducator } from '../middleware/authMiddleware.js';


const educatorRouter=express.Router();

educatorRouter.get('/update-role', requireAuth(), UpdateRoleToEducator)
educatorRouter.post('/add-course',requireAuth(),upload.single('image'),ProtectEducator,Addcourse);
educatorRouter.get('/courses',requireAuth(),ProtectEducator,EducatorCourses);
educatorRouter.get('/dashboard',requireAuth(),ProtectEducator,educatorDashboardData);
educatorRouter.get('/enrolled-students',requireAuth(),ProtectEducator,getEnrolledStudentsData);


export default educatorRouter;