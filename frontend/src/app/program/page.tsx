"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { fetchPrograms } from '@/lib/programs';
import { Program } from '@/types/program';

export default function Programs() {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPrograms() {
            try {
                setLoading(true);
                const data = await fetchPrograms(locale);
                console.log('Fetched programs:', data);
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

            <div className="bg-gradient-to-b from-[#00464D]/10 to-white">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#00464D]">
                        {isSpanish ? 'Nuestros Programas' : 'Our Programs'}
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-8">
                        {isSpanish
                            ? 'Descubre oportunidades de aprendizaje diseñadas para inspirar y capacitar a nuestra comunidad.'
                            : 'Discover learning opportunities designed to inspire and empower our community.'}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#00464D] to-[#FF7001] rounded-full mx-auto mb-16"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map(program => (
                        <Link
                            href={`/program/${program.slug}`}
                            key={program.id}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-2xl font-semibold mb-3 text-[#00464D]">{program.title}</h2>
                                <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">{program.heroDescription}</p>
                                <span className="inline-flex items-center text-[#FF7001] font-medium group">
                                    {isSpanish ? 'Ver detalles' : 'View details'}
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}