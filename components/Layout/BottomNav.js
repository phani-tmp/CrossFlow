'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, MessageSquare, Phone, Users, User } from 'lucide-react';
import styles from './BottomNav.module.css';

import { useUser } from '@/context/UserContext';

const BottomNav = () => {
  const pathname = usePathname();
  const { toggleSettings } = useUser();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Inter-Hosp.', href: '/inter-hospital', icon: Building2 },
    { name: 'Chats', href: '/chats', icon: MessageSquare },
    { name: 'Calls', href: '/calls', icon: Phone },
    { name: 'Contacts', href: '/contacts', icon: Users },
  ];

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={(e) => {
              if (item.action) {
                e.preventDefault();
                item.action();
              }
            }}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={styles.label}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
