import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAppSelector((s) => s.auth);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
