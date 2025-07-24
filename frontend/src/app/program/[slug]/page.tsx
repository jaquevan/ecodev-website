'use client'

import React, { use, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { fetchProgramBySlug } from '@/lib/programs';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StudentReviews from "@/components/program/StudentReviews";
import Loading from '@/components/Loading';
import Link from 'next/link';
import { Program } from '@/types/program';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const mediaUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${url}`;
};

export default function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';
    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState(true);

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    useEffect(() => {
        let mounted = true;

        async function loadProgram() {
            if (!slug) return;

            setLoading(true);
            try {
                let data = await fetchProgramBySlug(slug, locale);

                if (!data && locale === 'es') {
                    data = await fetchProgramBySlug(slug, 'en');
                }

                if (mounted) {
                    if (data) {
                        setProgram(data);
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error loading program:', error);
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadProgram();

        return () => {
            mounted = false;
        };
    }, [slug, locale]);

    if (loading) {
        return <LoadingView />;
    }

    if (!program) {
        return <ProgramNotFoundView />;
    }

    return (
        <>
            <Nav />

            <section ref={heroRef} className="px-2 sm:px-0 pt-10 pb-8 bg-white relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center relative z-10">
                            <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                                {program.title}
                            </span>
                        </h1>
                        <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-6"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                        className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mb-6"
                    >
                        <div className="flex justify-center">
                            {program.heroImage?.length > 0 && (
                                <div
                                    className="relative w-full rounded-xl overflow-hidden shadow-lg border border-gray-200"
                                    style={{ aspectRatio: "16/9", maxHeight: "350px" }}
                                >
                                    <Image
                                        src={mediaUrl(program.heroImage[0].original)}
                                        alt={program.title}
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-5 text-teal-700 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                                    </svg>
                                    {isSpanish ? 'Proceso de Registro' : 'Registration Process'}
                                </h3>

                                {program.steps && program.steps.length > 0 ? (
                                    <div className="space-y-5">
                                        {program.steps.map((step, index) => (
                                            <div key={step.id} className="flex items-start group hover:bg-orange-50 p-2 rounded-lg transition-colors duration-200">
                                                <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm group-hover:shadow">
                                                    {index + 1}
                                                </div>
                                                <div className="ml-3">
                                                    <h4 className="font-semibold text-teal-700 group-hover:text-teal-800">{step.title}</h4>
                                                    <p className="text-gray-600 group-hover:text-gray-700">{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-32 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                                        <p className="text-gray-500 italic text-center px-4">
                                            {isSpanish
                                                ? 'Información sobre el proceso de registro próximamente.'
                                                : 'Registration process information coming soon.'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <a
                                    href="https://la-colaborativa.org/program-contact/?advisor-email=carlosg@la-colaborativa.org&program-service=Economic-Development"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-white bg-[#FF7001] px-4 py-2 rounded-lg hover:bg-[#FF8C33] transition-all shadow-sm hover:shadow-md duration-300 font-medium text-sm"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    {isSpanish ? 'Contacte para más información' : 'Contact for more information'}
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
                    >
                        <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
                            <p className="text-gray-700 text-lg leading-relaxed font-light">
                                {program.heroDescription ||
                                    (isSpanish
                                        ? 'Equipando a los miembros de la comunidad con habilidades esenciales y conexiones para tener éxito.'
                                        : 'Equipping community members with essential skills and connections to succeed.')}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={heroInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="absolute top-4 left-4 sm:top-6 sm:left-6"
                    >
                        <Link
                            href="/program"
                            className="inline-flex items-center text-white bg-[#FF7001] hover:bg-[#FF8C33] px-3 py-1.5 rounded-lg shadow-md transition text-sm"
                        >
                            <ArrowBackIcon className="mr-1" fontSize="small" />
                            <span className="font-medium">
                                {isSpanish ? 'Programas' : 'Programs'}
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <StudentReviews reviews={program.review} />

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

function ProgramNotFoundView() {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';
    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

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
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                            {isSpanish ? 'Programa No Encontrado' : 'Program Not Found'}
                        </span>
                    </h1>
                    <div className="h-1 w-16 bg-orange-300 mx-auto rounded-full mb-6"></div>

                    <p className="mb-8 text-gray-600">
                        {isSpanish
                            ? 'El programa que buscas no se pudo encontrar. Por favor, verifica la URL o regresa a la lista de programas.'
                            : "The program you're looking for could not be found. Please check the URL or return to the programs list."}
                    </p>

                    <Link
                        href="/program"
                        className="inline-flex items-center text-white bg-[#FF7001] px-5 py-2.5 rounded-lg transition-all shadow-md hover:bg-[#FF8C33] hover:shadow-lg duration-300 font-medium"
                    >
                        <ArrowBackIcon className="mr-2" fontSize="small" />
                        {isSpanish ? 'Volver a Programas' : 'Back to Programs'}
                    </Link>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}
