import { useEffect, useState } from "react";
import Layout from "../../components/layout/PublicLayout";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUserAppointments, cancelAppointment } from "../../features/appointments/appointmentsSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { User, Mail, Phone, ShieldCheck, CalendarDays, Clock, Scissors, XCircle, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { Appointment } from "../../types";

// ─── Status badge helper ───────────────────────────────────────────────────────
const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
    pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200", icon: <AlertCircle className="w-3 h-3" /> },
    booked: { label: "Confirmed", className: "bg-blue-50 text-blue-700 border-blue-200", icon: <CheckCircle2 className="w-3 h-3" /> },
    completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="w-3 h-3" /> },
    cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600 border-red-200", icon: <XCircle className="w-3 h-3" /> },
};

const StatusBadge = ({ status }: { status: string }) => {
    const cfg = statusConfig[status] ?? { label: status, className: "bg-muted text-muted-foreground border-border", icon: null };
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.className}`}>
            {cfg.icon}
            {cfg.label}
        </span>
    );
};

// ─── Single appointment card ───────────────────────────────────────────────────
const AppointmentCard = ({ appt, onCancel, cancelling }: {
    appt: Appointment;
    onCancel: (id: string) => void;
    cancelling: boolean;
}) => {
    const service = typeof appt.serviceId === "object" ? appt.serviceId : null;
    const canCancel = appt.status === "pending" || appt.status === "booked";

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-secondary/10 border border-secondary/40 hover:bg-secondary/20 transition-colors">
            {/* Service icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground truncate">
                        {service?.heading ?? "Service"}
                    </p>
                    {service?.subHeading && (
                        <span className="text-xs text-muted-foreground">— {service.subHeading}</span>
                    )}
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(appt.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {appt.time}
                        {appt.duration ? ` · ${appt.duration} min` : ""}
                    </span>
                </div>
            </div>

            {/* Status + cancel */}
            <div className="flex items-center gap-3 flex-shrink-0">
                <StatusBadge status={appt.status} />
                {canCancel && (
                    <button
                        onClick={() => onCancel(appt._id)}
                        disabled={cancelling}
                        className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-400 px-2.5 py-1 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cancelling ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <XCircle className="w-3.5 h-3.5" />
                        )}
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

// ─── My Appointments section ───────────────────────────────────────────────────
const MyAppointments = () => {
    const dispatch = useAppDispatch();
    const { userList, userLoading, error } = useAppSelector((s) => s.appointments);
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [cancelError, setCancelError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchUserAppointments());
    }, [dispatch]);

    const handleCancel = async (id: string) => {
        if (!confirm("Are you sure you want to cancel this appointment?")) return;
        setCancellingId(id);
        setCancelError(null);
        const result = await dispatch(cancelAppointment(id));
        if (cancelAppointment.rejected.match(result)) {
            setCancelError((result.payload as string) ?? "Failed to cancel appointment");
            setTimeout(() => setCancelError(null), 3000);
        }
        setCancellingId(null);
    };

    const upcoming = userList.filter((a) => a.status === "pending" || a.status === "booked");
    const past = userList.filter((a) => a.status === "completed" || a.status === "cancelled");

    return (
        <Card className="shadow-sm border-secondary/50 h-full flex flex-col">
            <CardHeader className="pb-4 shrink-0">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    <CardTitle className="text-xl font-bold">My Appointments</CardTitle>
                </div>
                <CardDescription>View and manage your bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 overflow-y-auto pr-2">
                {cancelError && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                        <XCircle className="w-4 h-4 flex-shrink-0" />
                        {cancelError}
                    </div>
                )}

                {userLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <p className="text-sm text-destructive text-center py-6">{error}</p>
                ) : userList.length === 0 ? (
                    <div className="text-center py-10">
                        <Scissors className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                        <p className="text-muted-foreground font-medium">No appointments yet</p>
                        <p className="text-sm text-muted-foreground/70 mt-1">Book a service to get started!</p>
                    </div>
                ) : (
                    <>
                        {upcoming.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                    Upcoming ({upcoming.length})
                                </h3>
                                <div className="space-y-3">
                                    {upcoming.map((appt) => (
                                        <AppointmentCard
                                            key={appt._id}
                                            appt={appt}
                                            onCancel={handleCancel}
                                            cancelling={cancellingId === appt._id}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {past.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                    Past ({past.length})
                                </h3>
                                <div className="space-y-3">
                                    {past.map((appt) => (
                                        <AppointmentCard
                                            key={appt._id}
                                            appt={appt}
                                            onCancel={handleCancel}
                                            cancelling={cancellingId === appt._id}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

// ─── Profile Page ──────────────────────────────────────────────────────────────
const Profile = () => {
    const user = useAppSelector((s) => s.auth.user);

    if (!user) {
        return (
            <Layout>
                <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="container mx-auto py-12 px-4">
                <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 h-full">
                    {/* Profile info card */}
                    <div className="w-full lg:w-[35%] xl:w-[30%] shrink-0">
                        <Card className="shadow-sm border-secondary/50 w-full h-full">
                            <CardHeader className="text-center pb-6">
                                <div className="w-24 h-24 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                    <span className="text-4xl font-semibold tracking-tight">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                                </div>
                                <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
                                <CardDescription className="text-base mt-2 font-medium capitalize">
                                    {user.role || 'Customer'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                                        <User className="w-6 h-6 text-primary" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                            <p className="text-base font-semibold">{user.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                                        <Mail className="w-6 h-6 text-primary" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                            <p className="text-base font-semibold">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                                        <Phone className="w-6 h-6 text-primary" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                                            <p className="text-base font-semibold">{user.phone || 'Not provided'}</p>
                                        </div>
                                    </div>

                                    {user.role && (
                                        <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                                            <ShieldCheck className="w-6 h-6 text-primary" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Account Role</p>
                                                <p className="text-base font-semibold capitalize">{user.role}</p>
                                            </div>
                                        </div>
                                    )}

                                    {user.createdAt && (
                                        <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                                            <CalendarDays className="w-6 h-6 text-primary" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                                                <p className="text-base font-semibold">
                                                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* My Appointments section — only for regular users */}
                    {user.role !== "admin" && (
                        <div className="w-full lg:w-[65%] xl:w-[70%] relative">
                            <div className="lg:absolute lg:inset-0 w-full h-full">
                                <MyAppointments />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Profile
