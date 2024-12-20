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

  static updateDocById = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, priority, college, courseId, sections } = req.body;

      const form = await CollegeApplicationFormModel.findById(id);
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }

      form.title = title || form.title;
      form.priority = priority || form.priority;
      form.college = college || form.college;


      const updatedSectionIds = await Promise.all(sections.map(async (sectionData) => {
        if (sectionData._id) {

          const section = await CollegeApplicationFormSectionModel.findById(sectionData._id);
          if (section) {
            section.name = sectionData.name || section.name;
            section.priority = sectionData.priority || section.priority;
            section.college = college;

            section.formfields = sectionData.formfields.map(field => ({
              fieldName: field.fieldName,
              fieldType: field.fieldType,
              priority: field.priority,
              role_sets: field.role_sets,
            }));

            await section.save();
            return section._id;
          }
        } else {
          const formfields = sectionData.formfields.map(field => ({
            fieldName: field.fieldName,
            fieldType: field.fieldType,
            priority: field.priority,
            role_sets: field.role_sets,
          }));

          const newSection = new CollegeApplicationFormSectionModel({
            name: sectionData.name,
            priority: sectionData.priority,
            college,
            formfields,
          });

          await newSection.save();
          return newSection._id;
        }
      }));

      form.sections = updatedSectionIds;

      await form.save();

      if (courseId) {
        await CourseModel.findByIdAndUpdate(
          courseId,
          { applicationForm: form._id },
          { new: true }
        );
      }
      res.status(200).json(form);
    } catch (error) {
      console.error('Error updating application form and sections:', error);
      res.status(400).json({ message: 'Error updating form', error: error.message });
    }
  }

  static getAllDocs = async (req, res) => {
    try {
      const {collegeId} = req.query;
      const filter = collegeId ? { college: collegeId } : {};
      const forms = await CollegeApplicationFormModel.find(filter).populate({
        path: 'sections',
        model: 'CollegeApplicationFormSection',
      })
      res.status(200).json(forms);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching forms', error: error.message });
    }
  }

  static getSingleDocById = async (req, res) => {
    try {
      const form = await CollegeApplicationFormModel.findById(req.params.id).populate({
        path: 'sections',
        model: 'CollegeApplicationFormSection',
      });
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.status(200).json(form);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching form', error: error.message });
    }
  }

  static cloneDocById = async (req, res) => {
    try {
      const { id } = req.params;

      const originalForm = await CollegeApplicationFormModel.findById(id).populate({
        path: 'sections',
        model: 'CollegeApplicationFormSection',
      });
      if (!originalForm) {
        return res.status(404).json({ message: 'Original form not found' });
      }

      // Clone sections and form fields
      const clonedSectionIds = await Promise.all(
        originalForm.sections.map(async (section) => {
          // Clone form fields within each section
          const clonedFormFields = section.formfields.map((field) => ({
            fieldName: field.fieldName,
            fieldType: field.fieldType,
            priority: field.priority,
            choices: field.choices, 
            role_sets: field.role_sets, 
          }));

          const clonedSection = new CollegeApplicationFormSectionModel({
            name: section.name,
            priority: section.priority,
            college: section.college,
            formfields: clonedFormFields,
          });
          await clonedSection.save();
          return clonedSection._id;
        })
      );

      const clonedForm = new CollegeApplicationFormModel({
        title: `${originalForm.title} (Clone)`, 
        priority: originalForm.priority,
        college: originalForm.college,
        sections: clonedSectionIds,
      });
      await clonedForm.save();

      res.status(201).json(clonedForm);
    } catch (error) {
      console.error('Error cloning application form:', error);
      res.status(500).json({ message: 'Error cloning form', error: error.message });
    }
  }
}

export default CollegeApplicationFormController;
