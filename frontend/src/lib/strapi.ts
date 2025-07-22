// data fetching and caching for courses from Strapi

import { Course } from '@/types/course';

const courseCache: Record<string, { data: Course; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000;

export const API = (process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1340').replace(/\/$/, '');

export const mediaUrl = (path = '') => (path.startsWith('http') ? path : `${API}${path}`);

export async function fetchCourses(
    locale: string = 'en',
    options: { cache?: RequestCache } = { cache: 'no-store' }
): Promise<Course[]> {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const res = await fetch(`${API}/api/courses?locale=${locale}&populate=Image`, {
            cache: options.cache,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

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

export async function fetchCourseBySlug(
    slug: string,
    locale: string = 'en',
    options: { cache?: RequestCache } = { cache: 'no-store' }
): Promise<Course | null> {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const url = `${API}/api/courses?locale=${locale}&filters[slug][$eq]=${slug}&populate[team_members][populate]=photo&populate=WeekdaySelection`;

        const res = await fetch(url, {
            cache: options.cache,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error('Strapi fetch failed:', { status: res.status, statusText: res.statusText });
            return null;
        }

        const json = await res.json();

        if (!json.data || json.data.length === 0) {
            console.log(`No course found for slug: ${slug}`);
            return null;
        }

        return json.data[0];
    } catch (err) {
        console.error('fetchCourseBySlug error:', err);
        return null;
    }
}

export async function fetchMultipleCourses(
    slugs: string[],
    locale: string = 'en'
): Promise<Record<string, Course | null>> {
    const result: Record<string, Course | null> = {};

    const toFetch = slugs.filter((slug) => {
        const cacheKey = `${slug}:${locale}`;
        const cached = courseCache[cacheKey];

        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            result[slug] = cached.data;
            return false;
        }
        return true;
    });

    if (toFetch.length > 0) {
        const query = toFetch.map((slug) => `filters[slug][$in]=${slug}`).join('&');
        const url = `${API}/api/courses?locale=${locale}&${query}&populate=*`;

        try {
            const res = await fetch(url, {
                cache: 'no-store',
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                const json = await res.json();
                if (json.data) {
                    json.data.forEach((course: Course) => {
                        const slug = course.slug;
                        result[slug] = course;
                        courseCache[`${slug}:${locale}`] = { data: course, timestamp: Date.now() };
                    });
                }
            }
        } catch (err) {
            console.error('Error fetching multiple courses:', err);
        }
    }

    slugs.forEach((slug) => {
        if (result[slug] === undefined) {
            result[slug] = null;
        }
    });

    return result;
}