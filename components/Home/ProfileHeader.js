import { useState } from 'react';
import { Menu, User } from 'lucide-react';
import styles from '@/styles/home.module.css';
import { useUser } from '@/context/UserContext';
import ShiftCheckInModal from './ShiftCheckInModal';

const ProfileHeader = () => {
    const { toggleSettings, userProfile, activeRotation, clockStatus, startShift } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClockClick = (e) => {
        e.stopPropagation(); // Prevent opening settings
        if (clockStatus === 'Offline') {
            setIsModalOpen(true);
        } else {
            toggleSettings(); // Or handle clock out via settings
        }
    };

    const handleShiftStart = (data) => {
        startShift(data);
    };

    return (
        <>
            <div className={styles['profile-header']}>
                <div
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                    onClick={toggleSettings}
                >
                    <div className={styles['profile-avatar']}>
                        {userProfile.image ? (
                            <img
                                src={userProfile.image}
                                alt="Profile"
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        ) : (
                            <User size={24} color="var(--gray-600)" />
                        )}
                        {clockStatus === 'Clocked In' && <div className={styles['online-dot']}></div>}
                        {clockStatus === 'Away' && <div className={styles['online-dot']} style={{ background: 'var(--warning)' }}></div>}
                    </div>
                    <div className={styles['profile-info']}>
                        <div className={styles.name}>{userProfile.name}</div>
                        <div className={styles.role}>{userProfile.role}</div>
                    </div>
                </div>

                <div
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', cursor: 'pointer' }}
                    onClick={handleClockClick}
                >
                    <span style={{ fontSize: '11px', color: 'var(--gray-500)', fontWeight: '600', textTransform: 'uppercase' }}>Active Rotation</span>
                    <div className={styles['badge']} style={{ background: clockStatus === 'Offline' ? 'var(--gray-200)' : '#dbeafe', color: clockStatus === 'Offline' ? 'var(--gray-600)' : 'var(--primary)' }}>
                        {clockStatus === 'Offline' ? 'Clock In' : activeRotation}
                    </div>
                </div>
            </div>

            <ShiftCheckInModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleShiftStart}
            />
        </>
    );
};

export default ProfileHeader;
