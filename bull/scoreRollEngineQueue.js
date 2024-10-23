import { createQueue } from './connectbull.js';
import StudentApplicationModel from '../models/student_models/student.js'

const scoreQueue = createQueue('score-queue');


scoreQueue.process(async (job) => {
  const { objId } = job.data;
  console.log(objId)
  const result = await StudentApplicationModel.findById(objId).populate('studentcourse');
  console.log(result);
});

export default scoreQueue;
