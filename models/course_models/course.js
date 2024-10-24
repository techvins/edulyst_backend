import mongoose from "mongoose";

const collegeApplicationFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    default: 1
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },
  formfields: [{
    fieldName: {type:String,required: true}, 
    fieldType: {type: String  , enum: ['number', 'paragraph', 'short_answer', 'long_answer', 'dropdown', 'checkbox', 'radio'],required: true},
    priority: {
      type: Number,
      default: 1
    },
    choices: [{
      name : String,
      value: String  
    }],
    role_sets: [{
      value: { type: mongoose.Schema.Types.Mixed },
      comparison_operators: {
        type: String,
        enum: ['equal', 'not_equal', 'greater_than', 'less_than','greater_than_or_equal_to','less_than_or_equal_to'],
        required: true
      },
      score: { type: Number }
    }]
  }],
});

const courseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    fees: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true
    },
    applicationForm:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollegeApplicationForm',
      required: true
    }
  });

const CourseModel = mongoose.model('Course', courseSchema);
const CollegeApplicationFormModel = mongoose.model('CollegeApplicationForm',collegeApplicationFormSchema);
export {CourseModel,CollegeApplicationFormModel};