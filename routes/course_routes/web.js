import express from 'express';
const router = express.Router();
import CourseController from '../../controllers/course_controllers/courseController.js';

router.get('/', CourseController.getAllDoc)
router.post('/', CourseController.createDoc)
router.get('/:id', CourseController.getSingleDocById)

export default router