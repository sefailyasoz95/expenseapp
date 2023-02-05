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
