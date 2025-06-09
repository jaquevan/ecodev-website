import Image from 'next/image';
import Logo from '../../public/LC-Logo.jpg';
import Instructor from "@/components/Instructor";

export default function CourseTitle() {
    return (
        <>
        <div className="max-w-4xl mx-auto p-6 flex flex-col items-center mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-6">Computer Basics & Typing</h1>

            <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
                <Image
                    src={Logo}
                    alt="Computer Basics & Typing Workshop"
                    className="object-contain w-full h-full"
                    fill={false}
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-blue-300 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-2">Location</h3>
                    <p className="text-gray-700">La Colaborativa Community Center<br />318 Broadway, Chelsea</p>
                </div>

                <div className="bg-blue-300 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-2">Schedule</h3>
                    <p className="text-gray-700">Wednesdays & Fridays<br />6:00 PM - 8:00 PM</p>
                </div>

                <div className="bg-blue-300 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-white mb-2">Language</h3>
                    <p className="text-gray-700">Spanish<br />Materials in English & Spanish</p>
                </div>
            </div>

        </div>
        <Instructor/>
        </>
    );
}