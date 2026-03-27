import AdminLayout from "../components/layout/AdminLayout";
import { useAuth } from "../context/AuthContext";
import { CalendarDays, TrendingUp, DollarSign, XCircle } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import AppointmentsTable from "../components/dashboard/AppointmentsTable";
import TodaySchedule from "../components/dashboard/TodaySchedule";
import TeamToday from "../components/dashboard/TeamToday";

const AdminDashboard = () => {
    const { appointments } = useAuth();

    const booked = appointments.filter((a: any) => a.status === "booked").length;
    const completed = appointments.filter((a: any) => a.status === "completed").length;
    const cancelled = appointments.filter((a: any) => a.status === "cancelled").length;

    return (
        <AdminLayout title="Appointments">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                    title="Today's Bookings"
                    value={booked}
                    change="+14% vs last Thu"
                    changeType="positive"
                    icon={CalendarDays}
                    iconBgClass="bg-blue-50"
                    iconTextClass="text-blue-600"
                />
                <StatCard
                    title="This Week"
                    value={appointments.length}
                    change="+8% vs last week"
                    changeType="positive"
                    icon={TrendingUp}
                    iconBgClass="bg-emerald-50"
                    iconTextClass="text-emerald-600"
                />
                <StatCard
                    title="Revenue Today"
                    value="—"
                    change="Coming soon"
                    changeType="neutral"
                    icon={DollarSign}
                    iconBgClass="bg-amber-50"
                    iconTextClass="text-amber-600"
                />
                <StatCard
                    title="Cancellations"
                    value={cancelled}
                    change={completed > 0 ? `${Math.round((cancelled / (booked + completed + cancelled)) * 100)}% of total` : "—"}
                    changeType={cancelled > 0 ? "negative" : "neutral"}
                    icon={XCircle}
                    iconBgClass="bg-red-50"
                    iconTextClass="text-red-500"
                />
            </div>

            {/* Main content grid: table + sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                {/* Left: appointments table */}
                <AppointmentsTable appointments={appointments} />

                {/* Right: today's schedule + team */}
                <div className="space-y-6">
                    <TodaySchedule appointments={appointments} />
                    <TeamToday />
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
