import { Program } from "@/types/program";

const programCache: Record<string, { data: Program; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000;

export const API = (process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1340').replace(/\/$/, '');

export const mediaUrl = (path = '') => (path.startsWith('http') ? path : `${API}${path}`);

export async function fetchPrograms(
    locale: string = 'en',
    options: { cache?: RequestCache } = { cache: 'no-store' }
): Promise<Program[]> {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const url = `${API}/api/programs?locale=${locale}&populate=*`;

        const res = await fetch(url, {
            cache: options.cache,
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error('Strapi fetch failed', res.status, await res.text());
            return [];
        }

        const json = await res.json();
        return json.data as Program[];
    } catch (err) {
        console.error('fetchPrograms error:', err);
        return [];
    }
}

export async function fetchProgramBySlug(
    slug: string,
    locale: string = 'en',
    options: { cache?: RequestCache } = { cache: 'no-store' }
): Promise<Program | null> {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const url = `${API}/api/programs?locale=${locale}&filters[slug][$eq]=${slug}&populate=*`;

        const res = await fetch(url, {
            cache: options.cache,
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error('Strapi fetch failed:', { status: res.status, statusText: res.statusText });
            return null;
        }

        const json = await res.json();

        if (!json.data || json.data.length === 0) {
            console.log(`No program found for slug: ${slug}`);
            return null;
        }

        return json.data[0] as Program;
    } catch (err) {
        console.error('fetchProgramBySlug error:', err);
        return null;
    }
}

export async function fetchMultiplePrograms(
    slugs: string[],
    locale: string = 'en'
): Promise<Record<string, Program | null>> {
    const result: Record<string, Program | null> = {};

    const toFetch = slugs.filter((slug) => {
        const cacheKey = `${slug}:${locale}`;
        const cached = programCache[cacheKey];

        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            result[slug] = cached.data;
            return false;
        }
        return true;
    });

    if (toFetch.length > 0) {
        const query = toFetch.map((slug) => `filters[slug][$in]=${slug}`).join('&');
        const url = `${API}/api/programs?locale=${locale}&${query}&populate=*`;

        try {
            const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

            const res = await fetch(url, {
                cache: 'no-store',
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                const json = await res.json();
                if (json.data) {
                    json.data.forEach((program: Program) => {
                        const slug = program.slug ?? '';
                        result[slug] = program;
                        programCache[`${slug}:${locale}`] = { data: program, timestamp: Date.now() };
                    });
                }
            } else {
                console.error('Strapi fetch failed', res.status, await res.text());
            }
        } catch (err) {
            console.error('Error fetching multiple programs:', err);
        }
    }

    slugs.forEach((slug) => {
        if (result[slug] === undefined) {
            result[slug] = null;
        }
    });

    return result;
}
