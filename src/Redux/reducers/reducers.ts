import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GenericApiResponse, InitialState} from '../../Types/types';
import {
  createActivity,
  getActivitiesByDeviceId,
} from '../actions/activityActions';
import {createUser} from '../actions/userActions';
import {createCard, getCardsByDeviceId} from '../actions/cardActions';

export const initialState: InitialState = {
  error: false,
  success: false,
  loading: false,
  message: '',
  activities: [],
  isWelcomePassed: false,
  cards: [],
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
    setIsWelcomePassed: (state, action) => {
      state.isWelcomePassed = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // *********** Create Activity START *********** \\
      .addCase(createActivity.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        createActivity.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {
          if (action.payload.statusCode === 200) {
          } else {
            // state.activities
          }
          state.loading = false;
        },
      )
      .addCase(createActivity.rejected, (state, action: any) => {
        state.error = true;
        state.loading = false;
        // *********** Create Activity END *********** \\
      }) // *********** Get Activities START *********** \\
      .addCase(getActivitiesByDeviceId.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        getActivitiesByDeviceId.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {
          if (action.payload.statusCode === 200) {
            state.activities = action.payload.data;
          } else {
            // state.activities
          }
          state.loading = false;
        },
      )
      .addCase(getActivitiesByDeviceId.rejected, (state, action: any) => {
        state.error = true;
        state.loading = false;
        // *********** Get Activities END *********** \\
      }) // *********** Create User START *********** \\
      .addCase(createUser.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {
          if (action.payload.statusCode === 200) {
            AsyncStorage.setItem('welcomePassed', 'true');
            state.isWelcomePassed = true;
          } else {
            // state.activities
          }
          state.loading = false;
        },
      )
      .addCase(createUser.rejected, (state, action: any) => {
        state.error = true;
        state.loading = false;
        // *********** Create User END *********** \\
      }) // *********** Create Card START *********** \\
      .addCase(createCard.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        createCard.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {
          if (action.payload.statusCode === 200) {
          } else {
          }
          state.loading = false;
        },
      )
      .addCase(createCard.rejected, (state, action: any) => {
        state.error = true;
        state.loading = false;
        // *********** Create Card END *********** \\
      }) // *********** Get Cards By Device Id START *********** \\
      .addCase(getCardsByDeviceId.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        getCardsByDeviceId.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {
          if (action.payload.statusCode === 200) {
            state.cards = action.payload.data;
          } else {
            // state.activities
          }
          state.loading = false;
        },
      )
      .addCase(getCardsByDeviceId.rejected, (state, action: any) => {
        state.error = true;
        state.loading = false;
        // *********** Get Cards By Device Id END *********** \\
      });
  },
});

export const {clearGlobalStates, setIsWelcomePassed} = reducer.actions;

export default reducer.reducer;
