'use client';

import { ChevronRight, Activity, Bed, Stethoscope } from 'lucide-react';
import styles from './QuickSnapshot.module.css';

const QuickSnapshot = () => {
    const items = [
        {
            icon: Stethoscope,
            title: "Services General",
            subtitle: "Key Specialties or Capacities",
            color: "#3B82F6"
        },
        {
            icon: Activity,
            title: "Active Resi: Cardiology",
            subtitle: "Key Capabilities",
            color: "#10B981"
        },
        {
            icon: Bed,
            title: "Available Beds",
            subtitle: "Available Beds",
            color: "#F59E0B"
        }
    ];

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Quick Snapshot</h3>
            <div className={styles.list}>
                {items.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className={styles.item}>
                            <div className={styles.iconWrapper} style={{ backgroundColor: item.color }}>
                                <Icon size={20} color="white" />
                            </div>
                            <div className={styles.content}>
                                <h4 className={styles.itemTitle}>{item.title}</h4>
                                <p className={styles.itemSubtitle}>{item.subtitle}</p>
                            </div>
                            <ChevronRight size={20} className={styles.arrow} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickSnapshot;
