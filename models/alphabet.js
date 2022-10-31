const {Schema, model} = require("mongoose");

const AlphabetSchema = new Schema({
    value: String,
    numericalValue: Number,
})

const Alphabet = model("Alphabet", AlphabetSchema);

module.exports = Alphabet;