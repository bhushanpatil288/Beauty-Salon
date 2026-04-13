import AdminLayout from "../../components/layout/AdminLayout";
import { Scissors } from "lucide-react";

const Stylists = () => {
    return (
        <AdminLayout title="Stylists">
            <div className="rounded-2xl border border-border bg-card shadow-sm p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <Scissors className="w-8 h-8 text-accent-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Stylist Management</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Manage your team of stylists, their schedules, specializations, and performance metrics. This feature is coming soon.
                </p>
            </div>
        </AdminLayout>
    );
};

export default Stylists;
