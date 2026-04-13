import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
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
    const { user } = useAppSelector((state) => state.auth);

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-56 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col z-40">
            {/* Logo */}
            <div className="px-5 py-6 border-b border-border">
                <h1 className="text-lg font-bold tracking-tight text-sidebar-foreground">
                    POOJA <span className="text-sidebar-foreground/70 font-normal text-sm">SALON</span>
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
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
                    <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-accent-foreground">
                        {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name ?? "Admin"}</p>
                        <p className="text-xs text-sidebar-foreground/70">Owner</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
