import {
  FiHome,
  FiCheckSquare,
  FiCalendar,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${
      isActive
        ? "bg-purple-900/50 text-white border-l-4 border-purple-500"
        : "text-slate-300 hover:text-white hover:bg-slate-800"
    }`;

  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-3xl font-bold mb-12">
        Task<span className="text-purple-500">Flow</span>
      </h1>

      <nav className="space-y-3">
        <NavLink to="/" className={menuClass}>
          <FiHome />
          Dashboard
        </NavLink>

        <NavLink to="/tasks" className={menuClass}>
          <FiCheckSquare />
          Tasks
        </NavLink>

        <NavLink to="/calendar" className={menuClass}>
          <FiCalendar />
          Calendar
        </NavLink>

        <NavLink to="/team" className={menuClass}>
          <FiUsers />
          Team
        </NavLink>

        <NavLink to="/settings" className={menuClass}>
          <FiSettings />
          Settings
        </NavLink>
      </nav>
    </div>
  );
}