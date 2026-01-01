'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Paperclip, Send, Phone, Mic, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/styles/chatDetail.module.css';
import { useChat } from '@/context/ChatContext';

const ChatWindow = ({ chatId }) => {
    const { getChat, sendMessage, leaveTeam } = useChat();
    const chat = getChat(chatId);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const router = useRouter();

    const messages = chat ? chat.messages : [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (inputText.trim() === '') return;
        sendMessage(chatId, inputText);
        setInputText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            sendMessage(chatId, `📎 Sent file: ${file.name}`);
        }
    };

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLeaveTeam = () => {
        if (confirm('Are you sure you want to leave this team?')) {
            leaveTeam(chatId);
            router.push('/chats');
        }
    };

    if (!chat) return <div style={{ padding: 20 }}>Chat not found</div>;

    const isTeam = chatId.toString().startsWith('team-');

    // Mock extended profile data (in real app, fetch from API)
    const profile = {
        hospital: "St. Peter's Hospital",
        role: "Attending Physician",
        specialty: "Emergency Medicine",
        status: "Online",
        lastActive: "Now"
    };

    return (
        <div className={styles['chat-page']}>
            <div className={styles['chat-header']}>
                <Link href="/chats" className={styles['back-btn']}>
                    <ArrowLeft size={24} />
                </Link>
                <div className={styles.info} onClick={toggleProfile} style={{ cursor: 'pointer' }}>
                    <h2 className={styles.title}>{chat.name}</h2>
                    <p className={styles.subtitle}>
                        {isProfileOpen ? 'Tap to close info' : (isTeam ? 'Tap for team info' : 'Tap for info')}
                    </p>
                </div>
                <button className={styles['call-btn']}>
                    <Phone size={20} />
                </button>
            </div>

            <div className={`${styles['profile-drawer']} ${isProfileOpen ? styles.open : ''}`}>
                <div className={styles['profile-content']}>
                    <div className={styles['profile-avatar-large']} style={isTeam ? { background: chat.color, color: 'white' } : {}}>
                        {isTeam ? chat.name.substring(0, 2).toUpperCase() : chat.avatar}
                    </div>
                    <h3 className={styles['profile-name']}>{chat.name}</h3>

                    {!isTeam && (
                        <>
                            <div className={styles['profile-hospital']}>
                                <span>🏥</span> {profile.hospital}
                            </div>
                            <div className={styles['profile-stats']}>
                                <div className={styles['stat-badge']}>{profile.specialty}</div>
                                <div className={styles['stat-badge']}>{profile.role}</div>
                            </div>
                        </>
                    )}

                    {isTeam && (
                        <div className={styles['profile-stats']}>
                            <div className={styles['stat-badge']}>Team Chat</div>
                            <div className={styles['stat-badge']}>{chat.messages.length} Messages</div>
                        </div>
                    )}

                    <div className={styles['profile-actions']}>
                        {!isTeam ? (
                            <>
                                <button className={`${styles['action-btn']} ${styles['btn-primary']}`}>
                                    <Phone size={16} /> Start Call
                                </button>
                                <button className={`${styles['action-btn']} ${styles['btn-secondary']}`}>
                                    View Hospital
                                </button>
                            </>
                        ) : (
                            <button
                                className={`${styles['action-btn']} ${styles['btn-secondary']}`}
                                style={{ color: 'var(--danger)', borderColor: 'var(--danger)', background: '#fef2f2' }}
                                onClick={handleLeaveTeam}
                            >
                                <LogOut size={16} /> Leave Team
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles['chat-body']}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.type === 'incoming' ? 'flex-start' : 'flex-end' }}>
                        <div className={msg.type === 'incoming' ? styles['bubble-incoming'] : styles['bubble-outgoing']}>
                            {msg.text}
                        </div>
                        <div className={styles['message-time']}>{msg.time}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles['chat-input-container']}>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <button className={styles['attach-btn']} onClick={handleAttachClick}>
                    <Paperclip size={20} />
                </button>
                <input
                    type="text"
                    placeholder="Type a message..."
                    className={styles['input-box']}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {inputText.trim() === '' ? (
                    <button className={styles['mic-btn']}>
                        <Mic size={20} />
                    </button>
                ) : (
                    <button
                        className={styles['send-btn']}
                        onClick={handleSend}
                    >
                        <Send size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
