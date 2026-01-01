'use client';

import { useState } from 'react';
import FilterBar from '@/components/Hospital/FilterBar';
import HospitalCard from '@/components/Hospital/HospitalCard';
import { Ambulance, MapPin } from 'lucide-react';
import styles from './page.module.css';

export default function EMSHome() {
    const [activeFilter, setActiveFilter] = useState('All');

    // Mock Data - In real app, this would be fetched
    const hospitals = [
        {
            id: 1,
            name: "St. Mary's General",
            distance: "2.1 mi",
            beds: 4,
            services: [
                { name: "ED", color: "#3B82F6", textColor: "white" },
                { name: "ICU", color: "#E2E8F0" },
                { name: "OBGYN", color: "#FEF3C7", textColor: "#92400E" }
            ]
        },
        {
            id: 2,
            name: "Services Run Cardiology",
            distance: "4.2 mi",
            beds: 0,
            services: [
                { name: "Trauma", color: "#EF4444", textColor: "white" },
                { name: "Cardiology", color: "#FEF3C7", textColor: "#92400E" }
            ]
        },
        {
            id: 3,
            name: "Active Bros Rehabilitation",
            distance: "6.8 mi",
            beds: 6,
            services: [
                { name: "ED", color: "#3B82F6", textColor: "white" },
                { name: "Trauma", color: "#EF4444", textColor: "white" }
            ]
        },
        {
            id: 4,
            name: "Available Med. Centre",
            distance: "7.5 mi",
            beds: 3,
            services: [
                { name: "ICU", color: "#10B981", textColor: "white" },
                { name: "Surgery", color: "#8B5CF6", textColor: "white" }
            ]
        }
    ];

    const filteredHospitals = activeFilter === 'All'
        ? hospitals
        : hospitals.filter(h => h.services.some(s => s.name === activeFilter));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                        <Ambulance size={20} color="white" />
                    </div>
                    <h1>CrossFlow EMS</h1>
                </div>
                <div className={styles.status}>Unit 42 • Active</div>
            </div>

            <div style={{ padding: '0 1rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                </div>

                <h2 className={styles.sectionTitle}>Nearby Hospitals</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredHospitals.map((hospital) => (
                        <HospitalCard
                            key={hospital.id}
                            {...hospital}
                            linkPrefix="/ems"
                        />
                    ))}
                    {filteredHospitals.length === 0 && (
                        <p style={{ color: 'var(--gray-600)', textAlign: 'center', marginTop: '2rem' }}>No hospitals found for this service.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
