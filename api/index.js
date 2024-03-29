const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { verify } = require("./middleware");
const { populateRestaurant } = require('../test')

const { filterOpenNow, openAtDay, opensAfter } = require("../data/driver");

const app = express.Router();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

let target;
let User;
let Collection;
const mongoUri = "mongodb://localhost:27017/test";

MongoClient.connect(mongoUri, { useNewUrlParser: true }, (err, client) => {
  target = client.db("test").collection("restaurant");
  User = client.db("test").collection("user");
  Collection = client.db("test").collection("collection");
});

app.get('/restrest', async (req, res) => {
  const data = await populateRestaurant();
  res.json({data});
});

app.get("/", (req, res) => {
  let restaurant = [];
  // console.log('Router push goes here?')

  target
    .find({})
    .forEach(item => {
      restaurant.push(item);
    })
    .then(() => {
      res.send(restaurant);
    });
});

app.get("/:restaurantId", (req, res) => {
  const id = req.params.restaurantId;
  target
    .findOne({ _id: ObjectID(id) })
    .then(resp => res.send(resp))
    .catch(err => console.error(err.stack));
});

// login here
app.post("/login", (req, res) => {
  const { email, pwd } = req.body;

  // compare bcrypt pwd as well
  User.findOne({ email })
    .then(resp => {
      // get hashPwd value
      const hashPwd = resp.pwd;

      // password verficiation first..
      bcrypt.compare(pwd, hashPwd, (err, result) => {
        if (result == true) {
          jwt.sign(
            { email: resp.email, user: resp.name },
            "shhh",
            (err, token) => {
              res.json({ token, user: resp.name, userId: resp._id });
            }
          );
        } else {
          res.status(401).send("wrong password");
        }
      });
    })
    .catch(err => {
      res.status(401).send("Unauthorized");
    });
});

// for testing purpose, EXCLUDE verify middleware
app.get('/collection/:userId', verify, async (req, res) => {
  // retrieve collection ids from user_table

  const response = await User.findOne({ _id: ObjectID(req.params.userId) }, {projection: {collection: 1, _id: 0}})
  const collection_id = await response.collection.map(_id => Object.assign({}, {_id: ObjectID(_id)}));

  const criteria = { $or: collection_id }

  let collection = [];
  // // grab from collection
  Collection.find(criteria)
    .forEach(item => {
      collection.push(item);
    })
    .then(() => {
      // console.log(`collection: ${JSON.stringify(collection)}`)
      res.send({data: collection});
    });

});

module.exports = app;

// 5d10ee3c3cd25e119a5e26cb

// 5d10ee3c3cd25e119a5e26cc

// 5d10ee3c3cd25e119a5e26d8

// 5d10ee3c3cd25e119a5e26dc