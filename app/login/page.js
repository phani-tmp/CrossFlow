'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { Ambulance } from 'lucide-react';
import styles from './page.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login, verifyEmail, logout } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await login(email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                setError('Please verify your email address before logging in.');
                // Optional: Sign out immediately if you want to block access
                // await logout(); 
                return;
            }

            router.push('/'); // Redirect to home on success
        } catch (err) {
            console.error(err);
            setError('Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendVerification = async () => {
        try {
            await verifyEmail();
            alert("Verification email sent!");
        } catch (err) {
            console.error(err);
            alert("Failed to send email. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
                        <Ambulance size={32} color="white" />
                    </div>
                    <h1>CrossFlow</h1>
                </div>

                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--gray-600)' }}>Sign in to your account</h2>

                {error && (
                    <div className={styles.error}>
                        {error}
                        {error.includes('verify') && (
                            <button
                                onClick={handleResendVerification}
                                style={{
                                    display: 'block',
                                    margin: '0.5rem auto 0',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#991b1b',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                Resend Verification Email
                            </button>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="name@hospital.com"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Forgot your password?</a>
                    <div>
                        <span style={{ color: 'var(--gray-600)' }}>Don't have an account? </span>
                        <Link href="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
