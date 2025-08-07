'use client'

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { fetchProgramBySlug, mediaUrl } from '@/lib/programs'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StudentReviews from '@/components/program/StudentReviews'
import Loading from '@/components/Loading'
import Link from 'next/link'
import { Program } from '@/types/program'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params)
    const { locale } = useLanguage()
    const isSpanish = locale === 'es'
    const [program, setProgram] = useState<Program | null>(null)
    const [loading, setLoading] = useState(true)
    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })

    useEffect(() => {
        let mounted = true
        async function loadProgram() {
            if (!slug) return
            setLoading(true)
            try {
                let data = await fetchProgramBySlug(slug, locale)
                if (!data && locale === 'es') data = await fetchProgramBySlug(slug, 'en')
                if (mounted) {
                    if (data) setProgram(data)
                    setLoading(false)
                }
            } catch {
                if (mounted) setLoading(false)
            }
        }
        loadProgram()
        return () => {
            mounted = false
        }
    }, [slug, locale])

    if (loading) return <LoadingView />
    if (!program) return <ProgramNotFoundView />

    return (
        <>
            <Nav />
            <section ref={heroRef} className="px-2 sm:px-0 pt-24 pb-10 bg-white relative">
                <div className="mx-auto max-w-3xl lg:max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                        className="relative text-center mb-10 px-4"
                    >
                        <Link
                            href="/program"
                            className="inline-flex items-center text-white bg-[#FF7001] hover:bg-[#FF8C33] px-3 py-1.5 rounded-lg shadow-md transition text-sm mx-auto mb-4 sm:mx-0 sm:mb-0 sm:absolute sm:left-4 sm:top-0 z-10"
                        >
                            <ArrowBackIcon className="mr-1" fontSize="small" />
                            <span className="font-medium">{isSpanish ? 'Programas' : 'Programs'}</span>
                        </Link>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                {program.title}
              </span>
                        </h1>
                        <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                        className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0 px-4"
                    >
                        <div className="flex justify-center w-full">
                            {program.heroImage?.url ? (
                                <div className="relative w-full rounded-xl overflow-hidden shadow-md border border-gray-200" style={{ aspectRatio: '16/9' }}>
                                    <Image src={mediaUrl(program.heroImage.url)} alt={program.title} fill priority className="object-contain" />
                                </div>
                            ) : program.heroImage?.formats?.small?.url ? (
                                <div className="relative w-full rounded-xl overflow-hidden shadow-md border border-gray-200" style={{ aspectRatio: '16/9' }}>
                                    <Image src={mediaUrl(program.heroImage.formats.small.url)} alt={program.title} fill priority className="object-contain" />
                                </div>
                            ) : (
                                <div className="w-full h-48 bg-gray-100 border rounded-xl flex items-center justify-center text-gray-400 italic text-sm">
                                    {isSpanish ? 'Imagen no disponible' : 'Image not available'}
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 w-full">
                            <h3 className="text-lg font-bold mb-5 text-teal-700 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                                {isSpanish ? 'Proceso de Registro' : 'Registration Process'}
                            </h3>
                            {program.steps && program.steps.length > 0 ? (
                                <ol className="space-y-4 mb-6">
                                    {program.steps.map((s, i) => (
                                        <li key={s.id} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="h-7 w-7 bg-orange-400 text-white rounded-full flex items-center justify-center font-semibold shadow-sm text-sm">
                                                    {i + 1}
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <h4 className="font-semibold text-teal-700 text-sm">{s.title}</h4>
                                                <p className="text-gray-600 text-xs">{s.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <div className="text-center py-8 text-gray-500 italic text-sm">
                                    {isSpanish ? 'Información sobre el proceso de registro próximamente.' : 'Registration process information coming soon.'}
                                </div>
                            )}
                            <button
                                onClick={() => {
                                    window.open(`mailto:${program.email}`, '_blank')
                                }}
                                className="inline-flex items-center justify-center text-white bg-[#FF7001] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#FF8C33] transition-all shadow-sm hover:shadow-md font-medium text-sm"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                {isSpanish ? 'Contacte para más información' : 'Contact for more information'}
                            </button>


                        </div>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={heroInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.5, ease: 'easeOut', delay: 0.3}}
                        className="mt-10 px-4"
                    >
                        <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
                            {(program.heroDescription || '').split('\n').map((p, i) => (
                                <p key={i} className="text-gray-700 text-base leading-relaxed font-light mb-4">
                                    {p.trim()}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
            <StudentReviews reviews={program.review} />
            <Footer />
        </>
    )
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
    )
}

function ProgramNotFoundView() {
    const { locale } = useLanguage()
    const isSpanish = locale === 'es'
    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })

    return (
        <>
            <Nav />
            <div ref={heroRef} className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-center max-w-md bg-white rounded-xl shadow-md p-8 border border-gray-200"
                >
                    <h1 className="text-2xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
              {isSpanish ? 'Programa No Encontrado' : 'Program Not Found'}
            </span>
                    </h1>
                    <div className="h-1 w-16 bg-orange-300 mx-auto rounded-full mb-6" />
                    <p className="mb-8 text-gray-600 text-sm">
                        {isSpanish ? 'El programa que buscas no se pudo encontrar. Por favor, verifica la URL o regresa a la lista de programas.' : "The program you're looking for could not be found. Please check the URL or return to the programs list."}
                    </p>
                    <Link
                        href="/program"
                        className="inline-flex items-center text-white bg-[#FF7001] px-4 py-2 rounded-lg transition-all shadow-md hover:bg-[#FF8C33] hover:shadow-lg font-medium text-sm"
                    >
                        <ArrowBackIcon className="mr-2" fontSize="small" />
                        {isSpanish ? 'Volver a Programas' : 'Back to Programs'}
                    </Link>
                </motion.div>
            </div>
            <Footer />
        </>
    )
}
