'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const publicPaths = ['/login', '/signup'];

export default function AuthGuard({ children }) {
    const { user, loading } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    // BYPASS AUTHENTICATION for deployment testing
    return <>{children}</>;
}
