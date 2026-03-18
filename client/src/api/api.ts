import axios from "axios";
const baseurl = import.meta.env.VITE_API_BASE_URL;


export const fetchServices = async () => await axios.get(`${baseurl}/services`);
export const signup = async (formData: any) => await axios.post(`${baseurl}/auth/signup`, formData, { withCredentials: true });
export const logout = async () => await axios.post(`${baseurl}/auth/logout`, {}, { withCredentials: true });
export const fetchUser = async () => await axios.get(`${baseurl}/auth/user`, { withCredentials: true });