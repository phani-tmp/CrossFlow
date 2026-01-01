'use client';

import { useState } from 'react';
import FilterBar from '@/components/Hospital/FilterBar';
import HospitalCard from '@/components/Hospital/HospitalCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function InterHospital() {
    const [activeFilter, setActiveFilter] = useState('All');

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
        <div style={{ paddingBottom: '20px', background: 'var(--gray-100)', minHeight: '100vh' }}>
            <div style={{
                padding: '1rem',
                paddingTop: '3rem',
                background: 'white',
                borderBottom: '1px solid var(--gray-200)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
            }}>
                <Link href="/" style={{ color: 'var(--gray-800)' }}><ArrowLeft size={24} /></Link>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-800)' }}>Inter-Hospital</h1>
            </div>

            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            <div style={{ padding: '0 1rem' }}>
                <h2 className="section-title">Nearby Hospitals</h2>
                {filteredHospitals.map((hospital) => (
                    <HospitalCard key={hospital.id} {...hospital} />
                ))}
                {filteredHospitals.length === 0 && (
                    <p style={{ color: 'var(--gray-600)', textAlign: 'center', marginTop: '2rem' }}>No hospitals found for this service.</p>
                )}
            </div>
        </div>
    );
}
