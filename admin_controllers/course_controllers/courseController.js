import {CollegeModel} from '../../models/college_models/college.js'
import {CourseModel} from '../../models/course_models/course.js'


class CourseController {
  static createDoc = async (req, res) =>{
    try {
      const { name, duration, fees, collegeId } = req.body;
      // Check if the college exists
      const college = await CollegeModel.findById(collegeId);
      if (!college) {
        return res.status(404).json({ message: 'College not found' });
      }
      // Create the course
      const course = new CourseModel({
            name,
            duration,
            fees,
            college: college._id
      });
      const result = await course.save()
      // Add course to the college's course list
      college.courses.push(course._id);
      await college.save();
      res.status(201).send(result)
    } catch (error) {
      console.log(error)
    }
  }

  static getAllDoc = async (req, res) =>{
    try {
      const {collegeId} = req.query;
      const filter = collegeId ? { college: collegeId } : {};
      const result = await CourseModel.find(filter).populate('applicationForm')
      if(!result){
        return {};
      }
      return result.status(200).json(courses)
    } catch (error) {
      console.log(error)
    }
  }

  static getSingleDocById = async (req, res) =>{
    try {
      const result = await CourseModel.findById(req.params.id).populate('applicationForm')
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }
}

export default CourseController