import AdminLayout from "../../components/layout/AdminLayout";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchAdminAppointments, updateAppointmentStatus } from "../../features/appointments/appointmentsSlice";
import { CalendarDays, TrendingUp, DollarSign, XCircle } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import AppointmentsTable from "../../components/dashboard/AppointmentsTable";
import TodaySchedule from "../../components/dashboard/TodaySchedule";
import TeamToday from "../../components/dashboard/TeamToday";
import { useEffect } from "react";

const AdminDashboard = () => {
    const dispatch = useAppDispatch();
    const { adminList: appointments, adminLoading } = useAppSelector((s) => s.appointments);

    useEffect(() => {
        dispatch(fetchAdminAppointments());
    }, [dispatch]);

    const booked = appointments.filter((a) => a.status === "booked").length;
    const completed = appointments.filter((a) => a.status === "completed").length;
    const cancelled = appointments.filter((a) => a.status === "cancelled").length;

    const handleStatusChange = (id: string, status: string) => {
        dispatch(updateAppointmentStatus({ id, status }));
    };

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
                    iconBgClass="bg-primary/10"
                    iconTextClass="text-primary"
                />
                <StatCard
                    title="This Week"
                    value={appointments.length}
                    change="+8% vs last week"
                    changeType="positive"
                    icon={TrendingUp}
                    iconBgClass="bg-accent"
                    iconTextClass="text-accent-foreground"
                />
                <StatCard
                    title="Revenue Today"
                    value="—"
                    change="Coming soon"
                    changeType="neutral"
                    icon={DollarSign}
                    iconBgClass="bg-secondary"
                    iconTextClass="text-secondary-foreground"
                />
                <StatCard
                    title="Cancellations"
                    value={cancelled}
                    change={completed > 0 ? `${Math.round((cancelled / (booked + completed + cancelled)) * 100)}% of total` : "—"}
                    changeType={cancelled > 0 ? "negative" : "neutral"}
                    icon={XCircle}
                    iconBgClass="bg-destructive/15"
                    iconTextClass="text-destructive"
                />
            </div>

            {/* Main content grid: table + sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                {/* Left: appointments table */}
                <AppointmentsTable
                    appointments={appointments}
                    loading={adminLoading}
                    onStatusChange={handleStatusChange}
                />

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
