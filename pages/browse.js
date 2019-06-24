import React, { Component } from "react";
import { observer } from "mobx-react";
import nextCookies from "next-cookies";
import Link from "next/link";

// sub-components
import Restaurant from "../src/components/Restaurant";

// styling
import Head from "../src/components/Head";
import styled from "styled-components";
import $ from "jquery";

import DateOps from "../data/";

const myStore = new DateOps();

const MainHeaderStyle = styled.div`
  -webkit-box-shadow: 0 8px 6px -5px #7f8c8d;
  -moz-box-shadow: 0 8px 6px -5px #7f8c8d;
  box-shadow: 0 8px 6px -5px #7f8c8d;

  form {
    div.row {
      div {
        input:focus {
          border-bottom: 1px solid #d35400 !important;
          box-shadow: 0 1px 0 0 #d35400 !important;
        }
      }
    }
  }

  .userIcon {
    border: solid 2px;
    border-radius: 50%;
    font-size: 200%;
    text-align: center;
  }
  .greetings {
    margin: 0;
  }
  .nav-link {
    font-size: 90%;
  }
`;

@observer
class MyApp extends Component {
  static async getInitialProps(ctx) {
    // pass initial data here
    const data = ctx.query.initialData;
    const { token, user } = nextCookies(ctx);

    // get cookie (user)'
    // console.log(`Index.js token: ${token} username: ${user}`)

    return { restaurant: data, user };
  }

  componentDidMount() {
    myStore.fetchProjects();

    // Initialize
    // M.AutoInit();

    // Initialize TimePicker
    M.Timepicker.init($(".timepicker"), {
      onSelect: this.handleTimeSelect,
      twelveHour: false,
      i18n: {
        cancel: "Cancelar",
        clear: "Limpar",
        done: "Ok"
      }
    });

    const f = M.Timepicker.getInstance($(".timepicker")).time;
    console.log(f);
    //
    M.FormSelect.init($(".select-day"), {});

    // M.Datepicker.init($('.datepicker'), {
    //   i18n: {
    //     selectMonths: false,
    //   }
    // });
  }

  handleKeyPress = e => {
    myStore.filter = e.target.value.toLowerCase().replace(/\s+/, "");
  };

  handleDaySelect = e => {
    // update state
    myStore.day = e.target.value;
    console.log(`myStore.day:${myStore.day}`);
  };

  handleTimeSelect = (hour, minute) => {
    myStore.time = {hour, minute};
    console.log(`myStore.time:${myStore.time.hour}, ${myStore.time.minute}`)
  };

  render() {
    // for testing (FE/Next app only)

    // const restaurant = [
    //   {name: 'Meat N Bones'},
    //   {name: 'Jolly\'s Bistro'},
    //   {name: 'Salsa Salsa'},
    //   {name: 'Steaks Maple'},
    //   {name: 'Me and Me'},
    //   {name: 'Meat Agaaaiinnnn'},
    // ]

    // for fullstack testing
    const restaurant =
      myStore.restaurant.length > 0
        ? myStore.filterRestaurant
        : this.props.restaurant;


    return (
      <div className="container-fluid">
        <div className="MainApp">
          <Head title={"Home"} />
          <MainHeaderStyle className="row valign-wrapper">
            <form className="col s10 offset-s1">
              <div className="row">
                <div className="input-field col s6 offset-s3">
                  <i className="material-icons prefix">search</i>
                  <input
                    onChange={this.handleKeyPress}
                    placeholder="Search Restaurant..."
                    id="filter"
                    type="text"
                    className="validate"
                  />
                </div>
              </div>
            </form>
            <div className="col s1">
              <div className="row">
                <i className="userIcon material-icons prefix">person</i>
                <p className="greetings">Hi, {this.props.user || "Guest"}</p>
                <Link href="/collection">
                  <a className="nav-link">view collection</a>
                </Link>
              </div>
            </div>
          </MainHeaderStyle>
          {/* Date filter UI */}
          <div className="row">
            <div className="input-field col s6 m2 offset-m4">
              <i className="material-icons prefix">access_time</i>
              <input
                type="text"
                placeholder="Select Time"
                className="timepicker"
              />
            </div>
            <div className="input-field col s6 m2">
              <i className="material-icons prefix">calendar_today</i>
              <select className="select-day" onChange={this.handleDaySelect}>
                <option value="All">Any Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
          </div>
          <div className="row">
            {restaurant.map(e => (
              <Restaurant key={e._id} {...e} />
            ))}
            {/* <Restaurant {...c} /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default MyApp;
