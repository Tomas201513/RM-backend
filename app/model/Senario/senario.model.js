import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SenarioSchema = new Schema({
    SenarioCode: {
    type: String,
    required: true,
  },
  SenarioPrice: {
    type: String,
    required: true,
  },
  SenarioProcedure: {
        type: String,
        required: true,
    },
  comment: {
      type: String,
      required: false,
  }
});

const Senario = mongoose.model("Senario", SenarioSchema);

export default Senario;


