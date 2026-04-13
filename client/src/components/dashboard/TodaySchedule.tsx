import { useMemo } from "react";
import type { Appointment } from "../../types";

interface TodayScheduleProps {
    appointments: Appointment[];
}

const TodaySchedule = ({ appointments }: TodayScheduleProps) => {
    const todayAppointments = useMemo(() => {
        const today = new Date().toISOString().split("T")[0];
        return appointments
            .filter((a) => {
                if (!a.date) return false;
                return new Date(a.date).toISOString().split("T")[0] === today;
            })
            .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
    }, [appointments]);

    return (
        <div className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Today's Schedule</h3>
                <span className="text-xs text-muted-foreground">{todayAppointments.length} appointments</span>
            </div>
            <div className="p-4 space-y-0">
                {todayAppointments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">No appointments today.</p>
                ) : (
                    todayAppointments.map((appt) => (
                        <div key={appt._id} className="flex gap-4 py-3 border-b border-border/50 last:border-0">
                            <span className="text-xs font-medium text-muted-foreground w-16 shrink-0 pt-0.5">
                                {appt.time ?? "—"}
                            </span>
                            <div className="flex items-start gap-2">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {appt.userId?.name ?? "Unknown Client"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{typeof appt.serviceId === "object" ? appt.serviceId?.heading : (appt.serviceId ?? "Service")}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodaySchedule;
