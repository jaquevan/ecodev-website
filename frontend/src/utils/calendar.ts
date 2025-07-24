interface CalendarEvent {
    title: string;
    description: string;
    startDate: Date | string;
    endDate: Date | string;
    location?: string;
}

export function createGoogleCalendarUrl(event: CalendarEvent): string {
    // Ensure dates are in proper format
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');

    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);

    let url = 'https://calendar.google.com/calendar/render';
    url += '?action=TEMPLATE';
    url += `&text=${encodeURIComponent(event.title)}`;
    url += `&dates=${formattedStart}/${formattedEnd}`;
    url += `&details=${encodeURIComponent(event.description)}`;

    if (event.location) {
        url += `&location=${encodeURIComponent(event.location)}`;
    }

    return url;
}