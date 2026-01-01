'use client';

import Link from 'next/link';
import styles from '@/styles/interhospital.module.css';

const HospitalCard = ({ id, name, distance, beds, services, linkPrefix = '/inter-hospital' }) => {
    return (
        <Link href={`${linkPrefix}/${id}`} className={styles['hospital-card']}>
            <div>
                <h3 className={styles['hospital-name']}>{name}</h3>
                <div className={styles['service-badges']}>
                    {services.map((service, index) => (
                        <span
                            key={index}
                            className={styles['service-pill']}
                        >
                            {service.name}
                        </span>
                    ))}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '500' }}>{beds} Beds available</p>
            </div>
            <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{distance}</span>
            </div>
        </Link>
    );
};

export default HospitalCard;
