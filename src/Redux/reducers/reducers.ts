import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InitialState} from '../../Types/types';

export const initialState: InitialState = {
  error: false,
  success: false,
  loading: false,
  message: '',
};

export const reducer = createSlice({
  name: 'global',
  initialState,
  reducers: {
    clearGlobalStates: state => {
      state.message = '';
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder;
    // *********** Check App Version START *********** \\
    // .addCase(getBasicDetails.pending, state => {
    //   state.isLoading = true;
    //   state.message = '';
    //   state.success = false;
    //   state.error = false;
    // })
    // .addCase(getBasicDetails.fulfilled, (state, action) => {
    //   if (action.payload?.data?.code === 200) {
    //     state.basicDetails = action.payload.data.data;
    //   } else {
    //     state.isCreditCardDeleted = false;
    //     state.message = action.payload.data.message;
    //   }
    //   state.isLoading = false;
    // })
    // .addCase(getBasicDetails.rejected, (state, action: any) => {
    //   state.error = true;
    //   state.isLoading = false;
    // *********** Check App Version END *********** \\
    // });
  },
});

export const {clearGlobalStates} = reducer.actions;

export default reducer.reducer;
