import { configure, observable, computed, action } from "mobx";

import * as api from "../src/api";

const { filterOpenNow, openAtDay, opensAfter } = require("./driver");

class DateOps {
  // List of Restaurant
  @observable restaurant = [];

  // filter variables
  @observable filter = "";
  @observable day = "";
  @observable time = "";

  // email and password
  @observable user = {
    email: 'john@gmail.com',
    pwd: '123456',
  }

  constructor() {
    // serves as a copy - restaurant still doesnt change
    this.ultimateFilter = [];
  }

  resetFilter() {
    this.ultimateFilter = this.restaurant;
  }

  @action
  fetchProjects() {
    api.fetchAll().then(
      action(resp => {
        // data is here
        this.restaurant = resp;
        this.ultimateFilter = this.restaurant;
      }),
      action(err => {
        console.error(err);
      })
    );
  }

  get filterRestaurant() {
    // if user selects back '', filter restart to all
    // if (this.day === 'All') {
    //   console.log('this pass!')
    //   this.ultimateFilter = this.restaurant;
    // }

    // if (this.day !== '' && this.day !== 'All') {
    //   this.ultimateFilter = openAtDay(this.restaurant, this.day)
    //                               .filter(e => e.name.toLowerCase().includes(this.filter))

    //   return this.ultimateFilter;
    // }

    // return this.ultimateFilter.filter(e => e.name.toLowerCase().includes(this.filter))
    return openAtDay(this.restaurant, this.day).filter(e =>
      e.name.toLowerCase().includes(this.filter)
    );
  }

  set filter(text) {
    this.filter = text;
  }

  set restaurantNew(newArray) {
    this.restaurant = newArray;
  }
}

export default DateOps;
