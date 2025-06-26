'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
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

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
                    scrolled ? 'bg-[#099a9c] shadow-md py-2' : 'bg-[#006770] py-4'
                }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center transition-all duration-300">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src={logo}
                            alt="Logo"
                            width={200}
                            height={60}
                            className="transition-transform duration-100 group-hover:scale-102"
                        />
                    </Link>

                    {/* Center-positioned Language Switcher */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <LanguageSwitcher/>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-10 text-sm font-semibold text-white">
                        <NavLink href="/">{isSpanish ? 'Inicio' : 'Home'}</NavLink>
                        <NavLink href="/course">{isSpanish ? 'Cursos' : 'Courses'}</NavLink>
                        <NavLink href="/team">{isSpanish ? 'Equipo' : 'Team'}</NavLink>
                        <NavLink href="/chatbot">{isSpanish ? 'Creador de CV' : 'Resume Builder'}</NavLink>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white focus:outline-none"
                            aria-label={isSpanish ? "Abrir menú" : "Open menu"}
                        >
                            <MenuIcon fontSize="large" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="md:hidden bg-[#006770] text-white py-4 px-6 flex flex-col">
                        <NavLink href="/">{isSpanish ? 'Inicio' : 'Home'}</NavLink>
                        <NavLink href="/course">{isSpanish ? 'Cursos' : 'Courses'}</NavLink>
                        <NavLink href="/team">{isSpanish ? 'Equipo' : 'Team'}</NavLink>
                        <NavLink href="/chatbot">{isSpanish ? 'Creador de CV' : 'Resume Builder'}</NavLink>
                    </div>
                )}
            </nav>

            <div className="h-[80px]"></div>
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="hover:text-orange-400 text-l transition-colors duration-200"
        >
            {children}
        </Link>
    );
}