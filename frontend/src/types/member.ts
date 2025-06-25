export interface TeamMember {
    id: number;
    attributes: {
        name: string;
        role: string;
        description: string;
        locale: string;
        photo:  StrapiFile[] | StrapiMedia;
        social: {
            linkedin: string;
        };
    };
}

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