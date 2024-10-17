import express from 'express';
const router = express.Router();
import CollegeController from '../../admin_controllers/college_controllers/collegeController.js';

router.get('/colleges', CollegeController.getAllDoc);

router.get('/college/:id', CollegeController.getSingleDocById);

export default router