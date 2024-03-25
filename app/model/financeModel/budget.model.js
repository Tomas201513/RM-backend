import mongoose from "mongoose";
import Project from "./project.model.js";
import Senario from "../Senario/senario.model.js";

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: Project,
        required: true,
    },

    budgetCode: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    budgetDescription: {
        type: String,
        required: true,
    },
    catagory: {
        type: String,
        required: true,
    },type: {
        type: String,
        required: true,
    },rule: {
        type: String,
        required: false,
    },
    budgetAmount: {
        type: Number,
        required: true,
    },
    senario: {
        type: String,
        ref: "Senario",
        required: true,
    },
    // budgetStatus: {
    //     type: String,
    //     enum: ["active", "inactive"],
    //     required: true,
    // },
  
});

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
