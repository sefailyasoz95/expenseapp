import {createAsyncThunk} from '@reduxjs/toolkit';
import {WriteLogAsync} from '../services/logServices';

export const writeLog = createAsyncThunk(
  'logs/write',
  async (logText: string, thunkAPI) => {
    try {
      return await WriteLogAsync(logText);
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
