import { Course } from '@/types/course';

const API = (process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1340').replace(/\/$/, '');

export const mediaUrl = (path = '') =>
    path.startsWith('http') ? path : `${API}${path}`;

export async function fetchCourses(): Promise<Course[]> {
    try {
        const res = await fetch(`${API}/api/courses?populate=Image`, { cache: 'no-store' });
        if (!res.ok) {
            console.error('Strapi fetch failed', res.status, await res.text());
            return [];
        }
        const json = await res.json();
        return json.data as Course[];
    } catch (err) {
        console.error('fetchCourses error:', err);
        return [];
    }
}

