import { useContext, createContext, useState, useEffect, type ReactNode } from "react"
import { fetchUser } from "../api/api";

interface AuthContextType {
    user: any | null;
    token: string | null;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetchUser();
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}