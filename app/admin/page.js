'use client';

import { BarChart3, Users, Bed, Activity } from 'lucide-react';
import styles from './page.module.css';

export default function AdminDashboard() {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <h1 className={styles.logo}>CrossFlow Admin</h1>
                <nav className={styles.nav}>
                    <a href="#" className={styles.navItem + ' ' + styles.active}>Dashboard</a>
                    <a href="#" className={styles.navItem}>Transfers</a>
                    <a href="#" className={styles.navItem}>Hospitals</a>
                    <a href="#" className={styles.navItem}>Users</a>
                </nav>
            </div>

            <div className={styles.main}>
                <header className={styles.header}>
                    <h2>System Overview</h2>
                    <div className={styles.user}>Admin User</div>
                </header>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span>Active Transfers</span>
                            <Activity size={20} color="#3B82F6" />
                        </div>
                        <div className={styles.statValue}>24</div>
                        <div className={styles.statTrend}>+12% from yesterday</div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span>Total Bed Capacity</span>
                            <Bed size={20} color="#10B981" />
                        </div>
                        <div className={styles.statValue}>85%</div>
                        <div className={styles.statTrend}>Critical in 2 hospitals</div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span>Active Staff</span>
                            <Users size={20} color="#8B5CF6" />
                        </div>
                        <div className={styles.statValue}>142</div>
                        <div className={styles.statTrend}>32 clocked in now</div>
                    </div>
                </div>

                <div className={styles.chartSection}>
                    <h3>Transfer Volume (Last 24h)</h3>
                    <div className={styles.placeholderChart}>
                        <BarChart3 size={48} color="#CBD5E1" />
                        <span>Chart Visualization Placeholder</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
