'use client';

import { useState, useEffect, useMemo } from 'react';
import {Theme, Components, ThemeProvider, createTheme } from '@mui/material/styles';
import Image from 'next/image';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, startOfMonth, endOfMonth, isSameMonth } from 'date-fns';
import Link from 'next/link';
import { formatTime } from '@/utils/format';
import {Course} from "@/types/course";


import bubblesImage from '../../public/Bubbles.svg';

type StrapiCourse = {
    id: number;
    attributes?: {
        title: string;
        description: string;
        date: string;
        startTime?: string;
        endTime?: string;
        slug?: string;
        [key: string]: unknown;
    };
};

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [monthCourses, setMonthCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [lastFetchedMonth, setLastFetchedMonth] = useState<Date | null>(null);

    interface CustomComponents {
        MuiPickersDay: {
            styleOverrides: {
                root: React.CSSProperties;
                today: React.CSSProperties;
            };
        };
        MuiPickersCalendarHeader: {
            styleOverrides: {
                label: React.CSSProperties;
                switchViewButton: React.CSSProperties;
            };
        };
        MuiPickersArrowSwitcher: {
            styleOverrides: {
                button: React.CSSProperties;
            };
        };
    }

    const calendarTheme = createTheme({
        palette: {
            primary: { main: '#0F766E', contrastText: '#fff' },
            background: { default: '#fff' },
        },
        shape: { borderRadius: 16 },
        typography: { fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif' },
        components: {
            MuiPickersDay: {
                styleOverrides: {
                    root: {
                        borderRadius: '50%',
                        '&.Mui-selected': { backgroundColor: '#0F766E', color: '#fff' },
                        '&:hover': { backgroundColor: 'rgba(15,118,110,0.1)' },
                    },
                    today: {
                        border: '2px solid #0F766E',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: { boxShadow: 'none', borderRadius: 16 }
                }
            },
            MuiPickersCalendarHeader: {
                styleOverrides: {
                    label: { fontWeight: 700, fontSize: '1.15rem', color: '#0F172A' },
                    switchViewButton: { color: '#0F766E' },
                },
            },
            MuiPickersArrowSwitcher: {
                styleOverrides: {
                    button: { color: '#0F766E' }
                },
            },
        } as Components<Omit<Theme, "components">> & CustomComponents,
    });

    // Fetch all courses in the current month once when the month changes
    useEffect(() => {
        if (!selectedDate) return;
        if (lastFetchedMonth && isSameMonth(selectedDate, lastFetchedMonth)) return;

        setLoading(true);
        const fetchCourses = async () => {
            try {
                const start = format(startOfMonth(selectedDate), 'yyyy-MM-dd');
                const end = format(endOfMonth(selectedDate), 'yyyy-MM-dd');

                console.log(`Fetching courses from ${start} to ${end}`);

                const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/courses?filters[date][$gte]=${start}&filters[date][$lte]=${end}&populate=*`;
                console.log('API URL:', apiUrl);

                const res = await fetch(apiUrl);

                if (!res.ok) {
                    console.error('Fetch error:', res.status, res.statusText);
                    throw new Error(`Fetch failed: ${res.status}`);
                }

                const json = await res.json();
                console.log('Fetched data:', json);

                const arr = Array.isArray(json.data)
                    ? json.data.map((c: StrapiCourse) => {
                        if (c.attributes) {
                            return {
                                id: c.id,
                                ...c.attributes
                            };
                        }
                        return c as unknown as Course;
                    })
                    : [];

                console.log('Processed courses:', arr);
                setMonthCourses(arr as Course[]);
                setLastFetchedMonth(selectedDate);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setMonthCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [selectedDate, lastFetchedMonth]);

    // Filter the fetched month's courses down to the selected day
    const todayCourses = useMemo(() => {
        if (!selectedDate) return [];

        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        console.log('Looking for courses on date:', dateStr);

        // Handle different date formats that might be coming from the API
        const filtered = monthCourses.filter(course => {
            // Compare only the date part if the API returns a full ISO string
            const courseDate = course.date.includes('T')
                ? course.date.split('T')[0]
                : course.date;

            console.log(`Comparing course date "${courseDate}" with "${dateStr}"`);
            return courseDate === dateStr;
        });

        console.log('Filtered courses:', filtered);
        return filtered;
    }, [selectedDate, monthCourses]);

    return (
        // OUTER GRADIENT WRAPPER
        <div className="relative bg-gradient-to-r from-orange-300 via-orange-200 to-orange-50 p-4 sm:p-8 rounded-3xl overflow-visible">
            <Image
                src={bubblesImage}
                alt="Decorative bubbles"
                className="absolute -top-30 -right-12 w-36 sm:w-48 h-auto opacity-70 z-10 pointer-events-none"
                priority
            />

            {/* INNER WHITE CARD */}
            <div className="relative z-0 bg-white rounded-2xl shadow-lg max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Activities</h2>

                {/* Responsive layout - stack on small/medium screens, side-by-side on large */}
                <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
                    {/* CALENDAR SECTION */}
                    <div className="flex justify-center lg:w-3/5 w-full">
                        <ThemeProvider theme={calendarTheme}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    displayStaticWrapperAs="desktop"
                                    value={selectedDate}
                                    onChange={d => setSelectedDate(d)}
                                    slotProps={{ actionBar: { hidden: true } }}
                                />
                            </LocalizationProvider>
                        </ThemeProvider>
                    </div>

                    {/* DIVIDER - vertical on large screens, horizontal on small/medium */}
                    <div className="hidden lg:block lg:w-px lg:h-auto bg-gray-200"></div>
                    <div className="block lg:hidden w-full h-px bg-gray-200"></div>

                    {/* EVENTS SECTION */}
                    <div className="w-full lg:w-2/5">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
                        </h3>
                        <p className="text-xs text-gray-600 mb-4">
                            Programs happening on this date:
                        </p>

                        {/* Loading state */}
                        {loading ? (
                            <div className="flex flex-1 justify-center items-center py-6 sm:py-12">
                                <svg
                                    className="animate-spin h-8 w-8 text-teal-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            </div>
                        ) : todayCourses.length === 0 ? (
                            // No courses
                            <div className="flex flex-1 items-center justify-center text-gray-400 py-8">
                                No courses scheduled for this date
                            </div>
                        ) : (
                            // Event list
                            <ul className="space-y-3 overflow-y-auto max-h-60 lg:max-h-96 pr-2">
                                {todayCourses.map((course, idx) => {
                                    const bg = idx % 2 === 0 ? 'bg-orange-100' : 'bg-blue-50';

                                    return (
                                        <li
                                            key={course.id}
                                            className={`${bg} rounded-xl p-3`}
                                        >
                                            <div className="font-semibold text-gray-900 text-lg mb-1">
                                                {course.title}
                                            </div>

                                            {(course.time || course.endTime) && (
                                                <div className="flex items-center text-sm text-gray-700 mb-2">
                                                    {/*clock icon*/}
                                                    <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-xs text-gray-600">
                                                {formatTime(course.time)}
                                                        {course.time && course.endTime && ' – '}
                                                        {formatTime(course.endTime)}
                                            </span>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        {/* VIEW ALL COURSES CTA */}
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center">

                            <Link
                                href="/course"
                                className="inline-block bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded-md transition"
                            >
                                Browse All Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}