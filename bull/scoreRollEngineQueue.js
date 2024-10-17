import { createQueue } from './connectbull.js';
import {CourseModel,ApplicationFormModel} from '../models/course_models/course.js'

// Create the email queue
const scoreQueue = createQueue('score-queue');

// Task function to process email sending
scoreQueue.process(async (job) => {
  const { objId } = job.data;
  console.log(`Generate score ${objId}...`);
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate email sending
  console.log(`Score generated done ${objId}`);
});

export default scoreQueue;
