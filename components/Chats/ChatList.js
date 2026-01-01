'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import styles from '@/styles/chats.module.css';
import { useChat } from '@/context/ChatContext';

const ChatList = () => {
    const [activeTab, setActiveTab] = useState('inter');
    const [searchQuery, setSearchQuery] = useState('');
    const { chats, teams, joinTeam } = useChat();

    const TeamsSection = () => {
        const filteredTeams = teams.filter(team =>
            team.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredTeams.length === 0) return null;

        return (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '10px' }}>
                {filteredTeams.map(team => (
                    <div
                        key={team.id}
                        style={{
                            minWidth: '100px',
                            height: '100px',
                            background: team.color,
                            borderRadius: '16px',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            color: 'white',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ fontWeight: '700', fontSize: '14px' }}>{team.name}</span>
                        {team.isJoined ? (
                            <Link href={`/chats/${team.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', textAlign: 'center' }}>
                                    Open
                                </div>
                            </Link>
                        ) : (
                            <button
                                onClick={() => joinTeam(team.id)}
                                style={{
                                    background: 'white',
                                    color: team.color,
                                    border: 'none',
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Join
                            </button>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const filteredChats = activeTab === 'inter'
        ? chats.filter(c => c.type === 'external' && c.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : [
            ...teams.filter(t => t.isJoined && t.name.toLowerCase().includes(searchQuery.toLowerCase())).map(t => ({ ...t, type: 'team' })),
            ...chats.filter(c => c.type === 'internal' && c.name.toLowerCase().includes(searchQuery.toLowerCase()))
        ].sort((a, b) => {
            const timeA = a.messages.length > 0 ? a.messages[a.messages.length - 1].id : 0;
            const timeB = b.messages.length > 0 ? b.messages[b.messages.length - 1].id : 0;
            return timeB - timeA;
        });

    return (
        <div className={styles.container}>
            <div style={{ padding: '1rem', paddingBottom: '0' }}>
                <div className={styles.searchContainer}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search teams or people..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className={styles['tab-container']}>
                    <button
                        className={`${styles['tab-btn']} ${activeTab === 'inter' ? styles.active : ''}`}
                        onClick={() => setActiveTab('inter')}
                    >
                        Inter-Hospital
                    </button>
                    <button
                        className={`${styles['tab-btn']} ${activeTab === 'internal' ? styles.active : ''}`}
                        onClick={() => setActiveTab('internal')}
                    >
                        My Network
                    </button>
                </div>
            </div>

            <div style={{ padding: '0 1rem' }}>
                {activeTab === 'internal' && (
                    <>
                        <h2 className={styles['chat-section-title']}>Teams</h2>
                        <TeamsSection />
                    </>
                )}

                <h2 className={styles['chat-section-title']}>Recent Messages</h2>
                {filteredChats.map((chat) => {
                    const lastMessage = chat.messages[chat.messages.length - 1] || { text: "No messages yet", time: "" };
                    return (
                        <Link href={`/chats/${chat.id}`} key={chat.id} className={styles['chat-row']}>
                            <div className={styles['avatar-circle']} style={chat.type === 'team' ? { background: chat.color, color: 'white' } : {}}>
                                {chat.type === 'team' ? chat.name.substring(0, 2).toUpperCase() : chat.avatar}
                                {chat.type === 'internal' && <div className={styles['online-dot']}></div>}
                            </div>
                            <div className={styles['chat-text-block']}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 className={styles['chat-title']}>
                                        {chat.name}
                                        {chat.type === 'external' && <span className={styles['badge-external']}>External</span>}
                                        {chat.type === 'internal' && <span className={styles['badge-internal']}>Internal</span>}
                                        {chat.type === 'team' && <span className={styles['badge-internal']} style={{ background: '#f3f4f6', color: '#4b5563' }}>Team</span>}
                                    </h3>
                                    <span className={styles['chat-time']}>{lastMessage.time}</span>
                                </div>
                                <p className={styles['chat-subtitle']}>
                                    {chat.type === 'team' && lastMessage.sender ? `${lastMessage.sender}: ` : ''}
                                    {lastMessage.text}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatList;
