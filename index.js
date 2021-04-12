const express = require("express");
const mongoose = require("mongoose");
const Routes = require("./routes/routes.js");
// const objectId = require("mongodb").ObjectID;
// const MongoClient = require("mongodb").MongoClient;
const app = express();
const jsonParser = express.json();
const StaffController = require("./controllers/staff.js");

function setupCORS(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
}

const LOCAL_URL = "mongodb://localhost:27017/";

// let dbClient;

app.use(setupCORS);
app.use("/public", express.static(__dirname + "/public"));
// index.use("/uploads", express.static(__dirname + "/uploads"));

// mongoClient.connect(function (err, client) {
//   if (err) return console.log(err);
//   dbClient = client;
//   app.locals.collection = client.db("usersdb").collection("users");
//   app.listen(5000, function () {
//     console.log("Сервер ожидает подключения...");
//   });
// });

app.use("/api", Routes);


// app.use("/user", AdminRoute);
// app.use("/file", FileRoute);

// app.get("/api/users", function (req, res) {
//   const collection = req.app.locals.collection;
//   collection.find({}).toArray(function (err, users) {
//     if (err) return console.log(err);
//     res.send(users);
//   });
// });
// app.get("/api/users/:id", function (req, res) {
//   const id = new objectId(req.params.id);
//   const collection = req.app.locals.collection;
//   collection.findOne({ _id: id }, function (err, user) {
//     if (err) return console.log(err);
//     res.send(user);
//   });
// });

// app.post("/api/users", jsonParser, function (req, res) {
// if (!req.body) return res.sendStatus(400);

// const userName = req.body.name;
// const userAge = req.body.age;
// const user = { name: userName, age: userAge };

// const collection = req.app.locals.collection;
// collection.insertOne(user, function (err, result) {
//   if (err) return console.log(err);
//   res.send(user);
// });
// });

// app.delete("/api/users/:id", function (req, res) {
//   const id = new objectId(req.params.id);
//   const collection = req.app.locals.collection;
//   collection.findOneAndDelete({ _id: id }, function (err, result) {
//     if (err) return console.log(err);
//     let user = result.value;
//     res.send(user);
//   });
// });

// app.put("/api/users", jsonParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400);
//   const id = new objectId(req.body.id);
//   const userName = req.body.name;
//   const userAge = req.body.age;

//   const collection = req.app.locals.collection;
//   collection.findOneAndUpdate(
//     { _id: id },
//     { $set: { age: userAge, name: userName } },
//     { returnOriginal: false },
//     function (err, result) {
//       if (err) return console.log(err);
//       const user = result.value;
//       res.send(user);
//     }
//   );
// });

// прослушиваем прерывание работы программы (ctrl-c)
// process.on("SIGINT", () => {
//   dbClient.close();
//   process.exit();
// });

const start = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    await mongoose.connect(LOCAL_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      dbName: "userdb",
    });
    app.listen(PORT, () => console.log(`We started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
