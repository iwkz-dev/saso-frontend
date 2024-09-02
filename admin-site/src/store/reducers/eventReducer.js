import { createSlice } from "@reduxjs/toolkit";
import eventService from "../../services/eventService";

export const getAllEvents = () => (dispatch) => {
    return eventService
        .getAllEvents()
        .then((response) => {
            dispatch(getEventsSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(getEventsFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getEventsFailed(error.message));
            return error;
        });
};

export const changeEventStatus = (id, status) => (dispatch) => {
    return eventService
        .changeEventStatus(id, status)
        .then((response) => {
            dispatch(changeEventStatusSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(changeEventStatusFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getEventsFailed(error.message));
            return error;
        });
};

export const changeEventPOClosed = (id, status) => (dispatch) => {
    return eventService
        .changeEventPOClosed(id, status)
        .then((response) => {
            dispatch(changeEventPOClosedSuccess(response.data.data));
            return response;
        })
        .catch((e) => {
            if (e) {
                dispatch(changeEventPOClosedFailed(e.data.message));
                return e.data;
            }
            const error = {
                message: "Server Error",
                status: "failed",
            };
            dispatch(getEventsFailed(error.message));
            return error;
        });
};

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
        success: false,
        message: {
            error: "",
            success: "",
        },
        events: [],
        detailEvent: {},
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
        changeEventPOClosedSuccess: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
        changeEventPOClosedFailed: (state, action) => {
            state.message.error = action.payload;
            state.success = false;
        },
    },
});

export const {
    getEventsSuccess,
    getEventsFailed,
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
    changeEventPOClosedSuccess,
    changeEventPOClosedFailed,
} = eventSlice.actions;
export default eventSlice.reducer;
