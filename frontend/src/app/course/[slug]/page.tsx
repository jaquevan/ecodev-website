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

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';

import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    const { locale} = useLanguage();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCourse() {
            console.log('Current locale:', locale);
            console.log('Current slug:', slug);
            setLoading(true);
            try {
                const data = await fetchCourseBySlug(slug, locale);
                console.log('API response data:', data);
                if (data) {
                    setCourse(data);
                } else {
                    console.error('Course not found for slug:', slug, 'and locale:', locale);
                }
            } catch (error) {
                console.error('Error loading course:', error);
            } finally {
                setLoading(false);
            }
        }

        loadCourse();
    }, [slug, locale]);

    if (loading) return <div><Loading/></div>;
    if (!course) return <div>Course not found for slug: {slug}</div>;

    const imageUrl = course.Image?.[0]?.formats?.medium?.url || course.Image?.[0]?.url;
    const instructorImageUrl = course.instructorImage?.url || null;

    const learningPoints = course.learnings
        ? course.learnings.split('\n').filter(line => line.trim() !== '')
        : [];

    return (
        <>
            <Nav/>
            <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
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
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/course" className="inline-flex items-center text-[#FFFDF5] bg-[#FF7001]/90 hover:bg-[#FF7001] px-4 py-2 rounded-full transition-all shadow-md">
                            <ArrowBackIcon className="mr-1" fontSize="small" /> Back to Courses
                        </Link>

                        <LanguageSwitcher/>

                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFFDF5] drop-shadow-md">{course.title}</h1>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 py-8 text-[#212020] bg-[#FFFDF5]">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 relative z-10 -mt-6 border border-[#FCD3B6]">
                    <div className="flex flex-col-reverse md:flex-row md:items-start gap-6 md:gap-8">
                        <div className="flex-1">
                            <div className="mb-6">
                                <p className="text-lg leading-relaxed text-[#212020]">{course.desc}</p>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6">
                                <button className="bg-[#00AF98] text-white px-6 py-3 rounded-lg hover:bg-[#00464D] transition-all shadow-md hover:shadow-lg flex items-center justify-center">
                                    <AddCircleIcon className="mr-2" fontSize="small" />
                                    Register Now
                                </button>
                            </div>
                        </div>

                        <div className="md:w-1/3 flex flex-col gap-3 bg-[#FCD3B6]/20 p-4 rounded-lg border border-[#FCD3B6]">
                            <div className="flex items-center text-[#212020]">
                                <CalendarTodayIcon className="text-[#00AF98] mr-3" fontSize="small" />
                                <div>
                                    <p className="text-sm text-[#00464D]">Date</p>
                                    <p className="font-medium">{course.date} – {course.endDate}</p>
                                </div>
                            </div>

                            <div className="flex items-center text-[#212020]">
                                <AccessTimeIcon className="text-[#00AF98] mr-3" fontSize="small" />
                                <div>
                                    <p className="text-sm text-[#00464D]">Time</p>
                                    <p className="font-medium">{formatTime(course.time)} – {formatTime(course.endTime)}</p>
                                </div>
                            </div>

                            <div className="flex items-center text-[#212020]">
                                <LocationOnIcon className="text-[#00AF98] mr-3" fontSize="small" />
                                <div>
                                    <p className="text-sm text-[#00464D]">Location</p>
                                    <p className="font-medium">{course.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center text-[#212020]">
                                <LanguageIcon className="text-[#00AF98] mr-3" fontSize="small" />
                                <div>
                                    <p className="text-sm text-[#00464D]">Language</p>
                                    <p className="font-medium">{course.language}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-5 gap-8 mb-12">
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-[#FCD3B6]">
                            <h2 className="text-xl font-bold mb-4 text-[#00464D] flex items-center">
                                <PersonIcon className="mr-2 text-[#FF7001]"/>
                                Meet The Instructor
                            </h2>

                            <div className="flex items-center mb-4">
                                {instructorImageUrl ? (
                                    <div className="w-14 h-14 relative rounded-full overflow-hidden mr-3 border-2 border-[#FCD3B6]">
                                        <Image
                                            src={mediaUrl(instructorImageUrl)}
                                            alt={course.instructorName || "Instructor"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00AF98] to-[#FF7001] flex items-center justify-center text-white font-bold text-lg mr-3">
                                        {course.instructorName?.charAt(0) || "I"}
                                    </div>
                                )}
                                <h3 className="font-semibold text-lg text-[#00464D]">{course.instructorName}</h3>
                            </div>

                            <p className="text-[#212020] leading-relaxed">{course.instructorDesc}</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-[#FCD3B6]">
                            <h2 className="text-xl font-bold mb-4 text-[#00464D] flex items-center">
                                <CheckCircleIcon className="mr-2 text-[#FF7001]"/>
                                Prerequisites
                            </h2>
                            <p className="text-[#212020] leading-relaxed">{course.preRequisites}</p>
                        </div>
                    </div>

                    <div className="md:col-span-3 bg-white rounded-xl shadow-md p-6 md:p-8 border border-[#FCD3B6]">
                        <h2 className="text-2xl font-bold mb-6 text-[#00464D] flex items-center">
                            <LightbulbIcon className="mr-2 text-[#F7CA00]" />
                            What You&apos;ll Learn
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            {learningPoints.map((point: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FCD3B6]/20 transition-colors"
                                >
                                    <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-[#00AF98]/20 text-[#00AF98] flex items-center justify-center">
                                        <CheckIcon fontSize="small" />
                                    </div>
                                    <p className="text-[#212020] leading-relaxed">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}