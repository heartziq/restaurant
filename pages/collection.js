import { Component } from "react";
import nextCookies from "next-cookies";
import Router from "next/router";
import fetch from "isomorphic-unfetch";

import styled from "styled-components";

// styling
import Head from "../src/components/Head";
import $ from "jquery";

import SingleCollection from '../src/components/SingleCollection';

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #d35400;
  h5 {
    color: white;
  }
  button {
    align-self: flex-end;
    width: 23%;
    max-height: 20px;
    padding: 0 1px;
    span {
      display: inline-block;
      font-size: 90%;
      text-align: center;
      vertical-align: top;
      padding: auto;
    }
  }
`;

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

class Collection extends Component {
  // Uncomment for testing UI

  // static async getInitialProps(ctx) {
  //   // strip token
  //   let { token, user, userId } = nextCookies(ctx);

  //   if (!token) Router.push("/login");

  //   token = `Bearer ${token}`;

  //   // For Logging purposes

  //   // console.log(`token:${token}`)
  //   // console.log(`user:${user}`);
  //   // console.log(`userId:${userId}`)

  //   // set api endpoint
  //   // http://localhost:3000/api/collection/5cef8bcabc8ca03b806534ff
  //   const apiUrl = `http://localhost:3000/api/collection/${userId}`;

  //   // inject in header
  //   try {
  //     const response = await fetch(apiUrl);
  //     if (response.ok) {
  //       console.log("it GOES HERE");
  //       // console.log(`return: ${JSON.stringify(response.json())}`)
  //       return await response.json();
  //     } else {
  //       // suspect: redirect only happens here
  //       // https://github.com/developit/unfetch#caveats
  //       console.log("response is NOT ok =( #1");
  //       Router.push("/login");
  //     }
  //   } catch (error) {
  //     // Implementation or Network error
  //     console.log("response is NOT ok =( #2", error);

  //     Router.push("/login");
  //   }
  // }

  render() {
    // console.log(`props: ${JSON.stringify(this.props)}`);
    return (
      <div className="CollectionPage">
        <Head title={"collection"} />
        <MainHeaderStyle className="row valign-wrapper">
            <form className="col s10 offset-s1">
              <div className="row">
                <div className="input-field col s6 offset-s3">
                  <i className="material-icons prefix">search</i>
                  <input
                    onChange={this.handleKeyPress}
                    placeholder="Search Collections..."
                    id="filter"
                    type="text"
                    className="validate"
                  />
                </div>
              </div>
            </form>
          </MainHeaderStyle>
        <div className="row">
          <SingleCollection />
          <SingleCollection />
          <SingleCollection />
        </div>
      </div>
    );
  }
}

export default Collection;
