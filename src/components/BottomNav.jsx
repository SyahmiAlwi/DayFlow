import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Today' },
  { to: '/templates', label: 'Templates' },
  { to: '/settings', label: 'Settings' }
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-white/60 py-2 px-6 flex justify-around sm:hidden z-40">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex-1 text-center text-sm font-semibold px-3 py-2 rounded-card ${
              isActive ? 'bg-pastelBlue/60 text-slate-900' : 'text-slate-600'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
