import { observer } from 'mobx-react';
import Router from 'next/router';
import axios from 'axios';

import MyRestaurant from '../data';
import * as api from '../src/api';

const myRestaurant = new MyRestaurant();

@observer
class Login extends React.Component {
  
  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, pwd } = myRestaurant.user;

    try {
      // submit to server
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pwd })
      })
    
      if (response.ok) {
        const data = await response.json();
    
        document.cookie=`token=${data.token}`;
        document.cookie=`user=${data.user}`;
        
        console.log('running Router push')
        Router.push('/collection')
        // Router.push('/browse');
      } else {
        console.log('Login Failed')
      }
    } catch (err) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )
    }

  }
  render() {
    // const { email, pwd } = req.body;
    return (
      <div className="LoginPage">
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit} >
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="email">Email:</label>
                <input id="email"
                      onChange={
                        (e) => myRestaurant.user.email = e.target.value
                      }
                      value={myRestaurant.user.email}
                      type="email"
                      className="validate" />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="validate"
                  value={myRestaurant.user.pwd}
                  onChange={(e) => myRestaurant.user.pwd = e.target.value} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
