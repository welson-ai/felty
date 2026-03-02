'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Journal', href: '/journal', icon: '📝' },
  { label: 'Mood Wall', href: '/mood-wall', icon: '🌊' },
  { label: 'Organizations', href: '/organizations', icon: '🏥' },
  { label: 'Therapists', href: '/therapists', icon: '👥' },
];

export function AppNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex-col">
        <div className="p-6 border-b border-border">
          <div className="text-2xl font-bold text-primary">Felty</div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'default' : 'ghost'}
                className="w-full justify-start gap-3"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-3">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 right-0 left-0 bg-card border-b border-border p-4 flex justify-between items-center z-50">
        <div className="text-xl font-bold text-primary">🌊 Souls</div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-card border-b border-border p-4 space-y-2 z-40 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button
                variant={pathname === item.href ? 'default' : 'ghost'}
                className="w-full justify-start gap-3"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          ))}
          <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-3 mt-4">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      )}

      {/* Main content spacing for desktop */}
      <div className="hidden md:block w-64" />
    </>
  );
}
