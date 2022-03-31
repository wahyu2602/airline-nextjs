import Axios from 'axios'

const baseUrl = process.env.BASE_URL;

export const axios = Axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    withCredentials: true
  }
});