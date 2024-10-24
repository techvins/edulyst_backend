import { createQueue } from './connectbull.js';
import StudentApplicationModel from '../models/student_models/student.js'
import { CourseModel } from '../models/course_models/course.js';

async function calculateScore(studentApplication) {

  const courseIds = studentApplication.courses;

  const courses = await CourseModel.find({ _id:{$in: courseIds}}).populate('applicationForm');;
  console.log(courses)
  if (!courses) {
    throw new Error("College not found.");
  }
  let totalScore = 0;

  for (const course of courses) {
      const applicationForm = course.applicationForm;

      if (applicationForm) {
          for (const studentField of studentApplication.formfields) {
              const applicationField = applicationForm.formfields.find(field => field.fieldName === studentField.fieldName);

              if (applicationField) {
                  for (const roleSet of applicationField.role_sets) {
                      let comparisonResult = false;

                      switch (roleSet.comparison_operators) {
                          case 'equal':
                              comparisonResult = studentField.fieldvalue === roleSet.value;
                              break;
                          case 'not_equal':
                              comparisonResult = studentField.fieldvalue !== roleSet.value;
                              break;
                          case 'greater_than':
                              comparisonResult = studentField.fieldvalue > roleSet.value;
                              break;
                          case 'less_than':
                              comparisonResult = studentField.fieldvalue < roleSet.value;
                              break;
                          case 'greater_than_or_equal_to':
                              comparisonResult = studentField.fieldvalue >= roleSet.value;
                              break;
                          case 'less_than_or_equal_to':
                              comparisonResult = studentField.fieldvalue <= roleSet.value;
                              break;
                      }
                      if (comparisonResult) {
                          totalScore += roleSet.score || 0;
                      }
                  }
              }
          }
      }
  }

  return totalScore;
}


async function handleStudentApplication(studentApplicationId) {
  const studentApplication = await StudentApplicationModel.findById(studentApplicationId);

  if (!studentApplication) {
      throw new Error("Student application not found.");
  }

  const totalScore = await calculateScore(studentApplication);
  console.log(`Total Score for Student Application: ${totalScore}`);
}

const scoreQueue = createQueue('score-queue');

scoreQueue.process(async (job) => {
  const { studentApplicationId } = job.data;
  const studentApplication = await handleStudentApplication(studentApplicationId)
});

export default scoreQueue;
