'use client'

import Image from 'next/image'
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
    locale: string
    className?: string
}


const ContactCard = ({ title, description, contact, subject, icon, className, locale }: ContactCardProps) => {
    const handleEmailClick = () => {
        const mailto = `mailto:${contact}?subject=${encodeURIComponent(subject)}`
        window.open(mailto, '_blank')
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`group bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-xl hover:ring-2 hover:ring-amber-400 transition-all duration-300 ${className || ''}`}
        >
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full group-hover:scale-105 transition-transform duration-300">
                <Image src={icon} alt={`${title} icon`} width={80} height={80} />
            </div>
            <h3 className="text-lg font-semibold text-[#00464D] mb-2">{title}</h3>
            <p className="text-sm text-gray-700 mb-3">{description}</p>
            <p className="text-xs text-gray-400 mb-4">{contact}</p>
            <button
                onClick={handleEmailClick}
                className="mt-auto w-full bg-[#00464D] text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-[#006d75] transition-all"
            >
                {locale === 'es' ? 'Contactar' : 'Contact'}
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
            <Nav/>

            <section ref={heroRef} className="px-4 sm:px-6 pt-16 pb-10 bg-gradient-to-b from-white to-gray-50">
                <motion.div
                    initial={{opacity: 0, y: 40}}
                    animate={inView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.6, ease: 'easeOut'}}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#00464D]">
                        {isSpanish ? 'Contáctanos' : 'Get in Touch'}
                    </h1>
                    <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-light">
                        {isSpanish
                            ? 'Selecciona un programa o servicio para enviarnos un correo electrónico con tu consulta.'
                            : 'Select a program or service to email us your inquiry.'}
                    </p>
                </motion.div>
            </section>


            <section className="py-14 px-4 sm:px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cards.map((card) => (
                        <ContactCard
                            key={card.key}
                            title={card.title}
                            description={isSpanish ? card.descriptionES : card.descriptionEN}
                            contact={card.contact}
                            subject={card.subject}
                            icon={card.icon}
                            locale={locale}
                        />
                    ))}
                </div>
            </section>


            <section className="pb-24 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-[#00464D]"
                    >
                        {isSpanish ? 'Triaje' : 'Triage'}
                    </motion.h2>
                    <ContactCard
                        title={triageCard.title}
                        description={isSpanish ? triageCard.descriptionES : triageCard.descriptionEN}
                        contact={triageCard.contact}
                        subject={triageCard.subject}
                        icon={triageCard.icon}
                        className="w-full"
                        locale={locale}
                    />
                </div>
            </section>


            <Footer/>
        </>
    )
}