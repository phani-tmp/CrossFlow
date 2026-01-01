'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, User, Bot } from 'lucide-react';
import Link from 'next/link';

export default function DocGPTPage() {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', text: 'Hello Dr. Jenkins. I am DocGPT, your medical AI assistant. How can I help you with your cases today?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                role: 'assistant',
                text: "I'm processing that clinical query. Based on current guidelines..."
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--gray-50)' }}>
            {/* Header */}
            <div style={{
                padding: '1rem',
                paddingTop: '3rem',
                background: 'white',
                borderBottom: '1px solid var(--gray-200)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <Link href="/" style={{ color: 'var(--gray-600)' }}><ArrowLeft size={24} /></Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                    }}>
                        <Sparkles size={18} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>DocGPT</h1>
                        <span style={{ fontSize: '0.8rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }}></span>
                            Online
                        </span>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        display: 'flex',
                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    }}>
                        <div style={{
                            maxWidth: '80%',
                            padding: '1rem',
                            borderRadius: '16px',
                            borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                            borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                            background: msg.role === 'user' ? 'var(--primary)' : 'white',
                            color: msg.role === 'user' ? 'white' : 'var(--gray-800)',
                            boxShadow: msg.role === 'assistant' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                            border: msg.role === 'assistant' ? '1px solid var(--gray-200)' : 'none'
                        }}>
                            <p style={{ margin: 0, lineHeight: '1.5' }}>{msg.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '1rem', background: 'white', borderTop: '1px solid var(--gray-200)' }}>
                <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about a case, drug dosage, or guidelines..."
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            borderRadius: '100px',
                            border: '1px solid var(--gray-300)',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                    <button type="submit" style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        background: 'var(--primary)', color: 'white', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer'
                    }}>
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
