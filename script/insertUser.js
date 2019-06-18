const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

// set user Object
const user = {
  name: "John",
  email: "john@gmail.com"
};

const mongoUri = "mongodb://localhost:27017/test";

const plainTextPassword = "123456";
const saltRounds = 10;

bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  user.pwd = hash;

  // store at db
  MongoClient.connect(mongoUri, { useNewUrlParser: true }, (err, client) => {
    const User = client.db("test").collection("user");
    User.insertOne(user, (err, r) => {
      console.log(`row successfully inserted`);
    });
    client.close();
  });
});