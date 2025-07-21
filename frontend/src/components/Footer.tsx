"use client";

import { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Home, People, School, EventNote, Mail,
    LocationOn, Phone, Facebook, Instagram,
    LinkedIn, KeyboardArrowUp, ContactSupport
} from '@mui/icons-material';
import { useLanguage } from '@/context/LanguageContext';

const Footer = memo(function Footer() {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerBubbles = [
        { color: '#bdb0f2', size: 100, bottom: '5%', right: '10%' },
        { color: '#98FB98', size: 300, bottom: '40%', right: '5%' },
        { color: '#24d18d', size: 260, bottom: '0%', right: '-9%' },
        { color: '#ff6e00', size: 200, bottom: '30%', right: '22%' },
    ];

    return (
        <footer className="relative bg-gradient-to-b from-[#3E666D] to-[#2F4C50] text-white pt-16 pb-8 px-6 overflow-hidden animate-slideFadeUp">
            {footerBubbles.map((bubble, index) => (
                <div
                    key={index}
                    className="absolute rounded-full opacity-30"
                    style={{
                        backgroundColor: bubble.color,
                        width: bubble.size,
                        height: bubble.size,
                        bottom: bubble.bottom,
                        right: bubble.right,
                        zIndex: 0,
                        pointerEvents: 'none',
                    }}
                />
            ))}

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="flex flex-col md:flex-row md:items-start gap-10">
                    <div className="flex-shrink-0">
                        <Image src="/logo.svg" alt="La Colaborativa" width={200} height={200} className="object-contain" />
                    </div>
                    <div className="space-y-4 text-sm">
                        <p className="font-semibold text-orange-100">
                            {isSpanish ? 'Desarrollo Económico' : 'Economic Development'}
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <LocationOn className="text-orange-300 mt-1 flex-shrink-0" fontSize="small" />
                                <span>63 Sixth Street<br />Chelsea, MA 02150</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="text-orange-300 flex-shrink-0" fontSize="small" />
                                <span>(617) 889-6080</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="text-orange-300 flex-shrink-0" fontSize="small" />
                                <span>info@lacolaborativa.org</span>
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <a href="https://www.facebook.com/lacolaborativadechelsea" target="_blank" rel="noopener noreferrer"
                               className="hover:text-orange-300 transition-colors">
                                <Facebook />
                            </a>
                            <a href="https://www.instagram.com/la_colaborativa/" target="_blank" rel="noopener noreferrer"
                               className="hover:text-orange-300 transition-colors">
                                <Instagram />
                            </a>
                            <a href="https://www.linkedin.com/company/la-colaborativa/posts/?feedView=all" target="_blank"
                               rel="noopener noreferrer" className="hover:text-orange-300 transition-colors">
                                <LinkedIn />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h3 className="text-xl font-heading text-orange-100 mb-5 pb-2 border-b border-orange-300/30">
                        {isSpanish ? 'Navegación' : 'Navigation'}
                    </h3>
                    <ul className="space-y-3 font-body">
                        <li>
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-[#3E666D] flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                                    <Home fontSize="small" className="text-white" />
                                </div>
                                <span className="group-hover:text-orange-300 transition-colors">{isSpanish ? 'Inicio' : 'Home'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/team" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-[#3E666D] flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                                    <People fontSize="small" className="text-white" />
                                </div>
                                <span className="group-hover:text-orange-300 transition-colors">{isSpanish ? 'Conoce al Equipo' : 'Meet the Team'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-[#3E666D] flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                                    <ContactSupport fontSize="small" className="text-white" />
                                </div>
                                <span className="group-hover:text-orange-300 transition-colors">{isSpanish ? 'Contacto' : 'Contact'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/programs" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-[#3E666D] flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                                    <School fontSize="small" className="text-white" />
                                </div>
                                <span className="group-hover:text-orange-300 transition-colors">{isSpanish ? 'Programas' : 'Programs'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/calendar" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-[#3E666D] flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                                    <EventNote fontSize="small" className="text-white" />
                                </div>
                                <span className="group-hover:text-orange-300 transition-colors">{isSpanish ? 'Calendario' : 'Calendar'}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-500/30 pt-6 text-sm">
                <p className="text-gray-300">
                    &copy; {new Date().getFullYear()} La Colaborativa.
                    {isSpanish ? ' Todos los derechos reservados.' : ' All rights reserved.'}
                </p>
            </div>

            <button
                onClick={scrollToTop}
                className={`fixed right-6 bottom-6 bg-orange-500 hover:bg-orange-600 hover:cursor-pointer text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 ${
                    showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
                aria-label={isSpanish ? "Volver arriba" : "Scroll to top"}
            >
                <KeyboardArrowUp fontSize="medium" />
            </button>
        </footer>
    );
});

export default Footer;
