import mongoose from "mongoose";
import Category from "../CatagoryModel/category.model.js";
import SubCategory from "../CatagoryModel/subCatagory.model.js";
import Budget from "../financeModel/budget.model.js";
import User from "../UserModel/user.model.js";


const Schema = mongoose.Schema;

const AssetSchema = new Schema(
  {
    subCatagory: {
      type: String,
      ref: "SubCategory",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      ref: "Budget",
      required: true,
    },
    tag : {
      type: String,
      required: true,
    },
    item_count : {
      type: String,
      // required: true,
    },
    probudcat: {
      type: String,
      required: true,
    },

    price : {
      type: Number,
      required: true,
    },
    registeringOfficer : {
      type: String,
      ref: "User",
      required: true,
    }, 
    currentUser : {
      type: String,
      ref: "User",
      required: true,
    },
    accessory : {
      type: String,
      required: true,
    },
    supplier : {
      type: String,
      required: true,
    },
    purchaseDate : {
      type: Date,
      required: true,
    },
    operationStartDate : {
      type: Date,
      required: true,
    },
    operationEndDate : {
      type: Date,
      required: false,
    },
    warranty : {
      type: String,
      required: true,
    },
    status : {
      type: String,
      enum : ["active", "inactive"],
      required: true,
    },
    reason : {
      type: String,
      enum : ["assigned", "in_stock", "in_maintenance", "other"],
    },
    remarks : {
      type: String,
      required: false,
    },
    asset_state : {
      type: String,
      enum : ["new", "very_good", "medium","good", "bad"],
      required: true,
    },
    life_span : {
      type: String,
      required: true,
    },
    registrationTime: {
      type: Date,
      required: false,
    }
  })
AssetSchema.pre('save', async function (next) {
    if (this.isNew) {  // Only set the registration time for new documents
        this.registrationTime = new Date();
    }
    next();  // Call next to continue the save process
});

const Asset = mongoose.model("Asset", AssetSchema);

export default Asset;