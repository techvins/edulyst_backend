import express from 'express';
const router = express.Router();
import CollegeController from '../../admin_controllers/college_controllers/collegeController.js';
import CourseController from '../../admin_controllers/course_controllers/courseController.js';

router.get('/college', CollegeController.getAllDoc)
router.post('/college', CollegeController.createDoc)
router.get('/college/:id', CollegeController.getSingleDocById)
router.put('/college/:id', CollegeController.updateDocById)
router.delete('/college/:id', CollegeController.deleteDocById)

router.get('/course', CourseController.getAllDoc)
router.post('/course', CourseController.createDoc)
router.get('/course:id', CourseController.getSingleDocById)

export default router