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

export const getSingleRestaurant = (id) => {
  return new Promise((resolve, reject) => {
    try {
      axios.get(`/api/${id}`)
            .then(resp => {
              console.log(`data: ${JSON.stringify(resp.data)}`)
              resolve(resp.data)
            })
    } catch {
      reject(new Error('error fetching data...'))
    }
  })
}