const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  img: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  prep: {
    type: String,
    required: true
  },
  cook: {
    type: Number,
    min: 0,
    required: true
  },
  serves: {
    type: Number,
    min: 0
  },
  ingredients: {
    type: Array,
    required: true
  },
  instructions: {
    type: Array,
    required: true
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
