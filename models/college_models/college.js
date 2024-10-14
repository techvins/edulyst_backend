import mongoose from "mongoose";

// Defining Schema
const CollegeSchema = new mongoose.Schema({
  name:{type:String, required:true, trim:true},
  fees:{type:mongoose.Decimal128, required:true, validate:(value) => value >=5000.5 }
})

// Model 
const CollegeModel = mongoose.model("college", CollegeSchema)

export default CollegeModel