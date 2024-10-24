import express from 'express';
const router = express.Router();
import CollegeController from '../../controllers/college_controllers/CollegeController.js';

router.get('/', CollegeController.getAllDoc);

router.get('/:id', CollegeController.getSingleDocById);

export default router