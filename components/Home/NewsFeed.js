'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, CheckCircle, Plus, Image as ImageIcon, Send, X } from 'lucide-react';
import { useNews } from '@/context/NewsContext';
import styles from '@/styles/home.module.css';

const NewsFeed = () => {
    const { posts, addPost, toggleLike, addComment } = useNews();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);
    const [activeCommentPostId, setActiveCommentPostId] = useState(null);
    const [commentInput, setCommentInput] = useState('');

    const handleCreatePost = (e) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

        addPost({
            content: newPostContent,
            image: newPostImage
        });

        setNewPostContent('');
        setNewPostImage(null);
        setShowCreateModal(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a fake local URL for the image
            const imageUrl = URL.createObjectURL(file);
            setNewPostImage(imageUrl);
        }
    };

    const handleCommentSubmit = (e, postId) => {
        e.preventDefault();
        if (!commentInput.trim()) return;
        addComment(postId, commentInput);
        setCommentInput('');
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <h2 className="section-title">Community Feed</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '80px' }}>
                {posts.map(post => (
                    <div key={post.id} className={styles.card} style={{ padding: '0' }}>
                        {/* Post Header */}
                        <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.2rem'
                            }}>
                                {post.avatar}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>{post.author}</h4>
                                    {post.isOfficial && <CheckCircle size={14} color="#0284c7" fill="#e0f2fe" />}
                                </div>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{post.role} • {post.time}</p>
                            </div>
                            <button style={{ background: 'none', border: 'none', color: '#94a3b8' }}>
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        {/* Post Content */}
                        <div style={{ padding: '0 1rem 1rem 1rem' }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: '#334155' }}>
                                {post.content}
                            </p>
                            {post.image && (
                                <div style={{ marginTop: '1rem', borderRadius: '12px', overflow: 'hidden' }}>
                                    <img src={post.image} alt="Post attachment" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                </div>
                            )}
                        </div>

                        {/* Post Actions */}
                        <div style={{
                            padding: '0.75rem 1rem',
                            borderTop: '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#64748b'
                        }}>
                            <button
                                onClick={() => toggleLike(post.id)}
                                style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', color: post.likes > 0 ? '#ef4444' : 'inherit', fontSize: '0.85rem', cursor: 'pointer' }}
                            >
                                <Heart size={18} fill={post.likes > 0 ? "currentColor" : "none"} /> {post.likes}
                            </button>
                            <button
                                onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                                style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', fontSize: '0.85rem', cursor: 'pointer' }}
                            >
                                <MessageCircle size={18} /> {post.comments.length}
                            </button>
                            <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', color: 'inherit', fontSize: '0.85rem', cursor: 'pointer' }}>
                                <Share2 size={18} /> Share
                            </button>
                        </div>

                        {/* Comments Section */}
                        {activeCommentPostId === post.id && (
                            <div style={{ background: '#f8fafc', padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                                    {post.comments.map(comment => (
                                        <div key={comment.id} style={{ fontSize: '0.9rem' }}>
                                            <span style={{ fontWeight: '600', color: '#334155' }}>{comment.author}: </span>
                                            <span style={{ color: '#475569' }}>{comment.text}</span>
                                        </div>
                                    ))}
                                    {post.comments.length === 0 && (
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>No comments yet. Be the first!</p>
                                    )}
                                </div>
                                <form onSubmit={(e) => handleCommentSubmit(e, post.id)} style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={commentInput}
                                        onChange={(e) => setCommentInput(e.target.value)}
                                        style={{ flex: 1, padding: '8px 12px', borderRadius: '100px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                                    />
                                    <button type="submit" style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        <Send size={16} />
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setShowCreateModal(true)}
                style={{
                    position: 'fixed', bottom: '90px', right: '20px',
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'var(--primary)', color: 'white',
                    border: 'none', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: 50
                }}
            >
                <Plus size={28} />
            </button>

            {/* Create Post Modal */}
            {showCreateModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)', zIndex: 100,
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
                }}>
                    <div style={{
                        background: 'white', width: '100%', maxWidth: '600px',
                        borderTopLeftRadius: '20px', borderTopRightRadius: '20px',
                        padding: '1.5rem', animation: 'slideUp 0.3s ease-out'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0 }}>Create Post</h3>
                            <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} color="#64748b" />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePost}>
                            <textarea
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                placeholder="Share a case, update, or thought..."
                                style={{
                                    width: '100%', minHeight: '120px', padding: '1rem',
                                    borderRadius: '12px', border: '1px solid #e2e8f0',
                                    fontSize: '1rem', marginBottom: '1rem', resize: 'none',
                                    fontFamily: 'inherit'
                                }}
                            />

                            {newPostImage && (
                                <div style={{ marginBottom: '1rem', position: 'relative' }}>
                                    <img src={newPostImage} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                                    <button
                                        type="button"
                                        onClick={() => setNewPostImage(null)}
                                        style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    color: 'var(--primary)', fontWeight: '600', cursor: 'pointer'
                                }}>
                                    <ImageIcon size={20} />
                                    Add Image
                                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                                </label>

                                <button
                                    type="submit"
                                    disabled={!newPostContent.trim()}
                                    style={{
                                        background: newPostContent.trim() ? 'var(--primary)' : '#cbd5e1',
                                        color: 'white', border: 'none', padding: '0.75rem 1.5rem',
                                        borderRadius: '100px', fontWeight: '600', cursor: newPostContent.trim() ? 'pointer' : 'not-allowed'
                                    }}
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <style jsx global>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default NewsFeed;
