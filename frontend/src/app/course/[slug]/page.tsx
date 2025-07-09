'use client'

import React, { use, useEffect, useState } from 'react';
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

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { locale } = useLanguage();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadCourse() {
            if (!slug) return;

            setLoading(true);
            try {
                // First try to fetch the course with the current locale
                let data = await fetchCourseBySlug(slug, locale);

                // If not found and trying Spanish, try English version as fallback
                if (!data && locale === 'es') {
                    data = await fetchCourseBySlug(slug, 'en');
                }

                if (mounted) {
                    if (data) {
                        setCourse(data);
                    } else {
                        console.error(`Course not found with slug: ${slug} in any locale`);
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error loading course:', error);
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadCourse();

        return () => {
            mounted = false;
        };
    }, [slug, locale]);

    if (loading) {
        return <LoadingView />;
    }

    if (!course) {
        return <CourseNotFoundView />;
    }

    const imageUrl = (() => {
        if (course.Image && 'data' in course.Image) {
            const imageData = Array.isArray(course.Image.data)
                ? course.Image.data[0]?.attributes
                : course.Image.data?.attributes;

            return imageData?.formats?.medium?.url || imageData?.url || null;
        } else if (Array.isArray(course.Image)) {
            return course.Image[0]?.formats?.medium?.url || course.Image[0]?.url || null;
        }
        return null;
    })();

    const learningPoints = course.learnings
        ? course.learnings.split('\n').filter(line => line.trim() !== '')
        : [];

    // Get weekdays from WeekdaySelection component
    const weekdays = course.WeekdaySelection || [];

    return (
        <>
            <Nav />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-64 md:h-72 overflow-hidden"
            >
                {imageUrl ? (
                    <>
                        <Image
                            src={mediaUrl(imageUrl)}
                            alt={course.title || 'Course image'}
                            fill
                            className="object-cover brightness-75"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00464D]/80 to-transparent"></div>
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-[#00464D] to-[#FF7001]"></div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex items-center gap-4 mb-4"
                    >
                        <Link href="/course" className="inline-flex items-center text-[#FFFDF5] bg-[#FF7001]/90 hover:bg-[#FF7001] px-4 py-2 rounded-full transition-all shadow-md">
                            <ArrowBackIcon className="mr-1" fontSize="small" /> Back to Courses
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

                            <h3 className="text-lg font-bold mb-3 text-[#00464D] flex items-center">
                                <LightbulbIcon className="mr-2 text-[#F7CA00]" />
                                What You&apos;ll Learn
                            </h3>

                            <ul className="space-y-2 mb-6">
                                {learningPoints.map((point: string, index: number) => (
                                    <li key={index} className="flex items-start">
                                        <CircleIcon className="text-[#FF7001] mr-2 mt-1.5" sx={{ fontSize: 8 }} />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Program section if available */}
                            {course.program?.data && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-bold mb-3 text-[#00464D] flex items-center">
                                        <SchoolIcon className="mr-2 text-[#F7CA00]" />
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
                            <div className="flex items-center text-[#212020]">
                                <CalendarTodayIcon className="text-[#00AF98] mr-3 flex-shrink-0" fontSize="small" />
                                <div>
                                    <p className="text-sm text-[#00464D]">Date</p>
                                    <p className="font-medium">{course.date} – {course.endDate}</p>
                                </div>
                            </div>

                            <div className="flex items-center text-[#212020]">
                                <AccessTimeIcon className="text-[#00AF98] mr-3 flex-shrink-0" fontSize="small" />
                                <div>
                                    <p className="text-sm text-[#00464D]">Time</p>
                                    <p className="font-medium">{formatTime(course.time)} – {formatTime(course.endTime)}</p>
                                </div>
                            </div>

                            {/* Display weekdays from WeekdaySelection */}
                            {weekdays.length > 0 && (
                                <div className="flex items-start text-[#212020]">
                                    <EventIcon className="text-[#00AF98] mr-3 flex-shrink-0 mt-1" fontSize="small" />
                                    <div>
                                        <p className="text-sm text-[#00464D]">Days</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {weekdays.map((day) => (
                                                <span
                                                    key={day.id}
                                                    className="inline-block px-2 py-1 bg-[#00AF98]/10 text-[#00464D] rounded-full text-xs font-medium"
                                                >
                                                {day.weekdays}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center text-[#212020]">
                                <LocationOnIcon className="text-[#00AF98] mr-3 flex-shrink-0" fontSize="small" />
                                <div>
                                    <p className="text-sm text-[#00464D]">Location</p>
                                    <p className="font-medium">{course.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center text-[#212020]">
                                <LanguageIcon className="text-[#00AF98] mr-3 flex-shrink-0" fontSize="small" />
                                <div>
                                    <p className="text-sm text-[#00464D]">Language</p>
                                    <p className="font-medium">{course.language}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* Team Members / Instructors Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#FCD3B6]/20 hover:shadow-md transition-shadow duration-300 h-full">
                            <h2 className="text-lg font-bold mb-4 text-[#00464D] flex items-center">
                                <PersonIcon className="mr-2 text-[#FF7001]"/>
                                {course.team_members && course.team_members.length > 1 ? 'Meet The Instructors' : 'Meet The Instructor'}
                            </h2>

                            {/* Display team members if available */}
                            {course.team_members && course.team_members.length > 0 ? (
                                <div className="space-y-4">
                                    {course.team_members.map((instructor) => (
                                        <div key={instructor.id} className="flex flex-col">
                                            <div className="flex items-center mb-2">
                                                {instructor.photo && instructor.photo.url ? (
                                                    <div className="w-14 h-14 relative rounded-full overflow-hidden mr-3 border-2 border-[#FCD3B6]">
                                                        <Image
                                                            src={mediaUrl(instructor.photo.url)}
                                                            alt={instructor.name || "Instructor"}
                                                            fill
                                                            className="object-cover"
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
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00AF98] to-[#FF7001] flex items-center justify-center text-white font-bold text-lg mr-3">
                                            {course.instructorName?.charAt(0) || "I"}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-[#00464D]">{course.instructorName}</h3>
                                        </div>
                                    </div>
                                    <p className="text-[#212020] leading-relaxed text-sm">{course.instructorDesc}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#FCD3B6]/20 hover:shadow-md transition-shadow duration-300 h-full">
                            <h2 className="text-lg font-bold mb-4 text-[#00464D] flex items-center">
                                <CheckCircleIcon className="mr-2 text-[#FF7001]"/>
                                Prerequisites
                            </h2>
                            <p className="text-[#212020] leading-relaxed text-sm">{course.preRequisites}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </>
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
                        The course you&apos;re looking for could not be found. Please check the URL or return to the course list.
                    </p>
                    <Link
                        href="/course"
                        className="inline-flex items-center text-[#FFFDF5] bg-[#FF7001] px-4 py-2 rounded-full transition-all shadow-md"
                    >
                        <ArrowBackIcon className="mr-1" fontSize="small" /> Back to Courses
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}