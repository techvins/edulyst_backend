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
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'college',
      required: true
    },
    applicationForm:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollegeApplicationForm',
      required: true
    }
  });

const CourseModel = mongoose.model('Course', courseSchema);

export {CourseModel};