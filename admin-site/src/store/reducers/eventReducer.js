import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "../../services/eventService";

export const getAllEvents = createAsyncThunk(
    "events/getAllEvents",
    async (_, { rejectWithValue }) => {
        try {
            const response = await eventService.getAllEvents();
            return response;
        } catch (error) {
            console.error(error.data.message);
            throw rejectWithValue(error.data);
        }
    },
);

export const changeEventStatus = createAsyncThunk(
    "events/changeEventStatus",
    async (data, { rejectWithValue }) => {
        const { id, status } = data;
        console.log(id, status);
        try {
            const response = await eventService.changeEventStatus(id, status);
            return response;
        } catch (error) {
            console.error(error.data.message);
            throw rejectWithValue(error.data);
        }
    },
);

// export const getAllEvents = () => (dispatch) => {
//     return eventService
//         .getAllEvents()
//         .then((response) => {
//             dispatch(getEventsSuccess(response.data.data));
//             return response;
//         })
//         .catch((e) => {
//             if (e) {
//                 dispatch(getEventsFailed(e.data.message));
//                 return e.data;
//             }
//             const error = {
//                 message: "Server Error",
//                 status: "failed",
//             };
//             dispatch(getEventsFailed(error.message));
//             return error;
//         });
// };

// export const changeEventStatus = (id, status) => (dispatch) => {
//     return eventService
//         .changeEventStatus(id, status)
//         .then((response) => {
//             dispatch(changeEventStatusSuccess(response.data.data));
//             return response;
//         })
//         .catch((e) => {
//             if (e) {
//                 dispatch(changeEventStatusFailed(e.data.message));
//                 return e.data;
//             }
//             const error = {
//                 message: "Server Error",
//                 status: "failed",
//             };
//             return error;
//         });
// };

export const deleteEvent = (id) => async (dispatch) => {
    return eventService
        .deleteEvent(id)
        .then((response) => {
            dispatch(deleteEventSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(deleteEventFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(deleteEventFailed(error.message));
            return error;
        });
};

export const createEvent = (requestedData) => async (dispatch) => {
    return eventService
        .createEvent(requestedData)
        .then((response) => {
            dispatch(createEventSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(createEventFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(createEventFailed(error.message));
            return error;
        });
};

export const getDetailEvent = (id) => async (dispatch) => {
    return eventService
        .getDetailEvent(id)
        .then((response) => {
            dispatch(getEventDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getEventDetailFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getEventDetailFailed(error.message));
            return error;
        });
};

export const editDetailEvent = (id, requestedData) => async (dispatch) => {
    return eventService
        .editDetailEvent(id, requestedData)
        .then((response) => {
            dispatch(editEventDetailSuccess(response));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(editEventDetailFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(editEventDetailFailed(error.message));
            return error;
        });
};

export const editDetailEventImages =
    (id, requestedData) => async (dispatch) => {
        return eventService
            .editDetailEventImages(id, requestedData)
            .then((response) => {
                dispatch(editEventDetailSuccess(response));
                return response;
            })
            .catch((e) => {
                if (e) {
                    dispatch(editEventDetailFailed(e.data.message));
                    return e.data;
                }
                const error = {
                    message: "Server Error",
                    status: "failed",
                };
                dispatch(editEventDetailFailed(error.message));
                return error;
            });
    };

export const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: [],
        detailEvent: {},
        changedEvent: {},
        loading: false,
        status: "",
        error: "",
        success: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.pending, (state) => {
                state.loading = true;
                state.status = "pending";
                state.error = "";
            })
            .addCase(getAllEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = [...action.payload.data.data];
                state.status = "success";
                state.error = "";
                state.success = action.payload.message;
            })
            .addCase(getAllEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.status = "failed";
            })
            .addCase(changeEventStatus.pending, (state) => {
                state.loading = true;
                state.status = "pending";
                state.error = "";
            })
            .addCase(changeEventStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.changedEvent = action.payload;
                state.status = "success";
                state.error = "";
                console.log(action.payload);
                state.success = action.payload.message;
            })
            .addCase(changeEventStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.status = "failed";
            });
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
        getEventDetailSuccess: (state, action) => {
            state.detailEvent = { ...action.payload.data };
            state.message.success = action.payload.message;
            state.success = true;
        },
        getEventDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        deleteEventSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        deleteEventFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        createEventSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        createEventFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        editEventDetailSuccess: (state, action) => {
            state.message.success = action.payload.message;
            state.success = true;
        },
        editEventDetailFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        changeEventStatusSuccess: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        changeEventStatusFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
    },
});

export const {
    deleteEventSuccess,
    deleteEventFailed,
    createEventSuccess,
    createEventFailed,
    getEventDetailSuccess,
    getEventDetailFailed,
    editEventDetailSuccess,
    editEventDetailFailed,
    changeEventStatusSuccess,
    changeEventStatusFailed,
} = eventSlice.actions;

export default eventSlice.reducer;
