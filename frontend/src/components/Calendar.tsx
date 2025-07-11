'use client';

import { useState, useEffect, useMemo } from 'react';
import { Theme, Components, ThemeProvider, createTheme } from '@mui/material/styles';
import Image from 'next/image';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, startOfMonth, endOfMonth, isSameMonth, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { formatTime } from '@/utils/format';
import { Course } from "@/types/course";
import { useLanguage } from '@/context/LanguageContext';
import AddToCalendarButton from '@/components/calendarComponents/AddToCalendarButton';

import bubblesImage from '../../public/Bubbles.svg';

interface WeekdayData {
    id: number;
    weekdays: string;
}

interface CourseWithWeekdays extends Course {
    WeekdaySelection?: WeekdayData[];
    registration?: boolean;
}

interface CalendarProps {
    showWalkInOnly?: boolean;
}

const weekdayMap: Record<number, string[]> = {
    0: ['sunday', 'domingo'],
    1: ['monday', 'lunes'],
    2: ['tuesday', 'martes'],
    3: ['wednesday', 'miércoles', 'miercoles'],
    4: ['thursday', 'jueves'],
    5: ['friday', 'viernes'],
    6: ['saturday', 'sábado', 'sabado']
};

export default function Calendar({ showWalkInOnly = false }: CalendarProps) {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [dateSpecificCourses, setDateSpecificCourses] = useState<CourseWithWeekdays[]>([]);
    const [recurringCourses, setRecurringCourses] = useState<CourseWithWeekdays[]>([]);
    const [loading, setLoading] = useState(false);
    const [lastFetchedMonth, setLastFetchedMonth] = useState<Date | null>(null);
    const [lastFetchedLocale, setLastFetchedLocale] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

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

    useEffect(() => {
        if (!selectedDate) return;

        if (lastFetchedMonth && lastFetchedLocale &&
            isSameMonth(selectedDate, lastFetchedMonth) &&
            locale === lastFetchedLocale) return;

        setLoading(true);
        setFetchError(null);

        const fetchAllCourses = async () => {
            try {
                const start = format(startOfMonth(selectedDate), 'yyyy-MM-dd');
                const end = format(endOfMonth(selectedDate), 'yyyy-MM-dd');

                const dateSpecificUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/courses?locale=${locale}&filters[date][$gte]=${start}&filters[date][$lte]=${end}&populate=*`;
                const recurringUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/courses?locale=${locale}&populate=*`;

                const [dateSpecificRes, recurringRes] = await Promise.all([
                    fetch(dateSpecificUrl),
                    fetch(recurringUrl)
                ]);

                if (!dateSpecificRes.ok) {
                    throw new Error(`Date-specific fetch failed: ${dateSpecificRes.status}`);
                }

                if (!recurringRes.ok) {
                    throw new Error(`Recurring fetch failed: ${recurringRes.status}`);
                }

                const [dateSpecificJson, recurringJson] = await Promise.all([
                    dateSpecificRes.json(),
                    recurringRes.json()
                ]);

                const processedDateSpecific = processCoursesData(dateSpecificJson.data);
                const allCourses = processCoursesData(recurringJson.data);
                const recurring = allCourses.filter(course =>
                    course.WeekdaySelection &&
                    Array.isArray(course.WeekdaySelection) &&
                    course.WeekdaySelection.length > 0
                );

                const filteredDateSpecific = showWalkInOnly
                    ? processedDateSpecific.filter(course => course.registration === false)
                    : processedDateSpecific;

                const filteredRecurring = showWalkInOnly
                    ? recurring.filter(course => course.registration === false)
                    : recurring;

                setDateSpecificCourses(filteredDateSpecific);
                setRecurringCourses(filteredRecurring);
                setLastFetchedMonth(selectedDate);
                setLastFetchedLocale(locale);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setDateSpecificCourses([]);
                setRecurringCourses([]);
                setFetchError("Failed to load courses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllCourses();
    }, [selectedDate, lastFetchedMonth, lastFetchedLocale, showWalkInOnly, locale]);

    const processCoursesData = (data: any[]): CourseWithWeekdays[] => {
        if (!Array.isArray(data)) return [];

        return data.map(course => {
            if (!course.attributes) return course as CourseWithWeekdays;

            let weekdaySelection: WeekdayData[] | undefined = undefined;

            const rawWeekdays = (course.attributes as any).WeekdaySelection;
            if (Array.isArray(rawWeekdays)) {
                weekdaySelection = rawWeekdays
                    .filter(item => item && item.id && item.weekdays)
                    .map(item => ({
                        id: item.id,
                        weekdays: item.weekdays
                    }));
            }

            return {
                id: course.id as number,
                ...(course.attributes as object),
                WeekdaySelection: weekdaySelection && weekdaySelection.length > 0 ? weekdaySelection : undefined
            };
        });
    };

    const formatWeekdayNames = (course: CourseWithWeekdays): string => {
        if (!course.WeekdaySelection || !Array.isArray(course.WeekdaySelection)) return '';

        const weekdayNames = course.WeekdaySelection.map(day => {
            const dayName = day.weekdays.toLowerCase();
            return dayName.charAt(0).toUpperCase() + dayName.slice(1);
        });

        return weekdayNames.join(', ');
    };

    const todayCourses = useMemo(() => {
        if (!selectedDate) return [];

        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const dayIndex = getDay(selectedDate);

        const specificCourses = dateSpecificCourses.filter(course => {
            if (!course.date) return false;

            const courseDate = course.date.includes('T')
                ? course.date.split('T')[0]
                : course.date;

            return courseDate === dateStr;
        });

        const specificCourseIds = new Set(specificCourses.map(c => c.id));

        const weekdayCourses = recurringCourses.filter(course => {
            if (specificCourseIds.has(course.id)) return false;

            return course.WeekdaySelection?.some(day => {
                if (!day.weekdays) return false;

                const dayName = day.weekdays.toLowerCase();
                return weekdayMap[dayIndex]?.includes(dayName);
            }) ?? false;
        });

        return [...specificCourses, ...weekdayCourses];
    }, [selectedDate, dateSpecificCourses, recurringCourses]);

    const formatDate = (date: string | Date | undefined) => {
        if (!date) return '';
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return format(dateObj, 'MMM d, yyyy');
    };

    const formatDateWithLocale = (date: Date | null) => {
        if (!date) return '';
        return format(date, 'MMMM d, yyyy', { locale: isSpanish ? es : undefined });
    };

    return (
        <div className="relative bg-gradient-to-r from-orange-300 via-orange-200 to-orange-50 p-3 sm:p-4 md:p-6 lg:p-8 rounded-3xl w-full max-w-full mx-auto overflow-visible">
            <Image
                src={bubblesImage}
                alt={isSpanish ? "Burbujas decorativas" : "Decorative bubbles"}
                className="absolute -top-20 -right-8 w-28 sm:w-36 md:w-48 h-auto opacity-70 pointer-events-none"
                style={{ zIndex: 999 }}
                priority
            />

            <div className="relative bg-white rounded-2xl shadow-lg mx-auto p-3 sm:p-4 md:p-6 z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                    {isSpanish ? 'Ver Actividades de EcoDev' : 'View EcoDev Activities'}
                </h3>

                <div className="flex flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0">
                    <div className="flex justify-center w-full xl:w-3/5">
                        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-full mx-auto">
                            <ThemeProvider theme={calendarTheme}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={isSpanish ? es : undefined}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        value={selectedDate}
                                        onChange={d => setSelectedDate(d)}
                                        slotProps={{ actionBar: { hidden: true } }}
                                    />
                                </LocalizationProvider>
                            </ThemeProvider>
                        </div>
                    </div>

                    <div className="hidden xl:block xl:w-px xl:h-auto bg-gray-200"></div>
                    <div className="block xl:hidden w-full h-px bg-gray-200"></div>

                    <div className="w-full xl:w-2/5 z-20 relative">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                            {formatDateWithLocale(selectedDate)}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2 sm:mb-3">
                            {isSpanish ? 'Programas para esta fecha:' : 'Programs happening on this date:'}
                        </p>

                        {fetchError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                                <p>{fetchError}</p>
                                <button
                                    onClick={() => {
                                        setLastFetchedMonth(null);
                                        setLastFetchedLocale(null);
                                    }}
                                    className="text-sm font-medium text-red-600 underline mt-1"
                                >
                                    {isSpanish ? 'Intentar nuevamente' : 'Try again'}
                                </button>
                            </div>
                        )}

                        {loading ? (
                            <div className="flex flex-1 justify-center items-center py-5 sm:py-8">
                                <svg
                                    className="animate-spin h-6 w-6 text-teal-600"
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
                            <div className="flex flex-1 items-center justify-center text-gray-400 py-6 sm:py-8">
                                {isSpanish ? 'No hay cursos programados para esta fecha' : 'No courses scheduled for this date'}
                            </div>
                        ) : (
                            <ul className="space-y-2 overflow-y-auto max-h-60 sm:max-h-72 lg:max-h-[350px] pr-1 pb-1">
                                {todayCourses.map((course, idx) => {
                                    const bg = idx % 2 === 0 ? 'bg-orange-50' : 'bg-blue-50';
                                    const border = idx % 2 === 0 ? 'border-orange-200' : 'border-blue-200';
                                    const isRecurring = course.WeekdaySelection && course.WeekdaySelection.length > 0;

                                    return (
                                        <li
                                            key={course.id || idx}
                                            className={`${bg} rounded-lg p-2 transition-all hover:shadow-md cursor-pointer border ${border}`}
                                        >
                                            <div className="flex justify-between">
                                                <Link
                                                    href={`/course/${course.slug}`}
                                                    className="block flex-grow"
                                                >
                                                    <div className="course-card">
                                                        <h3>{course.title}</h3>
                                                        <p>{formatDate(course.date)}</p>

                                                        {(course.time || course.endTime) && (
                                                            <div className="flex items-center text-xs text-gray-700 mb-1">
                                                                <svg className="w-3 h-3 mr-1 text-gray-500" fill="none"
                                                                     stroke="currentColor" viewBox="0 0 24 24"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                                </svg>
                                                                <span className="text-xs text-gray-600">
                                                                    {formatTime(course.time)}
                                                                    {course.time && course.endTime && ' – '}
                                                                    {formatTime(course.endTime)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>

                                                <div className="ml-2">
                                                    <AddToCalendarButton
                                                        event={{
                                                            title: course.title || "",
                                                            description: course.desc || "",
                                                            location: course.location || "",
                                                            startDate: course.date || new Date(),
                                                            endDate: course.endDate || course.date || new Date(),
                                                            time: course.time || "",
                                                            endTime: course.endTime || "",
                                                            weekdays: course.WeekdaySelection || []
                                                        }}
                                                        variant="small"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <div className="mt-4">
                            <Link
                                href="/course"
                                className="inline-block bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded-md transition"
                            >
                                {isSpanish ? 'Ver Todos Los Cursos' : 'Browse All Courses'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}