import {CollegeApplicationFormSectionModel,CollegeApplicationFormModel} from '../../models/college_models/college.js'
import { CourseModel } from '../../models/course_models/course.js';

class CollegeApplicationFormController {
  static createDoc = async (req, res) => {
    try {
      const { title, priority, college, courseId, sections } = req.body;

      const sectionIds = await Promise.all(sections.map(async (sectionData) => {
        const formfields = sectionData.formfields.map((field) => ({
          fieldName: field.fieldName,
          fieldType: field.fieldType,
          priority: field.priority,
          role_sets: field.role_sets, 
        }));

        const section = new CollegeApplicationFormSectionModel({
          name: sectionData.name,
          priority: sectionData.priority,
          college,
          formfields,
        });

        await section.save();
        return section._id;
      }));

      const form = new CollegeApplicationFormModel({
        title,
        priority,
        college,
        sections: sectionIds,
      });
      await form.save();

      if (courseId) {
        await CourseModel.findByIdAndUpdate(
          courseId,
          { applicationForm: form._id },
          { new: true }
        );
      }

      res.status(201).json(form);
    } catch (error) {
      console.error('Error creating application form and sections:', error);
      res.status(400).json({ message: 'Error creating form', error: error.message });
    }
  }

  static getAllDocs = async (req, res) => {
    try {
      const forms = await CollegeApplicationFormModel.find() 
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
