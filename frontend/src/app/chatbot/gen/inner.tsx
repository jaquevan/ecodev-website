'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import BubbleBackground from '@/components/Bubble';

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'es'>('en');

  const [fileUrls, setFileUrls] = useState({ en: '', es: '' });
  const [fileNames, setFileNames] = useState({ en: '', es: '' });

  const bubbles = [
    { color: '#9EDED5', size: 100, top: '5%', left: '10%', delay: '0s' },
    { color: '#FFD700', size: 120, top: '25%', left: '25%', delay: '0.7s' },
    { color: '#98FB98', size: 300, top: '40%', left: '88%', delay: '1.2s' },
    { color: '#7FD1AE', size: 220, top: '60%', left: '5%', delay: '1.8s' },
    { color: '#F47820', size: 200, top: '30%', left: '45%', delay: '3.0s' },
  ];


  useEffect(() => {
    if (userId) {
      const enName = `${userId}_en.pdf`;
      const esName = `${userId}_es.pdf`;
      const enUrl = `https://storage.googleapis.com/lc-resume-docs/${enName}#toolbar=0&navpanes`;
      const esUrl = `https://storage.googleapis.com/lc-resume-docs/${esName}#toolbar=0&navpanes`;
      setFileNames({ en: enName, es: esName });
      setFileUrls({ en: enUrl, es: esUrl });
    }
  }, [userId]);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
        <h2 className="text-red-600 text-xl font-semibold">
          {isSpanish ? 'Error: falta el ID de usuario' : 'Error: Missing userId'}
        </h2>
      </div>
    );
  }

  const Accordion = ({
    isOpen,
    setIsOpen,
    title,
    children,
  }: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="mb-6 rounded-xl overflow-hidden border border-gray-200 shadow-md bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center font-semibold text-lg text-[#00464D] bg-white hover:bg-gray-50 transition-all"
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-6 border-t border-gray-200 bg-gray-50">{children}</div>
      </div>
    </section>
  );

  return (
    <>
      <Nav />

        <BubbleBackground bubbles={bubbles} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#00464D]">
            {isSpanish ? '¡Tu currículum está listo!' : 'Your Resume is Ready!'}
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-8">
            {isSpanish
              ? 'Te hemos enviado los documentos a tu correo electrónico.'
              : 'We’ve emailed the documents to your inbox.'}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00464D] to-[#FF7001] rounded-full mx-auto"></div>
        </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Preview Section */}
        <Accordion
          isOpen={isPreviewOpen}
          setIsOpen={setIsPreviewOpen}
          title={isSpanish ? 'Vista previa del currículum' : 'Preview Resume'}
        >
          <div>
            {/* Tab Controls */}
            <div className="flex mb-4 border-b border-gray-300">
              <button
                type="button"
                className={`py-2 px-4 font-semibold ${
                  activeTab === 'en'
                    ? 'border-b-4 border-[#00464D] text-[#00464D]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('en')}
              >
                English
              </button>
              <button
                type="button"
                className={`py-2 px-4 font-semibold ml-4 ${
                  activeTab === 'es'
                    ? 'border-b-4 border-[#00464D] text-[#00464D]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('es')}
              >
                Español
              </button>
            </div>

            {/* Iframe Previews */}
            <div className="border rounded-lg shadow-inner overflow-hidden">
              {activeTab === 'en' && (
                <iframe
                  title="English Resume"
                  src={fileUrls.en}
                  className="w-full h-[75vh] bg-white"
                ></iframe>
              )}
              {activeTab === 'es' && (
                <iframe
                  title="Spanish Resume"
                  src={fileUrls.es}
                  className="w-full h-[75vh] bg-white"
                ></iframe>
              )}
            </div>
          </div>
        </Accordion>

        {/* Download Section */}
        <Accordion
          isOpen={isDownloadOpen}
          setIsOpen={setIsDownloadOpen}
          title={isSpanish ? 'Opciones de descarga' : 'Download Options'}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href={fileUrls.en}
              download={fileNames.en}
              className="block text-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow"
            >
              {isSpanish ? 'Descargar PDF en Inglés' : 'Download English PDF'}
            </a>
            <a
              href={fileUrls.es}
              download={fileNames.es}
              className="block text-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow"
            >
              {isSpanish ? 'Descargar PDF en Español' : 'Download Spanish PDF'}
            </a>
          </div>
        </Accordion>

        {/* Help Section */}
        <Accordion
          isOpen={isHelpOpen}
          setIsOpen={setIsHelpOpen}
          title={isSpanish ? 'Ayuda y preguntas frecuentes' : 'Help & FAQ'}
        >
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              {isSpanish
                ? '¿No ves tu currículum? Revisa tu carpeta de spam o intenta descargar de nuevo.'
                : "Can't see your resume? Check your spam folder or try downloading again."}
            </li>
            <li>
              {isSpanish
                ? 'Los documentos también se enviaron a tu correo electrónico.'
                : 'Documents were also emailed to your inbox.'}
            </li>
            <li>
              {isSpanish
                ? 'Para cualquier ayuda, contacta soporte@ejemplo.com.'
                : 'For help, contact support@example.com.'}
            </li>
          </ul>
        </Accordion>

        {/* Start Over Button */}
        <div className="text-center mt-12 ">
          <a
            href="/chatbot"
            className="bg-[#FF7001] hover:bg-[#FF8C33] hover:pointer text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {isSpanish ? 'Empezar de Nuevo' : 'Start Over'}
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
