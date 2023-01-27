import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import i18next from 'i18next';

export const axiosClient = axios.create({
  baseURL: 'API_BASE_URL',
  // headers: {
  //   lang: i18next.language === 'en' ? 'eng' : 'heb',
  // },
});
