/**
 * @file AppointmentsTable.tsx
 * @description A comprehensive, filterable data-grid for displaying salon appointments.
 * Primarily used within the Admin Dashboard to securely read, render, and optimistically mutate appointment lifecycles.
 */
import { useState, useMemo } from "react";
import { User, CalendarDays, Clock, Tag, FileText, Scissors, MoreHorizontal, Loader2 } from "lucide-react";
import type { Appointment } from "../../types";

interface AppointmentsTableProps {
    appointments: Appointment[];
    loading?: boolean;
    onStatusChange?: (id: string, status: string) => void;
}

const filterTabs = ["All", "Confirmed", "Pending", "Completed", "Cancelled"] as const;
type FilterTab = (typeof filterTabs)[number];

const statusStyles: Record<string, string> = {
    booked: "bg-primary/10 text-primary",
    confirmed: "bg-primary/10 text-primary",
    pending: "bg-secondary text-secondary-foreground",
    completed: "bg-accent text-accent-foreground",
    cancelled: "bg-destructive/15 text-destructive",
};

/** Map "booked" to the "Confirmed" display label */
const displayStatus = (status?: string) => {
    if (status === "booked") return "Confirmed";
    if (status === "pending") return "Pending";
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : "—";
};

const AppointmentsTable = ({ appointments, loading = false, onStatusChange }: AppointmentsTableProps) => {
    const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
    const [dateFilter, setDateFilter] = useState<string>("All");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleStatusChange = async (id: string, newStatus: string) => {
        if (!onStatusChange) return;
        try {
            setUpdatingId(id);
            onStatusChange(id, newStatus);
        } finally {
            // Reset after a brief delay to give Redux time to update
            setTimeout(() => setUpdatingId(null), 600);
        }
    };

    const toLocalIso = (date: Date) => {
        return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
    };

    const filtered = useMemo(() => {
        return appointments.filter((a) => {
            // Status check
            let passesStatus = true;
            if (activeFilter !== "All") {
                const s = a.status?.toLowerCase();
                const f = activeFilter.toLowerCase();
                if (f === "confirmed") {
                    passesStatus = s === "confirmed" || s === "booked";
                } else {
                    passesStatus = s === f;
                }
            }

            // Date check
            let passesDate = true;
            if (dateFilter !== "All") {
                if (!a.date) {
                    passesDate = false;
                } else {
                    const apptDateIso = toLocalIso(new Date(a.date));
                    let targetDateIso = "";
                    
                    if (dateFilter === "Today") {
                        targetDateIso = toLocalIso(new Date());
                    } else if (dateFilter === "Tomorrow") {
                        const t = new Date();
                        t.setDate(t.getDate() + 1);
                        targetDateIso = toLocalIso(t);
                    } else {
                        targetDateIso = dateFilter; // Calendar picker string
                    }
    
                    passesDate = apptDateIso === targetDateIso;
                }
            }

            return passesStatus && passesDate;
        });
    }, [appointments, activeFilter, dateFilter]);

    return (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            {/* Header + filter tabs */}
            <div className="px-6 py-4 border-b border-border flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div>
                    <h2 className="text-base font-semibold text-foreground">Appointments Management</h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-3 lg:items-center items-start">
                    {/* Date Filters */}
                    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
                        <button
                            onClick={() => setDateFilter("All")}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${dateFilter === "All"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            All Time
                        </button>
                        <button
                            onClick={() => setDateFilter("Today")}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${dateFilter === "Today"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setDateFilter("Tomorrow")}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${dateFilter === "Tomorrow"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Tomorrow
                        </button>
                        <div className="h-4 w-px bg-border/80 mx-1"></div>
                        <input
                            type="date"
                            value={dateFilter !== "All" && dateFilter !== "Today" && dateFilter !== "Tomorrow" ? dateFilter : ""}
                            onChange={(e) => setDateFilter(e.target.value || "All")}
                            className={`pl-2 pr-1 py-1 sm:w-min w-auto bg-transparent border-none cursor-pointer text-xs font-medium rounded-md focus:ring-0 focus:outline-none transition-colors ${dateFilter !== "All" && dateFilter !== "Today" && dateFilter !== "Tomorrow"
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                            title="Calendar Picker"
                        />
                    </div>

                    {/* Status Filters */}
                    <div className="flex gap-1 bg-muted/50 p-1 rounded-lg border border-border/50 overflow-x-auto max-w-full">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveFilter(tab)}
                                className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeFilter === tab
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="p-10 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            ) : filtered.length === 0 ? (
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
                                            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-accent-foreground">
                                                {(appt.userId as any)?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?"}
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{(appt.userId as any)?.name ?? "—"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-foreground">
                                        {typeof appt.serviceId === "object"
                                            ? (appt.serviceId as any)?.heading
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
                                            disabled={updatingId === appt._id || !onStatusChange}
                                            value={appt.status || "pending"}
                                            onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                                            className="bg-muted text-xs font-medium px-2 py-1.5 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 cursor-pointer"
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
