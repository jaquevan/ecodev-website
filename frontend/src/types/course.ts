export interface StrapiFile {
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
}

export interface StrapiMedia {
    data: Array<{
        id: number;
        attributes: StrapiFile;
    }> | {
        id: number;
        attributes: StrapiFile;
    } | null;
}

export interface TeamMember {
    id: number;
    attributes: {
        name: string;
        title: string;
        bio: string;
        image: StrapiMedia;
        slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface Program {
    id: number;
    attributes: {
        title: string;
        slug: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface Course {
    id: string;
    title: string;
    desc: string;
    slug: string;
    date: string;
    endDate: string;
    time: string;
    endTime: string;
    location: string;
    language: string;
    learnings: string;
    preRequisites: string;
    Image: StrapiFile[];
    // New fields
    WeekdaySelection?: {
        id: number;
        weekdays: string;
    }[];
    team_members?: {
        id: number;
        name: string;
        role: string;
        description: string;
        photo?: {
            data?: {
                attributes: {
                    url: string;
                    formats?: {
                        medium?: {
                            url: string;
                        };
                    };
                };
            };
        };
    }[];
    program?: {
        data?: {
            attributes: {
                title: string;
                description: string;
            };
        };
    };
    // Legacy fields (keep for backward compatibility)
    instructorName?: string;
    instructorDesc?: string;
    instructorImage?: StrapiFile[];
}

export type WeekdayType = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface StrapiRelation<T> {
    data: T | T[] | null;
}
