import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  CreateCardAsync,
  GetCardsByDeviceIdAsync,
} from '../services/cardServices';
import {CreateCardType} from '../../Types/types';

export const createCard = createAsyncThunk(
  'card/create',
  async (data: CreateCardType, thunkAPI) => {
    try {
      return await CreateCardAsync(data);
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

export const getCardsByDeviceId = createAsyncThunk(
  'card/getCardsByDeviceId',
  async (_, thunkAPI) => {
    try {
      return await GetCardsByDeviceIdAsync();
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
