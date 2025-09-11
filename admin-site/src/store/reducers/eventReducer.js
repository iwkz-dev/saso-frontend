import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "../../services/eventService";

// ============== Helpers ==============
const getErrorPayload = (err, fallback = "Server Error") => {
    const message =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        fallback;
    return { status: "failed", message };
};

const findIndexById = (arr, id) => arr.findIndex((e) => e._id === id);

// ============== Core Thunks ==============
export const getAllEventsThunk = createAsyncThunk(
    "event/getAllEvents",
    async (_, { rejectWithValue }) => {
        try {
            const res = await eventService.getAllEvents();
            return { status: "success", data: res?.data?.data || [] };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const changeEventStatusThunk = createAsyncThunk(
    "event/changeEventStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const res = await eventService.changeEventStatus(id, status);
            return {
                status: "success",
                message: res?.data?.message || "Event status updated",
                data: res?.data?.data,
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const changeEventPOClosedThunk = createAsyncThunk(
    "event/changeEventPOClosed",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const res = await eventService.changeEventPOClosed(id, status);
            return {
                status: "success",
                message: res?.data?.message || "PO status updated",
                data: res?.data?.data,
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const deleteEventThunk = createAsyncThunk(
    "event/deleteEvent",
    async (id, { rejectWithValue }) => {
        try {
            const res = await eventService.deleteEvent(id);
            return {
                status: "success",
                message: res?.data?.message || "Deleted",
                id,
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const createEventThunk = createAsyncThunk(
    "event/createEvent",
    async (requestedData, { rejectWithValue }) => {
        try {
            const res = await eventService.createEvent(requestedData);
            return {
                status: "success",
                message: res?.data?.message || "Created",
                data: res?.data?.data, // normalized
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const getDetailEventThunk = createAsyncThunk(
    "event/getDetailEvent",
    async (id, { rejectWithValue }) => {
        try {
            const res = await eventService.getDetailEvent(id);
            return {
                status: "success",
                data: res?.data?.data || res?.data,
                message: res?.data?.message || "",
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const editDetailEventThunk = createAsyncThunk(
    "event/editDetailEvent",
    async ({ id, requestedData }, { rejectWithValue }) => {
        try {
            const res = await eventService.editDetailEvent(id, requestedData);
            return {
                status: "success",
                data: res?.data?.data || res?.data,
                message: res?.data?.message || "Updated",
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

export const editDetailEventImagesThunk = createAsyncThunk(
    "event/editDetailEventImages",
    async ({ id, requestedData }, { rejectWithValue }) => {
        try {
            const res = await eventService.editDetailEventImages(
                id,
                requestedData,
            );
            return {
                status: "success",
                data: res?.data?.data || res?.data,
                message: res?.data?.message || "Images updated",
            };
        } catch (err) {
            return rejectWithValue(getErrorPayload(err));
        }
    },
);

// ============== Back-compat Wrappers (keep your current calls working) ==============
export const getAllEvents = () => async (dispatch) => {
    try {
        const payload = await dispatch(getAllEventsThunk()).unwrap();
        return payload; // { status, data }
    } catch (e) {
        return e; // { status:"failed", message }
    }
};

export const changeEventStatus = (id, status) => async (dispatch) => {
    try {
        const payload = await dispatch(
            changeEventStatusThunk({ id, status }),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const changeEventPOClosed = (id, status) => async (dispatch) => {
    try {
        const payload = await dispatch(
            changeEventPOClosedThunk({ id, status }),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const deleteEvent = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(deleteEventThunk(id)).unwrap();
        return payload; // { status, message, id }
    } catch (e) {
        return e;
    }
};

export const createEvent = (requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            createEventThunk(requestedData),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const getDetailEvent = (id) => async (dispatch) => {
    try {
        const payload = await dispatch(getDetailEventThunk(id)).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const editDetailEvent = (id, requestedData) => async (dispatch) => {
    try {
        const payload = await dispatch(
            editDetailEventThunk({ id, requestedData }),
        ).unwrap();
        return payload; // { status, message, data }
    } catch (e) {
        return e;
    }
};

export const editDetailEventImages =
    (id, requestedData) => async (dispatch) => {
        try {
            const payload = await dispatch(
                editDetailEventImagesThunk({ id, requestedData }),
            ).unwrap();
            return payload; // { status, message, data }
        } catch (e) {
            return e;
        }
    };

// ============== Slice ==============
const initialState = {
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    success: false, // kept for backward-compat
    error: null,
    message: { error: "", success: "" },
    events: [],
    detailEvent: {},
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllEvents
        builder
            .addCase(getAllEventsThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message.error = "";
                state.message.success = "";
            })
            .addCase(getAllEventsThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.events = Array.isArray(action.payload.data)
                    ? [...action.payload.data]
                    : [];
            })
            .addCase(getAllEventsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // changeEventStatus
        builder
            .addCase(changeEventStatusThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(changeEventStatusThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success =
                    action.payload.message || "Event status updated";
                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.events, updated._id);
                    if (idx !== -1)
                        state.events[idx] = {
                            ...state.events[idx],
                            ...updated,
                        };
                    if (state.detailEvent?._id === updated._id) {
                        state.detailEvent = {
                            ...state.detailEvent,
                            ...updated,
                        };
                    }
                }
            })
            .addCase(changeEventStatusThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // changeEventPOClosed
        builder
            .addCase(changeEventPOClosedThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(changeEventPOClosedThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success =
                    action.payload.message || "PO status updated";
                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.events, updated._id);
                    if (idx !== -1)
                        state.events[idx] = {
                            ...state.events[idx],
                            ...updated,
                        };
                    if (state.detailEvent?._id === updated._id) {
                        state.detailEvent = {
                            ...state.detailEvent,
                            ...updated,
                        };
                    }
                }
            })
            .addCase(changeEventPOClosedThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // deleteEvent
        builder
            .addCase(deleteEventThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteEventThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Deleted";
                const id = action.payload.id;
                if (id) {
                    state.events = state.events.filter((e) => e._id !== id);
                    if (state.detailEvent?._id === id) state.detailEvent = {};
                }
            })
            .addCase(deleteEventThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // createEvent
        builder
            .addCase(createEventThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createEventThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Created";
                const created = action.payload.data;
                if (created) state.events.unshift(created);
            })
            .addCase(createEventThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // getDetailEvent
        builder
            .addCase(getDetailEventThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDetailEventThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "";
                state.detailEvent = { ...(action.payload.data || {}) };
            })
            .addCase(getDetailEventThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // editDetailEvent
        builder
            .addCase(editDetailEventThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editDetailEventThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success = action.payload.message || "Updated";
                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.events, updated._id);
                    if (idx !== -1)
                        state.events[idx] = {
                            ...state.events[idx],
                            ...updated,
                        };
                    if (state.detailEvent?._id === updated._id) {
                        state.detailEvent = {
                            ...state.detailEvent,
                            ...updated,
                        };
                    }
                }
            })
            .addCase(editDetailEventThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });

        // editDetailEventImages
        builder
            .addCase(editDetailEventImagesThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editDetailEventImagesThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.success = true;
                state.message.success =
                    action.payload.message || "Images updated";
                const updated = action.payload.data;
                if (updated?._id) {
                    const idx = findIndexById(state.events, updated._id);
                    if (idx !== -1)
                        state.events[idx] = {
                            ...state.events[idx],
                            ...updated,
                        };
                    if (state.detailEvent?._id === updated._id) {
                        state.detailEvent = {
                            ...state.detailEvent,
                            ...updated,
                        };
                    }
                }
            })
            .addCase(editDetailEventImagesThunk.rejected, (state, action) => {
                state.status = "failed";
                state.success = false;
                const msg = action.payload?.message || "Server Error";
                state.error = msg;
                state.message.error = msg;
            });
    },
});

export default eventSlice.reducer;
