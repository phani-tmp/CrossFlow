'use client';

import { useState } from 'react';
import { ArrowLeft, Bed, Activity, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import styles from '@/styles/hospitalDetail.module.css';
import { useChat } from '@/context/ChatContext';

export default function HospitalDetail() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const { startChat } = useChat();
    const [activeTab, setActiveTab] = useState('ED');

    // Mock Data (In a real app, fetch based on ID)
    const hospitalData = {
        1: { name: "St. Mary's General", beds: 4, capacity: 60 },
        2: { name: "Services Run Cardiology", beds: 0, capacity: 95 },
        3: { name: "Active Bros Rehabilitation", beds: 6, capacity: 30 },
        4: { name: "Available Med. Centre", beds: 3, capacity: 45 },
    };

    const hospital = hospitalData[id] || hospitalData[1];

    const doctors = [
        { id: 101, name: "Dr. Amber Ortiz", role: "Emergency Physician", department: "ED", image: "👩🏽‍⚕️" },
        { id: 102, name: "Dr. Ryan Miller", role: "Emergency Physician", department: "ED", image: "👨🏻‍⚕️" },
        { id: 103, name: "Dr. Lauren Harris", role: "Trauma Surgeon", department: "Trauma", image: "👩🏼‍⚕️" },
        { id: 104, name: "Dr. James Wilson", role: "Cardiologist", department: "Cardiology", image: "👨🏻‍⚕️" },
        { id: 105, name: "Dr. Sarah Chen", role: "ICU Specialist", department: "ICU", image: "👩🏻‍⚕️" },
        { id: 106, name: "Dr. Michael Ross", role: "Trauma Surgeon", department: "Trauma", image: "👨🏼‍⚕️" }
    ];

    const filteredDoctors = doctors.filter(doc => doc.department === activeTab);

    const tabs = ['ED', 'ICU', 'Trauma', 'Cardiology'];

    const handleChatClick = (doc) => {
        const chatId = startChat(doc, 'external');
        router.push(`/chats/${chatId}`);
    };

    return (
        <div style={{ paddingBottom: '20px', background: 'var(--gray-50)', minHeight: '100vh' }}>
            <div className={styles['top-bar']}>
                <Link href="/inter-hospital" style={{ color: 'var(--gray-800)', marginRight: '12px' }}>
                    <ArrowLeft size={24} />
                </Link>
                <span style={{ fontWeight: '600' }}>Inter-Hospital</span>
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

                <div className={styles['tab-row']}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`${styles['tab-pill']} ${activeTab === tab ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <h3 className="section-title">Active Doctors ({filteredDoctors.length})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doc) => (
                            <div key={doc.id} className={styles['doctor-row']}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '50%', background: 'var(--gray-100)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', fontSize: '20px'
                                    }}>
                                        {doc.image}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>{doc.name}</h4>
                                        <p style={{ fontSize: '13px', color: 'var(--gray-600)', margin: 0 }}>{doc.role}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleChatClick(doc)} className={styles['chat-btn']}>
                                    <MessageSquare size={16} style={{ marginRight: '6px' }} />
                                    Chat Now
                                </button>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'var(--gray-600)', textAlign: 'center', padding: '20px' }}>No active doctors in {activeTab}.</p>
                    )}
                </div>

                <h3 className="section-title">Key Resources</h3>
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
                    <div className="card" style={{ display: 'flex', alignItems: 'center', padding: '12px' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px'
                        }}>
                            <Activity size={18} color="#15803d" />
                        </div>
                        <span style={{ fontWeight: '500' }}>Ventilators</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
