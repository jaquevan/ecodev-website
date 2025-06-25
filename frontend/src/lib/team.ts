import { TeamMember } from '@/types/member';
import { API } from '@/lib/strapi';

interface TeamMemberPhoto {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail?: { url: string };
        small?: { url: string };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: unknown;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface StrapiRawTeamMember {
    id: number;
    documentId: string;
    name: string;
    role: string;
    description: string;
    locale: string;
    photo: TeamMemberPhoto;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    social?: {
        linkedin: string;
    };
}

interface StrapiTeamResponse {
    data: StrapiRawTeamMember[];
    meta: Record<string, unknown>;
}

let teamCache: { data: TeamMember[]; timestamp: number } | null = null;
const TEAM_CACHE_TTL = 5 * 60 * 1000;

export async function fetchTeamMembers(
    locale: string = 'en',
    options: { cache?: RequestCache } = { cache: 'no-store' }
): Promise<TeamMember[]> {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const res = await fetch(`${API}/api/team-members?locale=${locale}&populate=photo`, {
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

        const json = await res.json() as StrapiTeamResponse;

        if (!json.data || !Array.isArray(json.data)) {
            console.error('Invalid response format:', json);
            return [];
        }

        return json.data.map(item => ({
            id: item.id,
            attributes: {
                name: item.name || 'Unknown',
                role: item.role || '',
                description: item.description || '',
                locale: item.locale || locale,
                photo: {
                    data: item.photo ? {
                        id: item.photo.id,
                        attributes: {
                            name: item.photo.name,
                            alternativeText: item.photo.alternativeText ?? undefined,
                            caption: item.photo.caption ?? undefined,
                            width: item.photo.width,
                            height: item.photo.height,
                            formats: item.photo.formats,
                            hash: item.photo.hash,
                            ext: item.photo.ext,
                            mime: item.photo.mime,
                            size: item.photo.size,
                            url: item.photo.url,
                            previewUrl: item.photo.previewUrl ?? undefined,
                            provider: item.photo.provider,
                        }
                    } : null
                },
                social: item.social || { linkedin: '' }
            }
        }));
    } catch (err) {
        console.error('fetchTeamMembers error:', err);
        return [];
    }
}

// cached for perfromance and less api calls
export async function fetchCachedTeamMembers(locale: string = 'en'): Promise<TeamMember[]> {
    const now = Date.now();

    if (teamCache && now - teamCache.timestamp < TEAM_CACHE_TTL) {
        return teamCache.data;
    }

    const data = await fetchTeamMembers(locale);
    teamCache = { data, timestamp: now };
    return data;
}