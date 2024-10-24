import mongoose from "mongoose";

// Defining Schema
const CollegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  description :{
    type: String,
    required: false,
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
})

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
    fieldName: {type:String,required: true}, //unique name for each field
    fieldType: {type: String,required: true}, // text, number, date, radio, checkbox, select
    priority: {
      type: Number,
      default: 1
    },
    choices: [{
      name : String,
      value: String  
    }],
    role_sets: [{
      value: { type: String },
      comparison_operators: {
        type: String,
        enum: ['equal', 'not_equal', 'greater_than', 'less_than','greater_than_or_equal_to','less_than_or_equal_to'],
        required: true
      },
      score: { type: Number }
    }]
  }],
});

// Model 
const CollegeModel = mongoose.model("college", CollegeSchema)
const CollegeApplicationFormModel = mongoose.model('CollegeApplicationForm',collegeApplicationFormSchema);
export {CollegeModel,CollegeApplicationFormModel}