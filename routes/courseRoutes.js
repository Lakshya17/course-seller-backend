import express from 'express';
import { 
    addLectures, 
    createCourse, 
    deleteCourse, 
    deleteLecture, 
    getAllCourses, 
    getCourseLectures 
} from '../controllers/courseController.js';
import singleUpload from '../middlewares/multer.js';
import { authorizedAdmin, isAuthenticated, authorizedSubscribers } from '../middlewares/auth.js';


const router = express.Router();

router.route('/courses').get(getAllCourses);  // GET all courses without lectures.

router.route('/createcourse').post(isAuthenticated, authorizedAdmin, singleUpload, createCourse)   //POST create new course only admin

router
    .route('/course/:id')
    .get(isAuthenticated, authorizedSubscribers, getCourseLectures)   //Get course lectures
    .post(isAuthenticated, authorizedAdmin, singleUpload, addLectures) //create course lectures
    .delete(isAuthenticated, authorizedAdmin, deleteCourse);  //delete course 


router.route('/lecture').delete(isAuthenticated, authorizedAdmin, deleteLecture);  //delete Lecture

export default router;

