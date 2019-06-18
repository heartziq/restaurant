const { MongoClient } = require("mongodb");


const mongoUri = "mongodb://localhost:27017/test";

const newRestaurant = {
  name: "Steak Bone",
  open: [
    {
      day: [1, 2, 3],
      time: {
        openAt: "11:30 am",
        closeAt: "11 pm"
      }
    },
    {
      day: [6, 7],
      time: {
        openAt: "2 pm",
        closeAt: "11:30 pm"
      }
    },
  ]
}
  // store at db
  MongoClient.connect(mongoUri, { useNewUrlParser: true }, (err, client) => {
    const Restaurant = client.db("test").collection("restaurant");
    Restaurant.insertOne(newRestaurant, (err, r) => {
      console.log(`row successfully inserted`);
    });
    client.close();
  });