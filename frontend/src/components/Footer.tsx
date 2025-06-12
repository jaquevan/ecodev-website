import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#3E666D] text-white pt-12 pb-6 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                {/* Column 1: Logo & Address */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Image src="/LC-Logo.jpg" alt="La Colaborativa" width={48} height={48} />
                        <span className="text-lg font-bold">La Colaborativa</span>
                    </div>
                    <p className="font-semibold">Economic Development</p>
                    <p className="text-sm">63 Sixth Street<br />Chelsea, MA 02150</p>
                </div>

                {/* Column 2: Navigation */}
                <div>
                    <h3 className="text-xl font-heading text-orange-100 mb-3">Navigation</h3>
                    <ul className="space-y-1 font-body">
                        <li><Link href="/" className="hover:text-orange-300">Home</Link></li>
                        <li><Link href="/team" className="hover:text-orange-300">Meet the Team</Link></li>
                        <li><Link href="/programs" className="hover:text-orange-300">Programs</Link></li>
                        <li><Link href="/calendar" className="hover:text-orange-300">Calendar</Link></li>
                    </ul>
                </div>

                {/* Column 3: Newsletter */}
                <div className="bg-[#2F4C50] p-4 rounded-lg">
                    <h3 className="text-xl font-heading mb-2">Subscribe</h3>
                    <p className="text-sm mb-4">Stay connected with us by subscribing to our newsletter.</p>
                    <form className="flex flex-col sm:flex-row gap-2 mb-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="px-3 py-2 rounded text-black flex-grow"
                        />
                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                            Submit
                        </button>
                    </form>
                    <p className="text-xs text-gray-300">
                        By subscribing, you agree to our <a href="#" className="underline">Privacy Policy</a> and consent to receive updates.
                    </p>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-500 pt-4 text-sm">


                {/* Copyright */}
                <p>&copy; {new Date().getFullYear()} La Colaborativa. All rights reserved.</p>

                {/* Language Switcher Placeholder */}
                <div className="mt-2 md:mt-0">
                    <div className="bg-white text-black px-2 py-1 rounded flex items-center gap-2">
                        <Image src="/flag-usa.svg" alt="" width={20} height={14} />
                        <span>Eng ▾</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
