import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const API = (process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '');

interface StrapiFile {
    id: number;
    url: string;
    alternativeText?: string;
}

interface Course {
    id: number;
    Title: string;
    desc: string;
    Date: string;
    Image?: StrapiFile[];
}

const mediaUrl = (path = '') => (path.startsWith('http') ? path : `${API}${path}`);

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

async function fetchCourse(): Promise<Course | null> {
    try {
        const res = await fetch(`${API}/api/course?populate=*`, { cache: 'no-store' });
        if (!res.ok) {
            console.error('Strapi response', res.status, await res.text());
            return null;
        }
        const json = await res.json();
        console.log('Course API response:', json);
        return json.data as Course | null;
    } catch (err) {
        console.error('Fetch error', err);
        return null;
    }
}

function pickFirstImage(course: Course): StrapiFile | undefined {
    return course.Image?.[0];
}

export default async function Home() {
    const course = await fetchCourse();

    return (
        <>
            <Nav />
            <main className="container mx-auto max-w-4xl px-4 py-10 space-y-8">
                {!course ? (
                    <h1 className="text-center text-2xl font-semibold text-red-500">
                        Course not found. <br />
                        Check Strapi permissions and field names.
                    </h1>
                ) : (
                    <>
                        <h1 className="text-center text-4xl font-bold text-orange-600">
                            {course.Title}
                        </h1>
                        <p className="text-center text-gray-500">{formatDate(course.Date)}</p>
                        {(() => {
                            const img = pickFirstImage(course);
                            return (
                                img && (
                                    <div className="relative w-full h-72 sm:h-96 rounded-lg overflow-hidden shadow">
                                        <Image
                                            src={mediaUrl(img.url)}
                                            alt={img.alternativeText || 'Course image'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )
                            );
                        })()}
                        <p className="prose md:prose-lg mx-auto">{course.desc}</p>
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}