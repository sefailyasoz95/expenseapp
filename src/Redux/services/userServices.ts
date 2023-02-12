import {getUniqueId} from 'react-native-device-info';
import {axiosClient} from '../../Helpers/axios/axiosClient';
import {CreateUserType} from '../../Types/types';

export const CreateUserAsync = async (data: CreateUserType) => {
  try {
    const response = await axiosClient.post(`users`, data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const GetUserByDeviceIdAsync = async () => {
  const deviceId = await getUniqueId();
  try {
    const response = await axiosClient.get(`users/${deviceId}`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
