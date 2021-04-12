const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
// const fs = require("fs");
const User = require("../models/user");
const objectId = require("mongodb").ObjectID;

exports.createEmployee = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) res.sendStatus(401);
    else {
      if (req.body) {
        const {
          name,
          post,
          phoneNumber,
          // email,
          login,
          password,
          salary,
        } = req.body;
        const hashPassword = await bcryptjs.hash(password, 10);
        console.log("User", User);
        const candidate = await User.findOne({ login: login.trim() });
        if (candidate) {
          res.status(400);
          await res.json({
            success: false,
            message: "Пользователь с таким логином уже существует",
          });
        } else {
          const NewUser = new User({
            name,
            post,
            //   email,
            login,
            salary,
            phoneNumber,
            password: hashPassword,
          });
          NewUser.save((err) => {
            if (err) {
              res.status(400);
              res.json({
                success: false,
                message:
                  "Пользователь не создан, убедитесь с правильности заполнения данных",
              });
            } else {
              res.json({
                success: true,
                message: "Пользователь создан",
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

exports.getStaff = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, data) => {
    if (err) res.sendStatus(403);
    else {
      let AllStaff = await User.find({});
      await res.json(AllStaff);
    }
  });
};

exports.getEmployee = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, data) => {
    if (err) res.sendStatus(403);
    else {
      const id = req.params.id;
      let employee = await User.findOne({ _id: id });
      await res.json(employee);
    }
  });
};

exports.updateEmployee = async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err) => {
    if (err) res.sendStatus(403);
    const { name, password, post, login, salary, phoneNumber } = req.body;
    const id = req.params.id;
    const hashPassword = await bcryptjs.hash(password, 10);

    User.updateOne(
      { _id: id },
      {
        _id: id,
        name,
        post,
        login,
        salary,
        phoneNumber,
        password: hashPassword,
      },
      (err) => {
        if (err) res.sendStatus(500);
        else
          res.json({
            success: true,
            message: "Данные сотрудника обновлены",
          });
      }
    );
  });
};

// exports.deleteAdmin = async (req, res) => {
//   jwt.verify(req.token, "secretkey", async (err) => {
//     const { _id } = req.body;
//     await User.deleteOne({ _id: id }, (err) => {
//       if (err) res.sendStatus(500);
//       else {
//         res.json({
//           message: "Кафедра успешно удалена",
//         });
//       }
//     });
//   });
// };
