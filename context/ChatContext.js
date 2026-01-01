'use client';

import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([
        {
            id: 1,
            name: "St. Peter's Hospital",
            messages: [
                { id: 1, text: "Hi, we have a 45yo male with chest pain. ETA 10m.", time: "10:23 AM", type: "incoming" },
                { id: 2, text: "Copy that. Trauma team is ready.", time: "10:24 AM", type: "outgoing" },
                { id: 3, text: "Vitals stable. BP 140/90.", time: "10:25 AM", type: "incoming" }
            ],
            type: "external",
            avatar: "🏥"
        },
        {
            id: 2,
            name: "Dr. Sarah Smith",
            messages: [
                { id: 1, text: "Can you review the labs?", time: "9:45 AM", type: "incoming" }
            ],
            type: "internal",
            avatar: "👩🏼‍⚕️"
        },
        {
            id: 3,
            name: "Mercy General",
            messages: [
                { id: 1, text: "Bed availability update.", time: "Yesterday", type: "incoming" }
            ],
            type: "external",
            avatar: "🚑"
        },
        {
            id: 4,
            name: "Dr. James Wilson",
            messages: [
                { id: 1, text: "On my way to ER.", time: "Yesterday", type: "incoming" }
            ],
            type: "internal",
            avatar: "👨🏻‍⚕️"
        },
    ]);

    const [teams, setTeams] = useState([
        { id: 'team-green', name: 'Green Team', color: '#22c55e', isJoined: false, messages: [] },
        { id: 'team-red', name: 'Red Team', color: '#ef4444', isJoined: false, messages: [] },
        { id: 'team-yellow', name: 'Yellow Team', color: '#eab308', isJoined: false, messages: [] },
        { id: 'team-micu', name: 'MICU', color: '#3b82f6', isJoined: false, messages: [] },
        { id: 'team-ccu', name: 'CCU', color: '#6366f1', isJoined: false, messages: [] },
        { id: 'team-neuro', name: 'Neurology', color: '#8b5cf6', isJoined: false, messages: [] },
        { id: 'team-pulmo', name: 'Pulmonology', color: '#06b6d4', isJoined: false, messages: [] },
        { id: 'team-cardio', name: 'Cardiology', color: '#ec4899', isJoined: false, messages: [] },
        { id: 'team-nephro', name: 'Nephrology', color: '#d946ef', isJoined: false, messages: [] },
        { id: 'team-onco', name: 'Oncology', color: '#f43f5e', isJoined: false, messages: [] },
        { id: 'team-gastro', name: 'Gastroenterology', color: '#f97316', isJoined: false, messages: [] },
        { id: 'team-id', name: 'Infectious Disease', color: '#14b8a6', isJoined: false, messages: [] },
        { id: 'team-rheum', name: 'Rheumatology', color: '#a855f7', isJoined: false, messages: [] },
        { id: 'team-gen-surg', name: 'General Surgery', color: '#0ea5e9', isJoined: false, messages: [] },
        { id: 'team-uro', name: 'Urology', color: '#f59e0b', isJoined: false, messages: [] },
        { id: 'team-gastro-surg', name: 'Gastrosurgery', color: '#f97316', isJoined: false, messages: [] },
        { id: 'team-vasc', name: 'Vascular Surgery', color: '#ef4444', isJoined: false, messages: [] },
        { id: 'team-ct-surg', name: 'Cardiothoracic Surgery', color: '#ec4899', isJoined: false, messages: [] },
        { id: 'team-radio', name: 'Radiology', color: '#64748b', isJoined: false, messages: [] },
        { id: 'team-ir', name: 'Interventional Radiology', color: '#475569', isJoined: false, messages: [] },
        { id: 'team-ed', name: 'ED', color: '#ef4444', isJoined: false, messages: [] },
        { id: 'team-pharm', name: 'Pharmacy', color: '#10b981', isJoined: false, messages: [] },
    ]);

    const startChat = (contact, type = 'internal') => {
        // Check if chat exists with this person
        const existingChat = chats.find(c => c.name === contact.name);
        if (existingChat) return existingChat.id;

        // Create new chat
        const newChat = {
            id: Date.now(),
            name: contact.name,
            messages: [],
            type: type,
            avatar: "👨🏻‍⚕️" // Default or use contact.image if available
        };
        setChats(prev => [newChat, ...prev]);
        return newChat.id;
    };

    const sendMessage = (chatId, text) => {
        // Handle Team Chat
        if (typeof chatId === 'string' && chatId.startsWith('team-')) {
            setTeams(prev => prev.map(team => {
                if (team.id === chatId) {
                    return {
                        ...team,
                        messages: [
                            ...team.messages,
                            {
                                id: Date.now(),
                                text,
                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                type: 'outgoing',
                                sender: 'Me'
                            }
                        ]
                    };
                }
                return team;
            }));
            return;
        }

        // Handle Regular Chat
        setChats(prev => prev.map(chat => {
            if (chat.id == chatId) {
                return {
                    ...chat,
                    messages: [
                        ...chat.messages,
                        {
                            id: Date.now(),
                            text,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            type: 'outgoing'
                        }
                    ]
                };
            }
            return chat;
        }));
    };

    const getChat = (chatId) => {
        if (typeof chatId === 'string' && chatId.startsWith('team-')) {
            return teams.find(t => t.id === chatId);
        }
        return chats.find(c => c.id == chatId);
    };

    const joinTeam = (teamId) => {
        setTeams(prev => prev.map(t => t.id === teamId ? { ...t, isJoined: true } : t));
    };

    const leaveTeam = (teamId) => {
        setTeams(prev => prev.map(t => t.id === teamId ? { ...t, isJoined: false } : t));
    };

    const markChatAsHandled = (chatId) => {
        setChats(prev => prev.map(chat => {
            if (chat.id === chatId) {
                return { ...chat, hideFromHome: true };
            }
            return chat;
        }));
    };

    return (
        <ChatContext.Provider value={{ chats, teams, startChat, sendMessage, getChat, joinTeam, leaveTeam, markChatAsHandled }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
