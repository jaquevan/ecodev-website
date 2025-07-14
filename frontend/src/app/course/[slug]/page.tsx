'use client'

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { fetchCourseBySlug, mediaUrl } from '@/lib/strapi';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Loading from '@/components/Loading';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types/course';
import { formatTime } from '@/utils/format';
import { motion } from 'framer-motion';
import AddToCalendarButton from '@/components/calendarComponents/AddToCalendarButton';


import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircleIcon from '@mui/icons-material/Circle';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';

function extractStrapiMediaUrl(media: unknown): string | undefined {
    if (!media) return undefined;

    if (typeof media === 'object' && media !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const photoObj = media as Record<string, any>;

        // Check for Strapi media pattern with data.attributes structure
        if (photoObj.data) {
            if (Array.isArray(photoObj.data) && photoObj.data[0]?.attributes?.url) {
                return photoObj.data[0].attributes.url;
            }

            if (photoObj.data.attributes?.url) {
                return photoObj.data.attributes.url;
            }

            // Check for formats (medium size is preferred)
            if (photoObj.data.attributes?.formats?.medium?.url) {
                return photoObj.data.attributes.formats.medium.url;
            }
        }

        // Handle direct URL cases
        if (photoObj.url) {
            return photoObj.url;
        }

        // Handle array of files (for StrapiFile[])
        if (Array.isArray(media) && media[0]?.url) {
            return media[0].url;
        }
    }

    return undefined;
}

export default function CoursePage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const { locale } = useLanguage();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadCourse() {
            if (!slug) return;

            setLoading(true);
            try {
                let data = await fetchCourseBySlug(slug, locale);
                if (!data && locale === 'es') {
                    data = await fetchCourseBySlug(slug, 'en');
                }

                if (mounted) {
                    setCourse(data ?? null);
                }
            } catch {
                if (mounted) setCourse(null);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadCourse();
        return () => {
            mounted = false;
        };
    }, [slug, locale]);

    if (loading) return <LoadingView />;
    if (!course) return <CourseNotFoundView />;

    const learningPoints = course.learnings
        ? course.learnings.split('\n').filter((line) => line.trim() !== '')
        : [];

    const weekdays = course.WeekdaySelection || [];

    return (
        <>
            <Nav />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-64 md:h-72 bg-gradient-to-r from-[#00464D] to-[#FF7001]"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#00464D]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex items-center gap-4 mb-4"
                    >
                        <Link
                            href="/course"
                            className="inline-flex items-center text-[#FFFDF5] bg-[#FF7001]/90 hover:bg-[#FF7001] px-4 py-2 rounded-full transition-all shadow-md"
                        >
                            <ArrowBackIcon className="mr-1 text-[#FFFDF5]" fontSize="small" /> Back to Courses
                        </Link>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-white text-3xl md:text-4xl font-bold drop-shadow-md"
                    >
                        {course.title}
                    </motion.h1>
                </div>
            </motion.div>

            <div className="container mx-auto max-w-5xl px-4 py-6 text-[#212020] bg-[#FFFDF5]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6 relative z-10 -mt-6 border border-[#FCD3B6]/30"
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <p className="text-lg leading-relaxed text-[#212020] mb-6">{course.desc}</p>

                            <div className="mb-6">
                                <AddToCalendarButton
                                    event={{
                                        title: course.title || "",
                                        description: course.desc || "",
                                        location: course.location || "",
                                        startDate: course.date ? new Date(course.date) : new Date(),
                                        endDate: course.endDate ? new Date(course.endDate) : new Date(new Date().getTime() + 60 * 60 * 1000),
                                        time: course.time || "",
                                        endTime: course.endTime || "",
                                        weekdays: weekdays
                                    }}
                                    className="inline-flex items-center gap-2 text-white bg-[#00AF98] hover:bg-[#009484] px-4 py-2 rounded-md font-medium transition-colors shadow-sm"
                                />
                            </div>

                            <h3 className="text-lg font-bold mb-3 text-[#00464D] flex items-center">
                                <LightbulbIcon fontSize="small" className="text-[#F7CA00] mr-2" />
                                What You&apos;ll Learn
                            </h3>
                            <ul className="space-y-2 mb-6">
                                {learningPoints.map((point, idx) => (
                                    <li key={idx} className="flex items-start p-1">
                                        <CircleIcon fontSize="inherit" className="text-[#FF7001] mr-2 mt-1.5" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            {course.program?.data && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-bold mb-3 text-[#00464D] flex items-center">
                                        <SchoolIcon fontSize="small" className="text-[#F7CA00] mr-2" />
                                        Program
                                    </h3>
                                    <div className="bg-[#00464D]/5 p-4 rounded-lg border border-[#00464D]/10">
                                        <h4 className="font-semibold text-[#00464D]">
                                            {course.program.data.attributes.title}
                                        </h4>
                                        <p className="mt-2 text-sm">
                                            {course.program.data.attributes.description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-5 bg-[#FCD3B6]/5 p-5 rounded-lg border border-[#FCD3B6]/20">
                            <CourseDetailItem icon={<CalendarTodayIcon fontSize="small" className="text-[#00AF98] mr-3 flex-shrink-0" />} label="Date" value={course.date && course.endDate ? `${course.date} – ${course.endDate}` : undefined} />
                            <CourseDetailItem icon={<AccessTimeIcon fontSize="small" className="text-[#00AF98] mr-3 flex-shrink-0" />} label="Time" value={course.time && course.endTime ? `${formatTime(course.time)} – ${formatTime(course.endTime)}` : undefined} />
                            {weekdays.length > 0 && (
                                <div className="flex items-start text-[#212020]">
                                    <EventIcon fontSize="small" className="text-[#00AF98] mr-3 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-sm text-[#00464D]">Days</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {weekdays.map((day, idx) => (
                                                <span key={idx} className="inline-block px-2 py-1 bg-[#00AF98]/10 text-[#00464D] rounded-full text-xs font-medium">
                                                    {day.weekdays}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <CourseDetailItem icon={<LocationOnIcon fontSize="small" className="text-[#00AF98] mr-3 flex-shrink-0" />} label="Location" value={course.location} />
                            <CourseDetailItem icon={<LanguageIcon fontSize="small" className="text-[#00AF98] mr-3 flex-shrink-0" />} label="Language" value={course.language} />
                        </div>
                    </div>
                </motion.div>

                <InstructorSection course={course} />
            </div>
            <Footer />
        </>
    );
}

function CourseDetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | null }) {
    if (!value) return null;
    return (
        <div className="flex items-center text-[#212020]">
            {icon}
            <div>
                <p className="text-sm text-[#00464D]">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
}

function InstructorSection({ course }: { course: Course }) {
    const instructors = course.team_members ?? [];
    return (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#FCD3B6]/20 hover:shadow-md transition-shadow duration-300 h-full">
                    <h2 className="text-lg font-bold mb-4 text-[#00464D] flex items-center">
                        <PersonIcon fontSize="small" className="text-[#FF7001] mr-2" />
                        {instructors.length > 1 ? 'Meet The Instructors' : 'Meet The Instructor'}
                    </h2>
                    <div className="space-y-4">
                        {instructors.map((instructor) => {
                            const photoUrl = extractStrapiMediaUrl(instructor.photo);
                            return (
                                <div key={instructor.id} className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                        {photoUrl ? (
                                            <div className="w-14 h-14 rounded-full mr-3 overflow-hidden">
                                                <Image
                                                    src={mediaUrl(photoUrl)}
                                                    alt={instructor.name}
                                                    width={56}
                                                    height={56}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00AF98] to-[#FF7001] flex items-center justify-center text-white font-bold text-lg mr-3">
                                                {instructor.name?.charAt(0) || "I"}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-lg text-[#00464D]">{instructor.name}</h3>
                                            <p className="text-sm text-gray-600">{instructor.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-[#212020] leading-relaxed text-sm mt-1">{instructor.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#FCD3B6]/20 hover:shadow-md transition-shadow duration-300 h-full">
                    <h2 className="text-lg font-bold mb-4 text-[#00464D] flex items-center">
                        <CheckCircleIcon fontSize="small" className="text-[#FF7001] mr-2" />
                        Prerequisites
                    </h2>
                    <p className="text-[#212020] leading-relaxed text-sm">{course.preRequisites}</p>
                </div>
            </motion.div>
        </div>
    );
}

function LoadingView() {
    return (
        <>
            <Nav />
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
            <Footer />
        </>
    );
}

function CourseNotFoundView() {
    return (
        <>
            <Nav />
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-center max-w-md bg-white rounded-xl shadow-md p-8 border border-[#FCD3B6]/30">
                    <h1 className="text-2xl font-bold text-[#00464D] mb-4">Course Not Found</h1>
                    <p className="mb-6 text-gray-600">
                        The course youre looking for could not be found. Please check the URL or return to the course list.
                    </p>
                    <Link
                        href="/course"
                        className="inline-flex items-center text-[#FFFDF5] bg-[#FF7001] px-4 py-2 rounded-full transition-all shadow-md"
                    >
                        <ArrowBackIcon fontSize="small" className="mr-1 text-[#FFFDF5]" /> Back to Courses
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}