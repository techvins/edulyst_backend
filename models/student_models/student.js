import mongoose from "mongoose";

const StudentApplicationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: false
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentCourse' 
    }],
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true
    },
    formfields: [{
        fieldName: {
          type: String,
          required: true
        }, 
        fieldvalue: {
          type: mongoose.Schema.Types.Mixed,
          required: true
        }
      }]
  });

  const StudentApplicationModel = mongoose.model('StudentApplication', StudentApplicationSchema);
  export default StudentApplicationModel;