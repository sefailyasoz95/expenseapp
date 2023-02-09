import {axiosClient} from '../../Helpers/axios/axiosClient';
import {getUniqueId} from 'react-native-device-info';

export const WriteLogAsync = async (logText: string) => {
  const deviceId = await getUniqueId();
  try {
    let data = {deviceId, action: logText};
    const response = await axiosClient.post(`custom-logger`, data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
