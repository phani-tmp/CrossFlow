import ChatList from '@/components/Chats/ChatList';

export default function Chats() {
    return (
        <div>
            <div style={{ padding: '1rem', paddingBottom: '0' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Chats</h1>
            </div>
            <ChatList />
        </div>
    );
}
