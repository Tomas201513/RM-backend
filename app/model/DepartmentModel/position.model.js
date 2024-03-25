import mongoose from "mongoose";
import Department from "../DepartmentModel/department.model.js";

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    positionName: {
        type: String,
        required: true,
    },
    positionStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: false,
    },

    
    });

const Position = mongoose.model("Position", PositionSchema);

export default Position;