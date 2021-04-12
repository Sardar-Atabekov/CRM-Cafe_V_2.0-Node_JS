const jwt = require("jsonwebtoken");
// const fs = require("fs");
const Meal = require("../models/meal");

exports.createMeal = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) res.sendStatus(401);
    else {
      if (req.body) {
        const { name, cost, amountPortion, category } = req.body;
        const candidate = await Meal.findOne({ name: name.trim() });

        if (candidate) {
          res.status(400);
          await res.json({
            success: false,
            message: "Блюда с таким названиям уже существует",
          });
        } else {
          const NewMeal = new Meal({
            name,
            cost,
            amountPortion,
            category,
          });

          NewMeal.save((err) => {
            if (err) {
              console.log(err);
              res.status(400);
              res.json({
                success: false,
                message:
                  "Блюда не создан, убедитесь с правильности заполнения данных",
              });
            } else {
              res.json({
                success: true,
                message: "Блюда успешно создан",
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

exports.getFoodDrinks = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, data) => {
    if (err) res.sendStatus(403);
    else {
      let meals = await Meal.find({});
      await res.json(meals);
    }
  });
};

exports.getMeal = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, data) => {
    if (err) res.sendStatus(403);
    else {
      const id = req.params.id;
      let meal = await Meal.findOne({ _id: id });
      await res.json(meal);
    }
  });
};

exports.updateMeal = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err) => {
    if (err) res.sendStatus(403);

    const id = req.params.id;
    const { name, cost, amountPortion, category } = req.body;

    Meal.updateOne(
      { _id: id },
      {
        _id: id,
        name,
        cost,
        amountPortion,
        category,
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

exports.deleteMeal = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err) => {
    const id = req.params.id;
    await Meal.deleteOne({ _id: id }, (err) => {
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
