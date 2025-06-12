"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Home, People, School, EventNote, Mail, LocationOn, Phone, Facebook, Instagram, LinkedIn, KeyboardArrowUp } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-gradient-to-b from-[#3E666D] to-[#2F4C50] text-white pt-16 pb-8 px-6 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Column 1: Logo & Address */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
                            <Image src="/LC-Logo.jpg" alt="La Colaborativa" width={48} height={48} className="object-cover" />
                        </div>
                        <span className="text-xl font-bold">La Colaborativa</span>
                    </div>
                    <p className="font-semibold text-orange-100 mb-4">Economic Development</p>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                            <LocationOn className="text-orange-300 flex-shrink-0 mt-1" fontSize="small" />
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
                    <div className="flex gap-4 mt-6">
                        <a href="https://www.facebook.com/lacolaborativadechelsea" target="_blank" className="text-white hover:text-orange-300 transition-colors">
                            <Facebook />
                        </a>
                        <a href="https://www.instagram.com/la_colaborativa/" target="_blank" className="text-white hover:text-orange-300 transition-colors">
                            <Instagram />
                        </a>
                        <a href="https://www.linkedin.com/company/la-colaborativa/posts/?feedView=all" target="_blank" className="text-white hover:text-orange-300 transition-colors">
                            <LinkedIn />
                        </a>
                    </div>
                </div>

                {/* Column 2: Navigation */}
                <div>
                    <h3 className="text-xl font-heading text-orange-100 mb-5 pb-2 border-b border-orange-300/30">Navigation</h3>
                    <ul className="space-y-3 font-body">
                        <li>
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-[#3E666D] flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                                    <Home fontSize="small" className="text-white" />
                                </div>
                                <span className="group-hover:text-orange-300 transition-colors">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/team" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-[#3E666D] flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                                    <People fontSize="small" className="text-white" />
                                </div>
                                <span className="group-hover:text-orange-300 transition-colors">Meet the Team</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/programs" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-[#3E666D] flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                                    <School fontSize="small" className="text-white" />
                                </div>
                                <span className="group-hover:text-orange-300 transition-colors">Programs</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/calendar" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-[#3E666D] flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                                    <EventNote fontSize="small" className="text-white" />
                                </div>
                                <span className="group-hover:text-orange-300 transition-colors">Calendar</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Newsletter */}
                <div className="bg-[#2A4448] p-6 rounded-lg shadow-lg border border-[#5A898F]/20">
                    <h3 className="text-xl font-heading mb-3 text-orange-100">Subscribe to Our Newsletter</h3>
                    <p className="text-sm mb-5 text-gray-200">Get updates on classes, events, and opportunities.</p>
                    <form className="space-y-3">
                        <div>
                            <label htmlFor="name" className="sr-only">Your Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 rounded-lg bg-[#3E666D]/80 border border-[#5A898F] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email address"
                                className="w-full px-4 py-3 rounded-lg bg-[#3E666D]/80 border border-[#5A898F] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-4 py-3 rounded-lg shadow-md hover:shadow-lg"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="text-xs text-gray-300 mt-4">
                        By subscribing, you agree to our <a href="/privacy" className="text-orange-300 hover:underline">Privacy Policy</a> and consent to receive updates.
                    </p>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-500/30 pt-6 text-sm">
                {/* Copyright */}
                <p className="text-gray-300">&copy; {new Date().getFullYear()} La Colaborativa. All rights reserved.</p>

                {/* Language Switcher with flag-icons */}
                <div className="mt-4 md:mt-0 flex gap-2">
                    <button className="bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-lg flex items-center gap-2 border border-white/20">
                        <span className="fi fi-us"></span>
                        <span>English</span>
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-lg flex items-center gap-2 border border-white/20">
                        <span className="fi fi-es"></span>
                        <span>Español</span>
                    </button>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed right-6 bottom-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 ${
                    showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
                aria-label="Scroll to top"
            >
                <KeyboardArrowUp fontSize="medium" />
            </button>
        </footer>
    );
}