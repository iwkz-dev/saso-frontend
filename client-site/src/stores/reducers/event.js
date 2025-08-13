import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "../../services/eventService";

const initialState = {
    data: [],
    status: "idle",
    error: null,
    successMessage: null,
};

// ============== Thunks ==============

export const fetchEvents = createAsyncThunk(
    "event/fetchEvents",
    async (status, { rejectWithValue }) => {
        try {
            const res = await eventService.getEvent(status);
            if (res.data?.status !== "success") {
                return rejectWithValue(
                    res.data?.message || "Failed to fetch events",
                );
            }
            return {
                events: res.data.data?.data ?? [],
                message: res.data.message,
            };
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err?.message || "Network error",
            );
        }
    },
);

// ============== Slice ==============

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        resetEvent: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.successMessage = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.events;
                state.successMessage = action.payload.message || null;
                state.error = null;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error";
            });
    },
});

export const { resetEvent } = eventSlice.actions;

// ============== Selectors ==============
export const selectEventState = (state) => state.event;
export const selectEvents = (state) => state.event.data;
export const selectFirstEvent = (state) => state.event.data?.[0] ?? null;
export const selectEventStatus = (state) => state.event.status;
export const selectEventError = (state) => state.event.error;

export default eventSlice.reducer;
