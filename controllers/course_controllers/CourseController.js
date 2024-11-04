import {CollegeModel} from '../../models/college_models/college.js'
import {CourseModel} from '../../models/course_models/course.js'


class CourseController {
  static getAllDoc = async (req, res) =>{
    try {
      const {collegeId} = req.query;
      const filter = collegeId ? { college: collegeId } : {};
      const result = await CourseModel.find(filter).populate({
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
      if(!result){
        return res.status(200).json([])
      }
      return res.status(200).json(result)
    } catch (error) {
      console.log(error)
    }
  }

  static getSingleDocById = async (req, res) =>{
    try {
      const result = await CourseModel.findById(req.params.id).populate({
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
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }
}

export default CourseController