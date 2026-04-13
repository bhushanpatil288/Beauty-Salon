import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: LucideIcon;
    iconBgClass?: string;
    iconTextClass?: string;
}

const StatCard = ({
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
    iconBgClass = "bg-accent",
    iconTextClass = "text-accent-foreground",
}: StatCardProps) => {
    const changeColor =
        changeType === "positive"
            ? "text-primary"
            : changeType === "negative"
              ? "text-destructive"
              : "text-muted-foreground";

    return (
        <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`rounded-xl p-3 ${iconBgClass}`}>
                <Icon className={`w-5 h-5 ${iconTextClass}`} />
            </div>
            <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
                {change && (
                    <p className={`text-xs mt-0.5 ${changeColor}`}>{change}</p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
