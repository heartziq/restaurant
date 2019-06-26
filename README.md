# restaurant


# Features completed
  - Browse restaurants
  - Search by restaurant name
  - Filter by time and/or date
  - Browse collections
  - login

### Tech Stack

The following are the tech stack I used:

* [Next.JS](https://github.com/zeit/next.js/)
* [Express](http://expressjs.com)
* [MongoDB](https://mongodb.github.io/node-mongodb-native/)

### Installation



```sh
$ yarn install
```

Populate DB

```sh
$ mongod
$ node script/insertRestaurant.js
$ node script/insertUser.js 
$ node script/insertCollection.js
```
Run app

```sh
$ yarn start
```

2 users accounts are provided:

1. mike@gmail.com
2. john@gmail.com
Both passwords are 123456

