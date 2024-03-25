import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  dptName: {
    type: String,
    required: true,
  },
  dptContactInfo: {
    type: String,
    // required: true,
  },  
  dptStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  dptLocation:{
    type: String,
    // required: true, 
  }

});

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;


