'use client';

import styles from '@/styles/home.module.css';
import { useUser } from '@/context/UserContext';
import { ChevronDown } from 'lucide-react';

const RotationSelector = () => {
    const { activeRotation, setActiveRotation } = useUser();
    const rotations = ['ED', 'ICU', 'Trauma', 'Surgery', 'Gen Med', 'Peds', 'Radiology', 'Cardiology'];

    return (
        <div className={styles['rotation-section']}>
            <label className={styles['section-label']}>Active Rotation</label>
            <div className={styles['rotation-scroll']}>
                {rotations.map(rot => (
                    <button
                        key={rot}
                        className={`${styles['rotation-pill']} ${activeRotation === rot ? styles.active : ''}`}
                        onClick={() => setActiveRotation(rot)}
                    >
                        {rot}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RotationSelector;
