import { createQueue } from './connectbull.js';
import StudentApplicationModel from '../models/student_models/student.js'
import { CourseModel } from '../models/course_models/course.js';

const operators = {
    equal: (a, b) => a === b,
    not_equal: (a, b) => a !== b,
    greater_than: (a, b) => a > b,
    less_than: (a, b) => a < b,
    greater_than_or_equal_to: (a, b) => a >= b,
    less_than_or_equal_to: (a, b) => a <= b,
    not_null_or_blank: (a) => a !== null && a !== '',
    contains: (a, b) => a.includes(b),
    range: (value, rangeValues) => {
      const [min, max] = rangeValues;
      return value >= min && value <= max;
    },
    date_range: (value, rangeValues) => {
      const [start, end] = rangeValues.map(date => new Date(date)); 
      const dateValue = new Date(value); 
      return dateValue >= start && dateValue <= end;
    }
  };
  

  async function calculateScore(studentApplication) {
    const courseIds = studentApplication.courses;
  
    const courses = await CourseModel.find({ _id: { $in: courseIds } }).populate({
      path: 'applicationForm',
      model: 'CollegeApplicationForm',
      populate: {
        path: 'sections',
        model: 'CollegeApplicationFormSection',
        populate: {
          path: 'formfields',
          model: 'FormField', 
        },
      },
    });
  
    if (!courses || courses.length === 0) {
      throw new Error("Courses not found.");
    }
  
    let totalScore = 0;
  
    for (const course of courses) {
      const applicationForm = course.applicationForm;
  
      if (applicationForm && Array.isArray(applicationForm.sections)) {
  
        for (const section of applicationForm.sections) {
          try {
  
            if (Array.isArray(section.formfields)) {
              for (const applicationField of section.formfields) {
  
                const studentField = studentApplication.formfields.find(field => field.fieldName === applicationField.fieldName);
  
                if (studentField) {
                  for (const roleSet of applicationField.role_sets) {
                    const operatorFunc = operators[roleSet.comparison_operators];
  
                    if (operatorFunc) {
                      const comparisonResult = operatorFunc(studentField.fieldvalue, roleSet.value);
                      if (comparisonResult) {
                        totalScore += roleSet.score || 0; // Accumulate the score
                      }
                    } else {
                      console.warn(`Operator ${roleSet.comparison_operators} not supported.`);
                    }
                  }
                } else {
                  console.warn(`Field ${applicationField.fieldName} not found in student's application.`);
                }
              }
            } else {
              console.warn("No formfields in section:", section.name);
            }
          } catch (error) {
            console.error(`Error processing section ${section.name}:`, error);
          }
        }
      } else {
        console.warn("No sections in application form:", applicationForm.title);
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
  studentApplication.totalScore = totalScore;
  await studentApplication.save();
}

const scoreQueue = createQueue('score-queue');

scoreQueue.process(async (job) => {
  const { studentApplicationId } = job.data;
  const studentApplication = await handleStudentApplication(studentApplicationId)
});

export default scoreQueue;
