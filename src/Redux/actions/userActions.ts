import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootStore} from '../store/store';
import {CreateUserType} from '../../Types/types';
import {CreateUserAsync} from '../services/userServices';

export const createUser = createAsyncThunk(
  'users/create',
  async (data: CreateUserType, thunkAPI) => {
    try {
      return await CreateUserAsync(data);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
