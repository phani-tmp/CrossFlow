import ContactList from '@/components/Contacts/ContactList';

export default function Contacts() {
    return (
        <div style={{ paddingBottom: '20px', background: 'var(--gray-100)', minHeight: '100vh' }}>
            <div style={{
                padding: '1rem',
                paddingTop: '3rem',
                background: 'white',
                borderBottom: '1px solid var(--gray-200)',
                marginBottom: '1rem'
            }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-800)' }}>Contacts</h1>
            </div>
            <ContactList />
        </div>
    );
}
