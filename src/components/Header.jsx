import { Link, NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  `pill ${isActive ? 'bg-pastelBlue/70 text-slate-900 shadow-soft' : 'bg-white/70 text-slate-700'}`;

export function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-card bg-gradient-to-br from-pastelBlue to-pastelLilac flex items-center justify-center shadow-soft">
          <span className="text-lg font-semibold text-slate-900">DF</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">DayFlow</h1>
          <p className="text-sm text-slate-600">Offline-first daily planner</p>
        </div>
      </Link>
      <nav className="flex items-center gap-3">
        <NavLink to="/" end className={navLinkClass}>
          Today
        </NavLink>
        <NavLink to="/templates" className={navLinkClass}>
          Templates
        </NavLink>
        <NavLink to="/settings" className={navLinkClass}>
          Settings
        </NavLink>
      </nav>
    </header>
  );
}
