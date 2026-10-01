import { NavLink } from "react-router-dom";
import {
  Home,
  CalendarDays,
  Tent,
  Users,
  Settings
} from "lucide-react";

function MainNav() {
  // We extract the class logic into a function to keep the JSX clean.
  // Using arbitrary variants `[&>svg]:` to target nested SVG icons just like styled-components.
  const navLinkClasses = ({ isActive }) =>
    `group flex items-center gap-3 px-6 py-3 text-base font-medium rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-300 [&>svg]:w-6 [&>svg]:h-6 [&>svg]:transition-all [&>svg]:duration-300 ${isActive
      ? "text-sidebar-accent-foreground bg-sidebar-accent [&>svg]:text-sidebar-primary"
      : "text-sidebar-foreground/80 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/60 [&>svg]:text-muted-foreground hover:[&>svg]:text-sidebar-primary"
    }`;

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink to="/dashboard" className={navLinkClasses}>
            <Home />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className={navLinkClasses}>
            <CalendarDays />
            <span>Booking</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cabins" className={navLinkClasses}>
            <Tent />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={navLinkClasses}>
            <Users />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={navLinkClasses}>
            <Settings />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;