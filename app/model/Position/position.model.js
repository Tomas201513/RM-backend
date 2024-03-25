import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  PositionName: {
    type: String,
    required: true,
  },
    PositionDescription: {
        type: String,
        required: true,
    }
});

const Position = mongoose.model("Position", PositionSchema);

export default Position;


