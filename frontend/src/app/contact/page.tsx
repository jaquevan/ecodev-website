'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

type ContactCardProps = {
    title: string
    description?: string
    subject: string
}

const ContactCard = ({ title, description, subject }: ContactCardProps) => {
    const handleEmailClick = () => {
        const mailto = `mailto:info@lacolaborativa.org?subject=${encodeURIComponent(subject)}`
        window.open(mailto, '_blank')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        >
            <div className="w-16 h-16 mb-4">
                <Image
                    src="/mini_logo.png"
                    alt={title}
                    width={64}
                    height={64}
                    className="object-contain"
                />
            </div>
            <h3 className="text-lg font-semibold text-[#00464D] mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-gray-600 mb-6">{description}</p>
            )}
            <button
                onClick={handleEmailClick}
                className="mt-auto inline-block bg-[#00464D] text-white text-sm font-medium py-2 px-5 rounded-md hover:bg-teal-700 transition-all"
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
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#00464D]">
                        {isSpanish ? 'Contáctanos' : 'Get in Touch'}
                    </h1>
                    <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto font-light">
                        {isSpanish
                            ? 'Selecciona un programa o servicio para enviarnos un correo electrónico con tu consulta.'
                            : 'Select a program or service to email us your inquiry.'}
                    </p>
                </motion.div>
            </section>

            <section className="bg-gray-50 py-12">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ContactCard
                        title="Program 1"
                        description={
                            isSpanish
                                ? 'Descripción del programa próximamente.'
                                : 'Program description coming soon.'
                        }
                        subject="Program 1 Inquiry"
                    />
                    <ContactCard
                        title="Program 2"
                        description={
                            isSpanish
                                ? 'Descripción del programa próximamente.'
                                : 'Program description coming soon.'
                        }
                        subject="Program 2 Inquiry"
                    />
                    <ContactCard
                        title="Program 3"
                        description={
                            isSpanish
                                ? 'Descripción del programa próximamente.'
                                : 'Program description coming soon.'
                        }
                        subject="Program 3 Inquiry"
                    />
                    <ContactCard
                        title="Program 4"
                        description={
                            isSpanish
                                ? 'Descripción del programa próximamente.'
                                : 'Program description coming soon.'
                        }
                        subject="Program 4 Inquiry"
                    />
                    <ContactCard
                        title="Program 5"
                        description={
                            isSpanish
                                ? 'Descripción del programa próximamente.'
                                : 'Program description coming soon.'
                        }
                        subject="Program 5 Inquiry"
                    />
                    <ContactCard
                        title="Program 6"
                        description={
                            isSpanish
                                ? 'Descripción del programa próximamente.'
                                : 'Program description coming soon.'
                        }
                        subject="Program 6 Inquiry"
                    />
                    <ContactCard
                        title="Program 7"
                        description={
                            isSpanish
                                ? 'Descripción del programa próximamente.'
                                : 'Program description coming soon.'
                        }
                        subject="Program 7 Inquiry"
                    />
                    <ContactCard
                        title="Program 8"
                        description={
                            isSpanish
                                ? 'Descripción del programa próximamente.'
                                : 'Program description coming soon.'
                        }
                        subject="Program 8 Inquiry"
                    />
                </div>
            </section>

            <section className="bg-white pb-20">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[#00464D]"
                    >
                        {isSpanish ? 'Triaje' : 'Triage'}
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Leave empty for now */}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
