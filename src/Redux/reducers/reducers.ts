import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GenericApiResponse, InitialState} from '../../Types/types';
import {
  createActivity,
  deleteActivity,
  getActivitiesByDeviceId,
  updateActivity,
} from '../actions/activityActions';
import {createUser, getUserByDeviceId} from '../actions/userActions';
import {
  createCard,
  deleteCard,
  getCardsByDeviceId,
  updateCard,
} from '../actions/cardActions';
import {writeLog} from '../actions/logActions';

export const initialState: InitialState = {
  error: false,
  success: false,
  loading: false,
  message: '',
  activities: [],
  isWelcomePassed: false,
  cards: [],
  user: undefined,
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
            state.isWelcomePassed = true;
          } else {
            state.message = action.payload.message;
            state.error = true;
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
            state.message = action.payload.message;
            state.error = true;
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
      }) // *********** Update Activity START *********** \\
      .addCase(updateActivity.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        updateActivity.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {
          if (action.payload.statusCode === 200) {
            // state.cards = action.payload.data;
          } else {
            // state.activities
          }
          state.loading = false;
        },
      )
      .addCase(updateActivity.rejected, (state, action: any) => {
        state.error = true;
        state.loading = false;
        // *********** Update Activity END *********** \\
      }) // *********** Delete Activity START *********** \\
      .addCase(deleteActivity.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        deleteActivity.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {
          if (action.payload.statusCode === 200) {
            // state.cards = action.payload.data;
          } else {
            // state.activities
          }
          state.loading = false;
        },
      )
      .addCase(deleteActivity.rejected, (state, action: any) => {
        state.error = true;
        state.loading = false;
        // *********** Delete Activity END *********** \\
      }) // *********** Update Card START *********** \\
      .addCase(updateCard.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        updateCard.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {
          if (action.payload.statusCode === 200) {
            // state.cards = action.payload.data;
          } else {
            // state.activities
          }
          state.loading = false;
        },
      )
      .addCase(updateCard.rejected, (state, action: any) => {
        state.error = true;
        state.loading = false;
        // *********** Update Card END *********** \\
      }) // *********** Delete Card START *********** \\
      .addCase(deleteCard.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        deleteCard.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {
          if (action.payload.statusCode === 200) {
            // state.cards = action.payload.data;
          } else {
            // state.activities
          }
          state.loading = false;
        },
      )
      .addCase(deleteCard.rejected, (state, action: any) => {
        state.error = true;
        state.loading = false;
        // *********** Delete Card END *********** \\
      }) // *********** Write Log START *********** \\
      .addCase(writeLog.pending, state => {})
      .addCase(
        writeLog.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {},
      )
      .addCase(writeLog.rejected, (state, action: any) => {
        // *********** Write Log END *********** \\
      }) // *********** Write Log START *********** \\
      .addCase(getUserByDeviceId.pending, state => {})
      .addCase(
        getUserByDeviceId.fulfilled,
        (state, action: PayloadAction<GenericApiResponse>) => {
          if (action.payload.statusCode === 200) {
            state.user = action.payload.data ?? undefined;
            state.isWelcomePassed = !!action.payload.data ?? false;
          }
        },
      )
      .addCase(getUserByDeviceId.rejected, (state, action: any) => {
        // *********** Write Log END *********** \\
      });
  },
});

export const {clearGlobalStates, setIsWelcomePassed} = reducer.actions;

export default reducer.reducer;
