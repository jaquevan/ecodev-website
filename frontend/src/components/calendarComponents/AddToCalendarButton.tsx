'use client'

import React from 'react';
import { CalendarMonth } from '@mui/icons-material';

interface WeekdaySelection {
    weekdays: string;
}

interface CalendarEvent {
    title: string;
    description: string;
    startDate: string | Date;
    endDate: string | Date;
    location?: string;
    time?: string; // HH:mm format
    endTime?: string; // HH:mm format
    weekdays?: WeekdaySelection[];
}

interface AddToCalendarButtonProps {
    event?: CalendarEvent;
    className?: string;
    variant?: 'default' | 'small';
}

export default function AddToCalendarButton({
                                                event,
                                                className = '',
                                                variant = 'default'
                                            }: AddToCalendarButtonProps) {
    // If event is undefined, provide a default object with current date
    const defaultEvent: CalendarEvent = {
        title: 'Event',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
    };

    // Use the provided event or fall back to the default
    const safeEvent = event || defaultEvent;

    // Convert weekday strings to Google Calendar format (MO, TU, WE, etc.)
    const getRecurrenceRule = (weekdays: WeekdaySelection[] | undefined) => {
        if (!weekdays || weekdays.length === 0) return '';

        const dayMapping: Record<string, string> = {
            'Monday': 'MO',
            'Tuesday': 'TU',
            'Wednesday': 'WE',
            'Thursday': 'TH',
            'Friday': 'FR',
            'Saturday': 'SA',
            'Sunday': 'SU',
            // Spanish day names
            'Lunes': 'MO',
            'Martes': 'TU',
            'Miércoles': 'WE',
            'Miercoles': 'WE',
            'Jueves': 'TH',
            'Viernes': 'FR',
            'Sábado': 'SA',
            'Sabado': 'SA',
            'Domingo': 'SU'
        };

        const days = weekdays.map(day => {
            const dayName = day.weekdays.trim();
            return dayMapping[dayName] || '';
        }).filter(Boolean);

        if (days.length === 0) return '';

        return `&recur=RRULE:FREQ=WEEKLY;BYDAY=${days.join(',')}`;
    };

    // Format date with time if available
    const formatDateTime = (date: string | Date, time?: string) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        if (!isNaN(dateObj.getTime())) {
            // If time is provided, set it on the date object
            if (time) {
                const [hours, minutes] = time.split(':').map(Number);
                dateObj.setHours(hours || 0, minutes || 0, 0);
            }

            // Format for Google Calendar (YYYYMMDDTHHMMSSZ)
            return dateObj.toISOString().replace(/-|:|\.\d+/g, '');
        }

        // Return current time as fallback
        return new Date().toISOString().replace(/-|:|\.\d+/g, '');
    };

    const startDateTime = formatDateTime(safeEvent.startDate, safeEvent.time);
    const endDateTime = formatDateTime(safeEvent.endDate, safeEvent.endTime);
    const recurrenceRule = getRecurrenceRule(safeEvent.weekdays);

    let calendarUrl = 'https://calendar.google.com/calendar/render';
    calendarUrl += '?action=TEMPLATE';
    calendarUrl += `&text=${encodeURIComponent(safeEvent.title || 'Event')}`;
    calendarUrl += `&dates=${startDateTime}/${endDateTime}`;
    calendarUrl += `&details=${encodeURIComponent(safeEvent.description || '')}`;

    if (safeEvent.location) {
        calendarUrl += `&location=${encodeURIComponent(safeEvent.location)}`;
    }

    // Add recurrence rule if weekdays are specified
    calendarUrl += recurrenceRule;

    // Adjust styling based on variant
    const buttonClasses = variant === 'small'
        ? 'inline-flex items-center gap-1 text-white bg-[#00AF98] hover:bg-[#009484] px-2 py-1 rounded text-xs font-medium transition-colors shadow-sm'
        : 'inline-flex items-center gap-2 text-white bg-[#00AF98] hover:bg-[#009484] px-4 py-2 rounded-md font-medium transition-colors shadow-sm';

    return (
        <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClasses} ${className}`}
            title="Add to Google Calendar"
        >
            <CalendarMonth fontSize={variant === 'small' ? 'small' : 'medium'} />
            {variant === 'small' ? '' : 'Add to Google Calendar'}
        </a>
    );
}