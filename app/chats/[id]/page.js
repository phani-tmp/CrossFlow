'use client';

import ChatWindow from '@/components/Chats/ChatWindow';
import { useParams } from 'next/navigation';

export default function ChatPage() {
    const params = useParams();
    const { id } = params;

    return <ChatWindow chatId={id} />;
}
