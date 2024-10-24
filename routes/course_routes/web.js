import express from 'express';
const router = express.Router();
import CourseController from '../../admin_controllers/course_controllers/courseController.js';

router.get('/courses', CourseController.getAllDoc);
router.post('/courses', CourseController.createDoc);
router.get('/college/course/:id', CourseController.getSingleDocById);

export default router;