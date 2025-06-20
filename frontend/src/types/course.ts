// In types/course.ts
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

export interface Course {
    id: number;
    title: string;
    desc: string;
    date: string;
    endDate: string;
    time: string;
    endTime: string;
    slug: string;
    location: string;
    language: string;
    instructorName: string;
    instructorDesc: string;
    preRequisites: string;
    learnings: string;
    registration?: boolean;

    // Updated to support both formats
    Image?: StrapiFile[] | StrapiMedia;
    instructorImage?: StrapiFile[] | StrapiMedia;

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    documentId?: string;
}