import React from 'react';

interface WeekdayData {
    id: number;
    weekdays: string;
    startTime?: string;
    endTime?: string;
}

interface Course {
    id?: string;
    title?: string;
    description?: string;
    location?: string;
    instructor?: string;
    WeekdaySelection?: WeekdayData[];
    language?: string;
}

interface GoogleFormProps {
    formUrl: string;
    course?: Course;
    className?: string;
    buttonText?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'small';
}

export default function GoogleForm({
                                       formUrl,
                                       course = {},
                                       className = '',
                                       buttonText = 'Register for this Course',
                                       variant = 'primary'
                                   }: GoogleFormProps) {

    // Small variant just shows the icon
    if (variant === 'small') {
        return (
            <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center p-1 rounded-full bg-amber-200 hover:bg-amber-400 transition-colors ${className}`}
                aria-label={`Register for ${course.title || 'this course'}`}
                title={`Register for ${course.title || 'this course'}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                </svg>
            </a>
        );
    }

    const getButtonStyles = () => {
        switch (variant) {
            case 'primary':
                return 'bg-green-600 text-white hover:bg-green-700';
            case 'secondary':
                return 'bg-green-600 text-white hover:bg-green-700';
            case 'outline':
                return 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50';
            default:
                return 'bg-blue-600 text-white hover:bg-blue-700';
        }
    };

    return (
        <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center px-4 py-2 rounded-md transition-colors ${getButtonStyles()} ${className}`}
            aria-label={`Register for ${course.title || 'this course'}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
            </svg>
            {buttonText}
        </a>
    );
}