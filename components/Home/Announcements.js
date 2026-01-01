'use client';

import { Bell, AlertTriangle, Info, CalendarPlus } from 'lucide-react';
import { useSchedule } from '@/context/ScheduleContext';
import styles from '@/styles/home.module.css';

const Announcements = () => {
    const { addEvent } = useSchedule();
    const announcements = [
        {
            id: 1,
            type: 'urgent',
            title: 'CT Scanner 2 Down',
            message: 'Maintenance until 14:00. Use Scanner 1 for stat reads.',
            time: 'Today, 10:00 AM'
        },
        {
            id: 2,
            type: 'info',
            title: 'Grand Rounds: Dr XYZ',
            message: 'Topic: AI in healthcare',
            time: 'Tue, 12/20/2025',
            date: '2025-12-20',
            eventTime: '12:00'
        },
        {
            id: 3,
            type: 'info',
            title: 'Special Presentation: Dr ABC',
            message: 'Topic: Colonoscopy and AI',
            time: 'Wed, 12/21/2025',
            date: '2025-12-21',
            eventTime: '13:00'
        }
    ];

    const handleAddToSchedule = (item) => {
        addEvent({
            title: item.title,
            date: item.date,
            time: item.eventTime,
            description: item.message,
            type: 'work'
        });
        alert('Added to schedule!');
    };

    return (
        <div className={styles.card} style={{ padding: '0' }}>
            {announcements.map((item, index) => (
                <div key={item.id} style={{
                    padding: '1rem',
                    borderBottom: index !== announcements.length - 1 ? '1px solid var(--gray-100)' : 'none',
                    display: 'flex',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: item.type === 'urgent' ? '#fee2e2' : '#e0f2fe',
                        color: item.type === 'urgent' ? '#dc2626' : '#0284c7',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        {item.type === 'urgent' ? <AlertTriangle size={20} /> : <Info size={20} />}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600', color: 'var(--gray-800)' }}>{item.title}</h4>
                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{item.time}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: '1.4' }}>{item.message}</p>

                        {item.date && (
                            <button
                                onClick={() => handleAddToSchedule(item)}
                                style={{
                                    marginTop: '8px',
                                    background: 'transparent',
                                    border: '1px solid var(--primary)',
                                    color: 'var(--primary)',
                                    padding: '4px 10px',
                                    borderRadius: '100px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                <CalendarPlus size={14} />
                                Add to Schedule
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Announcements;
