'use client';

import { createContext, useContext, useState } from 'react';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: 'Dr. Emily Chen',
            role: 'Cardiologist',
            hospital: 'St. Peter\'s Hospital',
            avatar: '👩‍⚕️',
            time: '2h ago',
            content: 'Just wrapped up a fascinating case on Takotsubo Cardiomyopathy. The echo findings were classic! Remember to always consider emotional stressors in differential diagnosis. 🫀 #Cardiology #MedEd',
            likes: 42,
            comments: [
                { id: 101, author: 'Dr. Sarah Jenkins', text: 'Great catch! Did you see any apical ballooning?' },
                { id: 102, author: 'Dr. Mark Lee', text: 'Classic broken heart syndrome. Thanks for sharing.' }
            ],
            isOfficial: false
        },
        {
            id: 2,
            author: 'Dr. James Wilson',
            role: 'Neurologist',
            hospital: 'General Hospital',
            avatar: '👨‍⚕️',
            time: '4h ago',
            content: 'New guidelines for acute stroke management just dropped. Key takeaway: extended window for thrombectomy in select patients. Worth a read! 🧠',
            likes: 89,
            comments: [],
            isOfficial: false
        },
        {
            id: 3,
            author: 'CrossFlow Team',
            role: 'System Admin',
            hospital: 'CrossFlow HQ',
            avatar: '🏥',
            time: '1d ago',
            content: 'Welcome to the new CrossFlow dashboard! We\'ve added DocGPT and Scribe to help streamline your workflow. Let us know what you think! 🚀',
            likes: 156,
            comments: [],
            isOfficial: true
        }
    ]);

    const addPost = (newPost) => {
        const post = {
            id: Date.now(),
            author: 'Dr. Sarah Jenkins', // Current user (mock)
            role: 'Emergency Physician',
            hospital: 'St. Peter\'s Hospital',
            avatar: '👩‍⚕️',
            time: 'Just now',
            likes: 0,
            comments: [],
            isOfficial: false,
            ...newPost
        };
        setPosts(prev => [post, ...prev]);
    };

    const toggleLike = (postId) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                // Toggle logic: if liked (we don't track user likes per post in this simple MVP, just increment/decrement)
                // For simplicity, we'll just increment for now to show interaction
                return { ...post, likes: post.likes + 1 };
            }
            return post;
        }));
    };

    const addComment = (postId, commentText) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                const newComment = {
                    id: Date.now(),
                    author: 'Dr. Sarah Jenkins',
                    text: commentText
                };
                return { ...post, comments: [...post.comments, newComment] };
            }
            return post;
        }));
    };

    return (
        <NewsContext.Provider value={{ posts, addPost, toggleLike, addComment }}>
            {children}
        </NewsContext.Provider>
    );
};

export const useNews = () => useContext(NewsContext);
