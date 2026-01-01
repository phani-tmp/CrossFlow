'use client';

import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react';
import styles from '@/styles/calls.module.css';

const CallHistory = () => {
    const calls = [
        { id: 1, name: "Dr. Amber Ortiz", type: "incoming", time: "10:45 AM", duration: "5m 23s" },
        { id: 2, name: "St. Mary's General", type: "outgoing", time: "9:12 AM", duration: "2m 10s" },
        { id: 3, name: "Dr. Ryan Miller", type: "missed", time: "Yesterday", duration: "" },
        { id: 4, name: "Mercy Hospital", type: "incoming", time: "Yesterday", duration: "1m 45s" },
    ];

    return (
        <div style={{ padding: '0 1rem' }}>
            {calls.map((call) => (
                <div key={call.id} className={styles['call-row']}>
                    <div className={styles['call-avatar']}>
                        <Phone size={20} color="var(--primary)" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--gray-800)' }}>{call.name}</h3>
                        <div className={styles['call-meta']}>
                            <span className={styles['call-type']}>
                                {call.type === 'incoming' && <PhoneIncoming size={12} color="var(--success)" />}
                                {call.type === 'outgoing' && <PhoneOutgoing size={12} color="var(--primary)" />}
                                {call.type === 'missed' && <PhoneMissed size={12} color="var(--danger)" />}
                            </span>
                            <span>{call.type.charAt(0).toUpperCase() + call.type.slice(1)} • {call.time}</span>
                        </div>
                    </div>
                    <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>{call.duration}</span>
                </div>
            ))}
        </div>
    );
};

export default CallHistory;
