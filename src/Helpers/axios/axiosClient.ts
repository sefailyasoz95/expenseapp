import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: __DEV__ ? 'http://localhost:3000' : '',
});
