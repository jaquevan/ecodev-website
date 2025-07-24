import Image from 'next/image';
import Link from 'next/link';
import group from '../../public/team-photo.png';
import globe from '../../public/globe.svg';
import { useLanguage } from '@/context/LanguageContext';

export default function FeatureCard() {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';

    return (
        <div className="relative bg-gradient-to-r from-teal-700 to-teal-500 text-white rounded-xl px-4 py-4 md:px-10 md:py-6 shadow-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-8 overflow-visible max-w-6xl mx-auto border-2 border-orange-200 animate-fadeIn">
            <div className="flex-1 z-10 order-2 sm:order-1 text-center sm:text-left">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 justify-center sm:justify-start">
                    <div className="bg-teal-800 rounded-full p-1.5 sm:p-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow">
                        <Image
                            src={globe}
                            alt={isSpanish ? "Ícono" : "Icon"}
                            className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold">
                        {isSpanish ? 'Lo Que Ofrecemos' : 'What We Offer'}
                    </h3>
                </div>

                <p className="text-sm md:text-base leading-relaxed mb-4 max-w-md mx-auto sm:mx-0">
                    {isSpanish
                        ? 'Desarrolla habilidades esenciales para la preparación laboral y apoya la educación, capacitación y empleo para todos los miembros de la comunidad.'
                        : 'Develop essential work readiness skills and support education, training, and employment for all community members.'}
                </p>

                <Link href="/team">
                    <button className="bg-white text-teal-700 font-semibold px-4 py-2 rounded shadow hover:bg-gray-100 transition cursor-pointer text-sm sm:text-base">
                        {isSpanish ? 'Conócenos Más' : 'Learn More About Us'}
                    </button>
                </Link>
            </div>

            <div className="order-1 sm:order-2 -mt-8 sm:mt-0 sm:transform sm:translate-y-[-20px] sm:translate-x-[20px] mb-2 sm:mb-0 self-center">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-full border-4 border-orange-200 shadow-md z-10 animate-bubble bg-white">
                    <Image
                        src={group}
                        alt={isSpanish ? "equipo" : "team"}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}