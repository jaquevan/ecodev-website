"use client"

import { useState, useRef } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import InputField from '@/components/InputField'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import LockIcon from '@mui/icons-material/Lock'

export default function ChatPage() {
    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })

    const formRef = useRef<HTMLFormElement>(null)
    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const { locale } = useLanguage()
    const isSpanish = locale === 'es'

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')

    const [validName, setValidName] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validPhone, setValidPhone] = useState(false)
    const [validLocation, setValidLocation] = useState(false)

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setName(val)
        setValidName(val.trim().length > 1)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setEmail(val)
        setValidEmail(e.target.validity.valid)
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setPhone(val)
        setValidPhone(/^[\d+\-\s()]{7,}$/.test(val))
    }

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setLocation(val)
        setValidLocation(val.trim().length > 1)
    }

    const allValid = validName && validEmail && validPhone && validLocation

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!allValid) return

        const userId = crypto.randomUUID()
        const payload = { userId, data: { name, email, phone, location } }

        await fetch('https://resume-bot-896334112971.europe-west1.run.app/api/savePersonalInfo', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        window.location.href = `/chatbot/bot?userId=${userId}`
    }

    return (
        <>
            <Nav />

            <section ref={heroRef} className="px-2 sm:px-0 pt-10 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="container mx-auto px-4 text-center"
                >
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative z-10">
              <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                {isSpanish ? 'Creador de Currículum' : 'Resume Builder'}
              </span>
                        </h1>
                        <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-6" />

                        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 font-light max-w-2xl mx-auto">
                            {isSpanish ? 'Cree un Currículum Vitae Destacado en Minutos.' : 'Build a standout resume in minutes.'}
                        </p>
                    </div>

                    <div className="container mx-auto px-4 py-12 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="bg-gray-200 rounded-xl overflow-hidden aspect-video relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">
                    {isSpanish ? 'Video Instructivo' : 'Instructional Video'}
                  </span>
                                </div>
                            </div>

                            <div className="space-y-6 text-left">
                                <h2 className="text-3xl font-semibold text-[#00464D]">
                                    {isSpanish ? 'Tu Asesor Personal de CV, Impulsado por AI' : 'Your Personal Resume Coach, Powered by AI'}
                                </h2>
                                <p className="text-gray-600">
                                    {isSpanish
                                        ? 'Usa nuestra herramienta con inteligencia artificial para crear tu currículum de forma\n' +
                                        'fácil y rápida. Recibe ayuda personalizada para destacar tus habilidades y\n' +
                                        'experiencias, y prepárate para aplicar a los mejores empleos.'
                                        : 'Use our AI-powered tool to create your resume quickly and easily. Get personalized\n' +
                                        'assistance to highlight your skills and experience, and get ready to apply for the best\n' +
                                        'jobs.'}
                                </p>
                                <button
                                    onClick={scrollToForm}
                                    className="group inline-flex items-center gap-2 bg-[#FF7001] hover:bg-[#FF8C33] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    {isSpanish ? 'Empezar' : 'Get Started'}
                                    <ArrowDownwardIcon className="transition-transform duration-300 group-hover:translate-y-1" fontSize="small" />
                                </button>
                            </div>
                        </div>

                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="mt-28 max-w-2xl mx-auto bg-white/90 backdrop-blur border border-gray-200 p-10 rounded-2xl shadow-md grid gap-6"
                            style={{ scrollMarginTop: '130px' }}
                            noValidate
                        >
                            <h3 className="text-2xl font-semibold text-[#00464D] text-center">
                                {isSpanish ? 'Comience ingresando sus datos' : 'Start by entering your details'}
                            </h3>

                            <InputField
                                id="name"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                placeholder={isSpanish ? 'Nombre completo' : 'Full Name'}
                                valid={validName}
                            />
                            <InputField
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder={isSpanish ? 'Correo electrónico' : 'Email'}
                                valid={validEmail}
                            />
                            <InputField
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder={isSpanish ? 'Teléfono' : 'Phone'}
                                valid={validPhone}
                            />
                            <InputField
                                id="location"
                                type="text"
                                value={location}
                                onChange={handleLocationChange}
                                placeholder={isSpanish ? 'Ubicación' : 'Location'}
                                valid={validLocation}
                            />

                            <button
                                type="submit"
                                disabled={!allValid}
                                className={`w-full flex justify-center items-center gap-2 ${
                                    allValid
                                        ? 'bg-[#FF7001] hover:bg-[#FF8C33] shadow-md hover:shadow-lg'
                                        : 'bg-gray-300 cursor-not-allowed'
                                } text-white font-semibold py-3 rounded-lg transition-all`}
                            >
                                {isSpanish ? 'Continuar al Chat' : 'Continue to Chatbot'}
                            </button>

                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1 justify-center">
                                <LockIcon fontSize="small" />
                                {isSpanish ? 'Tu información es privada y segura.' : 'Your information is private and secure.'}
                            </p>
                        </form>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </>
    )
}
