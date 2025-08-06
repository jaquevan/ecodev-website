'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {Components, createTheme, Theme, ThemeProvider} from '@mui/material/styles';
import Image from 'next/image';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {endOfMonth, format, getDay, isSameMonth, startOfMonth} from 'date-fns';
import {es} from 'date-fns/locale';
import Link from 'next/link';
import {formatTime} from '@/utils/format';
import {Course} from "@/types/course";
import {useLanguage} from '@/context/LanguageContext';

import GoogleForm from "@/components/calendarComponents/GoogleForm";
// import AddToCalendarButton from '@/components/calendarComponents/AddToCalendarButton';
import bubblesImage from '../../public/Bubbles.svg';

interface WeekdayData {
    id: number;
    weekdays: string;
    startTime: string;
    endTime: string;
}

interface CourseWithWeekdays extends Course {
    WeekdaySelection?: WeekdayData[];
    registration?: boolean;
    time?: string;
    endTime?: string;
}

interface CalendarProps {
    showWalkInOnly?: boolean;
}

interface ApiCourseData {
    id?: string | number;
    attributes?: {
        WeekdaySelection?: Array<{
            id: number;
            weekdays: string;
            startTime?: string;
            endTime?: string;
        }>;
        [key: string]: unknown;
    };
    [key: string]: unknown;
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

export default function Calendar({showWalkInOnly = false}: CalendarProps) {
    const {locale} = useLanguage();
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
            primary: {main: '#0F766E', contrastText: '#fff'},
            background: {default: '#fff'},
        },
        shape: {borderRadius: 16},
        typography: {fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif'},
        components: {
            MuiPickersDay: {
                styleOverrides: {
                    root: {
                        borderRadius: '50%',
                        '&.Mui-selected': {backgroundColor: '#0F766E', color: '#fff'},
                        '&:hover': {backgroundColor: 'rgba(15,118,110,0.1)'},
                    },
                    today: {
                        border: '2px solid #0F766E',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                        borderRadius: 16,
                        maxWidth: '100%'
                    }
                }
            },
            MuiPickersCalendarHeader: {
                styleOverrides: {
                    label: {
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#0F172A'
                    },
                    switchViewButton: {color: '#0F766E'},
                },
            },
            MuiPickersArrowSwitcher: {
                styleOverrides: {
                    button: {color: '#0F766E'}
                },
            },
            MuiDayCalendar: {
                styleOverrides: {
                    header: {
                        '& .MuiTypography-root': {
                            fontSize: '0.75rem'
                        }
                    },
                    weekContainer: {
                        margin: '0.1rem 0'
                    }
                }
            }
        } as Components<Omit<Theme, "components">> & CustomComponents,
    });

    const processCoursesData = (data: ApiCourseData[]): CourseWithWeekdays[] => {
        if (!Array.isArray(data)) return [];

        return data.map(course => {
            const properties = course.attributes || course;

            const baseObject: Partial<CourseWithWeekdays> = {
                id: typeof course.id === 'string' || typeof course.id === 'number' ?
                    String(course.id) : undefined
            };

            let weekdaySelection: WeekdayData[] | undefined = undefined;
            const rawWeekdays = properties.WeekdaySelection;

            if (Array.isArray(rawWeekdays)) {
                weekdaySelection = rawWeekdays
                    .filter(item => item && typeof item === 'object' && 'id' in item && 'weekdays' in item)
                    .map(item => ({
                        id: Number(item.id),
                        weekdays: String(item.weekdays),
                        startTime: String(item.startTime || ""),
                        endTime: String(item.endTime || "")
                    }));
            }

            return {
                ...baseObject,
                ...properties,
                WeekdaySelection: weekdaySelection && weekdaySelection.length > 0 ? weekdaySelection : undefined
            } as CourseWithWeekdays;
        });
    };

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

                console.log('API URLs:', { dateSpecificUrl, recurringUrl });

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

                console.log('API Response - Date Specific:', dateSpecificJson);
                console.log('API Response - Recurring:', recurringJson);

                const processedDateSpecific = processCoursesData(dateSpecificJson.data);
                const allCourses = processCoursesData(recurringJson.data);

                console.log('Processed - Date Specific:', processedDateSpecific);
                console.log('Processed - All Courses:', allCourses);

                const recurring = allCourses.filter(course =>
                    course.WeekdaySelection &&
                    Array.isArray(course.WeekdaySelection) &&
                    course.WeekdaySelection.length > 0
                );

                console.log('Filtered recurring courses:', recurring);

                const filteredDateSpecific = showWalkInOnly
                    ? processedDateSpecific.filter(course => course.registration === false)
                    : processedDateSpecific;

                const filteredRecurring = showWalkInOnly
                    ? recurring.filter(course => course.registration === false)
                    : recurring;

                console.log('Final filtered courses:', {
                    dateSpecific: filteredDateSpecific,
                    recurring: filteredRecurring
                });

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

    useEffect(() => {
        console.log('Date specific courses:', dateSpecificCourses);
        console.log('Recurring courses:', recurringCourses);
    }, [dateSpecificCourses, recurringCourses]);

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

    const formatDateWithLocale = (date: Date | null) => {
        if (!date) return '';
        return format(date, 'MMMM d, yyyy', {locale: isSpanish ? es : undefined});
    };

    // Helper function to get the appropriate time for a weekday course
    const getWeekdayTimes = (course: CourseWithWeekdays) => {
        if (!selectedDate || !course.WeekdaySelection) return { startTime: "", endTime: "" };

        const dayIndex = getDay(selectedDate);
        const matchingWeekday = course.WeekdaySelection.find(day => {
            const dayName = day.weekdays.toLowerCase();
            return weekdayMap[dayIndex]?.includes(dayName);
        });

        return {
            startTime: matchingWeekday?.startTime || course.time || "",
            endTime: matchingWeekday?.endTime || course.endTime || ""
        };
    };

    return (
        <div className="relative w-full max-w-full mx-auto">
            {/* Bubble SVG - positioned outside the main container to bleed over */}
            <Image
                src={bubblesImage}
                alt={isSpanish ? "Burbujas decorativas" : "Decorative bubbles"}
                className="absolute -top-16 sm:-top-20 -right-4 sm:-right-8 w-24 sm:w-28 md:w-36 lg:w-48 h-auto opacity-70 pointer-events-none z-50"
                priority
            />

            <div className="relative bg-gradient-to-r from-orange-300 via-orange-200 to-orange-50 p-3 sm:p-4 md:p-6 lg:p-8 rounded-3xl w-full max-w-full mx-auto">
                <div className="relative bg-white rounded-2xl shadow-lg mx-auto p-3 sm:p-4 md:p-6 z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                        {isSpanish ? 'Ver Cursos' : 'View Courses'}
                    </h3>

                    <div className="flex flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0">
                        <div className="flex justify-center w-full xl:w-3/5">
                            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-full mx-auto overflow-hidden">
                                <ThemeProvider theme={calendarTheme}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}
                                                          adapterLocale={isSpanish ? es : undefined}>
                                        <StaticDatePicker
                                            displayStaticWrapperAs="desktop"
                                            value={selectedDate}
                                            onChange={d => setSelectedDate(d)}
                                            slotProps={{
                                                actionBar: {hidden: true},
                                                layout: {
                                                    sx: {
                                                        '& .MuiDayCalendar-root': {
                                                            width: '100%',
                                                            maxHeight: '290px'
                                                        }
                                                    }
                                                }
                                            }}
                                            sx={{
                                                width: '100%',
                                                '& .MuiPickersCalendar-root': {
                                                    maxWidth: '100%'
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </ThemeProvider>
                            </div>
                        </div>

                        <div className="hidden xl:block xl:w-px xl:h-auto bg-gray-200"></div>
                        <div className="block xl:hidden w-full h-px bg-gray-200"></div>

                        <div className="w-full xl:w-2/5 z-20 relative flex flex-col h-full">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                {formatDateWithLocale(selectedDate)}
                            </h3>
                            <p className="text-small text-gray-600 mb-3 sm:mb-4">
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

                            <div className="flex-grow min-h-[290px] flex flex-col">
                                {loading ? (
                                    <div className="flex flex-1 justify-center items-center py-5">
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
                                    <div className="flex flex-1 items-center justify-center text-gray-400 py-6">
                                        {isSpanish ? 'No hay cursos programados para esta fecha' : 'No courses scheduled for this date'}
                                    </div>
                                ) : (
                                    <ul className="space-y-1.5 overflow-y-auto max-h-[290px] pr-1 pb-1 flex-grow">
                                        {todayCourses.map((course, idx) => {
                                            const { startTime, endTime } = course.WeekdaySelection ?
                                                getWeekdayTimes(course) :
                                                { startTime: course.time || "", endTime: course.endTime || "" };

                                            return (
                                                <li
                                                    key={course.id || idx}
                                                    className="bg-teal-50 rounded-lg p-1.5 transition-all hover:shadow-md cursor-pointer border border-teal-100"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="flex-grow min-w-0 pr-1">
                                                            <Link
                                                                href={`/course/${course.slug}`}
                                                                className="block w-full"
                                                            >
                                                                <h4 className="font-medium text-xs text-gray-800 leading-tight mb-0.5">
                                                                    {course.title}
                                                                </h4>

                                                                {(startTime || endTime) && (
                                                                    <div className="flex items-center">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-2.5 w-2.5 text-gray-500 mr-0.5 flex-shrink-0"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                            />
                                                                        </svg>
                                                                        <span className="text-[10px] text-gray-500">
                                            {startTime && formatTime(startTime)}
                                                                            {startTime && endTime && ' – '}
                                                                            {endTime && formatTime(endTime)}
                                        </span>
                                                                    </div>
                                                                )}
                                                            </Link>
                                                        </div>

                                                        <GoogleForm
                                                            formUrl="https://docs.google.com/forms/d/e/1FAIpQLSfuRPVdXxNS1yqNMoJ-BNMEY7mPkWQx1Q4QyDRzKNaMawRVcA/viewform?usp=dialog"
                                                            course={course}
                                                            variant="small"
                                                            className="flex-shrink-0 ml-1"
                                                        />
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>

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
        </div>
    );
}