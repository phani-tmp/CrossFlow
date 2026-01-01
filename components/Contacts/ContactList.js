'use client';

import { useState } from 'react';
import { Search, User, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useChat } from '@/context/ChatContext';
import styles from '@/styles/contacts.module.css';

const ContactList = () => {
    const router = useRouter();
    const { startChat } = useChat();
    const [searchQuery, setSearchQuery] = useState('');
    const contacts = [
        // SOCIAL WORK
        { id: 101, name: "Main Office", role: "Social Work", phone: "202-865-6731", status: "online" },
        { id: 102, name: "Trauma SW", role: "Social Work", phone: "202-865-7110", status: "online" },
        { id: 103, name: "Ms. Parks", role: "Social Work", phone: "202-738-3862", status: "away" },
        { id: 104, name: "Ms. Reddic", role: "Social Work", phone: "202-738-0006", status: "online" },
        { id: 105, name: "Ms. Peterson", role: "Social Work", phone: "202-738-3782", status: "offline" },
        { id: 106, name: "Talieh Shaw", role: "Social Work", phone: "202-489-5985", status: "online" },
        { id: 107, name: "Michellyn Culler", role: "Social Work", phone: "202-738-3860", status: "away" },
        { id: 108, name: "Suresh Wadhawan", role: "Social Work", phone: "202-726-8723", status: "online" },
        { id: 109, name: "Ms. Mills", role: "Social Work", phone: "202-738-0741", status: "online" },
        { id: 110, name: "Ms. Cade", role: "Social Work", phone: "202-738-2961", status: "offline" },
        { id: 111, name: "Lucretia Stewart", role: "Social Work", phone: "202-738-3782", status: "online" },
        { id: 112, name: "Ms. Ham", role: "Social Work", phone: "202-341-3300", status: "away" },
        { id: 113, name: "Michele Jones", role: "Social Work", phone: "202-291-4300", status: "online" },
        { id: 114, name: "Jeannine Crooks-Price", role: "Social Work", phone: "202-829-4084", status: "online" },
        { id: 115, name: "Meron Mengistu", role: "Social Work", phone: "202-276-0618", status: "offline" },
        { id: 116, name: "Lakisha Barksdale", role: "Social Work", phone: "202-305-0120", status: "online" },
        { id: 117, name: "Marpu Biowegpei", role: "Social Work", phone: "202-270-9598", status: "away" },
        { id: 118, name: "Pandora Crumpton", role: "Social Work", phone: "202-706-9568", status: "online" },
        { id: 119, name: "Jeanine Wilson", role: "Social Work", phone: "202-882-6293", status: "online" },
        { id: 120, name: "Brandon Warren", role: "Social Work", phone: "202-607-5967", status: "offline" },
        { id: 121, name: "William Allen", role: "Social Work", phone: "202-294-5024", status: "online" },
        { id: 122, name: "Linda Miller", role: "Social Work", phone: "202-277-1399", status: "away" },

        // INTERPRETER SERVICES
        { id: 201, name: "Caroline (Spanish)", role: "Interpreter", phone: "202-726-9867", status: "online" },
        { id: 202, name: "French/Haitian Creole", role: "Interpreter", phone: "202-740-0003", status: "online" },
        { id: 203, name: "Luisana Garcia (Spanish)", role: "Interpreter", phone: "202-865-5284", status: "away" },
        { id: 204, name: "Fitsahats Casilla (Amharic)", role: "Interpreter", phone: "202-407-4455", status: "online" },
        { id: 205, name: "Meskele Gebreyess (Amharic)", role: "Interpreter", phone: "202-829-9032", status: "offline" },
        { id: 206, name: "Hagos (Tigrinya)", role: "Interpreter", phone: "202-239-9032", status: "online" },
        { id: 207, name: "Camie Yang (Mandarin/Cantonese)", role: "Interpreter", phone: "202-438-8573", status: "away" },

        // ADMINISTRATIVE
        { id: 301, name: "Michelle Lee", role: "Admin", phone: "202-865-1642", status: "online" },
        { id: 302, name: "Kenyatta Hazelwood", role: "Admin", phone: "847-613-6105", status: "online" },
        { id: 303, name: "Patrice Ayeh", role: "Admin", phone: "202-699-8838", status: "away" },
        { id: 304, name: "Patrice Jwewoh", role: "Admin", phone: "240-619-0238", status: "online" },
        { id: 305, name: "Coryne Lewis", role: "Admin", phone: "240-793-7873", status: "offline" },
        { id: 306, name: "GMIT", role: "Admin", phone: "202-865-4079", status: "online" },
        { id: 307, name: "Alexys Butler", role: "Admin", phone: "202-865-6953", status: "online" },
        { id: 308, name: "Alando Thompson", role: "Admin", phone: "202-865-4481", status: "away" },
        { id: 309, name: "WUCN SIM Center", role: "Admin", phone: "202-806-3800", status: "online" },

        // ATTENDINGS
        { id: 401, name: "Edward Cornwell", role: "ACS Attending", phone: "410-627-2817", status: "online" },
        { id: 402, name: "Gamal Mostafa", role: "ACS Attending", phone: "704-614-5251", status: "away" },
        { id: 403, name: "Suryanarayana Sriram", role: "ACS Attending", phone: "301-526-1943", status: "online" },
        { id: 404, name: "Mallory Williams", role: "ACS Attending", phone: "617-543-8233", status: "offline" },
        { id: 405, name: "Debra Ford", role: "Colorectal", phone: "202-528-4936", status: "online" },
        { id: 406, name: "Christine Nembhard", role: "Colorectal", phone: "202-468-9597", status: "online" },
        { id: 407, name: "Salim Aziz", role: "CT/Vasc", phone: "240-463-5893", status: "away" },
        { id: 408, name: "Duan Drakes", role: "CT/Vasc", phone: "301-543-0403", status: "online" },
        { id: 409, name: "Dr. Tetteh", role: "CT/Vasc", phone: "917-568-8400", status: "offline" },
        { id: 410, name: "William Bond", role: "ENT", phone: "301-367-4681", status: "online" },
        { id: 411, name: "Adegoyin Kalajeye", role: "ENT", phone: "202-412-5333", status: "online" },
        { id: 412, name: "Adam Singleton", role: "Attending", phone: "240-630-8175", status: "away" },
        { id: 413, name: "Terrence Fullum", role: "MIS/Bariatrics/ACS", phone: "202-309-3049", status: "online" },
        { id: 414, name: "Naval Tetteh", role: "Attending", phone: "301-717-6848", status: "online" },
        { id: 415, name: "Damir Fossett", role: "Neurosurgery", phone: "301-509-1596", status: "offline" },
        { id: 416, name: "Ronald Uscinscki", role: "Neurosurgery", phone: "571-437-5705", status: "online" },
        { id: 417, name: "Kelly Bolden", role: "Plastics", phone: "202-230-0364", status: "away" },
        { id: 418, name: "Henny Paudi", role: "Plastics", phone: "301-526-3001", status: "online" },
        { id: 419, name: "Kirk Geter", role: "Podiatry", phone: "301-323-3445", status: "online" },
        { id: 420, name: "Podiatry General", role: "Podiatry", phone: "202-491-8037", status: "online" },
        { id: 421, name: "RadOne Dumore", role: "Attending", phone: "301-343-5663", status: "offline" },
        { id: 422, name: "Wayne Frederick", role: "SurgOnc", phone: "202-849-0495", status: "online" },
        { id: 423, name: "Steven Nagel", role: "SurgOnc", phone: "240-676-2755", status: "away" },
        { id: 424, name: "Muy Tec", role: "SurgOnc", phone: "515-400-7399", status: "online" },
        { id: 425, name: "Pamela Coleman", role: "Urology", phone: "202-256-8518", status: "online" },
        { id: 426, name: "Mary Tonkin", role: "Urology", phone: "408-388-9960", status: "offline" },
        { id: 427, name: "Kakra Hughes", role: "Vascular", phone: "202-340-4469", status: "online" },
        { id: 428, name: "Rachal Majede", role: "Vascular", phone: "240-801-1800", status: "away" },
        { id: 429, name: "David Rose", role: "Vascular", phone: "703-314-9388", status: "online" },

        // OUTPATIENT CLINICS
        { id: 501, name: "Clinic Appointments", role: "Clinic", phone: "202-865-4700", status: "online" },
        { id: 502, name: "Plastics Clinic", role: "Clinic", phone: "202-865-7658", status: "online" },
        { id: 503, name: "MIS/Bariatric Clinic", role: "Clinic", phone: "202-865-4984", status: "online" },
        { id: 504, name: "Trauma/Neuro/Vasc Clinic", role: "Clinic", phone: "202-865-4983", status: "online" },
        { id: 505, name: "CTVasc (AIZ)", role: "Clinic", phone: "202-775-5111", status: "online" },
        { id: 506, name: "ENT Clinic", role: "Clinic", phone: "202-865-1432", status: "online" },
        { id: 507, name: "Dr. Bond WHC South", role: "Clinic", phone: "202-726-7770", status: "online" },
        { id: 508, name: "SurgOnc Clinic", role: "Clinic", phone: "202-865-1448", status: "online" },
        { id: 509, name: "SurgOnc (Frederick)", role: "Clinic", phone: "202-865-6409", status: "online" },
        { id: 510, name: "Urology Clinic", role: "Clinic", phone: "202-865-1310", status: "online" },
        { id: 511, name: "Neurology Clinic", role: "Clinic", phone: "202-865-7677", status: "online" },
        { id: 512, name: "Hematology Clinic", role: "Clinic", phone: "202-865-3281", status: "online" },
        { id: 513, name: "Oncology Clinic", role: "Clinic", phone: "202-865-1002", status: "online" },
        { id: 514, name: "Cardiology Clinic", role: "Clinic", phone: "202-865-3775", status: "online" },
        { id: 515, name: "Nephrology Clinic", role: "Clinic", phone: "202-865-3290", status: "online" },
        { id: 516, name: "Physical Therapy", role: "Clinic", phone: "202-865-1411", status: "online" },
        { id: 517, name: "CIDMAR", role: "Clinic", phone: "202-865-7516", status: "online" },
        { id: 518, name: "Diabetes/Endocrine", role: "Clinic", phone: "202-865-3350", status: "online" },
        { id: 519, name: "Ophthalmology", role: "Clinic", phone: "202-865-1257", status: "online" },
        { id: 520, name: "OMFS Clinic", role: "Clinic", phone: "202-865-1491", status: "online" },
        { id: 521, name: "Orthopedics Clinic", role: "Clinic", phone: "202-865-1183", status: "online" },
        { id: 522, name: "Psychiatry Clinic", role: "Clinic", phone: "202-865-7981", status: "online" },
        { id: 523, name: "Gastroenterology", role: "Clinic", phone: "202-865-3290", status: "online" },
        { id: 524, name: "OB/Gyn Clinic", role: "Clinic", phone: "202-865-4164", status: "online" },
        { id: 525, name: "Chemotherapy", role: "Clinic", phone: "202-865-1004", status: "online" },
        { id: 526, name: "Radiation Oncology", role: "Clinic", phone: "202-865-1241", status: "online" },
        { id: 527, name: "Suite B", role: "Clinic", phone: "202-865-1304", status: "online" },
        { id: 528, name: "Suite C", role: "Clinic", phone: "202-865-4125", status: "online" },
        { id: 529, name: "Family Medicine", role: "Clinic", phone: "202-865-3206", status: "online" },

        // WARDS
        { id: 601, name: "3E Ward", role: "Ward", phone: "202-865-6777", status: "online" },
        { id: 602, name: "4E Ward", role: "Ward", phone: "202-865-1249", status: "online" },
        { id: 603, name: "4N Ward", role: "Ward", phone: "202-865-1147", status: "online" },
        { id: 604, name: "5E Ward", role: "Ward", phone: "202-865-1357", status: "online" },
        { id: 605, name: "5N Ward", role: "Ward", phone: "202-865-1157", status: "online" },
        { id: 606, name: "5W Ward", role: "Ward", phone: "202-865-1259", status: "online" },
        { id: 607, name: "6E Ward", role: "Ward", phone: "202-865-1365", status: "online" },
        { id: 608, name: "6W Ward", role: "Ward", phone: "202-865-1351", status: "online" },
        { id: 609, name: "MICU", role: "Ward", phone: "202-865-1180", status: "online" },
        { id: 610, name: "Dialysis", role: "Ward", phone: "202-865-2783", status: "online" },
        { id: 611, name: "Walgreens", role: "Pharmacy", phone: "202-865-2783", status: "online" },
        { id: 612, name: "Pre-op", role: "Ward", phone: "202-865-3619", status: "online" },
        { id: 613, name: "PACU", role: "Ward", phone: "202-865-1274", status: "online" },
        { id: 614, name: "OR Front Desk", role: "Ward", phone: "202-865-1276", status: "online" },

        // TEAMS
        { id: 701, name: "Medicine Red", role: "Team", phone: "202-865-6511", status: "online" },
        { id: 702, name: "Medicine Yellow", role: "Team", phone: "202-865-6512", status: "online" },
        { id: 703, name: "Medicine Green", role: "Team", phone: "202-865-6517", status: "online" },
        { id: 704, name: "Medicine Blue", role: "Team", phone: "202-865-2494", status: "online" },
        { id: 705, name: "MICU Resident", role: "Team", phone: "202-865-4206", status: "online" },
        { id: 706, name: "CCU Resident", role: "Team", phone: "202-865-6559", status: "online" },
        { id: 707, name: "Family Medicine Team", role: "Team", phone: "202-865-2736", status: "online" },
        { id: 708, name: "Ortho Library", role: "Team", phone: "202-865-5180", status: "online" },
        { id: 709, name: "OB/GYN ASCOM", role: "Team", phone: "202-865-8803", status: "online" },
        { id: 710, name: "PT Team", role: "Team", phone: "202-865-1435", status: "online" },
        { id: 711, name: "OT Team", role: "Team", phone: "202-865-3742", status: "online" },
        { id: 712, name: "Speech Therapy", role: "Team", phone: "202-865-4244", status: "online" },
        { id: 713, name: "Audiology", role: "Team", phone: "202-865-6484", status: "online" },
        { id: 714, name: "Nutrition", role: "Team", phone: "202-865-6619", status: "online" },
        { id: 715, name: "Wound Care", role: "Team", phone: "202-865-2463", status: "online" },
        { id: 716, name: "Hospice", role: "Team", phone: "202-812-9772", status: "online" },
        { id: 717, name: "Psychiatry Consult", role: "Team", phone: "202-865-4325", status: "online" },
        { id: 718, name: "Addiction Medicine", role: "Team", phone: "202-865-6611", status: "online" },
        { id: 719, name: "SCIU", role: "Team", phone: "202-865-7419", status: "online" },

        // LAB
        { id: 801, name: "Central Processing", role: "Lab", phone: "202-865-1386", status: "online" },
        { id: 802, name: "Hematology Lab", role: "Lab", phone: "202-865-1381", status: "online" },
        { id: 803, name: "Chemistry Lab", role: "Lab", phone: "202-865-4017", status: "online" },
        { id: 804, name: "AFB Culture", role: "Lab", phone: "202-865-1382", status: "online" },
        { id: 805, name: "Cytology", role: "Lab", phone: "202-865-1369", status: "online" },
        { id: 806, name: "Serology", role: "Lab", phone: "202-865-1359", status: "online" },
        { id: 807, name: "Blood Bank", role: "Lab", phone: "202-865-1357", status: "online" },
        { id: 808, name: "Pathology", role: "Lab", phone: "202-865-1364", status: "online" },
        { id: 809, name: "Phlebotomy", role: "Lab", phone: "202-865-8357", status: "online" },

        // RADIOLOGY
        { id: 901, name: "Dr. Banks", role: "Radiology", phone: "202-865-4228", status: "online" },
        { id: 902, name: "Dr. Davis", role: "Radiology", phone: "202-865-6050", status: "online" },
        { id: 903, name: "Dr. Lin", role: "Radiology", phone: "202-865-6547", status: "online" },
        { id: 904, name: "Dr. Crowder", role: "Radiology", phone: "202-865-4212", status: "online" },
        { id: 905, name: "Dr. Cooks", role: "Radiology", phone: "202-865-6542", status: "online" },
        { id: 906, name: "Radiology Front Desk", role: "Radiology", phone: "202-865-1276", status: "online" },
        { id: 907, name: "Portable XR", role: "Radiology", phone: "202-865-2458", status: "online" },
        { id: 908, name: "XR Backroom", role: "Radiology", phone: "202-865-1408", status: "online" },
        { id: 909, name: "Ultrasound", role: "Radiology", phone: "202-865-1320", status: "online" },
        { id: 910, name: "CT Scanner", role: "Radiology", phone: "202-865-1403", status: "online" },
        { id: 911, name: "MRI", role: "Radiology", phone: "202-865-6237", status: "online" },
        { id: 912, name: "IR", role: "Radiology", phone: "202-865-3237", status: "online" },
        { id: 913, name: "Nighthawk", role: "Radiology", phone: "800-835-3723", status: "online" },
        { id: 914, name: "Nuclear Scan", role: "Radiology", phone: "202-865-1597", status: "online" },
        { id: 915, name: "Film Library", role: "Radiology", phone: "202-865-1124", status: "online" },

        // SERVICES
        { id: 1001, name: "Bedboard", role: "Service", phone: "202-865-7050", status: "online" },
        { id: 1002, name: "Nursing Staffing", role: "Service", phone: "202-865-1105", status: "online" },
        { id: 1003, name: "Posting (Ms. Ellen)", role: "Service", phone: "828-962-5161", status: "online" },
        { id: 1004, name: "Cath Lab Scheduler", role: "Service", phone: "202-865-7266", status: "online" },
        { id: 1005, name: "ECHO", role: "Service", phone: "202-865-4333", status: "online" },
        { id: 1006, name: "EKG/Stress", role: "Service", phone: "202-865-1186", status: "online" },
        { id: 1007, name: "Nuclear Stress", role: "Service", phone: "202-865-4223", status: "online" },
        { id: 1008, name: "Holter", role: "Service", phone: "202-865-4201", status: "online" },
        { id: 1009, name: "Vascular Lab", role: "Service", phone: "202-865-4212", status: "online" },
        { id: 1010, name: "Vascular Tech", role: "Service", phone: "202-865-4286", status: "online" },
        { id: 1011, name: "Endoscopy", role: "Service", phone: "202-865-3454", status: "online" },
        { id: 1012, name: "EEG", role: "Service", phone: "202-865-4412", status: "online" },
        { id: 1013, name: "Mr. Teddy (Neuro)", role: "Service", phone: "240-413-3240", status: "online" },
    ];

    // Filter and Sort
    const filteredContacts = contacts
        .filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.role.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    // Group by First Letter
    const groupedContacts = filteredContacts.reduce((groups, contact) => {
        const letter = contact.name.charAt(0).toUpperCase();
        if (!groups[letter]) {
            groups[letter] = [];
        }
        groups[letter].push(contact);
        return groups;
    }, {});

    const sortedLetters = Object.keys(groupedContacts).sort();

    return (
        <div style={{ padding: '0 1rem' }}>
            <div style={{ position: 'relative' }}>
                <Search size={18} color="var(--gray-400)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                    type="text"
                    placeholder="Search directory..."
                    className={styles['search-box']}
                    style={{ paddingLeft: '40px' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div style={{ marginTop: '1rem' }}>
                {sortedLetters.map(letter => (
                    <div key={letter}>
                        <div className={styles.sectionHeader}>{letter}</div>
                        {groupedContacts[letter].map((contact) => (
                            <div key={contact.id} className={styles['contact-row']}>
                                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '50%', background: 'var(--gray-200)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px',
                                        position: 'relative'
                                    }}>
                                        <User size={20} color="var(--gray-600)" />
                                        <span className={`${styles['status-dot']} ${contact.status === 'online' ? styles['status-online'] : styles['status-away']}`}></span>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--gray-800)' }}>{contact.name}</h3>
                                        <p style={{ fontSize: '13px', color: 'var(--gray-600)', margin: 0 }}>{contact.role}</p>
                                        {contact.phone && <p style={{ fontSize: '12px', color: 'var(--gray-400)', margin: '2px 0 0 0' }}>{contact.phone}</p>}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => {
                                            const chatId = startChat(contact);
                                            router.push(`/chats/${chatId}`);
                                        }}
                                        style={{
                                            width: '36px', height: '36px', borderRadius: '50%', background: '#eff6ff',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)',
                                            border: 'none', cursor: 'pointer'
                                        }}
                                    >
                                        <MessageSquare size={18} />
                                    </button>
                                    <a href={`tel:${contact.phone}`} style={{
                                        width: '36px', height: '36px', borderRadius: '50%', background: '#f0fdf4',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a',
                                        textDecoration: 'none'
                                    }}>
                                        <Phone size={18} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactList;
