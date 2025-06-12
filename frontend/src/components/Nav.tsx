import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.svg';

export default function Nav() {
    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-[#006770] text-white shadow z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src={logo} alt="Logo" width={160} height={45} />
                    </Link>
                    <div className="hidden md:flex gap-10 text-sm font-semibold">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/course">Courses</NavLink>
                    </div>
                </div>
            </nav>
            <div className="h-[76px]"></div>
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="hover:text-orange-300 transition-colors duration-200"
        >
            {children}
        </Link>
    );
}