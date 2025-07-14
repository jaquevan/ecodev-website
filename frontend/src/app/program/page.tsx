'use client'

import { useEffect, useState } from 'react';  // Removed useRef
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { fetchPrograms } from '@/lib/programs';
import { Program } from '@/types/program';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Programs() {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    useEffect(() => {
        async function loadPrograms() {
            try {
                setLoading(true);
                const data = await fetchPrograms(locale);
                setPrograms(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching programs:', err);
                setError(isSpanish ? 'Error al cargar los programas' : 'Error loading programs');
            } finally {
                setLoading(false);
            }
        }

        loadPrograms();
    }, [locale, isSpanish]);

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
                            {isSpanish ? 'Nuestros Programas' : 'Our Programs'}
                        </span>
                    </h1>
                    <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-6"></div>

                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 text-center font-light max-w-2xl mx-auto">
                        {isSpanish
                            ? 'Descubre oportunidades de aprendizaje diseñadas para inspirar y capacitar a nuestra comunidad.'
                            : 'Discover learning opportunities designed to inspire and empower our community.'}
                    </p>
                </motion.div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {loading && (
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
                            <div className="text-gray-500">
                                {isSpanish ? 'Cargando programas...' : 'Loading programs...'}
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                            <span className="text-red-500 text-2xl">!</span>
                        </div>
                        <p className="text-red-500 font-medium">{error}</p>
                    </div>
                )}

                {!loading && !error && programs.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 italic">
                            {isSpanish ? 'No hay programas disponibles en este momento.' : 'No programs available at this time.'}
                        </p>
                    </div>
                )}

                {!loading && !error && programs.length > 0 && (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {programs.map((program, index) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/program/${program.slug}`}
                                    className="group flex flex-col h-full rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all bg-white"
                                >
                                    <div className="flex-grow p-6 flex flex-col">
                                        <h2 className="text-2xl font-bold mb-3">
                                            <span className="text-teal-600 group-hover:text-orange-500 transition-colors">
                                                {program.title}
                                            </span>
                                        </h2>
                                        <div className="w-16 h-1 bg-orange-300 rounded-full mb-4 group-hover:w-24 transition-all duration-300"></div>
                                        <p className="text-gray-600 line-clamp-4 mb-6 flex-grow">
                                            {program.heroDescription}
                                        </p>
                                        <span className="inline-flex items-center text-[#FF7001] font-medium group-hover:underline">
                                            {isSpanish ? 'Ver detalles' : 'View details'}
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}