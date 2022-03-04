// var operations = require("./operations");

// it("should multiply two numbers", function () {

//     var expectedResult = 15;
//     var result = operations.multiply(3, 5);
//     if (result !== expectedResult) {
//         throw new Error(`Expected ${expectedResult}, but got ${result}`);
//     }
// });


var operations = require("./operations");

it("should multiply two numbers", function () {

    var expectedResult = 16;
    var result = operations.multiply(3, 5);
    if (result !== expectedResult) {
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

// const MongoClient = require("mongodb").MongoClient;

// // создаем объект MongoClient и передаем ему строку подключения
// const mongoClient = new MongoClient("mongodb://localhost:27017/");
// mongoClient.connect(function (err, client) {

//     if (err) {
//         return console.log(err);
//     }
//     // взаимодействие с базой данных
//     client.close();
// });


// const MongoClient = require("mongodb").MongoClient;

// const url = "mongodb://localhost:27017/";
// const mongoClient = new MongoClient(url);

// // Подключаемся к серверу
// mongoClient.connect(function (err, client) {

//     // обращаемся к базе данных admin
//     // const db = client.db("userdb");
//     // const collection = db.collection("users");
//     // collection.countDocuments(function (err, result) {

//     //     if (err) {
//     //         return console.log(err);
//     //     }
//     //     console.log(`В коллекции users ${result} пользователей`);
//     //     client.close();
//     // });

//     const db = client.db("userdb");
//     const collection = db.collection("users");
//     let user = { name: "Monopolist", age: 20 };


//     collection.find().toArray(function (err, results) {
//         console.log(results);
//         client.close();
//     });

//     // collection.insertOne(user, function (err, result) {
//     //     if (err) {
//     //         return console.log(err);
//     //     }
//     //     // console.log(result);
//     //     console.log(user);
//     //     client.close();
//     // });

//     collection.find().toArray(function (err, results) {

//         console.log(results);
//         client.close();
//     });
//     // db.command({ ping: 1 }, function (err, result) {
//     //     if (!err) {
//     //         console.log("Подключение с сервером успешно установлено");
//     //         console.log(result);
//     //         console.log('collection', collection);


//     //     }
//     //     // Закрываем подключение
//     //     client.close();
//     //     console.log("Подключение закрыто");
//     // });
// });