import { createQueue } from './connectbull.js';
import {CourseModel,ApplicationFormModel} from '../models/course_models/course.js'

const scoreQueue = createQueue('score-queue');


scoreQueue.process(async (job) => {
  const { objId } = job.data;
  console.log(`Generate score ${objId}...`);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Score generated done ${objId}`);
});

export default scoreQueue;
