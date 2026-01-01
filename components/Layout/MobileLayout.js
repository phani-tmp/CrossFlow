'use client';

import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';

const MobileLayout = ({ children }) => {
    const pathname = usePathname();
    // Hide nav on EMS, Admin, and Chat Detail pages (e.g., /chats/123)
    const hideNav = pathname.startsWith('/ems') || pathname.startsWith('/admin') || (pathname.startsWith('/chats/') && pathname.split('/').length > 2) || pathname === '/login' || pathname === '/signup';

    return (
        <div className="container" style={{ paddingBottom: hideNav ? 0 : 'var(--bottom-nav-height)' }}>
            <main>{children}</main>
            {!hideNav && <BottomNav />}
        </div>
    );
};

export default MobileLayout;
