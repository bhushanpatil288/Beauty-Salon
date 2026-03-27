import { Search, Plus } from "lucide-react";

interface AdminHeaderProps {
    title: string;
    subtitle?: string;
}

const AdminHeader = ({ title, subtitle }: AdminHeaderProps) => {
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <header className="h-16 border-b border-border bg-white flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Left: page title */}
            <div>
                <h1 className="text-lg font-semibold text-foreground">{title}</h1>
                <p className="text-xs text-muted-foreground">{subtitle ?? today}</p>
            </div>

            {/* Right: search + action */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring/20 w-52"
                    />
                </div>
                <button className="flex items-center gap-1.5 bg-stone-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    New Booking
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
