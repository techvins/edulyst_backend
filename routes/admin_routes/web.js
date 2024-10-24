import express from 'express';
const router = express.Router();
import CollegeController from '../../admin_controllers/college_controllers/collegeController.js';
import CourseController from '../../admin_controllers/course_controllers/courseController.js';
import CollegeApplicationFormController from '../../admin_controllers/college_controllers/collegeApplicationFormController.js';


router.get('/college', CollegeController.getAllDoc)
router.post('/college', CollegeController.createDoc)
router.get('/college/:id', CollegeController.getSingleDocById)
router.put('/college/:id', CollegeController.updateDocById)
router.delete('/college/:id', CollegeController.deleteDocById)

router.get('/college/course', CourseController.getAllDoc)
router.post('/college/course', CourseController.createDoc)
router.get('/college/course/:id', CourseController.getSingleDocById)

router.post('/college-application-form', CollegeApplicationFormController.createDoc);
router.get('/college-application-form', CollegeApplicationFormController.getAllDocs);
router.get('/college-application-form/:id', CollegeApplicationFormController.getSingleDocById);



export default router