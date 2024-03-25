import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  catagory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;


