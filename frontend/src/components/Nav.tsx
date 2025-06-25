'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../public/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';

export default function Nav() {
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

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-10 text-sm font-semibold text-white">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/course">Courses</NavLink>
                        <NavLink href="/team">Team</NavLink>
                        <NavLink href="/chatbot">Resume Builder</NavLink>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white focus:outline-none"
                        >
                            <MenuIcon fontSize="large" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="md:hidden bg-[#006770] text-white py-4 px-6 flex flex-col">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/course">Courses</NavLink>
                        <NavLink href="/team">Team</NavLink>
                        <NavLink href="/chatbot">Resume Builder</NavLink>
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
            className="hover:text-orange-400  text-l transition-colors duration-200"
        >
            {children}
        </Link>
    );
}