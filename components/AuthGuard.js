'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const publicPaths = ['/login', '/signup'];

export default function AuthGuard({ children }) {
    const { user, loading } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user && !publicPaths.includes(pathname)) {
                router.push('/login');
            }
        }
    }, [user, loading, pathname, router]);

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--gray-50)'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid var(--gray-200)',
                    borderTopColor: 'var(--primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style jsx global>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // If not logged in and on a protected route, don't render anything (wait for redirect)
    if (!user && !publicPaths.includes(pathname)) {
        return null;
    }

    return <>{children}</>;
}
