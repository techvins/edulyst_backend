import {CollegeModel} from '../../models/college_models/college.js'


class CollegeController {
  static createDoc = async (req, res) =>{
    try {
      const {name,address,city,state}= req.body
      const doc = new CollegeModel({
        name:name,
        address:address,
        city:city,
        state:state
      })
      const result = await doc.save()
      res.status(201).send(result)
    } catch (error) {
      console.log(error)
    }
  }

  static getAllDoc = async (req, res) =>{
    try {
      const result = await CollegeModel.find().populate('courses');
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }

  static getSingleDocById = async (req, res) => {
    try {
      const result = await CollegeModel.findById(req.params.id).populate('courses');
      
      if (!result) {
        return res.status(404).json({ message: 'College not found' });
      }
  
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error', error });
    }
  }
  
     
  static updateDocById = async (req, res) =>{
   try {
     const result = await CollegeModel.findByIdAndUpdate(req.params.id, req.body)
     res.send(result)
   } catch (error) {
     console.log(error)
   }
  }

  static deleteDocById = async (req, res) =>{
    try {
      const result = await CollegeModel.findByIdAndDelete(req.params.id)
      res.status(204).send(result)
    } catch (error) {
      console.log(error)
    }
  }
}

export default CollegeController