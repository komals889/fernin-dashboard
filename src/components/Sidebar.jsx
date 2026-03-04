import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  Scan,
  Calendar,
  Bell,
  Settings,
  LifeBuoy,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Projects", icon: Folder, path: "#" },
  { name: "Scans", icon: Scan, path: "#" },
  { name: "Schedule", icon: Calendar, path: "#" },
  { name: "Notifications", icon: Bell, path: "#" },
  { name: "Settings", icon: Settings, path: "#" },
  { name: "Support", icon: LifeBuoy, path: "#" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
      
      {/* Logo */}
      <div className="p-6 text-xl font-semibold text-primary">
        aps
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition
               ${
                 isActive
                   ? "bg-primary/10 text-primary"
                   : "hover:bg-muted"
               }`
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <p className="text-sm font-medium">admin@edu.com</p>
        <p className="text-xs text-gray-500">Security Lead</p>
      </div>
    </aside>
  );
}