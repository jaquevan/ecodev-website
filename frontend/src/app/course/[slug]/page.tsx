import Image from 'next/image';
import Link from 'next/link';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { fetchCourseBySlug, mediaUrl } from '@/lib/strapi';
import { formatTime } from '@/utils/format';
import { notFound } from 'next/navigation';

// Remove "use client" since we're doing server-side data fetching
export default async function CoursePage({ params }: { params: { slug: string } }) {
    const course = await fetchCourseBySlug(params.slug);

    if (!course) {
        notFound();
    }

    const imageUrl = course.Image?.[0]?.formats?.medium?.url || course.Image?.[0]?.url;

    return (
        <>
            <Nav/>
            <div className="container mx-auto max-w-5xl px-4 py-10 text-slate-800">
                {/* Back button */}
                <Link
                    href="/course"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
                >
                    <span className="mr-2">←</span> Back to Courses
                </Link>

                {imageUrl && (
                    <div className="w-full aspect-video relative rounded-lg overflow-hidden shadow mb-8">
                        <Image
                            src={mediaUrl(imageUrl)}
                            alt={course.Image?.[0]?.alternativeText || course.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <h1 className="text-3xl font-bold mb-6">{course.title}</h1>

                <p className="mb-6">{course.desc}</p>

                <div className="flex gap-4 mb-8">
                    <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">Register Now</button>
                    <button className="border border-slate-300 px-4 py-2 rounded hover:bg-slate-100">Explore</button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-orange-600">Meet The Instructor</h2>
                        <p className="text-sm">
                            <strong>Catherine Torres</strong> is a passionate digital navigator with a wealth of experience in helping individuals navigate the digital world with confidence. With a deep understanding of computer systems, technology, and digital literacy, Catherine has worked with a wide array of learners, from beginners to more advanced users, guiding them to develop essential skills for personal and professional success.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-orange-600">Prerequisites</h2>
                        <p className="text-sm">
                            This beginner-friendly workshop requires <strong>no prior computer or typing experience</strong>. Computers will be provided, and while basic mouse use and keyboard familiarity helps, the key requirement is a willingness to learn. You'll gain confidence and improve essential computer and typing skills in a supportive, hands-on setting.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-12">
                    <div className="bg-orange-100 rounded p-4 flex flex-col items-center justify-center font-semibold text-slate-700">
                        <h3 className="text-orange-600 mb-1">Schedule</h3>
                        <p className="text-sm text-center">{course.date} – {course.endDate}</p>
                        <p className="text-sm text-center">{formatTime(course.time)} – {formatTime(course.endTime)}</p>
                    </div>
                    <div className="bg-orange-200 rounded h-24 flex items-center justify-center font-semibold text-slate-700">Location</div>
                    <div className="bg-orange-300 rounded h-24 flex items-center justify-center font-semibold text-slate-700">Language</div>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-orange-600">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold">Master the Use of the Mouse and Keyboard</h3>
                        <p className="text-sm">Improve your skills with the mouse, including how to click, double-click, right-click, and scroll, for efficient interaction with your computer. Understand the layout of the keyboard and how to use it to type effectively.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Understand the Basics of Computers</h3>
                        <p className="text-sm">Learn what a computer is, how it works, and the key components that make up a computer.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Utilize Time-Saving Keyboard Shortcuts</h3>
                        <p className="text-sm">Learn essential shortcuts to make tasks such as copying, pasting, and undoing quicker and more efficient.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Understand The Operating System</h3>
                        <p className="text-sm">Gain knowledge about the operating system, including its role in managing your computer's resources and helping you interact with your device.</p>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}