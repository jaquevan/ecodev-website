/* Strapi fetch helpers ------------------------------------------------ */

export type Course = {
    id: number;
    attributes: {
        title: string;
        desc: string;
        date: string;
        image: {
            data: {
                attributes: {
                    url: string;
                    alternativeText?: string;
                };
            };
        };
    };
};

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL!.replace(/\/$/, ''); // trim trailing /

/** Build full media URL (works for uploaded images & absolute URLs) */
export const mediaUrl = (path?: string | null) =>
    !path ? '' : path.startsWith('http') ? path : `${STRAPI}${path}`;

/** Fetch the single-type `course` */
export async function fetchCourse(): Promise<Course | null> {
    try {
        const res = await fetch(`${STRAPI}/api/course?populate=image`, {
            // no-store so every reload shows latest published content
            cache: 'no-store',
        });

        if (res.status === 403) throw new Error('💡 Enable "find" permission for Public role in Strapi');
        if (res.status === 404) throw new Error('💡 Endpoint /api/course not found - check single-type name');

        if (!res.ok) throw new Error(`Strapi error ${res.status}`);

        const json = await res.json();
        return json.data as Course | null;
    } catch (err) {
        console.error(err);
        return null;
    }
}
