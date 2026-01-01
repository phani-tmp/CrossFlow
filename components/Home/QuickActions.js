'use client';

import { Ambulance, Calendar, Sparkles, Mic, Newspaper } from 'lucide-react';
import styles from '@/styles/home.module.css';
import Link from 'next/link';

const QuickActions = () => {
    const actions = [
        { icon: <Ambulance size={24} />, label: "Transfer", color: "blue" },
        { icon: <Sparkles size={24} />, label: "DocGPT", color: "purple", link: "/docgpt" },
        { icon: <Mic size={24} />, label: "Scribe", color: "pink", link: "/scribe" },
        { icon: <Newspaper size={24} />, label: "News", color: "orange", link: "/news" },
        { icon: <Calendar size={24} />, label: "Schedule", color: "teal", link: "/schedule" },
    ];

    return (
        <div className={styles['quick-actions-grid']}>
            {actions.map((action, index) => (
                action.link ? (
                    <Link href={action.link} key={index} className={styles['action-btn']}>
                        <div className={`${styles['action-icon']} ${styles[action.color]}`}>
                            {action.icon}
                        </div>
                        <span>{action.label}</span>
                    </Link>
                ) : (
                    <button key={index} className={styles['action-btn']}>
                        <div className={`${styles['action-icon']} ${styles[action.color]}`}>
                            {action.icon}
                        </div>
                        <span>{action.label}</span>
                    </button>
                )
            ))}
        </div>
    );
};

export default QuickActions;
