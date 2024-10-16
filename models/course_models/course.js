import mongoose from "mongoose";

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
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true
    }
  });

const applicationFormSchema = new mongoose.Schema({
    studentName: {
      type: String,
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    formfieldsvalue: [{
      fieldName: String,
      value: Number
    }]
  });

const CourseModel = mongoose.model('Course', courseSchema);
const ApplicationFormModel = mongoose.model('ApplicationForm',applicationFormSchema)
export {CourseModel,ApplicationFormModel};