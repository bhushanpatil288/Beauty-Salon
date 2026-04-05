import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
    fetchAppointments as fetchAdminAppointmentsApi,
    fetchUserAppointments as fetchUserAppointmentsApi,
    cancelUserAppointment as cancelUserAppointmentApi,
    updateAppointmentStatus as updateAppointmentStatusApi,
} from "../../api/api";
import type { Appointment } from "../../types";

interface AppointmentsState {
    adminList: Appointment[];
    userList: Appointment[];
    adminLoading: boolean;
    userLoading: boolean;
    error: string | null;
}

const initialState: AppointmentsState = {
    adminList: [],
    userList: [],
    adminLoading: false,
    userLoading: false,
    error: null,
};

/**
 * @desc Deep fetches all appointments. Only accessible if JWT signifies admin role.
 */
export const fetchAdminAppointments = createAsyncThunk(
    "appointments/fetchAdminAppointments",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchAdminAppointmentsApi();
            return (res.data.data ?? res.data) as Appointment[];
        } catch {
            return rejectWithValue("Failed to fetch appointments");
        }
    }
);

/**
 * @desc Deep fetches appointments strictly for the current user's profile dashboard.
 */
export const fetchUserAppointments = createAsyncThunk(
    "appointments/fetchUserAppointments",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchUserAppointmentsApi();
            return (res.data.data ?? res.data) as Appointment[];
        } catch {
            return rejectWithValue("Failed to fetch your appointments");
        }
    }
);

/**
 * @desc Triggers user cancellation and handles potential generic backend constraints.
 */
export const cancelAppointment = createAsyncThunk(
    "appointments/cancelAppointment",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await cancelUserAppointmentApi(id);
            return (res.data.data ?? res.data) as Appointment;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ?? "Failed to cancel appointment"
            );
        }
    }
);

/**
 * @desc Specific logic enabling async modifications (ie. Pending => Confirmed) from the internal dashboard tracking.
 */
export const updateAppointmentStatus = createAsyncThunk(
    "appointments/updateStatus",
    async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
        try {
            const res = await updateAppointmentStatusApi(id, status);
            return (res.data.data ?? res.data) as Appointment;
        } catch {
            return rejectWithValue("Failed to update status");
        }
    }
);

const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        clearAdminList(state) {
            state.adminList = [];
        },
        clearUserList(state) {
            state.userList = [];
        },
    },
    extraReducers: (builder) => {
        // Admin list
        builder
            .addCase(fetchAdminAppointments.pending, (state) => {
                state.adminLoading = true;
                state.error = null;
            })
            .addCase(fetchAdminAppointments.fulfilled, (state, action) => {
                state.adminList = action.payload;
                state.adminLoading = false;
            })
            .addCase(fetchAdminAppointments.rejected, (state, action) => {
                state.error = action.payload as string;
                state.adminLoading = false;
            });

        // User list
        builder
            .addCase(fetchUserAppointments.pending, (state) => {
                state.userLoading = true;
                state.error = null;
            })
            .addCase(fetchUserAppointments.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.userLoading = false;
            })
            .addCase(fetchUserAppointments.rejected, (state, action) => {
                state.error = action.payload as string;
                state.userLoading = false;
            });

        // Cancel appointment — optimistically update userList
        builder
            .addCase(cancelAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
                const idx = state.userList.findIndex((a) => a._id === action.payload._id);
                if (idx !== -1) state.userList[idx] = action.payload;
            });

        // Admin status update — update in adminList
        builder
            .addCase(updateAppointmentStatus.fulfilled, (state, action: PayloadAction<Appointment>) => {
                const idx = state.adminList.findIndex((a) => a._id === action.payload._id);
                if (idx !== -1) state.adminList[idx] = action.payload;
            });
    },
});

export const { clearAdminList, clearUserList } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
