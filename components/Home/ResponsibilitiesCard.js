'use client';

import { Clock, Users, ClipboardList } from 'lucide-react';
import styles from '@/styles/home.module.css';

const ResponsibilitiesCard = () => {
    return (
        <div className={styles['resp-card']}>
            <div className={styles['resp-header']}>
                <h3>Today's Shift</h3>
                <span className={styles['shift-time']}>07:00 - 19:00</span>
            </div>

            <div className={styles['resp-grid']}>
                <div className={styles['resp-item']}>
                    <div className={styles['resp-icon']}><Users size={18} /></div>
                    <div>
                        <span className={styles['resp-label']}>Role</span>
                        <div className={styles['resp-value']}>ED Attending</div>
                    </div>
                </div>
                <div className={styles['resp-item']}>
                    <div className={styles['resp-icon']}><ClipboardList size={18} /></div>
                    <div>
                        <span className={styles['resp-label']}>Patients</span>
                        <div className={styles['resp-value']}>12 Assigned</div>
                    </div>
                </div>
            </div>

            <div className={styles['resp-note']}>
                <strong>Note:</strong> You are the designated Airway Lead today.
            </div>
        </div>
    );
};

export default ResponsibilitiesCard;
