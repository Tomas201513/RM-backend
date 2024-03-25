import mongoose from "mongoose";

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    countryName: {
    type: String,
    required: true,
    },
    countryCode: {
    type: String,
    required: true,
    },  
    // countryLocation: {
    // type: String,
    // // required: true,
    // },
    countryCurrency: {
    type: String,
    required: true,
    },
    timeZone: {
    type: String,
    required: true,
    },
    continent: {
    type: String,
    required: false,
    }
})
countrySchema.pre('save', async function (next) {
  if (this.isNew) {  // Only set the registration time for new documents
      this.registrationTime = new Date();
  }
  next();  // Call next to continue the save process
});

const Country = mongoose.model('Country', countrySchema);

export default Country;


