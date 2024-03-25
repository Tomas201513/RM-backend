import mongoose from "mongoose";
import Category from "./category.model.js";

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  subCatagory: {
    type: String,
    required: true,
    },
    code:{
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    catagory: {
      type: String,
      ref: "Category",
      required: true,
    },

});

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

export default SubCategory;
