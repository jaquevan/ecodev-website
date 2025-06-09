import Image from 'next/image';
import Picture from '../../public/catherineTorres.jpg';

export default function Instructor() {
    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Meet The Instructor</h2>

            <div className="flex flex-col md:flex-row items-center gap-6">
                <Image
                    src={Picture}
                    alt="Catherine Torres"
                    className="w-32 h-32 rounded-full object-cover shadow-md"
                />

                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-cyan-800 mb-1">Catherine Torres</h3>
                    <p className="text-gray-700 leading-relaxed max-w-xl">
                        Catherine Torres is a passionate digital navigator with a wealth of experience in helping individuals
                        navigate the digital world with confidence. With a deep understanding of computer systems, technology,
                        and digital literacy, Catherine has worked with a wide range of learners—from beginners to more advanced
                        users—guiding them to develop essential skills for personal and professional success.
                    </p>
                </div>
            </div>
        </div>
    );
}
