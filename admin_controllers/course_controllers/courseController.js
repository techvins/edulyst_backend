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
  static updateDocById = async (req, res) =>{
    try {
      const result = await CourseModel.findByIdAndUpdate(req.params.id, req.body)
      res.send(result)
    } catch (error) {
      console.log(error)
    }
   }
 
   static deleteDocById = async (req, res) =>{
     try {
       const result = await CourseModel.findByIdAndDelete(req.params.id)
       res.status(204).send(result)
     } catch (error) {
       console.log(error)
     }
   }
}

export default CourseController