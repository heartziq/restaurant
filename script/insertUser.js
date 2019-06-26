const { MongoClient, ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");

// set user Object
const user = [
  {
    _id: ObjectID("5d12e4f259cf3b183071a8d8"),
    name: "John",
    email: "john@gmail.com"
  },
  {
    _id: ObjectID("5cef8bcabc8ca03b806534ff"),
    name: "Mike",
    email: "mike@gmail.com"
  },
];

const mongoUri = "mongodb://localhost:27017/test";

const plainTextPassword = "123456";
const saltRounds = 10;

bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  user.map(user => user.pwd = hash)

  // store at db
  MongoClient.connect(mongoUri, { useNewUrlParser: true }, (err, client) => {
    const User = client.db("test").collection("user");
    User.insertMany(user, (err, r) => {
      console.log(`row successfully inserted`);
    });
    client.close();
  });
});
