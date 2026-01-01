'use client';

import styles from './HospitalUpdates.module.css';

const HospitalUpdates = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Hospital Updates</h3>
            <div className={styles.updateCard}>
                <p className={styles.text}>New policy: Bloodborne Path. Instructor</p>
            </div>
        </div>
    );
};

export default HospitalUpdates;
