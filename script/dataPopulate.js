import CollegeModel from '../models/college_models/college.js'
import {CourseModel,CollegeApplicationFormModel} from '../models/course_models/course.js'
import StudentApplicationModel from '../models/student_models/student.js'

async function populateData() {
    try {
    // 1. Create and save a new College
    const college = new CollegeModel({
      name: 'Tech University',
      address: '123 Main St',
      city: 'New York',
      state: 'NY'
    });
    await college.save();

    // 2. Create and save a new College Application Form
    const applicationForm = new CollegeApplicationFormModel({
      name: 'CS Application Form',
      priority: 1,
      college: college._id,  // Reference to the college
      formfields: [
        {
          fieldName: 'Name',
          fieldType: 'text',
          priority: 1,
          choices: [],
          role_sets: [
            {
              value: 'admin',
              comparison_operators: 'equal',
              score: 10
            }
          ]
        },
        {
          fieldName: 'Age',
          fieldType: 'number',
          priority: 2,
          choices: [],
          role_sets: [
            {
              value: 'student',
              comparison_operators: 'greater_than_or_equal_to',
              score: 5
            }
          ]
        }
      ]
    });
    await applicationForm.save();

    // 3. Create and save a new Course
    const course = new CourseModel({
      name: 'Computer Science',
      duration: '4 Years',
      fees: 50000,
      description: 'A course on computer science fundamentals',
      college: college._id,  // Reference to the college
      applicationForms: applicationForm._id  // Reference to the application form
    });
    await course.save();

    // Add course reference to the college
    college.courses.push(course._id);
    await college.save();

    // 4. Create and save a Student Application
    const studentApplication = new StudentApplicationModel({
      name: 'John Doe',
      course: [course._id],  // Reference to the course
      college: college._id,  // Reference to the college
      formfields: [
        { fieldName: 'Name', fieldvalue: 'John Doe' },
        { fieldName: 'Age', fieldvalue: 22 }
      ]
    });
    await studentApplication.save();
  
      console.log('Data population complete');
    } catch (err) {
      console.error(err);
    }
  }

export default populateData;