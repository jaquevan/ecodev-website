'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Calendar from '@/components/Calendar';
import BubbleBackground from '@/components/Bubble';
import FeatureCard from "@/components/FeatureCard";
import ProgramCards from '@/components/ProgramCards';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';

import mural from '../../public/Mural.jpg';
import classroom from '../../public/classroom.jpg';
import woodwork from '../../public/woodwork.jpg';

import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

import type { StaticImageData } from 'next/image';

type SubItem = {
    label: string;
    slug: string;
};

type ProgramItem = {
    label: string;
    icon: React.ReactNode;
    image?: string | StaticImageData;
    subItems?: SubItem[];
    description?: string;
    slug: string;
};

export default function Home() {
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
    const { ref: connectRef, inView: connectInView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const { locale } = useLanguage();

    const isSpanish = locale === 'es';

    const adultEducationPrograms: ProgramItem[] = [
        {
            label: 'ESOL',
            slug: 'adult-education',
            icon: <SchoolIcon fontSize="small" />,
            image: classroom,
            subItems: [
                { label: isSpanish ? 'ESOL' : 'ESOL', slug: 'esol' },
                { label: isSpanish ? 'Educación Financiera' : 'Financial Literacy', slug: 'financial-literacy' },
                { label: isSpanish ? 'Ciudadanía' : 'Citizenship', slug: 'citizenship' }
            ],
            description: isSpanish
                ? 'Ofrecemos clases de inglés, educación digital, ciudadanía y más.'
                : 'We offer ESOL, digital literacy, citizenship, and more.'
        }
    ];

    const workforceDevelopmentPrograms: ProgramItem[] = [
        {
            label: isSpanish ? 'Atención Médica' : 'Healthcare',
            slug: 'workforce-development',
            icon: <HealthAndSafetyIcon fontSize="small" />,
            image: woodwork,
            subItems: [
                { label: isSpanish ? 'Empleos Verdes' : 'Green Jobs', slug: 'green-jobs' },
                { label: isSpanish ? 'HVAC' : 'HVAC', slug: 'hvac' }
            ],
            description: isSpanish
                ? 'Entrenamiento en salud comunitaria, HVAC, energía limpia, y más.'
                : 'Training in community health, HVAC, clean energy, and more.'
        }
    ];

    const jobReadinessPrograms: ProgramItem[] = [
        {
            label: isSpanish ? 'Preparación Laboral' : 'Job Readiness',
            slug: 'job-readiness',
            icon: <WorkIcon fontSize="small" />,
            image: mural,
            subItems: [
                { label: isSpanish ? 'Currículum' : 'Resume Writing', slug: 'resume' },
                { label: isSpanish ? 'Entrevistas' : 'Interview Skills', slug: 'interview-skills' }
            ],
            description: isSpanish
                ? 'Talleres de búsqueda de empleo y preparación profesional.'
                : 'Workshops on job search and career readiness.'
        }
    ];

    const bubbles = [
        { color: '#9EDED5', size: 100, top: '5%', left: '10%', delay: '0s' },
        { color: '#98FB98', size: 220, top: '7%', left: '50%', delay: '2.2s' },
        { color: '#FFD700', size: 120, top: '25%', left: '25%', delay: '0.7s' },
        { color: '#98FB98', size: 300, top: '40%', left: '88%', delay: '1.2s' },
        { color: '#7FD1AE', size: 220, top: '60%', left: '5%', delay: '1.8s' },
        { color: '#F47820', size: 270, top: '70%', left: '60%', delay: '2.2s' },
        { color: '#B5EAD7', size: 260, top: '85%', left: '40%', delay: '2.6s' },
        { color: '#F47820', size: 200, top: '30%', left: '45%', delay: '3.0s' },
    ];

    return (
        <>
            <Nav />
            <div className="relative min-h-screen overflow-hidden">
                <BubbleBackground bubbles={bubbles} />

                <main className="relative px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 space-y-20 max-w-screen-2xl mx-auto">

                    {/* ───────────────────────── HERO ───────────────────────── */}
                    <section ref={heroRef}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                            {/* Text + FeatureCard */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className="w-full"
                            >
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
                  <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                    {isSpanish ? 'Desarrollo Económico' : 'Economic Development'}
                  </span>
                                </h1>

                                {/* Centered underline on all breakpoints */}
                                <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-6" />

                                <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center md:text-left font-light max-w-2xl mx-auto md:mx-0 mb-8">
                                    {isSpanish
                                        ? 'El Departamento de Movilidad y Sostenibilidad Económica de La Colaborativa es un equipo comprometido con promover el crecimiento económico y la movilidad social dentro de nuestra comunidad. A través de la gestión y ejecución de programas educativos, de preparación para el empleo y desarrollo laboral, trabajamos para ofrecer herramientas, conocimientos y apoyo personalizado que permitan a los miembros mejorar sus habilidades, acceder a mejores oportunidades laborales y construir un futuro sostenible y próspero.'
                                        : 'The Mobility and Economic Sustainability Department at La Colaborativa is a team dedicated to promoting economic growth and social mobility within our community. By managing and delivering educational, job readiness, and workforce development programs, we provide tools, knowledge, and personalized support to help community members improve their skills, access better job opportunities, and build a sustainable and prosperous future.'}
                                </p>

                                <div className="w-full max-w-md md:max-w-lg mx-auto md:mx-0">
                                    <FeatureCard />
                                </div>
                            </motion.div>

                            {/* Calendar */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="w-full"
                            >
                                <div className="w-full pt-3 rounded-lg shadow-md max-w-full md:max-w-xl mx-auto">
                                    <Calendar showWalkInOnly={true} />
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* ─────────────────────── PROGRAMS ─────────────────────── */}
                    <section>
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                            {isSpanish ? 'Explora Nuestros Programas' : 'Explore Our Programs'}
                        </h2>
                        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
                            {isSpanish
                                ? 'Nuestros programas cubren educación para adultos, preparación laboral, y desarrollo profesional.'
                                : 'Our programs include adult education, job readiness, and professional development.'}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            <ProgramCards
                                title={isSpanish ? 'Educación para Adultos' : 'Adult Education'}
                                program="adult-education"
                                items={adultEducationPrograms.map(program => ({
                                    ...program,
                                    subItems: program.subItems?.map(sub => sub.label),
                                }))}
                                colorScheme="indigo"
                            />
                            <ProgramCards
                                title={isSpanish ? 'Desarrollo Laboral' : 'Workforce Development'}
                                program="workforce-development"
                                items={workforceDevelopmentPrograms.map(program => ({
                                    ...program,
                                    subItems: program.subItems?.map(sub => sub.label),
                                }))}
                                colorScheme="teal"
                            />
                            <ProgramCards
                                title={isSpanish ? 'Preparación Laboral' : 'Job Readiness'}
                                program="job-readiness"
                                items={jobReadinessPrograms.map(program => ({
                                    ...program,
                                    subItems: program.subItems?.map(sub => sub.label),
                                }))}
                                colorScheme="amber"
                            />
                        </div>
                    </section>

                    {/* ─────────────────────── CONNECT BANNER ─────────────────────── */}
                    <section
                        ref={connectRef}
                        className="bg-gradient-to-r from-teal-700 to-orange-300 p-6 sm:p-8 rounded-xl shadow-lg text-white text-center border-2 border-teal-600 max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={connectInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                                {isSpanish ? 'Conecta con un Asesor' : 'Connect with an Advisor'}
                            </h3>
                            <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                                {isSpanish
                                    ? 'Contáctanos para obtener más información sobre nuestros programas de búsqueda de empleo.'
                                    : 'Get in touch to learn more about our job support programs.'}
                            </p>
                            <button className="bg-teal-800 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition">
                                {isSpanish ? 'Conectar Ahora' : 'Connect Now'}
                            </button>
                        </motion.div>
                    </section>

                </main>
            </div>
            <Footer />
        </>
    );
}
