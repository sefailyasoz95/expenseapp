import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: __DEV__ ? 'https://bg.alertbull.io' : '',
  // baseURL: __DEV__ ? 'http://localhost:3000' : '',
});
