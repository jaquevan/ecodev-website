import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/LC-Logo.jpg"
                            alt="La Colaborativa Logo"
                            width={60}
                            height={60}
                            className="rounded-full"
                        />
                        <h1 className="font-bold text-orange">La Colaborativa</h1>
                    </Link>

                    <div className="hidden md:flex gap-6">
                        <Link href="/landing" className="hover:text-orange-500 transition-colors">Home</Link>
                        <Link href="/course" className="hover:text-orange-500 transition-colors">Courses</Link>
                    </div>
                </div>
            </nav>
            {/* Spacer div to prevent content from appearing under the navbar */}
            <div className="h-[84px]"></div>
        </>
    );
}