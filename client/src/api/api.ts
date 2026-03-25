import axios from "axios";

/**
 * Pre-configured Axios instance.
 * baseURL and withCredentials are set once here — no need to repeat them on every call.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// ─── Auth ────────────────────────────────────────────────────────────────────
export const signup       = (formData: any) => api.post("/auth/signup",        formData);
export const adminSignup  = (formData: any) => api.post("/auth/signup/admin",  formData);
export const login        = (formData: any) => api.post("/auth/login",         formData);
export const adminLogin   = (formData: any) => api.post("/auth/login/admin",   formData);
export const logout       = ()              => api.post("/auth/logout",         {});
export const fetchUser    = ()              => api.get("/auth/user");

// ─── Services ─────────────────────────────────────────────────────────────────
export const fetchServices = () => api.get("/services");

// ─── Appointments ─────────────────────────────────────────────────────────────
export const createAppointment    = (formData: any) => api.post("/appointments/create",        formData);
export const getAppointmentsByDate = (date: string) => api.get(`/appointments/date/${date}`);
export const fetchAppointments    = ()              => api.get("/appointments/admin/all");

export default api;