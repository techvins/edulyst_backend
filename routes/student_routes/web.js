import express from 'express';
const router = express.Router();
import createStudentApplication from '../../controllers/student_controllers/studentApplicationController.js';
router.post('/student-application-form', createStudentApplication.createDoc);

export default router;