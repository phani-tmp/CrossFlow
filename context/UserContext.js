'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, updateProfile } from 'firebase/auth';

// TODO: Replace with your Firebase Config
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
let auth;
if (!getApps().length) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
    } catch (e) {
        console.warn("Firebase not initialized. Check your config.");
    }
} else {
    app = getApps()[0];
    auth = getAuth(app);
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clockStatus, setClockStatus] = useState('Clocked In');
    const [activeRotation, setActiveRotation] = useState('ED');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const [userProfile, setUserProfile] = useState({
        name: "Dr. Sarah Jenkins",
        role: "Emergency Physician",
        hospital: "St. Peter's Hospital",
        image: null
    });

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Update profile with Firebase data if available
                setUserProfile(prev => ({
                    ...prev,
                    name: currentUser.displayName || prev.name,
                    email: currentUser.email
                }));
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signup = async (email, password, name) => {
        if (!auth) throw new Error("Firebase not initialized");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update display name
        await updateProfile(user, { displayName: name });

        // Send verification email
        await sendEmailVerification(user);

        return user;
    };

    const login = async (email, password) => {
        if (!auth) throw new Error("Firebase not initialized");
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        if (!auth) throw new Error("Firebase not initialized");
        return signOut(auth);
    };

    const verifyEmail = async () => {
        if (user) {
            return sendEmailVerification(user);
        }
    };

    const updateProfile = (newData) => {
        setUserProfile(prev => ({ ...prev, ...newData }));
    };

    const toggleClockStatus = (newStatus) => {
        setClockStatus(newStatus);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const [shiftDetails, setShiftDetails] = useState(null);

    const startShift = (details) => {
        setShiftDetails(details);
        setClockStatus('Clocked In');
        setActiveRotation(details.rotation);
        // Update user profile role/rotation locally for the session
        setUserProfile(prev => ({
            ...prev,
            role: details.role,
            rotation: details.rotation
        }));
    };

    const endShift = () => {
        setShiftDetails(null);
        setClockStatus('Offline');
    };

    return (
        <UserContext.Provider value={{
            user,
            loading,
            signup,
            login,
            logout,
            verifyEmail,
            clockStatus,
            setClockStatus,
            activeRotation,
            setActiveRotation,
            isSettingsOpen,
            toggleSettings,
            userProfile,
            updateProfile,
            shiftDetails,
            startShift,
            endShift
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
