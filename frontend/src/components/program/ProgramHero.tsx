'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProgramHeroProps {
    title: string;
    images: string[];
    description: string;
    ctaLabel?: string;
    onCtaClick?: () => void;
    imageAspectRatio?: string;
}

export default function ProgramHero({
                                        title,
                                        images,
                                        description,
                                        ctaLabel = "Learn More",
                                        onCtaClick,
                                        imageAspectRatio = "4/3"
                                    }: ProgramHeroProps) {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';
    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <section ref={heroRef} className="px-2 sm:px-0 pt-10 pb-8 bg-white relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center relative z-10">
                        <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </h1>
                    <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 text-center font-light max-w-2xl mx-auto">
                        {description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-10 items-start"
                >
                    <div className="relative flex flex-col items-start">
                        {images && images.length > 0 && (
                            <div
                                className="relative w-full rounded-xl overflow-hidden shadow-lg border border-gray-200"
                                style={{ aspectRatio: imageAspectRatio }}
                            >
                                <Image
                                    src={images[0]}
                                    alt={`${title} image`}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm flex flex-col justify-between bg-white">
                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 font-light">
                            {isSpanish
                                ? 'Equipando a los miembros de la comunidad con habilidades esenciales y conexiones para tener éxito en la fuerza laboral actual.'
                                : 'Equipping community members with essential skills and connections to succeed in today\'s workforce.'}
                        </p>
                        {onCtaClick && (
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onCtaClick}
                                className="self-start inline-flex items-center bg-[#FF7001] text-white px-6 py-3 rounded-lg hover:bg-[#FF8C33] transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                <span className="font-medium">{ctaLabel}</span>
                                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </motion.button>
                        )}
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
    );
}