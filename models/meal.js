const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const MealScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  amountPortion: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    // required: true,
  },
});

// IngredientScheme.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };
const Meal = mongoose.model("Meal", MealScheme);

module.exports = Meal;
