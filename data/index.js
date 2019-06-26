import { configure, observable, computed, action } from "mobx";
import moment from 'moment';

import * as api from "../src/api";

const {
  filterOpenNow,
  openAtDay,
  opensAfter,
  convertTo24 } = require("./driver");

class DateOps {
  // List of Restaurant
  @observable restaurant = [];
  @observable collection = {};

  // filter variables
  @observable filter = "";
  @observable day = "";

  // pass time heref
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

  @action
  fetchCollection(collectionName, listId) {
  
    this.collection[collectionName] = [];
    listId.map(id => {
      api.getSingleRestaurant(id)
        .then(
          action(resp => {
            console.log(`resp: ${JSON.stringify(resp)}`)
            this.collection[collectionName].push(resp);
          }),
          action(err => {
            console.error(err);
          })
        )
      }
    )
  }

  get filterRestaurant() {

    const { hour, minute } = this.time;
    const now = moment({ hour, minute }).format();

    return openAtDay(this.restaurant, this.day)
      .filter(e => {
        for (let each of e.open) {
          const { hour: hourEnd, minute: minuteEnd } = convertTo24(
            each.time.closeAt
          );
          if (now < moment({ hour: hourEnd, minute: minuteEnd }).format()) {
            return true;
          }
            
        }
      })
      .filter(e =>
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