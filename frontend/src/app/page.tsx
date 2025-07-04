'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Calendar from '@/components/Calendar';
import BubbleBackground from '@/components/Bubble';
import FeatureCard from "@/components/FeatureCard";
import ProgramCards from '@/components/ProgramCards';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { StaticImageData } from 'next/image';
import { useLanguage } from '@/context/LanguageContext'; // Fixed import and using the hook

import mural from '../../public/Mural.jpg';
import classroom from '../../public/classroom.jpg';
import woodwork from '../../public/woodwork.jpg';

import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

type ProgramItem = {
    label: string;
    icon: React.ReactNode;
    image?: string | StaticImageData;
    subItems?: string[];
};

// Animation variants for the Connect section
const connectSectionVariants: Variants = {
    initial: {
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        y: 0
    },
    animate: {
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
        y: -5,
        transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse" as const
        }
    }
};

export default function Home() {
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
    const { ref: connectRef, inView: connectInView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const { locale } = useLanguage(); // Using the correct hook and property name

    // Spanish translations - using ternary operators for content
    const isSpanish = locale === 'es';

    const adultEducationPrograms: ProgramItem[] = [
        {
            label: 'ESOL',
            icon: <SchoolIcon fontSize="small" />,
            image: classroom,
            subItems: isSpanish
                ? ['ESOL', 'Educación Financiera', 'Participación Cívica y Ciudadanía', 'Equidad Digital']
                : ['ESOL', 'Financial Literacy', 'Civic Engagement and Citizenship', 'Digital Equity'],
        },
    ];

    const workforceDevelopmentPrograms: ProgramItem[] = [
        {
            label: isSpanish ? 'Atención Médica' : 'Health Care',
            icon: <HealthAndSafetyIcon fontSize="small" />,
            image: woodwork,
            subItems: isSpanish
                ? ['Empleos Verdes y Energía Limpia', 'Climatización', 'HVAC']
                : ['Green Jobs and Clean Energy', 'Weatherization', 'HVAC'],
        },
    ];

    const jobReadinessPrograms: ProgramItem[] = [
        {
            label: isSpanish ? 'Redacción de Currículum' : 'Resume Writing',
            icon: <WorkIcon fontSize="small" />,
            image: mural,
            subItems: isSpanish
                ? ['Habilidades para Entrevistas', 'Apoyo en la Búsqueda de Empleo']
                : ['Interview Skills', 'Job Search Support'],
        },
    ];

    const bubbles = [
        { color: '#9EDED5', size: 100, top: '5%', left: '10%', delay: '0s' },
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

                <main className="relative px-6 md:px-10 lg:px-16 py-20 space-y-32 max-w-screen-2xl mx-auto">
                    {/* Hero Section */}
                    <section ref={heroRef} className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="max-w-xl"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 leading-tight">
                                {isSpanish ? 'Desarrollo Económico' : 'Economic Development'}
                            </h1>

                            <p className="text-gray-700 text-lg leading-relaxed">
                                {isSpanish
                                    ? 'La Colaborativa ofrece apoyo contextualizado para empoderar a nuestra comunidad hacia la independencia financiera. Proporcionamos vías holísticas de desarrollo de la fuerza laboral para personas entre las edades de 14 y 60 años, asegurando que tengan las herramientas y recursos necesarios para tener éxito en el mercado laboral.'
                                    : 'La Colaborativa offers contextualized support to empower our community towards financial independence. We provide holistic workforce development pathways for individuals between the ages of 14–60, ensuring they have the necessary tools and resources to succeed in the workforce.'}
                            </p>
                            <div className="m-6">
                                <FeatureCard />
                            </div>
                        </motion.div>

                        <div className="w-full max-w-3xl mx-auto my-12 lg:mx-0">
                            <Calendar showWalkInOnly={true} />
                        </div>
                    </section>

                    {/* Programs Section */}
                    <section>
                        <h1 className="text-5xl font-semibold text-center mb-6">
                            {isSpanish ? 'Explora Nuestros Programas' : 'Explore Our Programs'}
                        </h1>
                        <h4 className="text-lg font-semibold text-center mb-12 text-slate-800">
                            {isSpanish
                                ? 'Impulsamos cambios duraderos a través del desarrollo e implementación de nuestros programas integrales.'
                                : 'We drive lasting change through the development and implementation of our comprehensive programs.'}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <ProgramCards
                                title={isSpanish ? 'Educación para Adultos' : 'Adult Education'}
                                category="ae"
                                items={adultEducationPrograms}
                                colorScheme="indigo"
                            />
                            <ProgramCards
                                title={isSpanish ? 'Desarrollo de la Fuerza Laboral' : 'Workforce Development'}
                                category="wd"
                                items={workforceDevelopmentPrograms}
                                colorScheme="teal"
                            />
                            <ProgramCards
                                title={isSpanish ? 'Preparación Laboral' : 'Job Readiness'}
                                category="jr"
                                items={jobReadinessPrograms}
                                colorScheme="amber"
                            />
                        </div>
                    </section>

                    {/* Connect Section with subtle animation */}
                    <motion.section
                        ref={connectRef}
                        className="bg-gradient-to-r from-teal-700 to-orange-300 p-10 rounded-xl shadow-lg text-white text-center border-teal-600 border-2"
                        variants={connectSectionVariants}
                        initial="initial"
                        animate={connectInView ? "animate" : "initial"}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            <h3 className="text-3xl font-bold mb-4">
                                {isSpanish ? 'Conecta con un Asesor' : 'Connect with an Advisor'}
                            </h3>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                        >
                            <p className="mb-6 text-lg">
                                {isSpanish
                                    ? 'Contáctanos para obtener más información sobre nuestros programas de búsqueda y colocación laboral.'
                                    : 'Get in touch to learn more about our Job Search & Placement programs.'}
                            </p>
                        </motion.div>
                        <div>
                            <button className="bg-teal-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 hover:shadow-lg transition">
                                {isSpanish ? 'Conectar Ahora' : 'Connect Now'}
                            </button>
                        </div>
                    </motion.section>
                </main>
            </div>
            <Footer />
        </>
    );
}