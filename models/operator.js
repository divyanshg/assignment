const { Schema, model } = require("mongoose");

const OperatorSchema = new Schema({
  value: String,
});

const Operator = model("Operator", OperatorSchema);

module.exports = Operator;