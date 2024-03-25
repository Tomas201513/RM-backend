import mongoose from "mongoose";
import Office from "../OfficeModel/office.model.js";
import Department from "../DepartmentModel/department.model.js";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  office: {
    type: Schema.Types.ObjectId,
    ref: "Office",
    required: false,
  },
      base: {
        type: String,
        // required: true,
      },
  position: {
    type: Schema.Types.ObjectId,
    ref: "Position",
    required: false,
  },
    phoneNo: {
      type: String,
      required: false,
  },
  roles: {
    type: [String],
    enum: ["admin","superAdmin", "staff","nonStaff"], // "user
    default: ["staff"],
    // required: false,
 
  }, registrationTime: {
    type: Date,
    required: false,
  },
  comment: {
    type: String,
    required: false,
}, 
status: {
  type: [String],
  enum: ["active","inactive"], // "user
  default: ["active"],
  // required: false,

},
  
})
userSchema.pre('save', async function (next) {
  if (this.isNew) {  // Only set the registration time for new documents
      this.registrationTime = new Date();
  }
  next();  // Call next to continue the save process
});
const User = mongoose.model("User", userSchema);

export default User;
 