const { MongoClient } = require("mongodb");
const { populateRestaurant } = require("../test");

const mongoUri = "mongodb://localhost:27017/test";

let allRestaurant = [];

(async () => {
  allRestaurant = await populateRestaurant();
})();

MongoClient.connect(mongoUri, { useNewUrlParser: true }, (err, client) => {
  const Restaurant = client.db("test").collection("restaurant");
  Restaurant.insertMany(allRestaurant, (err, r) => {
    console.log(`row successfully inserted`);
  });
  client.close();
});