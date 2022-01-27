import { createSlice } from "@reduxjs/toolkit";
import eventService from "../../services/eventService";

export const getAllEvents = () => (dispatch) =>
  eventService.getAllEvents().then((response) => {
    if (response.status === "success") {
      dispatch(getEventsSuccess(response.data.data));
    } else {
      dispatch(getEventsFailed(response.message));
    }
  });

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
