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
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true
    }
  });

const CourseModel = mongoose.model('Course', courseSchema);
export default CourseModel