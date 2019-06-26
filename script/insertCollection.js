const { MongoClient, ObjectID } = require("mongodb");

const mongoUri = "mongodb://localhost:27017/test";

const collection = [
  {
    name: "Meat Lover",
    resName: ["The Cheesecake Factory", "New Delhi Indian Restaurant"],
    restaurant: [],
    user: [ObjectID("5d12e4f259cf3b183071a8d8")]
  },
  {
    name: "Vegan Lover",
    resName: ["Hanuri", "Herbivore", "Paragon Restaurant & Bar"],
    restaurant: [],
    user: [ObjectID("5cef8bcabc8ca03b806534ff")]
  },
  {
    name: "Fast Food Junkies",
    resName: ["San Dong House"],
    restaurant: [],
    user: [
      ObjectID("5cef8bcabc8ca03b806534ff"),
      ObjectID("5d12e4f259cf3b183071a8d8")
    ]
  },
  {
    name: "Sweet N Sour",
    resName: ["Bow Hon Restaurant", "Alhamra"],
    restaurant: [],
    user: [ObjectID("5cef8bcabc8ca03b806534ff")]
  },
  {
    name: "Chicken Mania",
    resName: [
      "Kyoto Sushi",
      "Sapporo-Ya Japanese Restaurant",
      "Marrakech Moroccan Restaurant",
      `Santorini's Mediterranean Cuisine`
    ],
    restaurant: [],
    user: [
      ObjectID("5cef8bcabc8ca03b806534ff"),
      ObjectID("5d12e4f259cf3b183071a8d8")
    ]
  },
  {
    name: "Green is good",
    resName: [`Nick's Lighthouse`, "Restaurant Lulu"],
    restaurant: [],
    user: [
      ObjectID("5cef8bcabc8ca03b806534ff"),
      ObjectID("5d12e4f259cf3b183071a8d8")
    ]
  }
];

MongoClient.connect(mongoUri, { useNewUrlParser: true }, (err, client) => {
  const Restaurant = client.db("test").collection("restaurant");
  const User = client.db("test").collection("user");
  const Collection = client.db("test").collection("collection");

  // grab random restaurant

  // insert collection,
  collection.map(e => {
    const _id = new ObjectID();

    e._id = _id;

    const rName = e.resName.map(name => Object.assign({}, { name }));
    const criteria = { $or: rName };

    Restaurant.find(criteria, { projection: { _id: 1 } }).toArray(
      (err, items) => {
        
        e.restaurant = items.map(item => item._id)
        console.log(`e is now: ${JSON.stringify(e)}`)
        Collection
          .insertOne(e, (err, response) => console.log(err));
      }
    )
    //
    const user = e.user;
    user.map(eachUser => {
      // update user
      User.updateOne({ _id: eachUser }, { $push: { collection: _id } });
    });

    // Collection.insertOne(e, () => console.log("row inserted"));
  });

  // client.close();
});