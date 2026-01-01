'use client';

import { AlertCircle, MessageSquare } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { useRouter } from 'next/navigation';
import styles from './TransferCard.module.css';

const TransferCard = () => {
    const { chats, markChatAsHandled } = useChat();
    const router = useRouter();

    // Filter for external chats (Inter-Hospital transfers) that haven't been handled
    const transferRequests = chats.filter(c => c.type === 'external' && !c.hideFromHome);

    if (transferRequests.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.card} style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray-500)' }}>
                    <p>No active transfer requests.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {transferRequests.map(chat => {
                const lastMessage = chat.messages[chat.messages.length - 1];
                return (
                    <div key={chat.id} className={styles.card} style={{ marginBottom: '1rem' }}>
                        <div className={styles.header}>
                            <div className={styles.patientInfo}>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {chat.avatar} {chat.name}
                                </h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginTop: '4px' }}>
                                    {lastMessage ? lastMessage.text : 'New Transfer Request'}
                                </p>
                                {lastMessage && (
                                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{lastMessage.time}</span>
                                )}
                            </div>
                            <AlertCircle className={styles.icon} size={24} color="var(--danger)" />
                        </div>
                        <div className={styles.actions}>
                            <button
                                className={`${styles.btn} ${styles.chat}`}
                                onClick={() => {
                                    markChatAsHandled(chat.id);
                                    router.push(`/chats/${chat.id}`);
                                }}
                                style={{ width: '100%' }}
                            >
                                <MessageSquare size={16} style={{ marginRight: '6px' }} />
                                Quick Chat
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TransferCard;
