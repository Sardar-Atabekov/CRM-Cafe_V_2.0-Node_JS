const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const IngredientScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  unitMeasurement: {
    type: String,
    required: true,
  },
});

// IngredientScheme.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };
const Ingredient = mongoose.model("ingredient", IngredientScheme);

module.exports = Ingredient;
