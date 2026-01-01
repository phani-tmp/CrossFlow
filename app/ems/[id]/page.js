'use client';

import { useState } from 'react';
import { ArrowLeft, Bed, Activity, MessageSquare, Phone, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import styles from '@/styles/hospitalDetail.module.css';

export default function EMSHospitalDetail() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    // Mock Data (In a real app, fetch based on ID)
    const hospitalData = {
        1: { name: "St. Mary's General", beds: 4, capacity: 60 },
        2: { name: "Services Run Cardiology", beds: 0, capacity: 95 },
        3: { name: "Active Bros Rehabilitation", beds: 6, capacity: 30 },
        4: { name: "Available Med. Centre", beds: 3, capacity: 45 },
    };

    const hospital = hospitalData[id] || hospitalData[1];

    const handleChatClick = () => {
        // In real app, start chat with Triage/Help Desk
        console.log("Starting chat with Help Desk");
        // router.push(`/chats/help-desk-${id}`); 
        alert("Starting chat with Help Desk...");
    };

    const handleCallClick = () => {
        window.location.href = "tel:911"; // Or specific hospital number
    };

    const handleIntakeClick = () => {
        console.log("Starting new intake");
        alert("Starting New Patient Intake Form...");
    };

    return (
        <div style={{ paddingBottom: '20px', background: 'var(--gray-50)', minHeight: '100vh' }}>
            <div className={styles['top-bar']}>
                <Link href="/ems" style={{ color: 'var(--gray-800)', marginRight: '12px' }}>
                    <ArrowLeft size={24} />
                </Link>
                <span style={{ fontWeight: '600' }}>EMS Help Desk</span>
            </div>

            <div style={{ padding: '0 20px' }}>
                <h2 className={styles['hospital-header']}>{hospital.name}</h2>

                <div className={styles['capacity-box']}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--gray-600)' }}>
                        <span>Capacity</span>
                        <span style={{ color: 'var(--success)', fontWeight: '600' }}>{hospital.beds} Beds Available</span>
                    </div>
                    <div className={styles['capacity-bar']}>
                        <div
                            className={styles['capacity-fill']}
                            style={{
                                width: `${hospital.capacity}%`,
                                background: hospital.capacity > 80 ? 'var(--danger)' : 'var(--success)'
                            }}
                        ></div>
                    </div>
                </div>

                <h3 className="section-title">Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        onClick={handleChatClick}
                        className={styles['chat-btn']}
                        style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px' }}
                    >
                        <MessageSquare size={20} style={{ marginRight: '8px' }} />
                        Chat with Triage
                    </button>

                    <button
                        onClick={handleCallClick}
                        className={styles['chat-btn']}
                        style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px', background: 'white', color: 'var(--gray-800)', border: '1px solid var(--gray-200)' }}
                    >
                        <Phone size={20} style={{ marginRight: '8px' }} />
                        Call Help Desk
                    </button>

                    <button
                        onClick={handleIntakeClick}
                        className={styles['chat-btn']}
                        style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px', background: 'var(--primary)', color: 'white' }}
                    >
                        <ClipboardList size={20} style={{ marginRight: '8px' }} />
                        New Patient Intake
                    </button>
                </div>

                <h3 className="section-title">Resources</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div className="card" style={{ display: 'flex', alignItems: 'center', padding: '12px' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px'
                        }}>
                            <Bed size={18} color="#15803d" />
                        </div>
                        <span style={{ fontWeight: '500' }}>ED Beds ({hospital.beds})</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
