'use client';

import { useState } from 'react';
import { ArrowLeft, Mic, Square, Play, FileText, Check } from 'lucide-react';
import Link from 'next/link';

export default function ScribePage() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [status, setStatus] = useState('idle'); // idle, recording, processing, done

    const toggleRecording = () => {
        if (isRecording) {
            setIsRecording(false);
            setStatus('processing');
            setTimeout(() => {
                setTranscript("Patient presents with 3-day history of acute abdominal pain, localized to the RLQ. rebound tenderness positive. Vitals stable. Recommend CT Abdomen/Pelvis to rule out appendicitis.");
                setStatus('done');
            }, 2000);
        } else {
            setIsRecording(true);
            setStatus('recording');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--gray-50)' }}>
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
                <Link href="/" style={{ color: 'var(--gray-600)' }}><ArrowLeft size={24} /></Link>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Scribe</h1>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                {status === 'idle' && (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--gray-800)', marginBottom: '0.5rem' }}>Ready to Record</h2>
                        <p style={{ color: 'var(--gray-500)', marginBottom: '3rem' }}>Tap the microphone to start dictating your clinical notes.</p>
                    </div>
                )}

                {status === 'recording' && (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#db2777', marginBottom: '0.5rem' }}>Recording...</h2>
                        <p style={{ color: 'var(--gray-500)', marginBottom: '3rem' }}>00:12</p>
                        <div style={{ display: 'flex', gap: '4px', height: '40px', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                            {[...Array(10)].map((_, i) => (
                                <div key={i} style={{
                                    width: '4px',
                                    height: `${Math.random() * 30 + 10}px`,
                                    background: '#db2777',
                                    borderRadius: '2px',
                                    animation: 'pulse 0.5s infinite alternate'
                                }} />
                            ))}
                        </div>
                    </div>
                )}

                {status === 'processing' && (
                    <div style={{ textAlign: 'center' }}>
                        <div className="spinner" style={{
                            width: '40px', height: '40px', border: '4px solid #f3f3f3',
                            borderTop: '4px solid var(--primary)', borderRadius: '50%',
                            margin: '0 auto 1rem auto', animation: 'spin 1s linear infinite'
                        }} />
                        <p style={{ color: 'var(--gray-600)' }}>Transcribing and formatting...</p>
                    </div>
                )}

                {status === 'done' && (
                    <div style={{ width: '100%', maxWidth: '500px' }}>
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--primary)' }}>
                                <FileText size={20} />
                                <h3 style={{ margin: 0, fontSize: '1rem' }}>Generated Note</h3>
                            </div>
                            <p style={{ lineHeight: '1.6', color: 'var(--gray-800)' }}>{transcript}</p>
                        </div>
                        <button
                            onClick={() => setStatus('idle')}
                            style={{
                                width: '100%', padding: '1rem', borderRadius: '12px',
                                background: 'var(--primary)', color: 'white', border: 'none',
                                fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}
                        >
                            <Check size={20} /> Save to EMR
                        </button>
                    </div>
                )}

                {/* Record Button */}
                {(status === 'idle' || status === 'recording') && (
                    <button
                        onClick={toggleRecording}
                        style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: status === 'recording' ? '#fee2e2' : '#db2777',
                            color: status === 'recording' ? '#dc2626' : 'white',
                            border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(219, 39, 119, 0.3)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {status === 'recording' ? <Square size={32} fill="currentColor" /> : <Mic size={32} />}
                    </button>
                )}
            </div>

            <style jsx>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
