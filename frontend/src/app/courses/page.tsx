'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { fetchCourses } from '@/lib/strapi'
import Loading from '@/components/Loading'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Course } from '@/types/course'

// Extended Course type to fix TypeScript errors
interface ExtendedCourse extends Course {
    category?: string;
    registration?: boolean;
    address?: string;
}

export default function AllCoursesPage() {
    const { locale } = useLanguage()
    const isSpanish = locale === 'es';

    const [courses, setCourses] = useState<ExtendedCourse[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const [categoryValue, setCategoryValue] = useState('')

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    useEffect(() => {
        let mounted = true
        ;(async () => {
            setLoading(true)
            try {
                const data = await fetchCourses(locale)
                if (mounted) setCourses(data as ExtendedCourse[])
            } catch (err) {
                console.error('Error loading courses', err)
            } finally {
                if (mounted) setLoading(false)
            }
        })()
        return () => {
            mounted = false
        }
    }, [locale])

    // Format date for readable display
    const formatMonthYear = (dateStr: string): string => {
        if (!dateStr) return '';
        const [year, month] = dateStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'es-ES', {
            month: 'long',
            year: 'numeric'
        });
    };

    // Get unique dates for filter
    const uniqueDates = Array.from(
        new Set(courses.map(c => c.date?.slice(0, 7)).filter(Boolean))
    ).sort();

    // Get unique categories for filter
    const categories = ['digital', 'career', 'language'].map(cat => ({
        value: cat,
        label: cat === 'digital'
            ? isSpanish ? 'Habilidades Digitales' : 'Digital Skills'
            : cat === 'career'
                ? isSpanish ? 'Carrera Profesional' : 'Career'
                : 'English / ESL'
    }));

    const filtered = courses.filter(c => {
        const matchSearch =
            (c.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
            (c.desc?.toLowerCase() || '').includes(search.toLowerCase())
        const matchDate = dateFilter ? (c.date || '').includes(dateFilter) : true
        const matchCategory = categoryValue
            ? (c.category?.toLowerCase() || '').includes(categoryValue.toLowerCase())
            : true
        return matchSearch && matchDate && matchCategory
    })

    if (loading) {
        return (
            <>
                <Nav />
                <div className='min-h-screen flex items-center justify-center'>
                    <Loading />
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Nav />

            <section ref={heroRef} className="px-2 sm:px-0 pt-10 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="container mx-auto px-4 text-center"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center relative z-10">
                        <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                            {isSpanish ? 'Todos los Cursos y Programas' : 'All Courses and Programs'}
                        </span>
                    </h1>
                    <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-6"></div>

                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 text-center font-light max-w-2xl mx-auto">
                        {isSpanish
                            ? 'Todos nuestros cursos y talleres son gratuitos y abiertos a la comunidad. Aprende nuevas habilidades, conoce gente nueva y da el siguiente paso en tu desarrollo personal o profesional.'
                            : 'All of our courses and workshops are completely free and open to everyone in the community. Join us to learn new skills, meet new people, and take the next step in your personal or professional journey.'}
                    </p>
                </motion.div>
            </section>

            <section className='bg-white'>
                <div className='max-w-6xl mx-auto px-4 py-12'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'
                    >
                        <div className='relative'>
                            <input
                                type='text'
                                placeholder={isSpanish ? 'Buscar' : 'Search'}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className='w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 placeholder-gray-500 focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
                            />
                            <svg
                                className='w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth={2}
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M21 21l-4.35-4.35M16.65 9a7.65 7.65 0 11-15.3 0 7.65 7.65 0 0115.3 0z'
                                />
                            </svg>
                        </div>

                        <select
                            value={dateFilter}
                            onChange={e => setDateFilter(e.target.value)}
                            className='w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
                        >
                            <option value=''>{isSpanish ? 'Todos los meses' : 'All months'}</option>
                            {uniqueDates.map(date => (
                                <option key={date} value={date}>
                                    {formatMonthYear(date)}
                                </option>
                            ))}
                        </select>

                        <select
                            value={categoryValue}
                            onChange={e => setCategoryValue(e.target.value)}
                            className='w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
                        >
                            <option value=''>{isSpanish ? 'Todas las categorías' : 'All categories'}</option>
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </motion.div>

                    {filtered.length ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm"
                        >
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-teal-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{isSpanish ? 'Estado' : 'Status'}</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{isSpanish ? 'Nombre' : 'Name'}</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{isSpanish ? 'Fecha' : 'Date'}</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{isSpanish ? 'Dirección' : 'Address'}</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{isSpanish ? 'Acción' : 'Action'}</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                {filtered.map((course, index) => (
                                    <motion.tr
                                        key={course.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.05 * index }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-4 py-3">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                course.registration
                                                    ? 'bg-[#ff9b4a]/20 text-[#cc6200]'
                                                    : 'bg-[#3eb08c]/20 text-[#20735b]'
                                            }`}>
                                                {course.registration
                                                    ? isSpanish ? 'Registro' : 'Register'
                                                    : isSpanish ? 'Sin Registro' : 'Walk-In'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-800 text-sm font-medium transition-colors hover:text-teal-600">{course.title}</td>
                                        <td className="px-4 py-3 text-gray-700 text-sm">{course.date}</td>
                                        <td className="px-4 py-3 text-gray-700 text-sm">{course.address ?? '63 Sixth Street, Chelsea, MA 02150'}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Link
                                                href={`/course/${course.slug}`}
                                                className='inline-flex items-center bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-md shadow hover:bg-teal-800 transition-all'
                                            >
                                                {isSpanish ? 'Ver' : 'View'}
                                                <svg className="w-0 h-4 overflow-hidden transition-all duration-300 ml-0 group-hover:w-3 group-hover:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        </motion.div>
                    ) : (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className='text-center text-xl text-gray-600 py-20'
                        >
                            {isSpanish
                                ? 'No hay cursos que coincidan con tus filtros.'
                                : 'No courses match your filters.'}
                        </motion.p>
                    )}
                </div>
            </section>

            <Footer />
        </>
    )
}