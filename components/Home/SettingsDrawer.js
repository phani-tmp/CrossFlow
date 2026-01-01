'use client';

import { X, User, Shield, Bell, Moon, LogOut, ChevronRight, Smartphone, Globe, Menu, Check } from 'lucide-react';
import styles from '@/styles/home.module.css';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const SettingsDrawer = () => {
    const { isSettingsOpen, toggleSettings, userProfile, clockStatus, setClockStatus, activeRotation, setActiveRotation } = useUser();
    const router = useRouter();

    const rotations = ['ED', 'ICU', 'Trauma', 'Surgery', 'Gen Med', 'Peds', 'Radiology', 'Cardiology'];

    if (!isSettingsOpen) return null;

    return (
        <>
            <div className={styles['drawer-overlay']} onClick={toggleSettings}></div>
            <div className={`${styles['settings-drawer']} ${isSettingsOpen ? styles.open : ''}`}>

                {/* Header */}
                <div className={styles['drawer-header']}>
                    <div className={styles['drawer-user']}>
                        <div className={styles['drawer-avatar']}>
                            {userProfile.image ? (
                                <img
                                    src={userProfile.image}
                                    alt="Profile"
                                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            ) : (
                                <User size={28} color="var(--gray-600)" />
                            )}
                            {clockStatus === 'Clocked In' && <div className={styles['online-dot']}></div>}
                            {clockStatus === 'Away' && <div className={styles['online-dot']} style={{ background: 'var(--warning)' }}></div>}
                        </div>
                        <div className={styles['drawer-user-info']}>
                            <h3>{userProfile.name}</h3>
                            <p>{userProfile.role}</p>
                        </div>
                    </div>
                    <button className={styles['close-btn']} onClick={toggleSettings}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles['drawer-content']}>

                    {/* Clock Status Section */}
                    <div className={styles['drawer-section']}>
                        <div className={styles['status-toggle-group']}>
                            <button
                                className={`${styles['status-btn']} ${clockStatus === 'Clocked In' ? styles.active : ''}`}
                                onClick={() => setClockStatus('Clocked In')}
                            >
                                Online
                            </button>
                            <button
                                className={`${styles['status-btn']} ${clockStatus === 'Away' ? styles.active : ''}`}
                                onClick={() => setClockStatus('Away')}
                            >
                                Away
                            </button>
                            <div className={styles['dnd-toggle']}>
                                <span>DND</span>
                                <div className={styles['toggle-switch']}></div>
                            </div>
                        </div>
                        <button
                            className={styles['status-btn']}
                            style={{ marginTop: '10px', width: '100%', background: clockStatus === 'Offline' ? 'var(--gray-200)' : 'white', border: '1px solid var(--gray-300)' }}
                            onClick={() => setClockStatus('Offline')}
                        >
                            Clock Out
                        </button>
                    </div>

                    {/* Rotation Selector */}
                    <div className={styles['drawer-section']}>
                        <h3>Active Rotation</h3>
                        <div className={styles['rotation-list']}>
                            {rotations.map(rot => (
                                <div
                                    key={rot}
                                    className={`${styles['drawer-item']} ${activeRotation === rot ? styles.selected : ''}`}
                                    onClick={() => setActiveRotation(rot)}
                                >
                                    <span>{rot}</span>
                                    {activeRotation === rot && <Check size={18} color="var(--primary)" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className={styles['drawer-section']}>
                        <div className={styles['drawer-item']}>
                            <span>Starred</span>
                        </div>
                        <div className={styles['drawer-item']}>
                            <span>My On-Call Schedules</span>
                        </div>
                        <div className={styles['drawer-item']}>
                            <span>Announcements</span>
                        </div>
                        <div
                            className={styles['drawer-item']}
                            onClick={() => {
                                toggleSettings();
                                router.push('/profile/edit');
                            }}
                        >
                            <span>Edit Profile</span>
                        </div>
                        <div className={styles['drawer-item']}>
                            <span>Feedback</span>
                        </div>
                        <div className={styles['drawer-item']}>
                            <span>Privacy Policy</span>
                        </div>
                        <div className={styles['drawer-item']}>
                            <span>Settings</span>
                        </div>
                        <div className={`${styles['drawer-item']} ${styles['text-danger']}`}>
                            <span>Log out</span>
                        </div>
                    </div>

                </div>

                <div className={styles['drawer-footer']}>
                    <p className={styles['version']}>Version: 2025 © CrossFlow</p>
                </div>

            </div>
        </>
    );
};

export default SettingsDrawer;
