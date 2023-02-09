import {axiosClient} from '../../Helpers/axios/axiosClient';
import {CreateCardType} from '../../Types/types';
import {getUniqueId} from 'react-native-device-info';

export const CreateCardAsync = async (data: CreateCardType) => {
  try {
    const response = await axiosClient.post(`cards`, data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const GetCardsByDeviceIdAsync = async () => {
  const deviceId = await getUniqueId();
  try {
    const response = await axiosClient.get(`cards/getByDeviceId/${deviceId}`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const UpdateCardAsync = async (id: number, data: CreateCardType) => {
  try {
    const response = await axiosClient.patch(`cards/${id}`, data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const DeleteCardAsync = async (id: number) => {
  try {
    const response = await axiosClient.delete(`cards/${id}`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
