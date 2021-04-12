const jwt = require("jsonwebtoken");
// const fs = require("fs");
const Ingredient = require("../models/ingredient");

exports.createIngredient = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) res.sendStatus(401);
    else {
      if (req.body) {
        const { name, amount, unitMeasurement, cost } = req.body;
        const candidate = await Ingredient.findOne({ name: name.trim() });
        console.log("Ingredient", name, candidate);

        if (candidate) {
          res.status(400);
          await res.json({
            success: false,
            message: "Ингредиент с таким названиям уже существует",
          });
        } else {
          const NewIngredient = new Ingredient({
            name,
            cost,
            amount,
            unitMeasurement,
          });
          NewIngredient.save((err) => {
            if (err) {
              console.log(err);
              res.status(400);
              res.json({
                success: false,
                message:
                  "Ингредиент не создан, убедитесь с правильности заполнения данных",
              });
            } else {
              res.json({
                success: true,
                message: "Ингредиент успешно создан",
              });
            }
          });
        }
      } else {
        res.status(400);
        return res.json({
          success: false,
          message: "Заполните все данные!",
        });
      }
    }
  });
};

exports.getIngredients = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, data) => {
    if (err) res.sendStatus(403);
    else {
      let ingredients = await Ingredient.find({});
      await res.json(ingredients);
    }
  });
};

exports.getIngredient = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, data) => {
    if (err) res.sendStatus(403);
    else {
      const id = req.params.id;
      let ingredient = await Ingredient.findOne({ _id: id });
      await res.json(ingredient);
    }
  });
};

exports.updateIngredient = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err) => {
    if (err) res.sendStatus(403);

    const id = req.params.id;
    const { name, amount, unitMeasurement, cost } = req.body;

    Ingredient.updateOne(
      { _id: id },
      {
        _id: id,
        cost,
        name,
        amount,
        unitMeasurement,
      },
      (err) => {
        if (err) res.sendStatus(500);
        else
          res.json({
            success: true,
            message: "Данные ингридиента обновлены",
          });
      }
    );
  });
};

exports.deleteIngredient = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err) => {
    const id = req.params.id;
    await Ingredient.deleteOne({ _id: id }, (err) => {
      if (err) res.sendStatus(500);
      else {
        res.json({
          success: true,
          message: "Ингридиент успешно удалена",
        });
      }
    });
  });
};
