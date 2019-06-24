import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

export const fetchAll = () => {
  return new Promise((resolve, reject) => {
    try {
      axios.get('/api/')
            .then(resp => {
              resolve(resp.data)
            })
    } catch {
      reject(new Error('error fetching data...'))
    }
  })
}

// export const login = (email, pwd) => {
//   return axios.post('/api/login', {email, pwd})
//         .then(resp => resp.data)
//         .catch(err => err.stack)
// }

export const login = async (email, pwd) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, pwd })
  })

  if (response.ok) {
    const data = await response.json();

    document.cookie=`token=${data.token}`;
    document.cookie=`user=${data.user}`;

    Router.push('/')
  } else {
    console.log('Login Failed')
  }
}

// export const getCollection = async userId => {
//   const response = fetch(`/api/collection/${userId}`, {

//   });

// }