'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { StaticImageData } from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLanguage } from '@/context/LanguageContext'; // Assuming you have a LanguageContext

type ProgramItem = {
    label: string;
    slug: string;
    icon: ReactNode;
    image?: string | StaticImageData;
    subItems?: string[];
    description?: string;
};

type ProgramCardProps = {
    title: string;
    program: string;
    items: ProgramItem[];
    colorScheme: 'indigo' | 'teal' | 'amber';
};

export default function ProgramCards({ title, program, items, colorScheme }: ProgramCardProps) {
    const { ref, inView } = useInView({ triggerOnce: true });
    const { locale } = useLanguage(); // Get the current locale

    const colors = {
        indigo: {
            ring: 'ring-indigo-500',
            iconBg: 'bg-indigo-600',
            text: 'text-indigo-800',
            hoverBg: 'hover:bg-indigo-100',
            button: 'bg-indigo-600 hover:bg-indigo-700',
        },
        teal: {
            ring: 'ring-teal-500',
            iconBg: 'bg-teal-600',
            text: 'text-teal-800',
            hoverBg: 'hover:bg-teal-100',
            button: 'bg-teal-600 hover:bg-teal-700',
        },
        amber: {
            ring: 'ring-amber-400',
            iconBg: 'bg-amber-400',
            text: 'text-amber-800',
            hoverBg: 'hover:bg-amber-100',
            button: 'bg-amber-500 hover:bg-amber-600',
        },
    };

    const color = colors[colorScheme];
    const item = items[0];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`flex flex-col items-center text-center rounded-3xl border shadow-lg bg-white px-8 py-10 transition-all duration-300 ring-1 ${color.ring} max-w-md w-full h-full`}
        >
            <div className="flex flex-col items-center gap-2 mb-5">
                <div className={`w-14 h-14 rounded-full ${color.iconBg} flex items-center justify-center shadow`}>
                    <span className="text-white text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 leading-tight">{title}</h3>
            </div>

            {item.description && (
                <p className="text-sm text-slate-600 mb-6 leading-relaxed min-h-[120px] max-w-sm mx-auto">
                    {item.description}
                </p>
            )}

            {item.image && (
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-44 h-44 rounded-xl overflow-hidden shadow mb-6 ring-2 ring-gray-200"
                >
                    <Image
                        src={item.image}
                        alt={`${title} image`}
                        width={176}
                        height={176}
                        className="object-cover w-full h-full"
                    />
                </motion.div>
            )}

            <div className="w-full flex flex-col gap-3 mb-6">
                {item.subItems?.map((sub, idx) => (
                    <Link href={`/program/${encodeURIComponent(sub.toLowerCase().replace(/\s+/g, '-'))}`} key={idx}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`flex justify-between items-center py-3 px-4 rounded-lg border border-gray-200 ${color.hoverBg} transition group cursor-pointer`}
                        >
                            <span className={`font-medium ${color.text}`}>{sub}</span>
                            <ArrowForwardIosIcon
                                fontSize="small"
                                className={`opacity-50 group-hover:opacity-100 ${color.text}`}
                            />
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div className="w-full flex flex-col gap-3 mt-auto">
                <Link href={`/course?program=${encodeURIComponent(program)}`}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className={`${color.button} text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer`}
                    >
                        {locale === 'es' ? 'Aprender Más' : 'Learn More'}
                    </motion.button>
                </Link>

                <a
                    href={`mailto:info@la-colaborativa.org?subject=${encodeURIComponent(program)} Program Inquiry`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer"
                    >
                        {locale === 'es' ? 'Contactar' : 'Contact'}
                    </motion.button>
                </a>
            </div>
        </motion.div>
    );
}