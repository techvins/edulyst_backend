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
    fieldType: {type: String,required: true},
    choices: [{
      name : String,
      value: String  
    }],
    score:{
      value : String,
      score : String
    }
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
    applicationForms: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollegeApplicationForm' 
    }]
  });

const CourseModel = mongoose.model('Course', courseSchema);
const CollegeApplicationFormModel = mongoose.model('CollegeApplicationForm',collegeApplicationFormSchema);
export {CourseModel,CollegeApplicationFormModel};