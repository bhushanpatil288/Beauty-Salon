import { useState, useMemo, useEffect } from "react";
import { User, CalendarDays, Clock, Tag, FileText, Scissors, MoreHorizontal } from "lucide-react";
import { updateAppointmentStatus } from "../../api/api";

interface Appointment {
    _id: string;
    userId?: { name?: string; phone?: string };
    serviceId?: {
        heading?: string;
        subHeading?: string;
        price?: number;
    };
    date?: string;
    time?: string;
    duration?: number;
    status?: string;
    notes?: string;
}

interface AppointmentsTableProps {
    appointments: Appointment[];
}

const filterTabs = ["All", "Confirmed", "Pending", "Completed", "Cancelled"] as const;
type FilterTab = (typeof filterTabs)[number];

const statusStyles: Record<string, string> = {
    booked: "bg-blue-50 text-blue-700",
    confirmed: "bg-green-50 text-green-700",
    pending: "bg-amber-50 text-amber-700",
    completed: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-red-50 text-red-600",
};

/** Map "booked" to the "confirmed" display label — adjust as your data requires */
const displayStatus = (status?: string) => {
    if (status === "booked") return "Confirmed";
    if (status === "pending") return "Pending";
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : "—";
};

const AppointmentsTable = ({ appointments: initialAppointments }: AppointmentsTableProps) => {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        setAppointments(initialAppointments);
    }, [initialAppointments]);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            setUpdatingId(id);
            await updateAppointmentStatus(id, newStatus);
            setAppointments((prev) =>
                prev.map((appt) => (appt._id === id ? { ...appt, status: newStatus } : appt))
            );
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    const filtered = useMemo(() => {
        if (activeFilter === "All") return appointments;
        return appointments.filter((a) => {
            const s = a.status?.toLowerCase();
            const f = activeFilter.toLowerCase();
            // "confirmed" filter also matches "booked"
            if (f === "confirmed") return s === "confirmed" || s === "booked";
            return s === f;
        });
    }, [appointments, activeFilter]);

    return (
        <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            {/* Header + filter tabs */}
            <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-foreground">All Appointments</h2>
                </div>
                <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeFilter === tab
                                ? "bg-stone-800 text-white shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            {filtered.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground text-sm">
                    No appointments found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/30 text-muted-foreground text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3 text-left">
                                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Client</span>
                                </th>
                                <th className="px-5 py-3 text-left">
                                    <span className="flex items-center gap-1.5"><Scissors className="w-3.5 h-3.5" /> Service</span>
                                </th>
                                <th className="px-5 py-3 text-left">
                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Time</span>
                                </th>
                                <th className="px-5 py-3 text-left">
                                    <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> Date</span>
                                </th>
                                <th className="px-5 py-3 text-left">
                                    <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Status</span>
                                </th>
                                <th className="px-5 py-3 text-left">
                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Duration</span>
                                </th>
                                <th className="px-5 py-3 text-left">
                                    <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Notes</span>
                                </th>
                                <th className="px-5 py-3 text-left">
                                    <span className="flex items-center gap-1.5"><MoreHorizontal className="w-3.5 h-3.5" /> Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filtered.map((appt) => (
                                <tr key={appt._id} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-600">
                                                {appt.userId?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?"}
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{appt.userId?.name ?? "—"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-foreground">
                                        {typeof appt.serviceId === "object"
                                            ? appt.serviceId?.heading
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-3 text-foreground">{appt.time ?? "—"}</td>
                                    <td className="px-5 py-3 text-foreground">
                                        {appt.date
                                            ? new Date(appt.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-3">
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[appt.status ?? ""] ?? "bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {displayStatus(appt.status)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-foreground">{appt.duration ? `${appt.duration} min` : "—"}</td>
                                    <td className="px-5 py-3 text-muted-foreground max-w-[180px] truncate">{appt.notes || "—"}</td>
                                    <td className="px-5 py-3">
                                        <select
                                            disabled={updatingId === appt._id}
                                            value={appt.status || "pending"}
                                            onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                                            className="bg-muted text-xs font-medium px-2 py-1.5 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-stone-800 disabled:opacity-50 cursor-pointer"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="booked">Confirmed</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AppointmentsTable;
