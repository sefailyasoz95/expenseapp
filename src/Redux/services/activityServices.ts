import {getUniqueId} from 'react-native-device-info';
import {axiosClient} from '../../Helpers/axios/axiosClient';
import {CreateActivityType} from '../../Types/types';

export const GetActivitiesByDeviceIdAsync = async () => {
  const deviceId = await getUniqueId();
  try {
    const response = await axiosClient.get(`activities/${deviceId}`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const CreateActivityAsync = async (data: CreateActivityType) => {
  try {
    console.log("data I'm sending to backend: ", data);

    const response = await axiosClient.post(`activities`, data);
    console.log('responseresponse:: ', response.data);

    return response.data;
  } catch (error) {
    return error;
  }
};
