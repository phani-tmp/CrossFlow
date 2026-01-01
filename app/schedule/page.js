'use client';

import { useState } from 'react';
import { useSchedule } from '@/context/ScheduleContext';
import { ArrowLeft, Plus, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SchedulePage() {
    const { events, addEvent } = useSchedule();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', time: '', description: '' });

    // Group events by date
    const eventsByDate = events.reduce((acc, event) => {
        if (!acc[event.date]) acc[event.date] = [];
        acc[event.date].push(event);
        return acc;
    }, {});

    const handleAddEvent = (e) => {
        e.preventDefault();
        addEvent({
            ...newEvent,
            date: selectedDate,
            type: 'personal'
        });
        setShowAddModal(false);
        setNewEvent({ title: '', time: '', description: '' });
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        const daysArray = [];
        // Add empty slots for days before the first of the month
        for (let i = 0; i < firstDay; i++) {
            daysArray.push(null);
        }
        // Add actual days
        for (let i = 1; i <= days; i++) {
            daysArray.push(new Date(year, month, i));
        }
        return daysArray;
    };

    const calendarDays = getDaysInMonth(currentMonth);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Format date for comparison: YYYY-MM-DD
    const formatDate = (date) => {
        if (!date) return null;
        return date.toISOString().split('T')[0];
    };

    return (
        <div style={{ paddingBottom: '80px', background: 'var(--gray-50)', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{
                padding: '1rem',
                paddingTop: '3rem',
                background: 'white',
                borderBottom: '1px solid var(--gray-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/" style={{ color: 'var(--gray-800)' }}><ArrowLeft size={24} /></Link>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-800)', margin: 0 }}>My Schedule</h1>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    style={{
                        background: 'var(--primary)', color: 'white', border: 'none',
                        width: '36px', height: '36px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Calendar Controls */}
            <div style={{ padding: '1rem', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <button onClick={prevMonth} style={{ background: 'none', border: 'none', padding: '8px' }}>
                        <ChevronLeft size={24} color="var(--gray-600)" />
                    </button>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={nextMonth} style={{ background: 'none', border: 'none', padding: '8px' }}>
                        <ChevronRight size={24} color="var(--gray-600)" />
                    </button>
                </div>

                {/* Weekday Headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '0.5rem' }}>
                    {weekDays.map(day => (
                        <span key={day} style={{ fontSize: '0.8rem', color: 'var(--gray-400)', fontWeight: '600' }}>{day}</span>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                    {calendarDays.map((date, index) => {
                        if (!date) return <div key={`empty-${index}`} />;

                        const dateStr = formatDate(date);
                        const isSelected = selectedDate === dateStr;
                        const isToday = dateStr === new Date().toISOString().split('T')[0];
                        const hasEvents = eventsByDate[dateStr]?.length > 0;

                        return (
                            <button
                                key={dateStr}
                                onClick={() => setSelectedDate(dateStr)}
                                style={{
                                    aspectRatio: '1/1',
                                    borderRadius: '50%',
                                    border: isToday ? '1px solid var(--primary)' : 'none',
                                    background: isSelected ? 'var(--primary)' : 'transparent',
                                    color: isSelected ? 'white' : 'var(--gray-800)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                            >
                                <span style={{ fontSize: '0.9rem', fontWeight: isSelected || isToday ? '600' : '400' }}>
                                    {date.getDate()}
                                </span>
                                {hasEvents && (
                                    <div style={{
                                        width: '4px', height: '4px', borderRadius: '50%',
                                        background: isSelected ? 'white' : 'var(--danger)',
                                        marginTop: '2px'
                                    }} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Selected Date Events */}
            <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--gray-500)', margin: '0 0 1rem 0' }}>
                    {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>

                {eventsByDate[selectedDate]?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {eventsByDate[selectedDate].map(event => (
                            <div key={event.id} style={{
                                background: 'white', padding: '1rem', borderRadius: '12px',
                                borderLeft: `4px solid ${event.type === 'work' ? 'var(--primary)' : '#ec4899'}`,
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>{event.title}</h3>
                                    <span style={{
                                        fontSize: '0.75rem', padding: '2px 8px', borderRadius: '100px',
                                        background: event.type === 'work' ? '#eff6ff' : '#fce7f3',
                                        color: event.type === 'work' ? 'var(--primary)' : '#be185d'
                                    }}>
                                        {event.type === 'work' ? 'Work' : 'Personal'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                                    <Clock size={14} />
                                    <span>{event.time}</span>
                                </div>
                                {event.description && (
                                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                                        {event.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-400)' }}>
                        <CalendarIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <p>No events scheduled for this day.</p>
                    </div>
                )}
            </div>

            {/* Add Event Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
                }}>
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', width: '100%', maxWidth: '400px' }}>
                        <h3 style={{ marginTop: 0 }}>Add Event</h3>
                        <form onSubmit={handleAddEvent}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Title</label>
                                <input
                                    type="text" required
                                    value={newEvent.title}
                                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-300)' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Time</label>
                                <input
                                    type="text" placeholder="e.g. 14:00" required
                                    value={newEvent.time}
                                    onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-300)' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Description</label>
                                <textarea
                                    value={newEvent.description}
                                    onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-300)' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: 'var(--gray-200)' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white' }}
                                >
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
