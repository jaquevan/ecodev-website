import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { fetchCourses, mediaUrl } from '@/lib/strapi';
import { Course } from '@/types/course';
import {formatTime} from '@/utils/format';
import Link from 'next/link';

const pickFirstImageUrl = (course: Course) => {
    const file = course.Image?.[0];
    return file?.formats?.medium?.url || file?.url;
};

export default async function Home() {
    const courses = await fetchCourses();

    return (
        <>
            <Nav />
            <main className="container mx-auto max-w-5xl px-4 py-10 space-y-16">
                {courses.length === 0 ? (
                    <h1 className="text-center text-2xl font-semibold text-red-500">
                        No courses found. Check Strapi content or permissions.
                    </h1>
                ) : (
                    courses.map((course) => {
                        const imageUrl = pickFirstImageUrl(course);

                        return (
                            <section
                                key={course.id}
                                className="flex flex-col md:flex-row gap-8 items-center border-b border-gray-200 pb-10"
                            >
                                {/* Image */}
                                <div className="w-full md:w-1/2 aspect-video relative rounded-lg overflow-hidden shadow">
                                    {imageUrl && (
                                        <Image
                                            src={mediaUrl(imageUrl)}
                                            alt={course.Image?.[0]?.alternativeText || course.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>

                                {/* Text Content */}
                                <div className="w-full md:w-1/2 space-y-4">
                                    <h1 className="text-3xl font-bold text-slate-800">
                                        {course.title}
                                    </h1>
                                    <p className="text-gray-600">{course.desc}</p>

                                    <div className="bg-orange-50 p-4 rounded shadow text-sm text-gray-700">
                                        <h3 className="font-semibold text-orange-700 mb-1">Schedule</h3>
                                        <p>{course.date} – {course.endDate}</p>
                                        <p>{formatTime(course.time)} – {formatTime(course.endTime)}</p>

                                    </div>

                                    <div className="flex gap-4 mt-4">
                                        <Link
                                            href={`/course/${course.slug}`}
                                            className="bg-orange-400 hover:bg-blue-500 text-white px-4 py-2 rounded shadow inline-block">
                                            View Details
                                        </Link>

                                    </div>
                                </div>
                            </section>
                        );
                    })
                )}
            </main>
            <Footer />
        </>
    );
}
