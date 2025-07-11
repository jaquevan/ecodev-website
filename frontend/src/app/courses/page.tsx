'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { fetchCourses } from '@/lib/strapi'
import Loading from '@/components/Loading'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AllCoursesPage() {
    const { locale } = useLanguage()

    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const [categoryValue, setCategoryValue] = useState('')

    useEffect(() => {
        let mounted = true
        ;(async () => {
            setLoading(true)
            try {
                const data = await fetchCourses(locale)
                if (mounted) setCourses(data)
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

    const filtered = courses.filter(c => {
        const matchSearch =
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.desc.toLowerCase().includes(search.toLowerCase())
        const matchDate = dateFilter ? c.date.includes(dateFilter) : true
        const matchCategory = categoryValue
            ? c.category?.toLowerCase().includes(categoryValue.toLowerCase())
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

            <div className="bg-white">
                <div className="max-w-5xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#00464D]">
                        {locale === 'en' ? 'All Courses and Programs' : 'Todos los Cursos y Programas'}
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-8">
                        {locale === 'en'
                            ? 'All of our courses and workshops are completely free and open to everyone in the community. Join us to learn new skills, meet new people, and take the next step in your personal or professional journey.'
                            : 'Todos nuestros cursos y talleres son gratuitos y abiertos a la comunidad. Aprende nuevas habilidades, conoce gente nueva y da el siguiente paso en tu desarrollo personal o profesional.'}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#00464D] to-[#FF7001] rounded-full mx-auto"></div>
                </div>
            </div>

            <section className='bg-[#fffdf5]'>
                <div className='max-w-6xl mx-auto px-4 py-16'>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'>
                        <div className='relative'>
                            <input
                                type='text'
                                placeholder={locale === 'en' ? 'Search' : 'Buscar'}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className='w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 placeholder-gray-500 focus:border-[#00464d] focus:ring-0'
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
                            className='w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:border-[#00464d] focus:ring-0'
                        >
                            <option value=''>{locale === 'en' ? 'Date' : 'Fecha'}</option>
                            <option value='2025-06'>Jun 2025</option>
                        </select>

                        <select
                            value={categoryValue}
                            onChange={e => setCategoryValue(e.target.value)}
                            className='w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:border-[#00464d] focus:ring-0'
                        >
                            <option value=''>{locale === 'en' ? 'Category' : 'Categoría'}</option>
                            <option value='digital'>Digital Skills</option>
                            <option value='career'>Career</option>
                            <option value='language'>English / ESL</option>
                        </select>
                    </div>

                    {filtered.length ? (
                        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#00464D]/5">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'en' ? 'Status' : 'Estado'}</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'en' ? 'Name' : 'Nombre'}</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'en' ? 'Date' : 'Fecha'}</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'en' ? 'Address' : 'Dirección'}</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{locale === 'en' ? 'Action' : 'Acción'}</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                {filtered.map(course => (
                                    <tr key={course.id}>
                                        <td className="px-4 py-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            course.registration
                                ? 'bg-[#ff9b4a]/20 text-[#cc6200]'
                                : 'bg-[#3eb08c]/20 text-[#20735b]'
                        }`}>
                          {course.registration
                              ? locale === 'en' ? 'Register' : 'Registro'
                              : locale === 'en' ? 'Walk-In' : 'Sin Registro'}
                        </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-800 text-sm">{course.title}</td>
                                        <td className="px-4 py-3 text-gray-700 text-sm">{course.date}</td>
                                        <td className="px-4 py-3 text-gray-700 text-sm">{course.address ?? '63 Sixth Street, Chelsea, MA 02150'}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Link
                                                href={`/course/${course.slug}`}
                                                className='inline-block bg-[#00464d] text-white text-xs font-semibold px-4 py-2 rounded-md shadow hover:bg-[#00363d] transition'
                                            >
                                                {locale === 'en' ? 'View' : 'Ver'}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className='text-center text-xl text-gray-600 py-20'>
                            {locale === 'en'
                                ? 'No courses match your filters.'
                                : 'No hay cursos que coincidan con tus filtros.'}
                        </p>
                    )}
                </div>
            </section>

            <Footer />
        </>
    )
}
