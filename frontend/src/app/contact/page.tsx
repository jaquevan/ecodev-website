'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type CardData = {
    key: string
    title: string
    descriptionEN: string
    descriptionES: string
    contact: string
    subject: string
    icon: string
}

const cards: CardData[] = [
    {
        key: 'job-readiness',
        title: 'Job Readiness',
        descriptionEN: 'Receive support throughout the job search process',
        descriptionES: 'Recibe apoyo para la búsqueda de empleo',
        contact: 'clarad@la-colaborativa.org',
        subject: 'Job Readiness Inquiry',
        icon: '/icons/JobReadiness.svg',
    },
    {
        key: 'snap-path',
        title: 'SNAP Path to Work',
        descriptionEN: 'Do you receive SNAP and are looking for a job?',
        descriptionES: '¿Recibes SNAP y estás buscando un trabajo?',
        contact: 'pablod@la-colaborativa.org',
        subject: 'SNAP Path to Work Inquiry',
        icon: '/icons/SNAP.svg',
    },
    {
        key: 'esol',
        title: 'ESOL',
        descriptionEN: 'Enroll in English classes',
        descriptionES: 'Registrate para clases de inglés',
        contact: 'catherinet@la-colaborativa.org',
        subject: 'ESOL Inquiry',
        icon: '/icons/ESOL.svg',
    },
    {
        key: 'ciudadania',
        title: 'Ciudadanía',
        descriptionEN: 'Do you want help requesting citizenship?',
        descriptionES: '¿Quieres ayuda en solicitar la ciudadanía?',
        contact: 'abigailb@la-colaborativa.org',
        subject: 'Ciudadanía Inquiry',
        icon: '/icons/Citizenship.svg',
    },
    {
        key: 'computacion',
        title: 'Computación',
        descriptionEN: 'Enroll in beginner, intermediate, or advanced computer classes',
        descriptionES: 'Registrate en clases de computación sin importar tu conocimiento previo de computación',
        contact: 'catherinet@la-colaborativa.org',
        subject: 'Computación Inquiry',
        icon: '/icons/ComputerClasses.svg',
    },
    {
        key: 'financial-literacy',
        title: 'Financial Literacy',
        descriptionEN: 'Learn how to manage your finances',
        descriptionES: 'Aprende a manejar tu dinero',
        contact: 'abigailb@la-colaborativa.org',
        subject: 'Financial Literacy Inquiry',
        icon: '/icons/FinancialLiteracy.svg',
    },
    {
        key: 'workforce-development',
        title: 'Workforce Development',
        descriptionEN: 'Inquire what certifications we have available',
        descriptionES: 'Pregunta qué capacitaciones laborales están disponibles',
        contact: 'brendanm@la-colaborativa.org',
        subject: 'Workforce Development Inquiry',
        icon: '/icons/WorkforceDevelopment.svg',
    },
    {
        key: 'entrepreneurship',
        title: 'Entrepreneurship',
        descriptionEN: 'Do you want to start your own business?',
        descriptionES: '¿Quieres empezar tu nuevo negocio?',
        contact: 'karolinab@la-colaborativa.org',
        subject: 'Entrepreneurship Inquiry',
        icon: '/icons/Entrepreneurship.svg',
    },
]

const triageCard: CardData = {
    key: 'triage',
    title: 'Triage',
    descriptionEN: 'Do you need housing support, assistance with DTA, or have other inquiries?',
    descriptionES: '¿Necesitas ayuda con DTA, pagando renta o tienes otras dudas?',
    contact: 'hermano@la-colaborativa.org',
    subject: 'Triage Inquiry',
    icon: '/icons/Triage.svg',
}

type ContactCardProps = {
    title: string
    description: string
    contact: string
    subject: string
    icon: string
    className?: string
}

const ContactCard = ({ title, description, contact, subject, icon, className }: ContactCardProps) => {
    const handleEmailClick = () => {
        const mailto = `mailto:${contact}?subject=${encodeURIComponent(subject)}`
        window.open(mailto, '_blank')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`rounded-xl border border-gray-200 shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${className || ''}`}
        >
            <div className="w-24 h-24 mb-6 flex items-center justify-center">
                <img src={icon} alt="" width={90} height={90} />
            </div>
            <h3 className="text-lg font-semibold text-[#00464D] mb-2">{title}</h3>
            <p className="text-sm text-gray-700 mb-4">{description}</p>
            <p className="text-xs text-gray-400 mb-6">{contact}</p>
            <button
                onClick={handleEmailClick}
                className="mt-auto inline-block bg-[#00464D] text-white text-sm font-medium py-2 px-6 rounded-md hover:bg-[#006d75] transition-all cursor-pointer"
            >
                Contact
            </button>
        </motion.div>
    )
}

export default function ContactPage() {
    const { locale } = useLanguage()
    const isSpanish = locale === 'es'
    const [heroRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    return (
        <>
            <Nav />

            <section ref={heroRef} className="px-4 sm:px-6 pt-16 pb-10 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-[#00464D]">
                        {isSpanish ? 'Contáctanos' : 'Get in Touch'}
                    </h1>
                    <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto font-light">
                        {isSpanish
                            ? 'Selecciona un programa o servicio para enviarnos un correo electrónico con tu consulta.'
                            : 'Select a program or service to email us your inquiry.'}
                    </p>
                </motion.div>
            </section>

            <section className="py-14">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card) => (
                        <ContactCard
                            key={card.key}
                            title={card.title}
                            description={isSpanish ? card.descriptionES : card.descriptionEN}
                            contact={card.contact}
                            subject={card.subject}
                            icon={card.icon}
                        />
                    ))}
                </div>
            </section>

            <section className="bg-white pb-24">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-[#00464D]"
                    >
                        {isSpanish ? 'Triaje' : 'Triage'}
                    </motion.h2>
                    <div className="grid grid-cols-1">
                        <ContactCard
                            title={triageCard.title}
                            description={isSpanish ? triageCard.descriptionES : triageCard.descriptionEN}
                            contact={triageCard.contact}
                            subject={triageCard.subject}
                            icon={triageCard.icon}
                            className="w-full"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}