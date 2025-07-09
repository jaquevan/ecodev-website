"use client"

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import dynamic from 'next/dynamic';

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

    return (
        <>
            <Nav />

            <div className="bg-gradient-to-b from-[#00464D]/10 to-white">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#00464D]">
                        {isSpanish ? 'Asistente de Currículum' : 'Resume Assistant'}
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-8">
                        {isSpanish
                            ? 'Nuestro asistente virtual te ayudará a mejorar tu currículum y responder preguntas sobre búsqueda de empleo.'
                            : 'Our virtual assistant will help you improve your resume and answer your job search questions.'}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#00464D] to-[#FF7001] rounded-full mx-auto"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-gray-200 rounded-xl overflow-hidden aspect-video relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-500">
                                {isSpanish ? 'Video instructivo' : 'Instructional Video'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold text-[#00464D]">
                            {isSpanish ? '¿Cómo puede ayudarte?' : 'How can it help you?'}
                        </h2>
                        <p className="text-gray-600">
                            {isSpanish
                                ? 'Nuestro asistente de IA puede ayudarte a redactar un currículum efectivo.'
                                : 'Our AI assistant can help you craft an effective resume.'}
                        </p>
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="bg-[#FF7001] hover:bg-[#FF8C33] hover:pointer text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            {isSpanish ? 'Iniciar Chat' : 'Start Chat'}
                        </button>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-semibold text-[#00464D] mb-4">
                        {isSpanish ? '¿Listo para empezar?' : 'Ready to get started?'}
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {isSpanish
                            ? 'Haz clic en el botón de chat para comenzar una conversación con nuestro asistente.'
                            : 'Click the chat button to start a conversation with our assistant.'}
                    </p>
                </div>
            </div>

            {isChatOpen && <DialogflowBot />}

            <Footer />
        </>
    );
}