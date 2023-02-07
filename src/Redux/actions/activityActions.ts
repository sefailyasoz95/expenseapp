import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootStore} from '../store/store';
import {CreateActivityType} from '../../Types/types';
import {
  CreateActivityAsync,
  DeleteActivityAsync,
  GetActivitiesByDeviceIdAsync,
  UpdateActivityAsync,
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

export const updateActivity = createAsyncThunk(
  'activity/update',
  async (values: {id: number; data: CreateActivityType}, thunkAPI) => {
    try {
      return await UpdateActivityAsync(values.id, values.data);
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

export const deleteActivity = createAsyncThunk(
  'activity/delete',
  async (id: number, thunkAPI) => {
    try {
      return await DeleteActivityAsync(id);
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
