'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, User } from 'lucide-react';
import styles from './page.module.css';
import { useUser } from '@/context/UserContext';

export default function EditProfile() {
    const router = useRouter();
    const { userProfile, updateProfile } = useUser();

    const [formData, setFormData] = useState({
        name: userProfile.name,
        role: userProfile.role,
        hospital: userProfile.hospital,
        image: userProfile.image
    });

    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updateProfile(formData);
        router.back();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles['back-btn']} onClick={() => router.back()}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className={styles.title}>Edit Profile</h1>
            </div>

            <div className={styles['avatar-section']}>
                <div className={styles['avatar-wrapper']} onClick={handleImageClick}>
                    {formData.image ? (
                        <img src={formData.image} alt="Profile" className={styles['avatar-image']} />
                    ) : (
                        <User size={40} color="var(--gray-400)" />
                    )}
                    <div className={styles['camera-icon']}>
                        <Camera size={16} />
                    </div>
                </div>
                <span className={styles['change-photo-text']} onClick={handleImageClick}>
                    Change Profile Photo
                </span>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            <div className={styles['form-group']}>
                <label className={styles.label}>Full Name</label>
                <input
                    type="text"
                    className={styles.input}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div className={styles['form-group']}>
                <label className={styles.label}>Role / Title</label>
                <input
                    type="text"
                    className={styles.input}
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
            </div>

            <div className={styles['form-group']}>
                <label className={styles.label}>Hospital</label>
                <input
                    type="text"
                    className={styles.input}
                    value={formData.hospital}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                />
            </div>

            <div className={styles.actions}>
                <button className={styles['btn-cancel']} onClick={() => router.back()}>Cancel</button>
                <button className={styles['btn-save']} onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
}
