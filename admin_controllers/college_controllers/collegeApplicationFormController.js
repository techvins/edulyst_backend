import {CollegeApplicationFormModel} from '../../models/college_models/college.js'

class CollegeApplicationFormController {
  static createDoc = async (req, res) => {
    try {
      const form = new CollegeApplicationFormModel(req.body);
      await form.save();
      res.status(201).json(form);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error creating form', error: error.message });
    }
  }

  static getAllDocs = async (req, res) => {
    try {
      const forms = await CollegeApplicationFormModel.find().populate('college'); 
      res.status(200).json(forms);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching forms', error: error.message });
    }
  }

  static getSingleDocById = async (req, res) => {
    try {
      const form = await CollegeApplicationFormModel.findById(req.params.id).populate('college');
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.status(200).json(form);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching form', error: error.message });
    }
  }
}

export default CollegeApplicationFormController;
