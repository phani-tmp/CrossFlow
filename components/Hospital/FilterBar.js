'use client';

import { Search } from 'lucide-react';
import styles from '@/styles/interhospital.module.css';

const FilterBar = ({ activeFilter, onFilterChange }) => {
    const filters = ['All', 'ED', 'ICU', 'Trauma', 'Surgery', 'Cardiology'];

    return (
        <div style={{ padding: '0 1rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                padding: '10px 16px',
                borderRadius: '100px',
                border: '1px solid var(--gray-200)',
                marginBottom: '12px'
            }}>
                <Search size={18} color="var(--gray-400)" style={{ marginRight: '8px' }} />
                <input
                    type="text"
                    placeholder="Sort by: All Services"
                    style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        fontSize: '14px'
                    }}
                />
            </div>
            <div className={styles['filter-row']} style={{ overflowX: 'auto', paddingBottom: '4px' }}>
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`${styles['filter-chip']} ${activeFilter === filter ? styles.active : ''}`}
                        onClick={() => onFilterChange(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
