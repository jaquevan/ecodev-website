'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import dynamic from 'next/dynamic';

const DialogflowBot = dynamic(() => import('@/components/DiagflowBot'), {
    ssr: false,
    loading: () => (
        <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg animate-pulse">
            Loading chat...
        </div>
    )
});

export default function Inner() {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';

    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const [error, setError] = useState<string | null>(null);
    const [isGenerateEnabled, setIsGenerateEnabled] = useState(false);

    const handleSessionEnd = () => {
        setIsGenerateEnabled(true);
    };


    useEffect(() => {
        if (!userId) {
            setError('Missing user ID. Please go back and complete the form.');
        }
    }, [userId]);

    return (
    <>
        <Nav />

        <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            {error ? (
            <div className="text-red-600 text-center text-lg font-medium">
                {error}
            </div>
            ) : (
            <>
                <h1 className="text-3xl font-bold text-[#00464D] mb-4 text-center">
                    {isSpanish ? 'Asistente de CV con AI' : 'AI Resume Assistant'}
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    {isSpanish
                        ? 'Empieza a chatear para construir tu currículum automáticamente.'
                        : 'Start chatting to build your resume automatically.'}
                </p>

                <DialogflowBot key={userId} userId={userId!} onSessionEnd={handleSessionEnd} />
                
                <div className="flex justify-center">
                    <button
                        id="generate-btn"
                        disabled={!isGenerateEnabled}
                        onClick={() => window.location.href = `/chatbot/gen?userId=${userId}`}
                        className={`mt-8 rounded-lg py-3 px-8 font-semibold text-white transition ${
                        isGenerateEnabled
                            ? 'bg-[#FF7001] hover:bg-[#FF8C33] cursor-pointer shadow-md hover:shadow-lg'
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        {isSpanish ? 'GENERAR' : 'GENERATE'}
                    </button>
                </div>
            </>
            )}
        </div>
        </main>
        
        <Footer />
    </>
    );
}
