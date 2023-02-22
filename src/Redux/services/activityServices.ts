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
    const response = await axiosClient.post(`activities`, data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const UpdateActivityAsync = async (
  id: number,
  data: CreateActivityType,
) => {
  try {
    const response = await axiosClient.patch(`activities/${id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const DeleteActivityAsync = async (id: number) => {
  try {
    const response = await axiosClient.delete(`activities/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
