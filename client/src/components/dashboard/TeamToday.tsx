interface TeamMember {
    name: string;
    role: string;
    appointmentCount: number;
    initials: string;
    color: string;
}

const TeamToday = () => {
    // Placeholder team data — replace with real data once Stylists feature is built
    const team: TeamMember[] = [
        { name: "Vandana Patil", role: "Senior Stylist", appointmentCount: 6, initials: "VP", color: "bg-accent text-accent-foreground" },
        { name: "Pooja Patil", role: "Stylist", appointmentCount: 4, initials: "PP", color: "bg-secondary text-secondary-foreground" },
    ];

    return (
        <div className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="px-5 py-4 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Team Today</h3>
            </div>
            <div className="p-4 space-y-3">
                {team.map((member) => (
                    <div key={member.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${member.color}`}
                            >
                                {member.initials}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground bg-muted rounded-full px-2.5 py-1">
                            {member.appointmentCount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamToday;
