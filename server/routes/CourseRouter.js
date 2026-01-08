import express from 'express';
import { GetAllCourses, getCourseId } from '../controller/courseController.js';

const courseRouter=express.Router();

courseRouter.get('/all',GetAllCourses)
courseRouter.get('/:id',getCourseId);

export default courseRouter;
