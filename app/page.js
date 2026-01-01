'use client';
// Force rebuild


import { useUser } from '@/context/UserContext';
import ProfileHeader from '@/components/Home/ProfileHeader';
import ResponsibilitiesCard from '@/components/Home/ResponsibilitiesCard';
import QuickActions from '@/components/Home/QuickActions';
import TransferCard from '@/components/Home/TransferCard';
import HospitalUpdates from '@/components/Home/HospitalUpdates';
import SettingsDrawer from '@/components/Home/SettingsDrawer';
import Announcements from '@/components/Home/Announcements';
import { Clock, Users, Shield } from 'lucide-react';
import styles from '@/styles/home.module.css';

export default function Home() {
  const { shiftDetails, clockStatus } = useUser();

  return (
    <div style={{ padding: '1rem', paddingBottom: '100px', background: 'var(--gray-50)', minHeight: '100vh' }}>
      <ProfileHeader />

      {/* Shift Summary Card - Only show if clocked in */}
      {clockStatus === 'Clocked In' && shiftDetails && (
        <div className={styles.card} style={{ marginBottom: '20px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '0 0 4px 0' }}>{shiftDetails.rotation}</h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem' }}>{shiftDetails.role}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '600' }}>
              {shiftDetails.startTime} - {shiftDetails.endTime}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
            {shiftDetails.patientCount && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} />
                <span style={{ fontWeight: '600' }}>{shiftDetails.patientCount} Patients</span>
              </div>
            )}
            {shiftDetails.coverageAreas && shiftDetails.coverageAreas.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} />
                <span style={{ fontWeight: '600' }}>{shiftDetails.coverageAreas.length} Zones</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fallback if not clocked in */}
      {clockStatus !== 'Clocked In' && (
        <div style={{ marginBottom: '20px', textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '16px', border: '1px dashed var(--gray-300)' }}>
          <p style={{ color: 'var(--gray-500)', margin: 0 }}>Clock in to see your shift summary</p>
        </div>
      )}

      <QuickActions />

      <h2 className="section-title" style={{ color: 'var(--danger)', marginTop: '20px' }}>Urgent Transfers</h2>
      <TransferCard />

      <h2 className="section-title">Announcements</h2>
      <Announcements />

      <h2 className="section-title">Hospital Updates</h2>
      <HospitalUpdates />

      <SettingsDrawer />
    </div>
  );
}
