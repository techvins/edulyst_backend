import express from 'express';
const router = express.Router();
import CollegeController from '../../controllers/college_controllers/collegeController.js';

router.get('/', CollegeController.getAllDoc)
router.post('/', CollegeController.createDoc)
router.get('/:id', CollegeController.getSingleDocById)
router.put('/:id', CollegeController.updateDocById)
router.delete('/:id', CollegeController.deleteDocById)

export default router