import express from 'express';
const router = express.Router();
import CollegeController from '../../admin_controllers/college_controllers/collegeController.js';
import CourseController from '../../admin_controllers/course_controllers/courseController.js';
import CollegeApplicationFormController from '../../admin_controllers/college_controllers/collegeApplicationFormController.js';
import StudentApplicationController from '../../admin_controllers/student_controllers/studentController.js';


router.get('/college', CollegeController.getAllDoc)
router.post('/college', CollegeController.createDoc)
router.get('/college/:id', CollegeController.getSingleDocById)
router.put('/college/:id', CollegeController.updateDocById)
router.delete('/college/:id', CollegeController.deleteDocById)

router.get('/course', CourseController.getAllDoc)
router.post('/course', CourseController.createDoc)
router.get('/course/:id', CourseController.getSingleDocById)
router.put('/course/:id', CourseController.updateDocById)
router.delete('/course/:id', CourseController.deleteDocById)

router.post('/college-application-form', CollegeApplicationFormController.createDoc);
router.put('/college-application-form/:id', CollegeApplicationFormController.updateDocById);
router.get('/college-application-form', CollegeApplicationFormController.getAllDocs);
router.get('/college-application-form/:id', CollegeApplicationFormController.getSingleDocById);
router.post('/college-application-form/clone/:id', CollegeApplicationFormController.cloneDocById);

router.get('/application', StudentApplicationController.getAllDoc);
router.get('/application/:id', StudentApplicationController.getSingleDocById);



export default router