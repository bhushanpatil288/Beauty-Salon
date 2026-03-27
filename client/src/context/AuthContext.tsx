import { useContext, createContext, useState, useEffect, type ReactNode } from "react";
import { fetchUser, fetchAppointments } from "../api/api";

interface AuthContextType {
    user: any | null;
    token: string | null;
    loading: boolean;
    appointments: any[];
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetchUser();
                // Server returns { success, message, data: userObject }
                const loggedInUser = res.data.data ?? res.data.user ?? res.data;
                setUser(loggedInUser);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);

    useEffect(() => {
        if (user?.role === "admin") {
            const getAppointments = async () => {
                try {
                    const apptRes = await fetchAppointments();
                    setAppointments(apptRes.data.data ?? apptRes.data);
                } catch (apptErr) {
                    console.error("Failed to fetch appointments:", apptErr);
                }
            };
            getAppointments();
        } else {
            setAppointments([]);
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, token, loading, setUser, setToken, appointments }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};