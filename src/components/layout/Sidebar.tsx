import {
  FiHome,
  FiCheckSquare,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiColumns,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: FiHome,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: FiCheckSquare,
  },
  {
    name: "Board",
    path: "/board",
    icon: FiColumns,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: FiCalendar,
  },
  {
    name: "Team",
    path: "/team",
    icon: FiUsers,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
      w-64
      min-h-screen
      bg-slate-900
      border-r
      border-slate-800
      p-6
      shadow-2xl
      "
    >
      <h1 className="text-3xl font-bold mb-12">
        Task
        <span className="text-purple-500">
          Flow
        </span>
      </h1>

      <nav className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-4
                rounded-2xl
                transition-all
                duration-300
                ${
                  isActive
                    ? `
                      bg-linear-to-r
                      from-purple-600
                      to-fuchsia-500
                      text-white
                      shadow-lg
                    `
                    : `
                      text-slate-300
                      hover:bg-slate-800
                      hover:text-white
                    `
                }
              `
              }
            >
              <Icon size={20} />
              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}