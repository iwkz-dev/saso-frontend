import { createSlice } from "@reduxjs/toolkit";
import eventService from "../../services/eventService";

export const getAllEvents = () => (dispatch) => {
  return eventService
    .getAllEvents()
    .then((response) => {
      dispatch(getEventsSuccess(response.data.data));
    })
    .catch((e) => {
      dispatch(getEventsFailed(e.data.message));
      return e.data;
    });
};

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    success: false,
    message: {
      error: "",
      success: "",
    },
    events: [],
  },
  reducers: {
    getEventsSuccess: (state, action) => {
      state.events = [...action.payload];
      state.success = true;
    },
    getEventsFailed: (state, action) => {
      state.message.error = action.payload;
      state.success = false;
    },
  },
});

export const { getEventsSuccess, getEventsFailed } = eventSlice.actions;
export default eventSlice.reducer;
