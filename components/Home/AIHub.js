'use client';

import { Sparkles, Mic, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from '@/styles/home.module.css';

const AIHub = () => {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--primary)" />
                AI Workspace
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* DocGPT Card */}
                <Link href="/docgpt" style={{ textDecoration: 'none' }}>
                    <div className={styles.card} style={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                        border: '1px solid #bae6fd',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '12px',
                                background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '1rem', color: '#0284c7'
                            }}>
                                <Sparkles size={24} />
                            </div>
                            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#0f172a' }}>DocGPT</h3>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Medical AI Assistant</p>
                        </div>
                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '600', color: '#0284c7' }}>
                            Start Chat <ArrowRight size={14} />
                        </div>
                    </div>
                </Link>

                {/* Scribe Card */}
                <Link href="/scribe" style={{ textDecoration: 'none' }}>
                    <div className={styles.card} style={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)',
                        border: '1px solid #fbcfe8',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '12px',
                                background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '1rem', color: '#db2777'
                            }}>
                                <Mic size={24} />
                            </div>
                            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#0f172a' }}>Scribe</h3>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Clinical Voice Notes</p>
                        </div>
                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '600', color: '#db2777' }}>
                            Record Now <ArrowRight size={14} />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AIHub;
