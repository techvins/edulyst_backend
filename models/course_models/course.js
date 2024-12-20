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
    priority: {
      type: Number,
      default: 1
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'college',
      required: true
    },
    applicationForm:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollegeApplicationForm',
      required: false
    }
  },{
    timestamps: true 
  });

const CourseModel = mongoose.model('Course', courseSchema);

export {CourseModel};