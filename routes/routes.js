const { Router } = require("express");
const express = require("express");

const StaffController = require("../controllers/staff.js");
const LoginController = require("../controllers/login.js");
const verifyToken = require("../middlewares/verify-token");
const IngredientController = require("../controllers/ingredients.js");
const FoodDrinksController = require("../controllers/food-drinks.js");

const jsonParser = express.json();

const router = Router();

module.exports = router.post("/login", jsonParser, LoginController.login);
module.exports = router.post(
  "/create-employee",
  jsonParser,
  verifyToken,
  StaffController.createEmployee
);
module.exports = router.get("/staff", verifyToken, StaffController.getStaff);
module.exports = router.get(
  "/staff/:id",
  verifyToken,
  StaffController.getEmployee
);

module.exports = router.patch(
  "/staff-update/:id",
  verifyToken,
  jsonParser,
  StaffController.updateEmployee
);

module.exports = router.post(
  "/create-ingredient",
  jsonParser,
  verifyToken,
  IngredientController.createIngredient
);
module.exports = router.get(
  "/ingredients",
  verifyToken,
  IngredientController.getIngredients
);
module.exports = router.get(
  "/ingredient/:id",
  verifyToken,
  IngredientController.getIngredient
);

module.exports = router.put(
  "/ingredient-update/:id",
  verifyToken,
  jsonParser,
  IngredientController.updateIngredient
);

module.exports = router.delete(
  "/delete-ingredient/:id",
  verifyToken,
  IngredientController.deleteIngredient
);


module.exports = router.post(
  "/create-meal",
  jsonParser,
  verifyToken,
  FoodDrinksController.createMeal
);
module.exports = router.get(
  "/food-drinks",
  verifyToken,
  FoodDrinksController.getFoodDrinks
);
module.exports = router.get(
  "/meal/:id",
  verifyToken,
  FoodDrinksController.getMeal
);

module.exports = router.put(
  "/meal-update/:id",
  verifyToken,
  jsonParser,
  FoodDrinksController.updateMeal
);

module.exports = router.delete(
  "/delete-meal/:id",
  verifyToken,
  FoodDrinksController.deleteMeal
);