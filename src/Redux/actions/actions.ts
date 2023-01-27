import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootStore} from '../store/store';

// export const login = createAsyncThunk(
//   'auth/login',
//   async (user: ILogin, thunkAPI) => {
//     try {
//       return await LoginAsync(user);
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );
