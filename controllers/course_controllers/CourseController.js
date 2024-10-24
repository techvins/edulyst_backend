import {CollegeModel} from '../../models/college_models/college.js'
import {CourseModel} from '../../models/course_models/course.js'


class CourseController {
  static getAllDoc = async (req, res) =>{
    try {
      const result = await CourseModel.find()
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }

  static getSingleDocById = async (req, res) =>{
    try {
      const result = await CourseModel.findById(req.params.id)
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }
}

export default CourseController