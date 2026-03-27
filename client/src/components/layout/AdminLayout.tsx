import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

interface AdminLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
    return (
        <div className="min-h-screen bg-muted/30">
            <Sidebar />
            <div className="ml-56">
                <AdminHeader title={title} subtitle={subtitle} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
