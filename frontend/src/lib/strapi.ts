// data fetching and caching for courses from Strapi
import { Course } from '@/types/course';

const courseCache: Record<string, { data: Course[]; timestamp: number }> = {};
const courseBySlugCache: Record<string, { data: Course | null; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const API = (process.env.NEXT_PUBLIC_STRAPI_URL ?? '').replace(/\/$/, '');

if (!API) {
    console.error('NEXT_PUBLIC_STRAPI_URL is not set. Please configure it in your environment variables.');
}

export const mediaUrl = (path = '') => {
    if (!path) {
        console.warn('Invalid media path provided:', path);
        return '';
    }


    const url = path.startsWith('http') ? path : `${API}${path}`;
    console.log('Generated media URL:', url);

    if (url.startsWith('/')) {
        return url;
    }

    return url;
};

export async function fetchCachedCourses(
    locale: string = 'en',
    options: { cache?: RequestCache } = { cache: 'no-store' }
): Promise<Course[]> {
    const cacheKey = `courses:${locale}`;
    const now = Date.now();

    if (courseCache[cacheKey] && now - courseCache[cacheKey].timestamp < CACHE_TTL) {
        return courseCache[cacheKey].data;
    }

    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        if (!token) {
            console.error('NEXT_PUBLIC_STRAPI_API_TOKEN is not set.');
            return [];
        }

        const res = await fetch(`${API}/api/courses?locale=${locale}&populate[program]=true&populate[Image]=true`, {
            cache: options.cache,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error('Failed to fetch courses:', res.status, res.statusText);
            return [];
        }

        const json = await res.json();
        if (!Array.isArray(json.data)) {
            console.error('Unexpected response format:', json);
            return [];
        }

        const courses = json.data as Course[];
        courseCache[cacheKey] = { data: courses, timestamp: now };
        return courses;
    } catch (err) {
        console.error('Error fetching courses:', err);
        return [];
    }
}

export async function fetchCachedCourseBySlug(
    slug: string,
    locale: string = 'en',
    options: { cache?: RequestCache } = { cache: 'no-store' }
): Promise<Course | null> {
    const cacheKey = `course:${slug}:${locale}`;
    const now = Date.now();

    if (courseBySlugCache[cacheKey] && now - courseBySlugCache[cacheKey].timestamp < CACHE_TTL) {
        return courseBySlugCache[cacheKey].data;
    }

    const data = await fetchCourseBySlug(slug, locale, options);
    courseBySlugCache[cacheKey] = { data, timestamp: now };
    return data;
}

export async function fetchCourses(
    locale: string = 'en',
    options: { cache?: RequestCache } = { cache: 'no-store' }
): Promise<Course[]> {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        if (!token) {
            console.error('NEXT_PUBLIC_STRAPI_API_TOKEN is not set. Please configure it in your environment variables.');
            return [];
        }

        const res = await fetch(`${API}/api/courses?locale=${locale}&populate=Image`, {
            cache: options.cache,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            try {
                const errorText = await res.text();
                console.error('Strapi fetch failed', res.status, errorText);
            } catch {
                console.error('Strapi fetch failed', res.status, res.statusText);
            }
            return [];
        }

        const json = await res.json();
        if (!Array.isArray(json.data)) {
            console.error('Unexpected response format for fetchCourses:', json);
            return [];
        }

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
        if (!token) {
            console.error('NEXT_PUBLIC_STRAPI_API_TOKEN is not set. Please configure it in your environment variables.');
            return null;
        }

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