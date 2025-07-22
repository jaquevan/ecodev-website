'use client';

import { useEffect, useState, Suspense } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { fetchCachedCourses, mediaUrl } from '@/lib/strapi';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProgramAttributes {
    id: number;
    title: string;
    slug?: string;
    [key: string]: string | number | boolean | undefined;
}

type ExtendedCourse = {
    id: number;
    title: string;
    desc: string;
    date: string;
    slug: string;
    Image?: { formats?: { medium?: { url: string } }; url: string }[];
    registration?: boolean;
    program?: ProgramAttributes | null;
};

function CourseCard({ course }: { course: ExtendedCourse }) {
    const { locale } = useLanguage();

    const imageUrl = course.Image?.[0]?.formats?.medium?.url || course.Image?.[0]?.url;

    const badge = course.registration
        ? {
            text: locale === 'en' ? 'Registration Required' : 'Requiere Registro',
            color: 'bg-[#ff9b4a]',
        }
        : {
            text: locale === 'en' ? 'Walk-in Available' : 'Sin Registro',
            color: 'bg-[#3eb08c]',
        };

    return (
        <Link href={`/course/${course.slug}`} className="block h-full group">
            <article className="h-full flex flex-col border border-[#d5e9e2] rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-2 hover:border-teal-400 transition-all duration-300 bg-white relative overflow-hidden">
                <div className="h-44 relative rounded-t-2xl overflow-hidden">
                    {imageUrl ? (
                        <Image
                            src={mediaUrl(imageUrl)}
                            alt={course.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#00464d] to-[#ff7001]">
                            <span className="text-white font-semibold">
                                {locale === 'en' ? 'No Image' : 'Sin Imagen'}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-grow p-4 z-10">
                    <h3 className="text-lg font-bold text-[#00464d] mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {course.title}
                    </h3>
                    <div className="w-16 h-0.5 bg-orange-300 mb-4 group-hover:w-24 transition-all duration-300"></div>
                    <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        <li className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-1 text-[#00464d] group-hover:text-orange-500 transition-colors"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            {course.date}
                        </li>
                    </ul>
                    <p className="text-sm text-gray-600 line-clamp-3 flex-grow">{course.desc}</p>
                </div>

                <div className={`px-4 py-2 ${badge.color} text-white text-center text-sm font-medium rounded-b-2xl relative`}>
                    <span className="relative z-10 flex justify-center items-center">
                        {badge.text}
                        <svg
                            className="w-0 h-4 ml-0 group-hover:w-4 group-hover:ml-2 transition-all duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-b-2xl"></div>
                </div>
            </article>
        </Link>
    );
}

export default function CoursesPageContent({ programQuery }: { programQuery: string }) {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';

    const [courses, setCourses] = useState<ExtendedCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [programValue, setProgramValue] = useState(decodeURIComponent(programQuery));

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const data = await fetchCachedCourses(locale);

                if (mounted) {
                    //eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const normalized = (data as any[]).map((course) => ({
                        ...course,
                        id: Number(course.id),
                        registration: course.registration ?? false,
                        program: course.program ?? null,
                    })) as ExtendedCourse[];

                    setCourses(normalized);
                    setLoading(false); // Set loading to false after data is fetched
                }
            } catch (err) {
                console.error('Error fetching courses:', err);
                setLoading(false); // Ensure loading is set to false even on error
            }
        })();

        return () => {
            mounted = false;
        };
    }, [locale]);

    const filtered = courses.filter((c) => {
        const matchSearch =
            c.title?.toLowerCase().includes(search.toLowerCase()) ||
            c.desc?.toLowerCase().includes(search.toLowerCase());
        const matchDate = dateFilter ? (c.date || '').includes(dateFilter) : true;
        const matchProgram = programValue ? c.program?.title === programValue : true;
        return matchSearch && matchDate && matchProgram;
    });

    const uniqueMonths = Array.from(
        new Set(courses.map((c) => c.date?.slice(0, 7)).filter(Boolean))
    ).sort();

    const formatMonthYear = (dateStr: string) => {
        if (!dateStr) return '';
        const [year, month] = dateStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'es-ES', {
            month: 'long',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <Suspense fallback={<Loading />}>
                <Nav />
                <div className="min-h-screen flex items-center justify-center">
                    <Loading />
                </div>
                <Footer />
            </Suspense>
        );
    }

    return (
        <Suspense fallback={<Loading />}>
            <Nav />
            <section ref={heroRef} className="px-2 sm:px-0 pt-10 pb-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="container mx-auto px-4 text-center"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center relative z-10">
                        <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                            {isSpanish ? 'Próximos Cursos y Programas' : 'Upcoming Courses & Programs'}
                        </span>
                    </h1>
                    <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-6"></div>

                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 text-center font-light max-w-2xl mx-auto">
                        {isSpanish
                            ? 'Todos nuestros cursos y talleres son gratuitos y están abiertos a toda la comunidad. Únete para aprender nuevas habilidades, conocer gente nueva y avanzar en tu desarrollo personal o profesional.'
                            : 'All of our courses and workshops are free and open to everyone. Join us to learn new skills, meet people, and take the next step in your journey.'}
                    </p>
                </motion.div>
            </section>

            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={isSpanish ? 'Buscar' : 'Search'}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 placeholder-gray-500 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                            />
                            <svg
                                className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35M16.65 9a7.65 7.65 0 11-15.3 0 7.65 7.65 0 0115.3 0z"
                                />
                            </svg>
                        </div>

                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                        >
                            <option value="">{isSpanish ? 'Todos los meses' : 'All months'}</option>
                            {uniqueMonths.map((month) => (
                                <option key={month} value={month}>
                                    {formatMonthYear(month)}
                                </option>
                            ))}
                        </select>

                        <select
                            value={programValue}
                            onChange={(e) => setProgramValue(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                        >
                            <option value="">{isSpanish ? 'Todos los programas' : 'All programs'}</option>
                            {['Adult Education', 'Workforce Development', 'Job Readiness'].map((prog) => (
                                <option key={prog} value={prog}>
                                    {prog}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filtered.length ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {filtered.map((c, index) => (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <CourseCard course={c} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <p className="text-center text-xl text-gray-600 py-20">
                            {isSpanish
                                ? 'No hay cursos que coincidan con tus filtros.'
                                : 'No courses match your filters.'}
                        </p>
                    )}
                </div>
            </section>
            <Footer />
        </Suspense>
    );
}