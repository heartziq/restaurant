import { Component } from 'react';
import nextCookies from 'next-cookies';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

class Collection extends Component {
  static async getInitialProps(ctx) {

    // strip token
    let { token } = nextCookies(ctx);

    if (!token)
      Router.push('/login');

    token = `Bearer ${token}`

    console.log(`token: ${token}`)

    // set api endpoint
    const apiUrl = 'http://localhost:3000/collection'

    // inject in header
    try {
      const response = await fetch(apiUrl, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JSON.stringify({ token })
        }
      })
  
      if (response.ok) {
        console.log('it GOES HERE')
        return await response.json()
      } else { // suspect: redirect only happens here
        // https://github.com/developit/unfetch#caveats
        console.log('response is NOT ok =( #1')
        Router.push('/login')
      }
    } catch (error) {
      // Implementation or Network error
      console.log('response is NOT ok =( #2')

      Router.push('/login')
    }
  }

  render() {
    return (
      <div className="CollectionPage">
        <h1>Welcome to collection {this.props.msg}</h1>
      </div>
    )
  }
}

export default Collection;