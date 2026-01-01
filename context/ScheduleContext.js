'use client';

import { createContext, useContext, useState } from 'react';

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Shift at General Hospital',
            date: '2025-12-06', // Today
            time: '07:00 - 19:00',
            type: 'work',
            description: 'Regular shift in ED'
        }
    ]);

    const addEvent = (event) => {
        const newEvent = {
            ...event,
            id: Date.now()
        };
        setEvents(prev => [...prev, newEvent]);
        return newEvent.id;
    };

    const removeEvent = (id) => {
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    return (
        <ScheduleContext.Provider value={{ events, addEvent, removeEvent }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export const useSchedule = () => useContext(ScheduleContext);
