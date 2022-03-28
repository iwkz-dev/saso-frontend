import { createSlice } from '@reduxjs/toolkit';
import eventService from '../../services/eventService';

const initialState = {
  data: [],
  message: {
    error: '',
    success: '',
  },
};

export const getEvent = () => dispatch => {
  const status = 'approved';
  return eventService.getEvent(status).then(response => {
    if (response.data.status === 'success') {
      dispatch(eventSuccess(response.data));
    } else {
      dispatch(eventFailed(response.data));
    }
    return Promise.resolve();
  });
};

export const eventSlice = createSlice({
  name: 'event',
  initialState: initialState,
  reducers: {
    eventSuccess: (state, action) => {
      state.data = [...action.payload.data.data];
      state.message.success = action.payload.data.message;
      state.message.error = '';
    },
    eventFailed: (state, action) => {
      state.message.error = action.payload.data.message;
    },
    resetEvent: (state, action) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { eventSuccess, eventFailed } = eventSlice.actions;
export default eventSlice.reducer;
