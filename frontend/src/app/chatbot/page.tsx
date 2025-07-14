"use client"

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Use Next.js dynamic import with SSR disabled for the chatbot
const DialogflowBot = dynamic(() => import('@/components/DiagflowBot'), {
    ssr: false,
    loading: () => (
        <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg animate-pulse">
            Loading chat...
        </div>
    )
});

export default function ChatPage() {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';
    const [isChatOpen, setIsChatOpen] = useState(false);

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [contentRef, contentInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

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
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center relative z-10">
                        <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                            {isSpanish ? 'Asistente de Currículum' : 'Resume Assistant'}
                        </span>
                    </h1>
                    <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-6"></div>

                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 text-center font-light max-w-2xl mx-auto">
                        {isSpanish
                            ? 'Nuestro asistente virtual te ayudará a mejorar tu currículum y responder preguntas sobre búsqueda de empleo.'
                            : 'Our virtual assistant will help you improve your resume and answer your job search questions.'}
                    </p>
                </motion.div>
            </section>

            <div className="bg-white">
                <div ref={contentRef} className="container mx-auto px-4 py-12 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={contentInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div className="bg-gray-200 rounded-xl overflow-hidden aspect-video relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-gray-500">
                                    {isSpanish ? 'Video instructivo' : 'Instructional Video'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-semibold text-teal-700">
                                {isSpanish ? '¿Cómo puede ayudarte?' : 'How can it help you?'}
                            </h2>
                            <p className="text-gray-600">
                                {isSpanish
                                    ? 'Nuestro asistente de IA puede ayudarte a redactar un currículum efectivo.'
                                    : 'Our AI assistant can help you craft an effective resume.'}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsChatOpen(true)}
                                className="bg-[#FF7001] hover:bg-[#FF8C33] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                {isSpanish ? 'Iniciar Chat' : 'Start Chat'}
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={contentInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                        className="mt-16 text-center"
                    >
                        <h3 className="text-2xl font-semibold text-teal-700 mb-4">
                            {isSpanish ? '¿Listo para empezar?' : 'Ready to get started?'}
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {isSpanish
                                ? 'Haz clic en el botón de chat para comenzar una conversación con nuestro asistente.'
                                : 'Click the chat button to start a conversation with our assistant.'}
                        </p>
                    </motion.div>
                </div>
            </div>

            {isChatOpen && <DialogflowBot />}

            <Footer />
        </>
    );
}