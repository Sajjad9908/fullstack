import { requireAuth } from '@clerk/express';
import express from 'express';
import { getUserData, PurchaseCourse, userEnrolledCourses } from '../controller/UserController.js';

const userRouter=express.Router();

userRouter.get('/data',requireAuth(),getUserData)
userRouter.get('/enrolled-courses',requireAuth(),userEnrolledCourses)
userRouter.post('/purchase',requireAuth(),PurchaseCourse);

export default userRouter;