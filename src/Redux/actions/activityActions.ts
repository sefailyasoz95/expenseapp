import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootStore} from '../store/store';
import {CreateActivityType} from '../../Types/types';
import {
  CreateActivityAsync,
  GetActivitiesByDeviceIdAsync,
} from '../services/activityServices';

export const createActivity = createAsyncThunk(
  'activity/create',
  async (data: CreateActivityType, thunkAPI) => {
    try {
      return await CreateActivityAsync(data);
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

export const getActivitiesByDeviceId = createAsyncThunk(
  'activity/getAll',
  async (_, thunkAPI) => {
    try {
      return await GetActivitiesByDeviceIdAsync();
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
