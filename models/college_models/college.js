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
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
})

// Model 
const CollegeModel = mongoose.model("college", CollegeSchema)

export default CollegeModel