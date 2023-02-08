import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  CreateCardAsync,
  DeleteCardAsync,
  GetCardsByDeviceIdAsync,
  UpdateCardAsync,
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

export const updateCard = createAsyncThunk(
  'card/update',
  async (values: {id: number; data: CreateCardType}, thunkAPI) => {
    try {
      return await UpdateCardAsync(values.id, values.data);
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

export const deleteCard = createAsyncThunk(
  'card/delete',
  async (id: number, thunkAPI) => {
    try {
      return await DeleteCardAsync(id);
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
