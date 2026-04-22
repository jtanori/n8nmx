import Link from 'next/link';
import { LayoutDashboard, Search, Database, Map, BrainCircuit, Settings, User } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Searches', path: '/queue', icon: Search },
  { name: 'Leads', path: '/leads', icon: Database },
  { name: 'Map View', path: '/map', icon: Map },
  { name: 'AI Auditor', path: '/audit', icon: BrainCircuit },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Account', path: '/account', icon: User },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 glass-panel h-screen fixed left-0 top-0 p-4 border-r">
      <div className="text-primary font-bold text-xl mb-8 px-2">Sonora Engine</div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.path}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
