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
  title: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    default: 1
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'college',
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
        enum: ['equal', 'not_equal', 'greater_than', 'less_than','greater_than_or_equal_to','less_than_or_equal_to','contains','range','date_range'],
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