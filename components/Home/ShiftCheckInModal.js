'use client';

import { useState } from 'react';
import { X, Clock, User, MapPin, Users, Shield } from 'lucide-react';
import styles from '@/styles/home.module.css';

const ShiftCheckInModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        rotation: 'Emergency Medicine',
        role: 'Attending Physician',
        startTime: '07:00',
        endTime: '19:00',
        patientCount: '',
        coverageAreas: []
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (area) => {
        setFormData(prev => {
            const areas = prev.coverageAreas.includes(area)
                ? prev.coverageAreas.filter(a => a !== area)
                : [...prev.coverageAreas, area];
            return { ...prev, coverageAreas: areas };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
            <div style={{
                background: 'white', width: '100%', maxWidth: '500px',
                borderRadius: '16px', padding: '1.5rem',
                maxHeight: '90vh', overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Start Shift</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} color="var(--gray-500)" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Rotation */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
                            <MapPin size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                            Rotation / Department
                        </label>
                        <select
                            name="rotation"
                            value={formData.rotation}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-300)', fontSize: '1rem' }}
                        >
                            <option>Emergency Medicine</option>
                            <option>Trauma Surgery</option>
                            <option>ICU / Critical Care</option>
                            <option>Internal Medicine</option>
                            <option>Cardiology</option>
                            <option>Neurology</option>
                            <option>Pediatrics</option>
                        </select>
                    </div>

                    {/* Role */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
                            <User size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                            Team Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-300)', fontSize: '1rem' }}
                        >
                            <option>Attending Physician</option>
                            <option>Resident (PGY-1)</option>
                            <option>Resident (PGY-2)</option>
                            <option>Resident (PGY-3+)</option>
                            <option>Fellow</option>
                            <option>Charge Nurse</option>
                            <option>Triage Nurse</option>
                        </select>
                    </div>

                    {/* Shift Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
                                <Clock size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                                Start Time
                            </label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-300)', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
                                End Time
                            </label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-300)', fontSize: '1rem' }}
                            />
                        </div>
                    </div>

                    {/* Patient Count (Optional) */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
                            <Users size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                            Assigned Patients (Optional)
                        </label>
                        <input
                            type="number"
                            name="patientCount"
                            placeholder="e.g. 12"
                            value={formData.patientCount}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-300)', fontSize: '1rem' }}
                        />
                    </div>

                    {/* Coverage Areas (Optional) */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
                            <Shield size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                            Coverage Areas (Optional)
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {['Resus Bay', 'Fast Track', 'Triage', 'Pod A', 'Pod B', 'Trauma'].map(area => (
                                <button
                                    key={area}
                                    type="button"
                                    onClick={() => handleCheckboxChange(area)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '100px',
                                        border: formData.coverageAreas.includes(area) ? '1px solid var(--primary)' : '1px solid var(--gray-300)',
                                        background: formData.coverageAreas.includes(area) ? '#eff6ff' : 'white',
                                        color: formData.coverageAreas.includes(area) ? 'var(--primary)' : 'var(--gray-600)',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {area}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{
                            marginTop: '1rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '12px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                        }}
                    >
                        Confirm & Clock In
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ShiftCheckInModal;
