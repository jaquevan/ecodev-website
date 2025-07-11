'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { fetchCourses, mediaUrl } from '@/lib/strapi';
import Loading from '@/components/Loading';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types/course';

// Define the embedded program relationship
interface ProgramAttributes {
    title: string;
    description?: string;
    slug?: string;
}

interface EmbeddedProgram {
    data?: {
        id: number;
        attributes: ProgramAttributes;
    };
}

// Make our course type by *composition*, not extends
type ExtendedCourse = Course & {
    category?: string;
    registration?: boolean;
    program?: EmbeddedProgram | null;
};

export default function CoursesPage() {
    const { locale } = useLanguage();
    const [courses, setCourses] = useState<ExtendedCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [categoryValue, setCategoryValue] = useState('');

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const data = await fetchCourses(locale);
                if (mounted) setCourses(data as ExtendedCourse[]);
            } catch (err) {
                console.error('error loading courses', err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [locale]);

    // Get all unique program titles for filter dropdown
    const programCategories = Array.from(
        new Set(
            courses
                .map(c => c.program?.data?.attributes?.title)
                .filter((t): t is string => Boolean(t))
        )
    );

    // Filter and sort
    const filtered = courses
        .filter(c => {
            const matchSearch =
                c.title?.toLowerCase().includes(search.toLowerCase()) ||
                c.desc?.toLowerCase().includes(search.toLowerCase());
            const matchDate = dateFilter ? (c.date || '').includes(dateFilter) : true;
            const matchCategory = categoryValue
                ? c.program?.data?.attributes?.title === categoryValue
                : true;
            return matchSearch && matchDate && matchCategory;
        })
        .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

    if (loading) {
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

    return (
        <>
            <Nav />
            <div className="bg-gradient-to-b from-[#00464D]/10 to-white">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#00464D]">
                        {locale === 'en'
                            ? 'Upcoming Courses & Programs'
                            : 'Próximos Cursos y Programas'}
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-8">
                        {locale === 'en'
                            ? 'All of our courses and workshops are free and open to everyone. Join us to learn new skills, meet people, and take the next step in your journey.'
                            : 'Todos nuestros cursos y talleres son gratuitos y están abiertos a toda la comunidad. Únete para aprender nuevas habilidades, conocer gente nueva y avanzar en tu desarrollo personal o profesional.'}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#00464D] to-[#FF7001] rounded-full mx-auto"></div>
                </div>
            </div>

            <section className="bg-[#fffdf5]">
                <div className="max-w-6xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={locale === 'en' ? 'Search' : 'Buscar'}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 placeholder-gray-500 focus:border-[#00464d] focus:ring-0"
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
                            onChange={e => setDateFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:border-[#00464d] focus:ring-0"
                        >
                            <option value="">{locale === 'en' ? 'Date' : 'Fecha'}</option>
                            {Array.from(
                                new Set(courses.map(c => c.date?.slice(0, 7)).filter(Boolean))
                            ).map(month => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>

                        <select
                            value={categoryValue}
                            onChange={e => setCategoryValue(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:border-[#00464d] focus:ring-0"
                        >
                            <option value="">{locale === 'en' ? 'Program' : 'Programa'}</option>
                            {programCategories.map((cat, idx) => (
                                <option key={idx} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filtered.length ? (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map(c => (
                                <CourseCard key={c.id} course={c} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-xl text-gray-600 py-20">
                            {locale === 'en'
                                ? 'No courses match your filters.'
                                : 'No hay cursos que coincidan con tus filtros.'}
                        </p>
                    )}

                    <div className="mt-20">
                        <div className="rounded-xl bg-gradient-to-r from-[#0f6d73] to-[#4db08e] p-10 text-center text-white">
                            <h2 className="text-2xl font-semibold mb-2">
                                {locale === 'en'
                                    ? "Can't find what you're looking for?"
                                    : '¿No encuentras lo que buscas?'}
                            </h2>
                            <p className="mb-6">
                                {locale === 'en'
                                    ? 'Browse all courses to see everything we offer.'
                                    : 'Mira todos los cursos para ver todo lo que ofrecemos.'}
                            </p>
                            <Link
                                href="/courses"
                                className="inline-block bg-white text-[#00464d] font-semibold rounded-md px-6 py-2 shadow-sm hover:bg-gray-100 transition"
                            >
                                {locale === 'en' ? 'See More Courses' : 'Ver Más Cursos'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

function CourseCard({ course }: { course: ExtendedCourse }) {
    const { locale } = useLanguage();

    const imageUrl = (() => {
        if (course.Image && 'data' in course.Image && Array.isArray(course.Image.data)) {
            const imageData = course.Image.data[0]?.attributes;
            return imageData && (imageData.formats?.medium?.url || imageData.url) || null;
        } else if (Array.isArray(course.Image)) {
            return course.Image[0]?.formats?.medium?.url || course.Image[0]?.url || null;
        }
        return null;
    })();

    const programTitle = course.program?.data?.attributes?.title ?? '';

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
        <Link href={`/course/${course.slug}`} className="block">
            <article className="h-full flex flex-col border border-[#d5e9e2] rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="h-44 relative rounded-t-2xl overflow-hidden">
                    {imageUrl ? (
                        <Image
                            src={mediaUrl(imageUrl)}
                            alt={course.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#00464d] to-[#ff7001]">
              <span className="text-white font-semibold">
                {locale === 'en' ? 'No Image' : 'Sin Imagen'}
              </span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-grow p-4">
                    <h3 className="text-lg font-bold text-[#00464d] mb-2 line-clamp-2">
                        {course.title}
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        <li className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-1 text-[#00464d]"
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
                        <li className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-1 text-[#00464d]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 12c0 4.418-1.79 8-4 8s-4-3.582-4-8 1.79-8 4-8 4 3.582 4 8zM12 12c0 4.418 1.79 8 4 8s4-3.582 4-8-1.79-8-4-8-4 3.582-4 8z"
                                />
                            </svg>
                            {course.language ?? 'English / Español'}
                        </li>
                        {programTitle && (
                            <li className="flex items-center">
                                <svg
                                    className="w-4 h-4 mr-1 text-[#00464d]"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                                {programTitle}
                            </li>
                        )}
                    </ul>
                    <p className="text-sm text-gray-600 line-clamp-3 flex-grow">{course.desc}</p>
                </div>

                <div
                    className={`px-4 py-2 ${badge.color} text-white text-center text-sm font-medium rounded-b-2xl`}
                >
                    {badge.text}
                </div>
            </article>
        </Link>
    );
}
