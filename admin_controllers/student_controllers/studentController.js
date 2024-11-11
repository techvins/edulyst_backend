import StudentApplicationModel from '../../models/student_models/student.js';

class StudentApplicationController {
  static getAllDoc = async (req, res) => {
    try {
      const {collegeId} = req.query;
      const filter = collegeId ? { college: collegeId } : {};
      const applications = await StudentApplicationModel.find(filter).populate({
        path: 'courses',
        model: 'Course',
        populate: {
          path: 'applicationForm',
          model: 'CollegeApplicationForm',
        },
      })
      .populate('college');

      res.status(200).json(applications);
    } catch (error) {
      console.error('Error fetching student applications:', error);
      res.status(500).json({ message: 'Error fetching applications', error: error.message });
    }
  };

  static getSingleDocById = async (req, res) => {
    try {
      const application = await StudentApplicationModel.findById(req.params.id).populate({
        path: 'courses',
        model: 'Course',
        populate: {
          path: 'applicationForm',
          model: 'CollegeApplicationForm',
        },
      })
      .populate('college');;

      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }

      res.status(200).json(application);
    } catch (error) {
      console.error('Error fetching student application:', error);
      res.status(500).json({ message: 'Error fetching application', error: error.message });
    }
  };
}

export default StudentApplicationController;
