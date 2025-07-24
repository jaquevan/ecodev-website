'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Calendar from '@/components/Calendar';
import BubbleBackground from '@/components/Bubble';
import FeatureCard from "@/components/FeatureCard";
import ProgramCards from '@/components/ProgramCards';

import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import type {StaticImageData} from 'next/image';
import {useLanguage} from '@/context/LanguageContext';

import mural from '../../public/Mural.jpg';
import classroom from '../../public/classroom.jpg';
import woodwork from '../../public/woodwork.jpg';

import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

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
    const {ref: heroRef, inView: heroInView} = useInView({triggerOnce: true});
    const {ref: connectRef, inView: connectInView} = useInView({triggerOnce: true, threshold: 0.3});
    const {locale} = useLanguage();

    const isSpanish = locale === 'es';

    const adultEducationPrograms: ProgramItem[] = [
        {
            label: 'ESOL',
            slug: 'adult-education',
            icon: <SchoolIcon fontSize="small" />,
            image: classroom,
            description: isSpanish
                ? 'Ofrecemos clases de inglés contextualizado, educación digital, ciudadanía y educación\n' +
                'financiera para fortalecer las habilidades básicas y apoyar el desarrollo integral de\n' +
                'nuestra comunidad.'
                : 'We offer contextualized English classes, digital education, citizenship, and financial\n' +
                'literacy to strengthen basic skills and support the comprehensive development of our\n' +
                'community.',
            subItems: isSpanish
                ? [
                    { label: 'ESOL', slug: 'esol' },
                    { label: 'Educación Financiera', slug: 'educacion-financiera' },
                    { label: 'Participación Cívica y Ciudadanía', slug: 'participacion-civica' },
                    { label: 'Equidad Digital', slug: 'equidad-digital' },
                ]
                : [
                    { label: 'ESOL', slug: 'esol' },
                    { label: 'Financial Literacy', slug: 'financial-literacy' },
                    { label: 'Civic Engagement and Citizenship', slug: 'civic-engagement' },
                    { label: 'Digital Equity', slug: 'digital-equity' },
                ],
        },
    ];

    const workforceDevelopmentPrograms: ProgramItem[] = [
        {
            label: isSpanish ? 'Atención Médica' : 'Health Care',
            slug: 'workforce-development',
            icon: <HealthAndSafetyIcon fontSize="small" />,
            image: woodwork,
            description: isSpanish
                ? 'Brindamos entrenamientos en áreas como Community Health Workers (CHW), energía\n' +
                'limpia, carpintería tipo pre-apprenticeship, weatherization y HVAC para jóvenes adultos,\n' +
                'junto con certificaciones como OSHA y CPR para mejorar las oportunidades laborales.'
                : 'We provide training in areas such as Community Health Workers (CHW), clean energy,\n' +
                'pre-apprenticeship carpentry, weatherization, and HVAC for young adults, along with\n' +
                'certifications like OSHA and CPR to improve employment opportunities.',
            subItems: isSpanish
                ? [
                    { label: 'Empleos Verdes y Energía Limpia', slug: 'empleos-verdes' },
                    { label: 'Climatización', slug: 'climatizacion' },
                    { label: 'HVAC', slug: 'hvac' },
                ]
                : [
                    { label: 'Green Jobs and Clean Energy', slug: 'green-jobs' },
                    { label: 'Weatherization', slug: 'weatherization' },
                    { label: 'HVAC', slug: 'hvac' },
                ],
        },
    ];

    const jobReadinessPrograms: ProgramItem[] = [
        {
            label: isSpanish ? 'Redacción de Currículum' : 'Resume Writing',
            slug: 'job-readiness',
            icon: <WorkIcon fontSize="small" />,
            image: mural,
            description: isSpanish
                ? 'Realizamos talleres de búsqueda de empleo, aplicación\n' +
                'a trabajos y sesiones individuales para ayudar a los miembros a crear currículums y\n' +
                'prepararse para el mercado laboral en Estados Unidos.'
                : 'We conduct workshops on job searching, applications, and provide one-on-one\n' +
                'sessions to help members create resumes and prepare for the job market in the United\n' +
                'States.',
            subItems: isSpanish
                ? [
                    { label: 'Habilidades para Entrevistas', slug: 'habilidades-entrevistas' },
                    { label: 'Apoyo en la Búsqueda de Empleo', slug: 'apoyo-busqueda' },
                ]
                : [
                    { label: 'Interview Skills', slug: 'interview-skills' },
                    { label: 'Job Search Support', slug: 'job-search-support' },
                ],
        },
    ];

    const bubbles = [
        {color: '#9EDED5', size: 100, top: '5%', left: '10%', delay: '0s'},
        {color: '#98FB98', size: 220, top: '7%', left: '50%', delay: '2.2s'},
        {color: '#FFD700', size: 120, top: '25%', left: '25%', delay: '0.7s'},
        {color: '#98FB98', size: 300, top: '40%', left: '88%', delay: '1.2s'},
        {color: '#7FD1AE', size: 220, top: '60%', left: '5%', delay: '1.8s'},
        {color: '#F47820', size: 270, top: '70%', left: '60%', delay: '2.2s'},
        {color: '#B5EAD7', size: 260, top: '85%', left: '40%', delay: '2.6s'},
        {color: '#F47820', size: 200, top: '30%', left: '45%', delay: '3.0s'},
    ];

    return (
        <>
            <Nav/>
            <div className="relative min-h-screen overflow-hidden">
                <BubbleBackground bubbles={bubbles}/>

                <main
                    className="relative px-2 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20 space-y-16 sm:space-y-24 md:space-y-32 max-w-screen-2xl mx-auto">
                    <section ref={heroRef} className="px-2 sm:px-0">
                        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start max-w-8xl mx-auto">
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={heroInView ? {opacity: 1, y: 0} : {}}
                                transition={{duration: 0.5, ease: 'easeOut'}}
                                className="max-w-xl mx-auto w-full px-0 -mt-6 sm:-mt-8 md:-mt-12"
                            >
                                <div className="mb-6 sm:mb-8 relative">
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-center relative z-10">
                                      <span
                                          className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                                        {isSpanish ? 'Desarrollo Económico' : 'Economic Development'}
                                      </span>
                                    </h1>
                                    <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-4"></div>

                                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed text-center font-light">
                                        {isSpanish
                                            ? `El Departamento de Movilidad y Sostenibilidad Económica de La Colaborativa es\n
                                                un equipo comprometido con promover el crecimiento económico y la movilidad social\n
                                                dentro de nuestra comunidad. A través de la gestión y ejecución de programas\n
                                                educativos, de preparación para el empleo y desarrollo laboral, trabajamos para ofrecer\n
                                                herramientas, conocimientos y apoyo personalizado que permitan a los miembros\n
                                                mejorar sus habilidades, acceder a mejores oportunidades laborales y construir un\n
                                                futuro sostenible y próspero.`
                                            : `The Mobility and Economic Sustainability Department at La Colaborativa is a team\n
                                                dedicated to promoting economic growth and social mobility within our community. By\n
                                                managing and delivering educational, job readiness, and workforce development\n
                                                programs, we provide tools, knowledge, and personalized support to help community\n
                                                members improve their skills, access better job opportunities, and build a sustainable\n
                                                and prosperous future.`}
                                    </p>
                                </div>
                                <div className="mx-auto p-0">
                                    <FeatureCard/>
                                </div>
                            </motion.div>

                            <div className="w-full max-w-xxl mx-auto mt-4 sm:mt-6 md:mt-8 px-2">
                                <Calendar showWalkInOnly={true}/>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 sm:mb-6">
                            {isSpanish ? 'Explora Nuestros Programas' : 'Explore Our Programs'}
                        </h1>
                        <h4 className="text-base sm:text-lg font-semibold text-center mb-8 sm:mb-12 text-slate-800 px-2">
                            {isSpanish
                                ? 'Impulsamos cambios duraderos a través del desarrollo e implementación de nuestros programas integrales.'
                                : 'We drive lasting change through the development and implementation of our comprehensive programs.'}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0 max-w-7xl mx-auto">
                            <ProgramCards
                                title={isSpanish ? 'Educación para Adultos' : 'Adult Education'}
                                program="Adult Education"
                                items={adultEducationPrograms.map(program => ({
                                    ...program,
                                    subItems: program.subItems?.map(subItem => subItem.label),
                                }))}
                                colorScheme="indigo"
                            />

                            <ProgramCards
                                title={isSpanish ? 'Desarrollo de la Fuerza Laboral' : 'Workforce Development'}
                                program="Workforce Development"
                                items={workforceDevelopmentPrograms.map(program => ({
                                    ...program,
                                    subItems: program.subItems?.map(subItem => subItem.label),
                                }))}                                colorScheme="teal"
                            />

                            <ProgramCards
                                title={isSpanish ? 'Preparación Laboral' : 'Job Readiness'}
                                program="Job Readiness"
                                items={jobReadinessPrograms.map(program => ({
                                    ...program,
                                    subItems: program.subItems?.map(subItem => subItem.label),
                                }))}
                                colorScheme="amber"
                            />
                        </div>
                    </section>

                    <section
                        ref={connectRef}
                        className="bg-gradient-to-r from-teal-700 to-orange-300 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg text-white text-center border-teal-600 border-2 mx-auto max-w-5xl"
                    >
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={connectInView ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.5, ease: 'easeOut'}}
                        >
                            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                                {isSpanish ? 'Conecta con un Asesor' : 'Connect with an Advisor'}
                            </h3>
                        </motion.div>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={connectInView ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.7, ease: 'easeOut'}}
                        >
                            <p className="mb-4 sm:mb-6 text-base sm:text-lg">
                                {isSpanish
                                    ? 'Contáctanos para obtener más información sobre nuestros programas de búsqueda y colocación laboral.'
                                    : 'Get in touch to learn more about our Job Search & Placement programs.'}
                            </p>
                        </motion.div>
                        <div>
                            <button
                                className="bg-teal-800 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-teal-700 hover:shadow-lg transition">
                                {isSpanish ? 'Conectar Ahora' : 'Connect Now'}
                            </button>
                        </div>
                    </section>
                </main>
            </div>
            <Footer/>
        </>
    );
}