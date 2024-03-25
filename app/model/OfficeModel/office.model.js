import mongoose from "mongoose";
import Country from "../Country/country.model.js"

const Schema = mongoose.Schema;

const OfficeSchema = new Schema({
  country:{

    type: String,
    required: true,
  },
  officeLocation: {
    type: String,
    required: true,
  },
  officeAreaName: {
    type: String,
    required: true,
  },  
  officeSubAreaName: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    ref: "Country",
    required: true,
},
  officePhone: {
    type: String,
    required: true,
  },
  registrationTime: {
    type: Date,
    required: false,
  }
})
OfficeSchema.pre('save', async function (next) {
  if (this.isNew) {  // Only set the registration time for new documents
      this.registrationTime = new Date();
  }
  next();  // Call next to continue the save process
});

const Office = mongoose.model("Office", OfficeSchema);

export default Office;


