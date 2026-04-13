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
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="ml-56">
                <AdminHeader title={title} subtitle={subtitle} />
                <main className="p-6 bg-gradient-to-b from-background via-muted/20 to-background min-h-[calc(100vh-4rem)]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
