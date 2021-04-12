const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const UserScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  // },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  // role: {
  //   type: String,
  //   required: true,
  // },
});

UserScheme.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
const User = mongoose.model("User", UserScheme);

module.exports = User;
