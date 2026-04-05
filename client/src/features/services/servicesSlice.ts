import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchServices as fetchServicesApi } from "../../api/api";
import type { Service } from "../../types";

interface ServicesState {
    list: Service[];
    loading: boolean;
    error: string | null;
}

const initialState: ServicesState = {
    list: [],
    loading: true,
    error: null,
};

export const fetchServices = createAsyncThunk(
    "services/fetchServices",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchServicesApi();
            return (res.data.data ?? res.data) as Service[];
        } catch {
            return rejectWithValue("Failed to fetch services");
        }
    }
);

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default servicesSlice.reducer;
