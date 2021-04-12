const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

exports.login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const employee = await User.findOne({ login: login.trim() });

    if (employee) {
      await bcryptjs.compare(password, employee.password, (err, response) => {
        if (err) res.sendStatus(500);
        if (response) {
          jwt.sign(
            { employee },
            "secretkey",
            { expiresIn: "12h" },
            (err, token) => {
              if (err) res.sendStatus(403);
              employee.password = undefined;
              res.json({
                success: true,
                token,
                employee,
              });
            }
          );
        } else {
          res.status(400);
          res.json({
            success: false,
            message: "Неправильный логин или пароль",
          });
        }
      });
    } else {
      res.status(400);
      await res.json({
        success: false,
        message: "Неправильный логин или пароль",
      });
    }
  } catch (error) {
    console.log(error);
    res.json([...error, ...req]);
  }
};
