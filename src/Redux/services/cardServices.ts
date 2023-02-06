import {axiosClient} from '../../Helpers/axios/axiosClient';
import {CreateCardType, CreateUserType} from '../../Types/types';
import {getUniqueId} from 'react-native-device-info';

export const CreateCardAsync = async (data: CreateCardType) => {
  try {
    const response = await axiosClient.post(`cards`, data);
    console.log('response.data:: ', response.data);

    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const GetCardsByDeviceIdAsync = async () => {
  const deviceId = await getUniqueId();
  try {
    const response = await axiosClient.get(`cards?deviceId=${deviceId}`);
    console.log('GetCardsAsync response.data:: ', response.data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
