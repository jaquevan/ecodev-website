import Image from 'next/image';
import Link from 'next/link';
import group from '../../public/team-photo.png';
import globe from '../../public/globe.svg';
import { useLanguage } from '@/context/LanguageContext';

export default function FeatureCard() {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';

    return (
        <div className="relative bg-gradient-to-r from-teal-700 to-teal-500 text-white rounded-xl px-6 py-4 md:px-10 md:py-6 shadow-lg flex flex-row items-center gap-8 overflow-visible max-w-6xl mx-auto border-2 border-orange-200 animate-fadeIn">
            {/* Left content */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <div className="text-teal-700 rounded-full p-2 w-12 h-12 flex items-center justify-center shadow">
                        <Image
                            src={globe}
                            alt={isSpanish ? "Ícono" : "Icon"}
                        />
                    </div>
                    <h3 className="text-xl font-semibold">
                        {isSpanish ? 'Lo Que Ofrecemos' : 'What We Offer'}
                    </h3>
                </div>

                <p className="text-sm md:text-base leading-relaxed mb-4">
                    {isSpanish
                        ? 'Desarrolla habilidades esenciales para la preparación laboral y apoya la educación, capacitación y empleo para todos los miembros de la comunidad.'
                        : 'Develop essential work readiness skills and support education, training, and employment for all community members.'}
                </p>

                <Link href="/team">
                    <button className="bg-white text-teal-700 font-semibold px-5 py-2 rounded shadow hover:bg-gray-100 transition cursor-pointer">
                        {isSpanish ? 'Conócenos Más' : 'Learn More About Us'}
                    </button>
                </Link>
            </div>

            {/* image bubble */}
            <div
                className="relative w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-orange-200 shadow-md z-10 animate-bubble"
                style={{ transform: 'translate(20px, -40px)', background: 'white' }}
            >
                <Image
                    src={group}
                    alt={isSpanish ? "equipo" : "team"}
                    fill
                    className="rounded-full object-cover"
                />
            </div>
        </div>
    );
}