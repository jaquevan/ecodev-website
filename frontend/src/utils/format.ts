// function to format a time string (HH:mm:ss) into a more readable format (e.g., "2:30 PM")
export function formatTime(timeStr: string): string {
    const date = new Date(`1970-01-01T${timeStr}`);
    return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    });
}