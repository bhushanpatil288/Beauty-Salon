import AdminLayout from "../../components/layout/AdminLayout";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
    return (
        <AdminLayout title="Settings">
            <div className="rounded-2xl border border-border bg-white shadow-sm p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
                    <SettingsIcon className="w-8 h-8 text-stone-400" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Salon Settings</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Configure business hours, notification preferences, service pricing, and other salon settings. This feature is coming soon.
                </p>
            </div>
        </AdminLayout>
    );
};

export default Settings;
