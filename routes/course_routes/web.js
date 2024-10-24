import express from 'express';
const router = express.Router();
import CourseController from '../../controllers/course_controllers/CourseController.js';

router.get('/', CourseController.getAllDoc);
router.get('/:id', CourseController.getSingleDocById);

export default router;