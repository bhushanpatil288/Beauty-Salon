import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Scissors,
    Settings,
} from "lucide-react";

const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/appointments", label: "Appointments", icon: CalendarDays },
    { to: "/admin/clients", label: "Clients", icon: Users },
    { to: "/admin/stylists", label: "Stylists", icon: Scissors },
    { to: "/admin/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-56 bg-white border-r border-border flex flex-col z-40">
            {/* Logo */}
            <div className="px-5 py-6 border-b border-border">
                <h1 className="text-lg font-bold tracking-tight text-foreground">
                    POOJA <span className="text-muted-foreground font-normal text-sm">SALON</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-stone-800 text-white"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`
                        }
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* User info at bottom */}
            <div className="px-4 py-4 border-t border-border">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-semibold text-stone-600">
                        {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{user?.name ?? "Admin"}</p>
                        <p className="text-xs text-muted-foreground">Owner</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
