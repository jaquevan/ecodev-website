'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from '@/context/LanguageContext';

export default function Nav() {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            const closeMenu = () => setMenuOpen(false);
            document.body.addEventListener('click', closeMenu);
            return () => document.body.removeEventListener('click', closeMenu);
        }
    }, [menuOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
                    scrolled ? 'bg-[#099a9c] shadow-md py-2' : 'bg-[#034b52] py-4'
                }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center group">
                            <Image
                                src={logo}
                                alt="Logo"
                                width={120}
                                height={36}
                                className="transition-transform duration-200 group-hover:scale-105 md:w-[180px] lg:w-[200px]"
                                priority
                            />
                        </Link>
                        <div className="hidden lg:block">
                            <LanguageSwitcher />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <LanguageSwitcher />
                        <div className="lg:hidden">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuOpen(!menuOpen);
                                }}
                                className="text-white focus:outline-none p-1 transition-transform duration-200 hover:scale-110"
                                aria-label={menuOpen ? (isSpanish ? "Cerrar menú" : "Close menu") : (isSpanish ? "Abrir menú" : "Open menu")}
                            >
                                {menuOpen ? <CloseIcon fontSize="medium"/> : <MenuIcon fontSize="medium"/>}
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center space-x-5 xl:space-x-8 text-white">
                        <NavLink href="/">{isSpanish ? 'Inicio' : 'Home'}</NavLink>
                        <NavLink href="/program">{isSpanish ? 'Programas' : 'Programs'}</NavLink>
                        <NavLink href="/course">{isSpanish ? 'Cursos' : 'Courses'}</NavLink>
                        <NavLink href="/chatbot">{isSpanish ? 'Creador de CV' : 'Resume Builder'}</NavLink>
                        <NavLink href="/team">{isSpanish ? 'Equipo' : 'Team'}</NavLink>
                        <NavLink href="/contact">{isSpanish ? 'Contacto' : 'Contact'}</NavLink>
                    </div>
                </div>

                {menuOpen && (
                    <div
                        className="lg:hidden bg-[#034b52] text-white py-4 px-6 flex flex-col space-y-3 animate-fadeIn shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <NavLink href="/" onClick={() => setMenuOpen(false)}>
                            {isSpanish ? 'Inicio' : 'Home'}
                        </NavLink>
                        <NavLink href="/program" onClick={() => setMenuOpen(false)}>
                            {isSpanish ? 'Programas' : 'Programs'}
                        </NavLink>
                        <NavLink href="/course" onClick={() => setMenuOpen(false)}>
                            {isSpanish ? 'Cursos' : 'Courses'}
                        </NavLink>
                        <NavLink href="/chatbot" onClick={() => setMenuOpen(false)}>
                            {isSpanish ? 'Creador de CV' : 'Resume Builder'}
                        </NavLink>
                        <NavLink href="/team" onClick={() => setMenuOpen(false)}>
                            {isSpanish ? 'Equipo' : 'Team'}
                        </NavLink>
                        <NavLink href="/contact" onClick={() => setMenuOpen(false)}>
                            {isSpanish ? 'Contacto' : 'Contact'}
                        </NavLink>
                    </div>
                )}
            </nav>

            <div className="h-[80px]"></div>
        </>
    );
}

function NavLink({ href, children, className = "", onClick }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            className={`hover:text-orange-400 text-lg font-medium transition-colors duration-200 block py-2 hover:scale-105 ${className}`}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}