'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';

import { useLanguage } from '@/context/LanguageContext';
import BubbleBackground from '@/components/Bubble';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function GeneratePage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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

  const [loading, setLoading] = useState({ en: true, es: true });

  const bubbles = [
    { color: '#9EDED5', size: 100, top: '15%', left: '10%', delay: '0s' },
    { color: '#FFD700', size: 120, top: '25%', left: '25%', delay: '0.7s' },
    { color: '#98FB98', size: 300, top: '40%', left: '88%', delay: '1.2s' },
    { color: '#7FD1AE', size: 220, top: '60%', left: '5%', delay: '1.8s' },
    { color: '#F47820', size: 200, top: '30%', left: '65%', delay: '3.0s' },
  ];

  const checkIfFileExists = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (userId) {
      const enName = `${userId}_en.pdf`;
      const esName = `${userId}_es.pdf`;
      const enUrl = `https://storage.googleapis.com/lc-resume-docs/${enName}`;
      const esUrl = `https://storage.googleapis.com/lc-resume-docs/${esName}`;

      setFileNames({ en: enName, es: esName });
      setFileUrls({ en: enUrl, es: esUrl });

      const waitAndCheck = async () => {
        let enReady = false;
        let esReady = false;
        let retries = 10;

        while (retries-- > 0 && (!enReady || !esReady)) {
          if (!enReady) enReady = await checkIfFileExists(enUrl);
          if (!esReady) esReady = await checkIfFileExists(esUrl);

          if (!enReady || !esReady) {
            await new Promise(r => setTimeout(r, 1500));
          }
        }

        setLoading({ en: !enReady ? false : false, es: !esReady ? false : false });
      };

      waitAndCheck();
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
        <section ref={heroRef} className="px-2 sm:px-0 pt-10 pb-8">
            <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="container mx-auto px-4 text-center"
            >
              <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center relative z-10">
                  <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                    {isSpanish ? '¡Tu currículum está listo!' : 'Your Resume is Ready!'}
                  </span>
                </h1>
                <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-8">
                  {isSpanish
                    ? 'Te hemos enviado los documentos a tu correo electrónico.'
                    : 'We’ve emailed the documents to your inbox.'}
                </p>
                <div className="h-1.5 w-24 bg-orange-300 mx-auto rounded-full mb-6"></div>
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
                  {/* Tab Controls */}
                  <div className="flex mb-4 border-b border-gray-300">
                    <button
                      type="button"
                      className={`py-3 px-6 font-semibold rounded-t-lg transition-all ${
                        activeTab === 'en'
                          ? 'border-b-4 border-[#FF7001] bg-[#FFE6CC] text-[#FF7001] shadow-md'
                          : 'border-b-4 border-transparent text-[#FF7001] bg-[rgba(255,230,204,0.45)] hover:bg-[rgba(255,230,204,0.65)]'
                      }`}
                      onClick={() => setActiveTab('en')}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      className={`py-3 px-6 font-semibold rounded-t-lg ml-4 transition-all ${
                        activeTab === 'es'
                          ? 'border-b-4 border-[#FF7001] bg-[#FFE6CC] text-[#FF7001] shadow-md'
                          : 'border-b-4 border-transparent text-[#FF7001] bg-[rgba(255,230,204,0.45)] hover:bg-[rgba(255,230,204,0.65)]'
                      }`}
                      onClick={() => setActiveTab('es')}
                    >
                      Español
                    </button>
                  </div>




                  {/* Iframe Previews */}
                  <div className="border rounded-lg shadow-inner overflow-hidden">
                    {activeTab === 'en' && (
                      !loading.en ? (
                        <iframe
                          title="English Resume"
                          src={`${fileUrls.en}#toolbar=0&navpanes=0`}
                          className="w-full h-[75vh] bg-white"
                        />
                      ) : (
                        <Loading className="h-[75vh] bg-white" />
                      )
                    )}
                    {activeTab === 'es' && (
                      !loading.es ? (
                        <iframe
                          title="Spanish Resume"
                          src={`${fileUrls.es}#toolbar=0&navpanes=0`}
                          className="w-full h-[75vh] bg-white"
                        />
                      ) : (
                        <Loading className="h-[75vh] bg-white" />
                      )
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
                  {/* English PDF */}
                  <a
                    href={fileUrls.en}
                    download={fileNames.en}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-3 rounded-lg bg-[#4C7F83] text-white font-semibold hover:bg-[#01666F] transition shadow"
                  >
                    {isSpanish ? 'Descargar PDF en Inglés' : 'Download English PDF'}
                  </a>

                  {/* English DOCX */}
                  <a
                    href={fileUrls.en.replace('.pdf', '.docx')}
                    download={fileNames.en.replace('.pdf', '.docx')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-3 rounded-lg bg-[#D4B645] text-white font-semibold hover:bg-[#F0CB1B] transition shadow"
                  >
                    {isSpanish ? 'Descargar DOCX en Inglés' : 'Download English DOCX'}
                  </a>

                  {/* Spanish PDF */}
                  <a
                    href={fileUrls.es}
                    download={fileNames.es}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-3 rounded-lg bg-[#C96E3B] text-white font-semibold hover:bg-[#F37920] transition shadow"
                  >
                    {isSpanish ? 'Descargar PDF en Español' : 'Download Spanish PDF'}
                  </a>

                  {/* Spanish DOCX */}
                  <a
                    href={fileUrls.es.replace('.pdf', '.docx')}
                    download={fileNames.es.replace('.pdf', '.docx')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-3 rounded-lg bg-[#58A99E] text-white font-semibold hover:bg-[#04AB99] transition shadow"
                  >
                    {isSpanish ? 'Descargar DOCX en Español' : 'Download Spanish DOCX'}
                  </a>
                </div>
              </Accordion>

              {/* Help Section */}
              <Accordion
                isOpen={isHelpOpen}
                setIsOpen={setIsHelpOpen}
                title={isSpanish ? 'Ayuda y preguntas frecuentes' : 'Help & FAQ'}
              >
                <ul className="list-disc list-inside space-y-3 text-gray-700 text-left">
                  <li>
                    {isSpanish
                      ? '¿No ves tu currículum? Revisa tu carpeta de spam o intenta descargar de nuevo.'
                      : "Can't see your resume? Check your spam folder or try downloading again."}
                  </li>
                  <li>
                    {isSpanish
                      ? 'Puedes imprimir tu currículum en persona de 10 a 6 horas de lunes a jueves, o de 10 a 1 el viernes, en 63 6th St, Chelsea, MA 02150.'
                      : 'You can print your resume in person from 10 AM - 6 PM Monday through Thursday, or 10 AM - 1 PM on Friday, at 63 6th St, Chelsea, MA 02150.'}
                  </li>
                  <li>
                    {isSpanish
                      ? 'Para cualquier pregunta o ayuda, contacta a Sierra Held en sierrah@la-colaborativa.org.'
                      : 'For any questions or help, contact Sierra Held at sierrah@la-colaborativa.org.'}
                  </li>
                  <li>
                    {isSpanish
                      ? 'Recuerda guardar una copia digital de tu currículum para futuras aplicaciones.'
                      : 'Remember to save a digital copy of your resume for future applications.'}
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

        </motion.div>
      </section>

      <Footer />
    </>
  );
}