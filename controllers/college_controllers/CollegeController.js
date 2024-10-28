import {CollegeModel} from '../../models/college_models/college.js'

class CollegeController {
  static getAllDoc = async (req, res) =>{
    try {
      const result = await CollegeModel.find().populate({ path: 'courses', populate: { path: 'applicationForm', model: 'CollegeApplicationForm' } });
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }

  static getSingleDocById = async (req, res) => {
    try {
      const result = await CollegeModel.findById(req.params.id).populate('courses');
      if (!result) {
        return res.status(404).json({ message: 'College not found' });
      }
  
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error', error });
    }
  }
}

export default CollegeController