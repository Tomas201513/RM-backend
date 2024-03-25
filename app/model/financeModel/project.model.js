import mongoose from "mongoose";
import User from "../UserModel/user.model.js";
import Country from "../Country/country.model.js";

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectTitle: {
        type: String,
        required: true, 
        },
    donorName: {
    type: String,
    required: true, 
    },
    backDonor: {
        type: String,
        required: false, 
        },
    projStartDate: {
        type: String,
        required: true, 
        }, 
    projEndDate: {
        type: String,
        required: true, 
        },
    projectCode: {
        type: String,
        required: true,
    },
    donorCode: {
    type: String,
    required: true,
    },
    totalBudget: {
        type: String,
        required: true,
        },
    projectManager: {
        type: String,
        ref: "User",
        required: true,
        }, 
    country: {
        type: String,
        ref: "Country",
        required: true,
        }, 
    status: {
        type: String,
        enum: ["active", "inactive"],
        required: true,
        },
    comment: {
        type: String,
        required: true,
        },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;