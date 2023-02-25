import axios from 'axios';
import {getUniqueIdSync} from 'react-native-device-info';
const deviceId = getUniqueIdSync();
export const axiosClient = axios.create({
  baseURL: __DEV__
    ? 'https://api.budgetify.dev/'
    : 'https://api.budgetify.dev/',
  headers: {
    deviceId,
  },
  // baseURL: __DEV__ ? 'http://localhost:3000' : '',
});
