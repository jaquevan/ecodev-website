'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from '@/context/LanguageContext';

import { fetchPrograms } from '@/lib/programs';
import { Program } from '@/types/program';

export default function Nav() {
    const { locale } = useLanguage();
    const isSpanish = locale === 'es';
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [programsOpen, setProgramsOpen] = useState(false);
    const [programs, setPrograms] = useState<Program[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        async function loadPrograms() {
            try {
                const data = await fetchPrograms(locale);
                setPrograms(data);
            } catch (err) {
                console.error('Error fetching programs:', err);
            }
        }
        loadPrograms();
    }, [locale]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
                    scrolled ? 'bg-[#099a9c] shadow-md py-2' : 'bg-[#006770] py-4'
                }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between transition-all duration-300">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src={logo}
                            alt="Logo"
                            width={150}
                            height={45}
                            className="transition-transform duration-100 group-hover:scale-102 md:w-[180px] lg:w-[200px]"
                        />
                    </Link>

                    {/* Language Switcher - Always visible */}
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />

                        {/* Mobile Menu Icon */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-white focus:outline-none"
                                aria-label={isSpanish ? "Abrir menú" : "Open menu"}
                            >
                                <MenuIcon fontSize="large"/>
                            </button>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-3 xl:space-x-6 text-white absolute left-1/2 transform -translate-x-1/2">
                        <NavLink href="/">{isSpanish ? 'Inicio' : 'Home'}</NavLink>

                        {/* Programs Dropdown */}
                        <div className="relative group">
                            <NavLink href="/program" className="flex items-center">
                                {isSpanish ? 'Programas' : 'Programs'}
                                <KeyboardArrowDownIcon className="ml-1" fontSize="small" />
                            </NavLink>
                            {programs.length > 0 && (
                                <div className="absolute left-0 mt-2 bg-[#006770] rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px] z-10">
                                    {programs.map((program) => (
                                        <NavLink
                                            key={program.id}
                                            href={`/program/${program.slug}`}
                                            className="block px-4 py-2 hover:bg-[#099a9c] w-full text-left"
                                        >
                                            {program.title}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <NavLink href="/course">{isSpanish ? 'Cursos' : 'Courses'}</NavLink>
                        <NavLink href="/chatbot">{isSpanish ? 'Creador de CV' : 'Resume Builder'}</NavLink>
                        <NavLink href="/team">{isSpanish ? 'Equipo' : 'Team'}</NavLink>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="lg:hidden bg-[#006770] text-white py-4 px-6 flex flex-col">
                        <NavLink href="/" onClick={() => setMenuOpen(false)}>
                            {isSpanish ? 'Inicio' : 'Home'}
                        </NavLink>

                        {/* Programs with accordion dropdown */}
                        <div className="border-b border-[#099a9c]/30">
                            <button
                                onClick={() => setProgramsOpen(!programsOpen)}
                                className="flex items-center justify-between w-full py-3 hover:text-orange-400 transition-colors duration-200"
                            >
                                <span>{isSpanish ? 'Programas' : 'Programs'}</span>
                                {programsOpen ?
                                    <KeyboardArrowUpIcon fontSize="small" /> :
                                    <KeyboardArrowDownIcon fontSize="small" />
                                }
                            </button>

                            {programsOpen && programs.length > 0 && (
                                <div className="pl-4 bg-[#099a9c]/20 rounded-md">
                                    {programs.map((program) => (
                                        <NavLink
                                            key={program.id}
                                            href={`/program/${program.slug}`}
                                            onClick={() => setMenuOpen(false)}
                                            className="py-2"
                                        >
                                            {program.title}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <NavLink href="/course" onClick={() => setMenuOpen(false)}>
                            {isSpanish ? 'Cursos' : 'Courses'}
                        </NavLink>
                        <NavLink href="/chatbot" onClick={() => setMenuOpen(false)}>
                            {isSpanish ? 'Creador de CV' : 'Resume Builder'}
                        </NavLink>
                        <NavLink href="/team" onClick={() => setMenuOpen(false)}>
                            {isSpanish ? 'Equipo' : 'Team'}
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
            className={`hover:text-orange-400 text-l transition-colors duration-200 block py-2 ${className}`}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}