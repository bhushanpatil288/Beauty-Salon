import { useContext, createContext, useState, useEffect } from "react";
import { fetchServices } from "../api/api";

interface ServicesContextType {
    services: any[];
    loading: boolean;
    error: string;
}

const ServicesContext = createContext<ServicesContextType | null>(null);

export const ServicesProvider = ({ children }: { children: React.ReactNode }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchServices();
                // Server now wraps data under res.data.data
                setServices(res.data.data ?? res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch services");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <ServicesContext.Provider value={{ services, loading, error }}>
            {children}
        </ServicesContext.Provider>
    );
};

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error("useServices must be used within a ServicesProvider");
    }
    return context;
};