import Layout from "./Layout";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, CalendarDays, Clock, User, FileText, Tag } from "lucide-react";

const statusColors: Record<string, string> = {
    booked: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

const AdminDashboard = () => {
    const { user, appointments } = useAuth();

    const booked = appointments.filter((a) => a.status === "booked").length;
    const completed = appointments.filter((a) => a.status === "completed").length;
    const cancelled = appointments.filter((a) => a.status === "cancelled").length;

    return (
        <Layout>
            <div className="min-h-screen px-6 py-10 max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <LayoutDashboard className="text-primary w-7 h-7" />
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
                        <p className="text-muted-foreground text-sm">Welcome back, {user?.name}</p>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-blue-100 rounded-xl p-3">
                            <CalendarDays className="text-blue-600 w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Booked</p>
                            <p className="text-2xl font-bold text-foreground">{booked}</p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-green-100 rounded-xl p-3">
                            <CalendarDays className="text-green-600 w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Completed</p>
                            <p className="text-2xl font-bold text-foreground">{completed}</p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-red-100 rounded-xl p-3">
                            <CalendarDays className="text-red-500 w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Cancelled</p>
                            <p className="text-2xl font-bold text-foreground">{cancelled}</p>
                        </div>
                    </div>
                </div>

                {/* Appointments Table */}
                <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-border">
                        <h2 className="text-lg font-semibold text-foreground">All Appointments</h2>
                        <p className="text-muted-foreground text-sm">{appointments.length} total</p>
                    </div>

                    {appointments.length === 0 ? (
                        <div className="p-10 text-center text-muted-foreground text-sm">
                            No appointments found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs tracking-wide">
                                    <tr>
                                        <th className="px-5 py-3 text-left">
                                            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Customer</span>
                                        </th>
                                        <th className="px-5 py-3 text-left">
                                            <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> Date</span>
                                        </th>
                                        <th className="px-5 py-3 text-left">
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Time</span>
                                        </th>
                                        <th className="px-5 py-3 text-left">
                                            <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Status</span>
                                        </th>
                                        <th className="px-5 py-3 text-left">
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Duration</span>
                                        </th>
                                        <th className="px-5 py-3 text-left">
                                            <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Notes</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {appointments.map((appt: any) => (
                                        <tr key={appt._id} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-5 py-3 font-medium text-foreground">
                                                <div>{appt.userId?.name ?? "—"}</div>
                                                <div className="text-xs text-muted-foreground">{appt.userId?.phone ?? ""}</div>
                                            </td>
                                            <td className="px-5 py-3 text-foreground">
                                                {appt.date
                                                    ? new Date(appt.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                                    : "—"}
                                            </td>
                                            <td className="px-5 py-3 text-foreground">{appt.time ?? "—"}</td>
                                            <td className="px-5 py-3">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[appt.status] ?? "bg-muted text-muted-foreground"}`}>
                                                    {appt.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-foreground">{appt.duration ? `${appt.duration} min` : "—"}</td>
                                            <td className="px-5 py-3 text-muted-foreground max-w-[200px] truncate">{appt.notes || "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
