'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import NewsFeed from '@/components/Home/NewsFeed';

export default function NewsPage() {
    return (
        <div style={{ paddingBottom: '80px', background: 'var(--gray-50)', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{
                padding: '1rem',
                paddingTop: '3rem',
                background: 'white',
                borderBottom: '1px solid var(--gray-200)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <Link href="/" style={{ color: 'var(--gray-800)' }}><ArrowLeft size={24} /></Link>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-800)', margin: 0 }}>Medical News</h1>
            </div>

            <div style={{ padding: '1rem' }}>
                <NewsFeed />
            </div>
        </div>
    );
}
